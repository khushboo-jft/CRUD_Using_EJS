const express=require("express");
let router=express.Router();
// const app=express

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
      "id": 7
    },
    {
      "names": "arun",
      "job": "engineer",
      "salary": "8000",
      "id": 8
    }
  
  ];
  router
    .route("")
 
    .get((req,res)=>{
        res.json(empData);
    })
    .post((req,res)=>{
    const emp=req.body;
    console.log(emp);
    empData.push(emp);
    res.send("Data added")
   });

router
    .route("/:id")
    .put((req,res)=>{
    
        let emp=req.body;
        for(let i=0;i<empData.length;i++){
          if(empData[i].id==req.params.id){
            empData[i].names=emp.names;
            empData[i].job=emp.job;
            empData[i].salary=emp.salary;
            break;
          }
        }
        res.send(empData)   
    })
    .delete((req,res)=>{
        const id=req.params.id;
        let newempData = empData.filter(el=>el.id!=id);
        empData = newempData;
        res.send({
          success:true,
          message:"Delete",
        })
    })
    .get((req,res)=>{
        const id=req.params.id;
        console.log(id)
        for(let emp of empData){
            if(emp.id==Number(id)){
                res.json(emp);
                return;
            }
        }
        res.status(404).send('Data not found')
    })



module.exports=router;
  