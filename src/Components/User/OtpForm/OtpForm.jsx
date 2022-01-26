import React from 'react';
import {Form} from 'react-bootstrap'
import './OtpForm.css'

function OtpForm() {
  return <div className='otpcontiner me-auto ms-auto'>

      <h6 >OTP VERIFICATION</h6>
     
      <Form.Control size="sm" type="number" name="otpnumber" placeholder="ENTER OTP"/>
  <br />
  <p>There might be some delay in receiving the OTP due to heavy traffic</p>
<button style={{fontSize:"0.8rem"}}>VERIFY AND PROCEED</button>
  </div>;
}

export default OtpForm;
