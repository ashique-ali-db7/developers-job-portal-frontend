import React from 'react';
import { Button,Dropdown } from 'react-bootstrap';
import './HomePageTop.css'

function HomePageTop() {
  return <div className='flex-container'>

<Button style={{backgroundColor:"#C84B31",border:"none"}} size="md" className='ms-4'>
     POST JOB
    </Button>
    <Button variant="primary" size="md" className='ms-4'>
      Large button
    </Button>

    <Dropdown className='ms-4'>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

  </div>;
}

export default HomePageTop;
