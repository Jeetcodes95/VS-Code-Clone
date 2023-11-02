var express = require('express');
var router = express.Router();
var fs = require("fs")

/* GET home page. */

var foldername = "uploads";
file_descriptor = fs.openSync(`./${foldername}`);


router.get('/', function(req, res, next) {
  fs.readdir(`./${foldername}`, {withFileTypes: true}, function(err, files){
    var arr = [];

    files.forEach(function(val){
      arr.push({name: val.name, isFolder: val.isDirectory()});
    });
      res.render("index", {files: arr, foldername: foldername})
  });
});

router.get('/createfile', function(req, res, next) {
  fs.writeFile(`./${foldername}/${req.query.filename}`,"", function(err){
    if(err)console.log(err);
    else{
      res.redirect("/");
    }
  });
});
router.get(`/createfolder`,function(req,res,next){
  fs.mkdir(`./${foldername}/${req.query.foldername}`,function(err, files){
    res.redirect('/')
  });
});

// router.get('/delete/:filename', function(req, res, next) {
//   fs.unlink(`./${foldername}/${req.params.filename}`, function(err){  
//     res.redirect("/")
//   })
// });

router.get('/delete/:filename/:check', function(req, res) {
  if(req.params.check === 1){
    fs.unlink(`./${foldername}/${req.params.filename}`, function(err, files){  
      res.redirect("/")
    });
  }else{
    fs.rm(`./${foldername}/${req.params.filename}`, {force:true, recursive:true}, function(err, files){
      res.redirect("/");
    })
  }   
 });



router.get('/file/:filename', function(req, res) {
  fs.readdir(`./${foldername}`,{withFileTypes: true },function(err, files){
    fs.readFile(`./${foldername}/${req.params.filename}`,"utf8",function(err, data){
      var arr=[];

    files.forEach(function(val){
      arr.push({name:val.name , isFolder:val.isDirectory()})
    })
    res.render("file", {files:arr , foldername:foldername ,filename:req.params.filename ,data:data})
    })
});

});

router.post('/save/:filename', function(req, res) {
  fs.writeFile(`./${foldername}/${req.params.filename}`,req.body.filedata, function(err){
    if(err)console.log(err);
    else{
      res.redirect("back");
    }
  });
});

router.get('/fileclose/:filename', function(req, res) {
  fs.close(file_descriptor, function(err){
    if(err){console.log(err)}
    else{
      res.redirect("/")
    }
  })
});



module.exports = router;
