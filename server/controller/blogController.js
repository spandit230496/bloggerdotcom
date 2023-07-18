const { mongoose } = require("mongoose");
const blogModel = require("../model/blogModel");
const userModel = require("../model/userModel");

//get all blog
exports.getAllBlogController = async (req, res) => {
  try {
    const blog = await blogModel.find({});
    if (!blog) {
      return res.status(200).send({
        success: false,
        message: "Error while fetching  blog",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blog are fetched",
      blogCount: blog.length,
      blog,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      success: false,
      message: "Error while fetching  blog",
    });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields",
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const blog = new blogModel({
      title,
      description,
      image,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blog.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await blog.save();
    return res.status(201).send({
      success: true,
      message: "blog created successfully",
      blog,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      success: false,
      message: "Error while creating blog",
    });
  }
};
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      success: false,
      message: "Error while updating blog",
    });
  }
};
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);
    if (!blog) {
      console.log(id);

      return res.status(404).send({
        success: false,
        message: "requested blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Fetched blog",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while fetching blog",
      error,
    });
  }
};
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blog.pull(blog);
    await blog.user.save();

    return res.status(200).send({
      success: true,
      message: "Blog deleted",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while deleting blog",
      error: error.message,
    });
  }
};

exports.userBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await userModel.findById(id).populate("blog");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "User blogs not found with this ID",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User blogs fetched successfully",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while fetching user blogs",
      error: error.message,
    });
  }
};
