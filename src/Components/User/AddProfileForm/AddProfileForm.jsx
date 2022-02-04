import React, { useEffect, useState } from "react";
import "./AddProfileForm.css";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "../../Utils/Cropper";
import { useSelector, useDispatch } from "react-redux"; //To acces state

function AddProfileForm() {
  const user = useSelector((state) => state.user.user); //in global using useSelector hook accessing color state

  const [skillSet, setSkillSet] = useState("");
  const [allSkill, setAllSkill] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [verificationImage, setVerificationImage] = useState(null);
  const [verification, setVerification] = useState(null);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [profileResultShow, setProfileResultShow] = useState(null);
  const [profileResulToBackend, setProfileResulToBackend] = useState(null);
  const [verificationResultShow, setVerificationResultShow] = useState(null);
  const [verificationResulToBackend, setVerificationResulToBackend] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data.proof[0]);
  };

  const skills = (e) => {
    let { value } = e.target;
    setSkillSet(value);
  };

  const skillSubmit = (e) => {
    e.preventDefault();
    setAllSkill([...allSkill, skillSet]);
    console.log(allSkill);
  };
  const handleClose = () => setShow(false);

  const handleProfilePhotoChange = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setVerification(false)
    setShow(true);
  };

  const handleVerificationPhotoChange = (e) =>{
    setVerificationImage(URL.createObjectURL(e.target.files[0]))
    setVerification(true)
    setShow(true);
  }

  const croppingFunction = async () => {
    let userId = user._id;
if(verification){
userId = user._id+"verification"
}

    let result = await getCroppedImg(image, crop, userId);

    if(verification){
      setVerificationResulToBackend(result)
    }else{
      setProfileResulToBackend(result);
    }
  
    var reader = new FileReader();
reader.readAsDataURL(result); 
reader.onloadend = function() {
  var base64data = reader.result;  
               
  if(verification){
    setVerificationResultShow(base64data)
  }else{
    setProfileResultShow(base64data);
  }
 
}
    setShow(false);
  };

  return (
    <div className="formcontainer me-auto ms-auto">
      <h1></h1>
      <Form className="formclass" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                className="mb-1"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="errorMessage">This field is required</span>
              )}
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="State"
                {...register("state", { required: true })}
              />
              {errors.state && (
                <span className="errorMessage">This field is required</span>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Domain"
                {...register("domain", { required: "This field is required" })}
              />
              {errors.domain && (
                <span className="errorMessage">This field is required</span>
              )}
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Amount/hour"
                {...register("amount", {
                  required: "This field is required",
                  min: { value: 100, message: "minimum 100 rupees required" },
                })}
              />
              {errors.amount ? (
                <span className="errorMessage mb-1">
                  {errors.amount.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Hours per week"
                {...register("hoursperweek", {
                  required: "This field is required",
                  max: { value: 168, message: "Maximum 168 hours" },
                  min: { value: 20, message: "minimum 20 hours required" },
                })}
              />
              {errors.hoursperweek ? (
                <span className="errorMessage mb-1">
                  {errors.hoursperweek.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>

          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Language"
                {...register("language", {
                  required: "This field is required",
                })}
              />
              {errors.language ? (
                <span className="errorMessage mb-1">
                  {errors.language.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Education qualification"
                {...register("education", {
                  required: "This field is required",
                })}
              />
              {errors.education ? (
                <span className="errorMessage mb-1">
                  {errors.education.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="University"
                {...register("university", {
                  required: "This field is required",
                })}
              />
              {errors.university ? (
                <span className="errorMessage mb-1">
                  {errors.university.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Phone number"
                {...register("phone", {
                  required: "This field is required",
                  maxLength: { value: 10, message: "Enter only 10 digits" },
                  minLength: {
                    value: 10,
                    message: "minimum 10 digits required",
                  },
                })}
              />
              {errors.phone ? (
                <span className="errorMessage mb-1">
                  {errors.phone.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Github user name"
                {...register("gitHubUsername", {
                  required: "This field is required",
                })}
              />
              {errors.gitHubUsername ? (
                <span className="errorMessage mb-1">
                  {errors.gitHubUsername.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                onChange={skills}
                placeholder="Skills"
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={6}>
            <button
              onClick={skillSubmit}
              style={{
                border: "none",
                backgroundColor: "white",
                marginTop: "0px",
                padding: "2%",
                width: "35px",

                border: "1px solid grey",
              }}
            >
              +
            </button>
          </Col>
        </Row>

        <div className="mb-4 flexwrap-container">
          {allSkill.map((element) => {
            return (
              <div
                style={{
                  backgroundColor: "#3FA796",
                  display: "inline-block",
                  padding: "1%",
                  color: "#fff",
                }}
                className="me-2 mt-1"
              >
                {element}
              </div>
            );
          })}
        </div>

        <Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>About your self</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              {...register("description", {
                required: "This field is required",
              })}
            />
            {errors.description ? (
              <span className="errorMessage mb-1">
                {errors.description.message}
              </span>
            ) : (
              ""
            )}
          </Form.Group>
        </Row>

        <Row>
          <Col lg={6} md={6} xs={12}>
          {profileResultShow && (
              <div className="mb-2 ">
                <img src={profileResultShow} alt="" className="img-fluid crop-img" />
              </div>
            )}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
              />
            </Form.Group>
           
          </Col>

          <Col lg={6} md={6} xs={12}>
          
          {verificationResultShow && (
              <div className="mb-2 crop-img">
                <img src={verificationResultShow} alt="" className="img-fluid crop-img" />
              </div>
            )}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                Verification id (passport/aadhar/voter id)
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleVerificationPhotoChange}
              />
             
            </Form.Group>
          </Col>
        </Row>
        <div className=" submitBtnDiv">
          <Button
            variant="primary"
            className="submitBtn"
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {verification ? (
            <ReactCrop
              src={verificationImage}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
            />
          ):(
            <ReactCrop
              src={profileImage}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={croppingFunction}>
            Crop
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProfileForm;
