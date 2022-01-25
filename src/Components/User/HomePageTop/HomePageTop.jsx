import React from 'react';
import { Button,Dropdown } from 'react-bootstrap';
import './HomePageTop.css'

function HomePageTop() {
  return <div className='flex-container'>

<Button style={{backgroundColor:"#3FA796",border:"none",fontSize:"0.8rem"}} size="md" className='ms-4'>
     POST JOB
    </Button>
    <Button variant="primary" style={{backgroundColor:"#3FA796",border:"none",fontSize:"0.8rem"}} size="md" className='ms-4 '>
      ADD PROFILE
    </Button>

    <Dropdown className='ms-4'>
  <Dropdown.Toggle variant="success" style={{backgroundColor:"#3FA796",border:"none",fontSize:"0.8rem"}}  id="dropdown-basic">
    STATUS
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Available</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Not Available</Dropdown.Item>

  </Dropdown.Menu>
</Dropdown>

  </div>;
}

export default HomePageTop;
