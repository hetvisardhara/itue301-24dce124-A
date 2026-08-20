import {useState} from 'react'

function BookingPage(){
  const [formData,setFormData]=useState({
    patientName:'',
    doctorName:'',
    date:'',
    timeSlot:''
  })

  const [selectedDoctor,setSelectedDoctor]=useState('')

  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
    if(name==='doctorName'){
      setSelectedDoctor(value)
    }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log('Booking submitted:',formData)
  }

  return (
    <div className="page">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name</label>
          <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required/>
        </div>
        <div>
          <label>Doctor Name</label>
          <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} required/>
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required/>
        </div>
        <div>
          <label>Time Slot</label>
          <input type="text" name="timeSlot" placeholder="e.g. 10:00 AM" value={formData.timeSlot} onChange={handleChange} required/>
        </div>
        <button type="submit">Book Appointment</button>
      </form>

      {formData.patientName && <p>Booking for: {formData.patientName}</p>}
      {selectedDoctor && <p>Selected Doctor: {selectedDoctor}</p>}
    </div>
  )
}

export default BookingPage