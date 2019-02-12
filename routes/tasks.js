var express= require('express');
var router=express.Router();
var mongojs=require('mongojs');
var db=mongojs('mongodb://rohan:abcd1234@ds331145.mlab.com:31145/mytasklist',['Tasks']);

//Get all tasks
router.get('/tasks',function(req,res,next){
    db.Tasks.find(function(err,Tasks){

    if (err){
        res.send(err);
    }
    res.json(Tasks);
});
});
//get single taks
router.get('/task/:id',function(req,res,next){
    db.Tasks.findOne({_id: mongojs.ObjectID(req.params.id)},function(err,Task){

    if (err){
        res.send(err);
    }
    res.json(Task);
});
});

// Save new task

router.post('/task',function(req,res,next){
    var task=req.body;
    if (!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    else{
        db.Tasks.save(task,function(err,task){
            if (err){
                res.send(err);

            }
            res.json(task);
        });
    }

});
// Delete a task
router.delete('/task/:id',function(req,res,next){
    db.Tasks.remove({_id: mongojs.ObjectID(req.params.id)},function(err,Task){

    if (err){
        res.send(err);
    }
    res.json(Task);
});
});


module.exports=router;


