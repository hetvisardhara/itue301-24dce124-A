import AppointmentCard from '../components/AppointmentCard'

function HomePage(){
  return (
    <div className="page">
      <h1>MedCare Plus</h1>
      <p>Welcome to the Hospital Appointment System. Book appointments with our doctors easily.</p>

      <AppointmentCard patientName="Hetvi" doctorName="Dr. Tanya" date="2026-08-26" timeSlot="11:00 AM" status="confirmed"/>
      <AppointmentCard patientName="Drashti" doctorName="Dr. Shailja" date="2026-08-27" timeSlot="2:00 PM" status="pending"/>
      <AppointmentCard patientName="Rahul" doctorName="Dr. Hetvi" date="2026-08-28" timeSlot="4:00 PM" status="cancelled"/>
    </div>
  )
}

export default HomePage