const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const getAll = asyncWrapper (async (req,res)=>{
    
      const tasks = await Task.find({})
      res.status(201).json({ tasks }) 

    })
const getTask = asyncWrapper ( async (req,res,next) => {
  
    const {id:taskId} = req.params
    const task = await Task.findOne({_id: taskId})
    if(!task){
      return next(createCustomError(`No task with id: ${taskId}`,404))
      
    }
    res.status(200).json({task})
})
const createTask = asyncWrapper(async (req,res) => {
  
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  
})

const stuffDelete = asyncWrapper( async (req,res,next) => {
 
    const {id:taskId} = req.params
    const task = await Task.findOneAndDelete({_id:taskId})
   
    if(!task){
      return next(createCustomError(`No task with id: ${taskId}`,404))
    }
    res.status(200).json({task})
 
  
})
const doUpdate = asyncWrapper(async (req,res,next)=>{
  
    const {id:taskId}=req.params
    const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
      new:true,
      runValidators:true
    })
    if(!task){
      return next(createCustomError(`No task with id: ${taskId}`,404))
    }
    res.status(200).json({task})
   
})

module.exports={
    getAll,
    createTask,
    doUpdate,
    stuffDelete,
    getTask
}