import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Navbars from '../../Components/User/Navbars/Navbars';
import OtpForm from '../../Components/User/OtpForm/OtpForm';
function EmailOtp() {
  return <Fragment>
       <Navbars LoggedIn={false}/>
     
       <OtpForm />
     
  </Fragment>;
}

export default EmailOtp;
