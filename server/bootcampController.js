const Bootcamp = require("./models/Bootcamp");
const asyncHandler = require("./middleware/asyncHandler");
const ErrorResponse = require("./utils/errorResponse");

exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  //..../api/v1/bootcamps&price[lte]=1000&sort=-price
  let query;

  const reqQuery = { ...req.query }; //spread into a new one query

  const removeFields = ["sort"]; //you can add here more fields(specified what fields to remove)

  console.log(reqQuery);
  removeFields.forEach((value) => delete reqQuery[value]); //(and remove fields from request query object)if you find in an object key that matches this value,delete the entiere key-value pair
  console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery); //turned request query object into a string
  console.log(queryStr);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  ); //gt-grater than ..../mongodb logical operators(manipulate string if it contain any of following instructions)
  console.log(queryStr);

  query = Bootcamp.find(JSON.parse(queryStr));
  if (req.query.sort) {
    //sorting by price and rating
    const sortByArr = req.query.sort.split(",");

    const sortByStr = sortByArr.join("");

    query = query.sort(sortByStr);
  } else {
    query = query.sort("-price");
  }

  //                 {"price":{"$lte":"900"}}
  const bootcamps = await query; //it will show bootcamps where price is less than 1000
  res.status(200).json(bootcamps);
});
exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});
exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new ErrorResponse("bootcamp with this id was not found", 404));
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});
exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
	
  let bootcamp = await Bootcamp.findOneAndDelete( {_id : req.params._id} );
	
	
  if (!bootcamp) {
    return next(new ErrorResponse("bootcamp with this id was not found", 404));
  }


	 

  res.status(200).json({
		
	});
});

exports.getById = asyncHandler(async (req, res, next) => {
	let bootcamp = await Bootcamp.find({ mainId: req.params.id });
  if (!bootcamp) {
    return next(new ErrorResponse("bootcamp with this id was not found", 404));
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});
