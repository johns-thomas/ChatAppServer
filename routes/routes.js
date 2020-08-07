const express = require('express');
const messagesController=require('../controllers/util/messages');
const adminController=require('../controllers/admin/admin');
const isAuth = require('../middleware/isauth');
const router = express.Router();


//POST req for messages;

router.post('/me',isAuth,messagesController.postMessage);
router.delete('/me/:id',isAuth,messagesController.deleteMessage);
router.post("/messages",isAuth,messagesController.getMessage);


//router for adminstration

router.post("/login",adminController.login);
router.post("/signup",adminController.signUp);
router.post('/add-contact',isAuth,adminController.addContact);
router.post('/get-contacts',isAuth,adminController.getContact);

module.exports=router;