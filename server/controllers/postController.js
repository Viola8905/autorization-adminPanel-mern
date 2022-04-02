const Post = require("../models/Posts");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  //..../api/v1/bootcamps&price[lte]=1000&sort=-price
  let query;

  const reqQuery = { ...req.query }; //spread into a new one query

  const removeFields = ["sort"]; //you can add here more fields(specified what fields to remove)

  removeFields.forEach((value) => delete reqQuery[value]); //(and remove fields from request query object)if you find in an object key that matches this value,delete the entiere key-value pair

  let queryStr = JSON.stringify(reqQuery); //turned request query object into a string
  console.log(queryStr);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|regex)\b/g,
    (match) => `$${match}`
  ); //gt-grater than ..../mongodb logical operators(manipulate string if it contain any of following instructions)
  console.log(queryStr);

  query = Post.find(JSON.parse(queryStr));
  if (req.query.sort) {
    //sorting by price and rating
    const sortByArr = req.query.sort.split(",");

    const sortByStr = sortByArr.join("");

    query = query.sort(sortByStr);
  } else {
    query = query.sort("name");
  }

  //                 {"price":{"$lte":"900"}}
  const posts = await query; //it will show bootcamps where price is less than 1000
  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.createNewPost = asyncHandler(async (req, res, next) => {
  const { arr } = req.body;
  const post = await Post.create(arr);

  res.status(201).json({
    success: true,
    data: post,
  });
});
exports.updatePostById = asyncHandler(async (req, res, next) => {
 
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("post with this id was not found", 404));
  }

  post = await Post.findOneAndUpdate({ _id:req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: post,
  });
});
exports.deletePostById = asyncHandler(async (req, res, next) => {
  let post = await Post.findOneAndDelete({ _id : req.params._id });

  if (!post) {
    return next(new ErrorResponse("bootcamp with this id was not found", 404));
  }

  res.status(200).json({
    success: true,
  });
});

exports.getById = asyncHandler(async (req, res, next) => {
  let post = await Post.find({ mainId: req.params.mainId });
  if (!post) {
    return next(new ErrorResponse("bootcamp with this id was not found", 404));
  }
  res.status(200).json({
    success: true,
    data: post,
  });
});
