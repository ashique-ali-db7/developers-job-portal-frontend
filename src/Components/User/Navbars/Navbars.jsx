import React from "react";
import './Navbars.css';
// import { useNavigate} from "react-router-dom";
import {Nav,Container,NavDropdown,Navbar} from "react-bootstrap";
import { FaUserCircle } from 'react-icons/fa';

function Navbars(props){
    // const navigation = useNavigate();
    let headerLinks = props.LoggedIn;
return(
    <Navbar className="navabar" expand="lg" >

    <Navbar.Brand href="#home" className="ms-5" style={{color:"#3FA796"}}>DeveloperHub</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  {headerLinks && <Nav className="ms-auto">
        <Nav.Link href="#home" className="">Jobs</Nav.Link>
        <Nav.Link href="#link" className="">Developers</Nav.Link>
        <Nav.Link href="#link" className="">Requests</Nav.Link>
        <Nav.Link href="#link" className="">Messages</Nav.Link>
       
        <NavDropdown className="dropdown" title={<span className=""><FaUserCircle/></span>}  id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1" >Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
    
        <Nav.Link href="#link" className=""><span style={{fontSize:"0.8rem"}}>Support</span> </Nav.Link>
        
        <Nav.Link href="#link" className=""><span style={{fontSize:"0.8rem"}}>Try premium</span> </Nav.Link>
      </Nav>}
    </Navbar.Collapse>

</Navbar>

)
}

export default Navbars;