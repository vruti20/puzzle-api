var express = require('express');
const multer  = require('multer');
var PUZZLE = require('../model/puzzle')
var router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/alldata',async function(req, res, next) {
    try {
      const datas = await PUZZLE.find().populate('categorie')
      res.status(200).json({
          status: "success",
          message: "all record found",
          doc: datas
      })
  
  }  catch (error) {
       res.status(404).json({
         status: "fail",
          message: error.message,
      })
  }
  });
  
  router.post('/createdata',upload.single('image'), async function(req,res,next){
    try {
  
        req.body.image = req.file.filename;
      const datas = await PUZZLE.create(req.body)
      res.status(201).json({ 
          status: "success",
          message: "all record create",
          doc: datas
      })
  }
  catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message
      })
  }
  })
  
  router.post('/updatedata',async function(req,res,next){
      try {
  
          const main = await PUZZLE.findByIdAndUpdate(req.query.id, req.body);
  
          res.status(201).json({
              status: "success",
              message: "update",
              data: main
          })
      } catch (error) {
          res.status(404).json({
              status: "fail",
              message: error.message
          })
      }
  })
  
  router.post('deletedata',async function(req,res,next){
      try {
  
          const del = await PUZZLE.findByIdAndDelete(req.query.id);
  
          res.status(204).json({
              status: "success",
              message: "delete",
              data: del
          })
      } catch (error) {
          res.status(404).json({
              status: "fail",
              message: error.message
          })
      }
  }
  )
  

module.exports = router;
