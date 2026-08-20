const express=require('express')
const cors=require('cors')
require('dotenv').config()
const mongoose=require('mongoose')
const Patient=require('./models/Patient')
const Doctor=require('./models/Doctor')
const Appointment=require('./models/Appointment')

const app=express()
const PORT=process.env.PORT||5001

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.log('MongoDB connection error:',err.message))

const requestLogger=(req,res,next)=>{
  console.log(`[${req.method}] ${req.path} [${new Date().toISOString()}]`)
  next()
}

app.use(requestLogger)

let doctors=[
  {id:1,name:'Dr.Hetvi',specialisation:'Cardiology',available:true},
  {id:2,name:'Dr Shailja',specialisation:'Orthopedics',available:false},
  {id:3,name:'Dr.Tanya',specialisation:'Dermatology',available:true}
]

let appointments=[]

app.get('/api/v1/doctors',(req,res)=>{
  res.status(200).json(doctors)
})

app.get('/api/v1/appointments',(req,res)=>{
  res.status(200).json(appointments)
})

app.post('/api/v1/appointments',(req,res)=>{
  const {patientName,doctorName,date,timeSlot,status,reason}=req.body

  if(!patientName||!doctorName||!date||!timeSlot){
    return res.status(400).json({
      success:false,
      message:'Missing required appointment fields'
    })
  }

  const newAppointment={
    id:appointments.length+1,
    patientName,
    doctorName,
    date,
    timeSlot,
    status:status||'pending',
    reason:reason||''
  }

  appointments.push(newAppointment)
  res.status(201).json(newAppointment)
})

app.post('/api/v1/test/patient-success',async(req,res)=>{
  try{
    const patient=new Patient({
      name:'Test Patient',
      email:`test${Date.now()}@example.com`,
      phone:'9998887777',
      bloodGroup:'O+',
      age:25
    })
    const saved=await patient.save()
    res.status(201).json({success:true,data:saved})
  }catch(err){
    res.status(400).json({success:false,message:err.message})
  }
})

app.post('/api/v1/test/patient-fail',async(req,res)=>{
  try{
    const patient=new Patient({
      name:'Invalid Patient',
      email:`fail${Date.now()}@example.com`,
      bloodGroup:'Z+',
      age:30
    })
    const saved=await patient.save()
    res.status(201).json({success:true,data:saved})
  }catch(err){
    res.status(400).json({success:false,message:'Validation failed: '+err.message})
  }
})

app.post('/api/v1/test/doctor-success',async(req,res)=>{
  try{
    const doctor=new Doctor({
      name:'Dr. Hetvi Sardhara',
      email:'hetvi.doc@example.com',
      specialisation:'Cardiology',
      available:true
    })
    const saved=await doctor.save()
    res.status(201).json({success:true,data:saved})
  }catch(err){
    res.status(400).json({success:false,message:err.message})
  }
})

app.post('/api/v1/test/appointment-success',async(req,res)=>{
  try{
    const patient=await Patient.findOne()
    const doctor=await Doctor.findOne()

    const appointment=new Appointment({
      patientId:patient?._id,
      doctorId:doctor?._id,
      date:'2026-08-25',
      timeSlot:'10:00 AM',
      reason:'Routine checkup'
    })
    const saved=await appointment.save()
    res.status(201).json({success:true,data:saved})
  }catch(err){
    res.status(400).json({success:false,message:err.message})
  }
})

app.post('/api/v1/test/appointment-fail',async(req,res)=>{
  try{
    const longReason='x'.repeat(350)
    const appointment=new Appointment({
      date:'2026-08-26',
      timeSlot:'2:00 PM',
      reason:longReason
    })
    const saved=await appointment.save()
    res.status(201).json({success:true,data:saved})
  }catch(err){
    res.status(400).json({success:false,message:'Validation failed: '+err.message})
  }
})

app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:'Route not found'
  })
})

app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(500).json({
    success:false,
    message:'Something went wrong on the server'
  })
})

app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`)
})