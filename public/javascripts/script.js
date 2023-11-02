// const res = require("express/lib/response");

var fileadd = document.querySelector("#iconsf .ri-file-add-fill");
var folderadd = document.querySelector("#iconsf .ri-folder-add-fill");
var fileform = document.querySelector("#fileform");
var folderform = document.querySelector("#folderform");
var downicon = document.querySelector(".downlist");
var filediv = document.querySelector("#files");
// var fileclose = document.querySelector(".fileclose");

fileadd.addEventListener("click", function(){
  fileform.style.display = "initial";
  folderform.style.display = "none";
});
folderadd.addEventListener("click", function(){
  folderform.style.display = "initial";
  fileform.style.display = "none";
});
downicon.addEventListener("click",function(){
  filediv.style.display = "none"
})
// fileclose.addEventListener("click",function(){
//   // filediv.style.display = "none"
//   // res.redirect()
// })