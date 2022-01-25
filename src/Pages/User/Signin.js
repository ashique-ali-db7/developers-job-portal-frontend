import React from 'react';
import Navbars from '../../Components/User/Navbars/Navbars';
import { Container,Row,Col } from 'react-bootstrap';
import SignupDescription from '../../Components/User/SignupDescription/SignupDescription';
import SigninForm from '../../Components/User/SigninForm/SigninForm';

function Signin() {
  return <div>
     <Navbars LoggedIn={false}/>
     <Container>
        <Row>
        <Col lg={6} xs={12}><SignupDescription/></Col>
        <Col lg={6} xs={12}><SigninForm/></Col>
        </Row>
        </Container>
  </div>;
}

export default Signin;
