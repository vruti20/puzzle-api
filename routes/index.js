var express = require('express');
const multer  = require('multer');
var NEWONE = require('../model/categories')
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


router.get('/getdata',async function(req, res, next) {
  try {
    const datas = await NEWONE.find()
    res.status(200).json({
        status: "success",
        message: "all record found",
        doc: datas
    })

}
catch (error) {
     res.status(404).json({
       status: "fail",
        message: error.message,
    })
}
});

router.post('/create', upload.single('image') ,async function(req,res,next){
  try {

    console.log(req.body);
    console.log(req.file.filename);
    if(!req.body.name || !req.file.filename){
      throw new Error('please add valid data');
    }
    req.body.image=req.file.filename
    const datas = await NEWONE.create(req.body)
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

router.post('/update',async function(req,res,next){
    try {

        const main = await NEWONE.findByIdAndUpdate(req.query.id, req.body);

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

router.post('delete',async function(req,res,next){
    try {

        const del = await NEWONE.findByIdAndDelete(req.query.id);

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
