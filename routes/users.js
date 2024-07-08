

const router = require("express").Router();
const { registerUser, getAllUsers,findUserById } = require("../Controller/UsersController");

router.post("/", registerUser);
router.get("/findall", getAllUsers);
router.get("/:id", findUserById);

module.exports = router;
