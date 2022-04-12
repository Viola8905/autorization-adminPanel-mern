const ReqPost = require("../models/ReqPosts");
const RejPost = require("../models/RejectedPosts");
const Post = require("../models/Posts");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllReqPosts = asyncHandler(async (req, res, next) => {
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

  query = ReqPost.find(JSON.parse(queryStr));
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

exports.getAllRejPosts = asyncHandler(async (req, res, next) => {
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

  query = RejPost.find(JSON.parse(queryStr));
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

exports.createNewReqPost = asyncHandler(async (req, res, next) => {
  const { arr } = req.body;
  const post = await ReqPost.create(arr);

  res.status(201).json({
    success: true,
    data: post,
  });
});

exports.moveReqPost = asyncHandler(async (req, res, next) => {
  const { arr } = req.body;
  const post = await Post.create(arr);
  const rejPost = await RejPost.create(arr);

  res.status(201).json({
    success: true,
    data: post,
  });

  // this.postAddNotification(arr.user);
});

exports.postAddNotification = async (author) => {
  const postAuthor = User.find(author);
  await postAuthor.save();

  postAuthor.notifications.push("Your post been approved!");
};

exports.moveToRejected = asyncHandler(async (req, res, next) => {
  const { arr } = req.body;

  const rejPost = await RejPost.create(arr);

  res.status(201).json({
    success: true,
  });
});

exports.deleteReqPostById = asyncHandler(async (req, res, next) => {
  let post = await ReqPost.findOneAndDelete({ _id: req.params._id });

  if (!post) {
    return next(new ErrorResponse("bootcamp with this id was not found", 404));
  }

  res.status(200).json({
    success: true,
  });
});

exports.getReqPostById = asyncHandler(async (req, res, next) => {
  let post = await ReqPost.find({ mainId: req.params.mainId });
  if (!post) {
    return next(new ErrorResponse("bootcamp with this id was not found", 404));
  }
  res.status(200).json({
    success: true,
    data: post,
  });
});

exports.getRejPostById = asyncHandler(async (req, res, next) => {
  let post = await RejPost.find({ mainId: req.params.mainId });
  if (!post) {
    return next(new ErrorResponse("bootcamp with this id was not found", 404));
  }
  res.status(200).json({
    success: true,
    data: post,
  });
});
