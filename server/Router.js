const Router = require("express");
const router = new Router();
const AuthController = require("./authController");
const BootcampController = require("./bootcampController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const Bootcamp = require("./models/Bootcamp");
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
  "/bootcamps/:_id",
  roleMiddleware(["ADMIN"]),
  BootcampController.deleteBootcampById
);


router
  .route("/bootcamps", authMiddleware )
  .get(BootcampController.getAllBootcamps)
  .post(BootcampController.createNewBootcamp);
router
  .route("/bootcamps/:id", authMiddleware)
  .put(BootcampController.updateBootcampById)
  

router.route("/bootcamps/:mainId", authMiddleware).get(BootcampController.getById);







router.get('/auth',authMiddleware,
	async(req,res) => {
		try{
		
			const user = await User.findOne({_id: req.user.id})
			  const token = jwt.sign({id: user.id, roles: user.roles}, secret, {
          expiresIn: "1h",
        });
			return res.json ({
				token,user
			})
		}catch(e){
			console.log(e)
			res.send({message:"Error in /auth request"})

		}
	}
)

module.exports = router;
