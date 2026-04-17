
// USER
// GET    /all-users       (admin)
// GET    /user/:id        (admin)
// DELETE /user/:id        (admin)
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getAllUsers } = require("../controllers/userController");
const {deleteOneUser} = require("../controllers/userController")
const {getOneUser} = require('../controllers/userController')

//admin access only
router.get("/all-users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.get("/all-user/:id", authMiddleware, roleMiddleware(["admin"]), getOneUser);
router.delete("/delete/:id", authMiddleware, roleMiddleware(["admin"]), deleteOneUser);

module.exports = router;