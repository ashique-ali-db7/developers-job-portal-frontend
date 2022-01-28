import React, { useEffect } from 'react';
import './AddProfileForm.css'
import {Form,Row,Col} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux"//To acces state 
function AddProfileForm() {

 
    const username = useSelector(state => state.user.user) //in global using useSelector hook accessing color stata



 
  return <div className='formcontainer me-auto ms-auto'>
    <h1></h1>
 <Form className='formclass'>

 <Row>
 <Col lg={6} md={6} xs={12}><Form.Group className="mb-5"  controlId="exampleForm.ControlInput1">
  
    <Form.Control type="text" placeholder="Name"  />
  </Form.Group>
  </Col>
  <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="text" placeholder="State" />
  </Form.Group>
  </Col>
 </Row>




 <Row>
 <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="text" placeholder="Domain" />
  </Form.Group>
  </Col>
  <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="number" placeholder="Amount/hour" />
  </Form.Group>
  </Col>
 </Row>



 <Row>
 <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="number" placeholder="Hours per week" />
  </Form.Group>
  </Col>
  <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="text" placeholder="Languages" />
  </Form.Group>
  </Col>
 </Row>

 <Row>
 <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="text" placeholder="Education qualification" />
  </Form.Group>
  </Col>
  <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="text" placeholder="University" />
  </Form.Group>
  </Col>
 </Row>


 <Row>
 <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="email" placeholder="Email" />
  </Form.Group>
  </Col>
  <Col lg={6} md={6} xs={12}><Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="number" placeholder="age" />
  </Form.Group>
  </Col>
 </Row>


 <Row>
 <Col lg={6} md={6} xs={12}><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  
    <Form.Control type="text" placeholder="Skills" />
  </Form.Group>
  </Col>
  <Col lg={6} md={6} xs={6}>
    <button style={{border:"none",backgroundColor:"white",marginTop:"0px",padding:"2%",width:"35px",border:"1px solid grey"}}>+</button>
</Col>
 
 </Row>




   <div className='mb-4 flexwrap-container'>

<div style={{backgroundColor:"#99A799",display: "inline-block",padding:"1%"}} className='me-2 mt-1'>dsdsdfsdf</div>

   </div>



   <Row>
  
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>About your self</Form.Label>
    <Form.Control as="textarea" rows={5} />
  </Form.Group>

  </Row>


  <Row>
  <Col lg={6} md={6} xs={12}>
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Profile photo</Form.Label>
    <Form.Control type="file" />
  </Form.Group>
  </Col>

  <Col lg={6} md={6} xs={12}>
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Verification id (passport/aadhar/voter id)</Form.Label>
    <Form.Control type="file" />
  </Form.Group>
  </Col>
  </Row>

</Form>
  </div>;
}

export default AddProfileForm;
