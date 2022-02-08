const Router = require("express");
const router = new Router();
const AuthController = require("./authController");
const PostController = require("./postController");
const ReqPostController = require('./reqPostsController')
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
router.delete(
  "/posts/:_id",
	roleMiddleware(["ADMIN"]),
  PostController.deletePostById
);


router.get("/posts/", PostController.getAllPosts);

router
  .route("/posts/", authMiddleware )
  .post(PostController.createNewPost);
router
  .route("/posts/:id", authMiddleware)
  .put(PostController.updatePostById)
  

router.route("/posts/:mainId").get(PostController.getById);


router.get("/reqPosts/", roleMiddleware(["ADMIN"]), ReqPostController.getAllReqPosts);

router.delete(
  "/reqPosts/:_id",
  ReqPostController.deleteReqPostById
);
router.post("/reqPosts/move", ReqPostController.moveReqPost);


router
  .route("/reqPosts/", authMiddleware)
  .post(ReqPostController.createNewReqPost);






// router.get('/auth',authMiddleware,
// 	async(req,res) => {
// 		try{
		
// 			const user = await User.findOne({_id: req.user.id})
// 			const token = jwt.sign({id:user.id, roles:user.roles}, secret, {
//           expiresIn: "1h",
//         });
// 			return res.json ({
// 				token,user
// 			})
// 		}catch(e){
// 			console.log(e)
// 			res.send({message:"Error in /auth request"})

// 		}
// 	}
// )

module.exports = router;
