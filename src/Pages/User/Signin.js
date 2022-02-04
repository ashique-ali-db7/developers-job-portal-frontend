import {React,useEffect} from 'react';
import Navbars from '../../Components/User/Navbars/Navbars';
import { Container,Row,Col } from 'react-bootstrap';
import SignupDescription from '../../Components/User/SignupDescription/SignupDescription';
import SigninForm from '../../Components/User/SigninForm/SigninForm';
import { useSelector, useDispatch } from "react-redux"; //To acces state
import { update_user } from "../../Redux/user/userSlice"; ///importing action.
import { useNavigate } from "react-router-dom";


function Signin() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user.user); //in global using useSelector hook accessing color state
useEffect(() => {
  
if(user){
 navigation('/');
}
 
}, []);


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
