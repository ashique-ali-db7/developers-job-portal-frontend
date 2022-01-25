import React,{useEffect} from 'react';
import Navbars from '../../Components/User/Navbars/Navbars';
import SignupDescription from '../../Components/User/SignupDescription/SignupDescription';
import { Container,Row,Col } from 'react-bootstrap';
import SignupForm from '../../Components/User/SignupForm/SignupForm';


function Signup(){
    return(
        <div>
        <Navbars LoggedIn={false}/>
        <Container>
        <Row>
            <Col lg={6} xs={12}><SignupDescription/></Col>
            <Col lg={6} xs={12}><SignupForm/></Col>
        </Row>
        </Container>
        </div>
        
    )
}

export default Signup;