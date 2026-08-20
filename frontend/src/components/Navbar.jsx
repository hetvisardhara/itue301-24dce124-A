import {Link} from 'react-router-dom'
function Navbar(){
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/booking">Booking</Link>
    </nav>
  )
}
export default Navbar