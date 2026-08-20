function AppointmentCard({patientName,doctorName,date,timeSlot,status}){
  const getStatusClass=()=>{
    if(status==='confirmed') return 'status confirmed'
    if(status==='cancelled') return 'status cancelled'
    return 'status pending'
  }
  return (
    <div className="appointment-card">
      <p><strong>Patient:</strong> {patientName}</p>
      <p><strong>Doctor:</strong> {doctorName}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time Slot:</strong> {timeSlot}</p>
      <p className={getStatusClass()}>{status}</p>
    </div>
  )
}
export default AppointmentCard