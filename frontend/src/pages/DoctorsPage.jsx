import {useState,useEffect} from 'react'

function DoctorsPage(){
  const [doctors,setDoctors]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  useEffect(()=>{
    const fetchDoctors=async()=>{
      try{
        const res=await fetch('http://localhost:5001/api/v1/doctors')
        if(!res.ok){
          throw new Error('Failed to fetch doctors')
        }
        const data=await res.json()
        setDoctors(data)
      }catch(err){
        setError(err.message)
      }finally{
        setLoading(false)
      }
    }
    fetchDoctors()
  },[])

  if(loading){
    return <div className="page"><p>Loading doctors...</p></div>
  }

  if(error){
    return <div className="page"><p>Error: {error}</p></div>
  }

  return (
    <div className="page">
      <h1>Our Doctors</h1>
      {doctors.map(doc=>(
        <div key={doc.id} className="appointment-card">
          <p><strong>Name:</strong> {doc.name}</p>
          <p><strong>Specialisation:</strong> {doc.specialisation}</p>
          <p><strong>Available:</strong> {doc.available ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  )
}

export default DoctorsPage