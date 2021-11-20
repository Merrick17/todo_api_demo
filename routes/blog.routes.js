const express = require("express");
const verifToken = require("../utils/verifToken");
const blogController = require("../controllers/blog.controller");
const router = express.Router();
router.post("/add", verifToken, blogController.addNewBlog);
router.get("/", verifToken, blogController.getAllBlogs);
router.delete("/remove/:id", verifToken, blogController.deleteBlog);
module.exports = router;
