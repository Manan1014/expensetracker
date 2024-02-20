import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Navbar() {
   const navigate = useNavigate();
   const item = localStorage.getItem('authToken');
   
  function logout(e){
    e.preventDefault();
    localStorage.removeItem("authToken");
    window.location.reload(true);
  }
  function signup(e){
    e.preventDefault();
    navigate('/signup')
  }
  function login(e){
    e.preventDefault();
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/about">about</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Contact us</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        {item ? (<button className="btn mx-2 bg-white " onClick={logout}>Logout</button>):( <><button className="btn m-2 bg-white m-2" onClick={signup}>SignUp</button>
       <button className="btn m-2 bg-white" onClick={login}>Login</button></>) }
      
      </form>
    </div>
  </div>
</nav>
        <div>{item ? "you are login successfully" : "please login for activity"}</div>
    </div>
  )
}

export default Navbar
