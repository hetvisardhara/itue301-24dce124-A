const express=require('express')
const cors=require('cors')

const app=express()
const PORT=5001

app.use(cors())
app.use(express.json())

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