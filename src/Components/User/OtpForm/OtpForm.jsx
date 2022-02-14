import { React, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./OtpForm.css";
import { Link, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
const axios = require("axios");

function OtpForm() {
  const navigation = useNavigate();
  const [otpNumber, setOtpNumber] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [resend, setResend] = useState({ resendTime: Date.now() + 4000 });
  const [rese, setRese] = useState(true);
  const [invalidOtp, setInvalidOtp] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtpNumber({ [name]: value });
  };

  const resendOtp = () => {
    setResend({ ...resend, resendTime: Date.now() + 4000 });
  };

  const Completionist = () => (
    <button
      style={{
        width: "60px",
        fontSize: "0.7rem",
        marginTop: "5px",
        backgroundColor: "grey",
      }}
      onClick={resendOtp}
    >
      Resend
    </button>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(otpNumber));
    setSubmit(true);
  };

  const validate = (otpNumber) => {
    const errors = {};
    if (!otpNumber.otpnumber) {
      errors.otpError = "This field is required";
    }
    return errors;
  };

  useEffect(async () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        let { data } = await axios.post("/otpVerification", otpNumber, config);

        setSubmit(false);
        navigation("/signin");
      } catch (error) {
        console.log(error.response.data.message);
        setInvalidOtp(error.response.data.message);
        setSubmit(false);
      }
    }
    setSubmit(false);
  }, [isSubmit]);

  useEffect(() => {
    navigation("/otp");
  }, [resend]);

  return (
    <div className="otp-continer me-auto ms-auto">
      <form onSubmit={handleSubmit}>
        <h6>OTP VERIFICATION</h6>
        <p style={{ fontSize: "0.8rem" }}>
          Otp verification code is sent to your gmail
        </p>
        <Form.Control
          size="sm"
          type="number"
          onChange={handleChange}
          name="otpnumber"
          placeholder="ENTER OTP"
        />
        {formErrors.otpError && (
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--red)" }}>
              {formErrors.otpError}
            </p>
          </div>
        )}

        {invalidOtp && (
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--red)" }}>{invalidOtp}</p>
          </div>
        )}
        {/* <Countdown date={resend.resendTime}>
      <Completionist />
    </Countdown> */}
        <br />
        <p>
          There might be some delay in receiving the OTP due to heavy traffic
        </p>
        <button style={{ fontSize: "0.8rem" }}>VERIFY AND PROCEED</button>
      </form>
    </div>
  );
}

export default OtpForm;
