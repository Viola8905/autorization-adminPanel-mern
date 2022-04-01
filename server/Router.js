const Router = require("express");
const router = new Router();
const AuthController = require("./controllers/authController");
const PostController = require("./controllers/postController");
const ReqPostController = require("./controllers/reqPostsController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const Post= require("./models/Posts");
const User = require("./models/User");
const { secret } = require("./config");


router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  AuthController.registration
);
router.post("/login", AuthController.login);
router.get("/users", roleMiddleware(["ADMIN"]), AuthController.getUsers);
router.delete("/users/:_id", roleMiddleware(["ADMIN"]), AuthController.deleteUserById);
router.delete(
  "/posts/:_id",
	roleMiddleware(["ADMIN"]),
  PostController.deletePostById
);


router.get("/posts/", PostController.getAllPosts);

router
  .route("/posts/", roleMiddleware(["ADMIN"]))
  .post(PostController.createNewPost);
router
  .route("/posts/:id", roleMiddleware(["ADMIN"]))
  .put(PostController.updatePostById);
  

router.route("/posts/:mainId").get(PostController.getById);


router.get("/reqPosts/", authMiddleware, ReqPostController.getAllReqPosts);
router.get("/rejPosts/", authMiddleware, ReqPostController.getAllRejPosts);

router.delete(
  "/reqPosts/:_id",roleMiddleware(["ADMIN"]),
  ReqPostController.deleteReqPostById
);
router.post(
  "/reqPosts/move",
  
  ReqPostController.moveReqPost
);
router.post(
  "/reqPosts/reject",

  ReqPostController.moveToRejected
);

router.route("/requested/:mainId").get(ReqPostController.getReqPostById);


router
  .route("/reqPosts/", authMiddleware)
  .post(ReqPostController.createNewReqPost);








module.exports = router;
