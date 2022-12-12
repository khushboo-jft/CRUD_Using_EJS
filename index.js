require('dotenv').config()
const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const verifyJWT = require('./auth/server.js')
// const emp=require("./routes/route.js");
let empData = [
  {
    "names": "arun",
    "job": "engineer",
    "salary": "8000",
    "id": 1
  },
  {
    "names": "vivan",
    "job": "writer",
    "salary": "9000",
    "id": 2
  },
  {
    "names": "twinni",
    "job": "artist",
    "salary": "10000",
    "id": 3
  },
  {
    "names": "rohan",
    "job": "painter",
    "salary": "7889",
    "id": 4
  },
  {
    "names": "arun",
    "job": "engineer",
    "salary": "8000",
    "id": 5
  }
]

let obj={
  
  "users":empData,
  "names":"",
  "job":"",
  "salary":"",
}
let editId;
//cookie
// const cookieParser=require("cookie-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.set('view engine','ejs');
app.get("/", (req,res)=>{
  res.render("index",obj)
})

// app.get("/emp",(req,res)=>{
//   res.json(empData);
// })
app.post("/emp",(req,res)=>{
  var employee = {
  id:empData.length+1,
  names : req.body.names,
  job : req.body.job,
  salary :req.body.salary,
}
console.log(employee);
empData.push(employee);
res.redirect("/")
});

app.get('/emp/edit/:id' ,(req,res)=>{
  const id=req.params.id;
  console.log(id,"get by id")
  let index=empData.findIndex(e=>Number(e.id)==Number(id));
  console.log(empData[index]);
  obj.names=empData[index].names;
  obj.job=empData[index].job;
  obj.salary=empData[index].salary;
  obj.id=id
  editId=id;
  res.redirect('/');
})

app.post('/emp/save', (req,res)=>{
  console.log(1);
  let id=editId;
  console.log(id ,"helooooooooooo")
  let index=empData.findIndex((e)=>Number(e.id)==Number(id));
    empData[index].names=req.body.names,
    empData[index].job=req.body.job,
    empData[index].salary=req.body.salary,
  clr()
  res.redirect('/')
    
  })
function clr(){
  obj.names="";
  obj.job="";
  obj.salary="";
}

app.get("/emp/:id",(req,res)=>{
  const id=req.params.id;
  console.log(id,"here")
  let newempData = empData.filter(el=>el.id!=id);
  empData = newempData;
  obj={...obj,"users":empData}
  console.log(newempData)
  console.log(empData);
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
})



