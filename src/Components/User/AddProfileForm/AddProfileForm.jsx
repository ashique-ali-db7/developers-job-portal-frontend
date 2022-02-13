import React, { useEffect, useState } from "react";
import "./AddProfileForm.css";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "../../Utils/Cropper";
import { useSelector, useDispatch } from "react-redux"; //To acces state
import { emailGithubVerification, profileForm } from "../../../Api/UserApi";
import { verificationImageUpload } from "../../../Api/UserApi";
import { useNavigate } from "react-router-dom";
import { update_user } from "../../../Redux/user/userSlice";

function AddProfileForm() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); //in global using useSelector hook accessing color state
  const [githubError, setGithubError] = useState("");
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
  let i = 1;
  const onSubmit = (data) => {
    emailGithubVerification(user.email, data.gitHubUsername, (result) => {
      if (result) {
   
        let formData = new FormData();
      
        formData.append("profileResulToBackend", profileResulToBackend);
        formData.append("profileResulToBackend", verificationResulToBackend);
        formData.append("skills", allSkill);
        formData.append("amount", data.amount);
        formData.append("description", data.description);
        formData.append("domain", data.domain);
        formData.append("education", data.education);
        formData.append("gitHubUsername", data.gitHubUsername);
        formData.append("hoursperweek", data.hoursperweek);
        formData.append("language", data.language);
       
        formData.append("phone", data.phone);
        formData.append("state", data.state);
        formData.append("university", data.university);
        formData.append("userId", user._id);
        profileForm(formData, (response) => {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(response));
          let user = localStorage.getItem("user");
          user = JSON.parse(user);
          dispatch(
            update_user({
              userDetails: user,
            })
          );
          //setAllSkill([]);

          navigation("/");
        });
      } else {
        setGithubError("Github user not found");
      }
    });
  };

  const skills = (e) => {
    let { value } = e.target;
    setSkillSet(value);
  };

  const skillSubmit = (e) => {
    e.preventDefault();
    setAllSkill([...allSkill, skillSet]);
  };
  const handleClose = () => setShow(false);

  const handleProfilePhotoChange = (e) => {
  
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setVerification(false);
    setShow(true);
  };

  const handleVerificationPhotoChange = (e) => {
    setVerificationImage(URL.createObjectURL(e.target.files[0]));
    setVerification(true);
    setShow(true);
  };

  const croppingFunction = async () => {
    let userId = user._id;
    if (verification) {
      userId = user._id + "verification";
    }

    let result = await getCroppedImg(image, crop, userId);
    console.log(result);
    if (verification) {
      setVerificationResulToBackend(result);
    } else {
      setProfileResulToBackend(result);
    }

    var reader = new FileReader();
    reader.readAsDataURL(result);
    reader.onloadend = function () {
      var base64data = reader.result;

      if (verification) {
        setVerificationResultShow(base64data);
      } else {
        setProfileResultShow(base64data);
      }
    };
    setShow(false);
  };


  useEffect(() => {

  user?.skills && setAllSkill([user?.skills]);
  user?.profileImage && setProfileResultShow(user?.profileImage);
  user?.verificationImage && setVerificationResultShow(user?.verificationImage)
 
    
  }, [])


  return (
    <div className="form-container me-auto ms-auto">
      <h3 className="mb-2">Complete your profile</h3>
      <Form className="form-class" onSubmit={handleSubmit(onSubmit)}>
        <Row>
       
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                defaultValue={user?.domain}
                type="text"
                placeholder="Domain"
                {...register("domain", { required: "This field is required" })}
              />
              {errors.domain && (
                <span className="error-message">This field is required</span>
              )}
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                defaultValue={user?.state}
                type="text"
                placeholder="State"
                {...register("state", { required: true })}
              />
              {errors.state && (
                <span className="error-message">This field is required</span>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
               defaultValue={user?.phone}
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
                <span className="error-message mb-1">
                  {errors.phone.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>

          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                defaultValue={user?.amount}
                type="number"
                placeholder="Amount/hour"
                {...register("amount", {
                  required: "This field is required",
                  min: { value: 100, message: "minimum 100 rupees required" },
                })}
              />
              {errors.amount ? (
                <span className="error-message mb-1">
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
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                defaultValue={user?.hoursperweek}
                type="number"
                placeholder="Hours per week"
                {...register("hoursperweek", {
                  required: "This field is required",
                  max: { value: 168, message: "Maximum 168 hours" },
                  min: { value: 20, message: "minimum 20 hours required" },
                })}
              />
              {errors.hoursperweek ? (
                <span className="error-message mb-1">
                  {errors.hoursperweek.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>

          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                defaultValue={user?.language}
                type="text"
                placeholder="Language"
                {...register("language", {
                  required: "This field is required",
                })}
              />
              {errors.language ? (
                <span className="error-message mb-1">
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
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                defaultValue={user?.education}
                type="text"
                placeholder="Education qualification"
                {...register("education", {
                  required: "This field is required",
                })}
              />
              {errors.education ? (
                <span className="error-message mb-1">
                  {errors.education.message}
                </span>
              ) : (
                ""
              )}
            </Form.Group>
          </Col>
          <Col lg={6} md={6} xs={12}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Control
                defaultValue={user?.university}
                type="text"
                placeholder="University"
                {...register("university", {
                  required: "This field is required",
                })}
              />
              {errors.university ? (
                <span className="error-message mb-1">
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
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
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

        <div className="mb-2 flexwrap-container">
          {allSkill.map((element) => {
            return (
              <div
                key={i++}
                className="me-2 mt-1 "
                style={{
                  backgroundColor: "#3FA796",
                  display: "inline-block",
                  padding: "1%",
                  color: "#fff",
                }}
              >
                {element}
              </div>
            );
          })}
        </div>

        <Row>
          <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
            <Form.Label>About your self</Form.Label>
            <Form.Control
              defaultValue={user?.description}
              as="textarea"
              rows={5}
              {...register("description", {
                required: "This field is required",
              })}
            />
            {errors.description ? (
              <span className="error-message mb-1">
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
                <img
                  src={profileResultShow}
                  alt=""
                  className="img-fluid crop-img"
                />
              </div>
            )}

            <Form.Group controlId="formFile" className="mb-2">
              <Form.Label>Profile photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
              />
            </Form.Group>
          </Col>

       {user?.description?  "" :<Col lg={6} md={6} xs={12}>
            {verificationResultShow && (
              <div className="mb-2 crop-img">
                <img
                  src={verificationResultShow}
                  alt=""
                  className="img-fluid crop-img"
                />
              </div>
            )}

            <Form.Group controlId="formFile" className="mb-2">
              <Form.Label>Verification id</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleVerificationPhotoChange}
              />
            </Form.Group>
          </Col>}
        </Row>
        <Row>
          <Col lg={6} md={6} xs={12}>
            <Form.Group
              className="mt-2 mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
               defaultValue={user?.gitHubUsername}
                type="text"
                placeholder="Github user name"
                {...register("gitHubUsername", {
                  required: "This field is required",
                })}
              />
              {errors.gitHubUsername ? (
                <span className="error-message mb-1">
                  {errors.gitHubUsername.message}
                </span>
              ) : (
                ""
              )}
              {githubError && (
                <span className="error-message mb-1">{githubError}</span>
              )}
            </Form.Group>
          </Col>
        </Row>

        <div className=" submit-btn-div">
          <Button
            variant="primary"
            className="submit-btn"
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>

      <Modal show={show} onHide={handleClose} className="">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {verification ? (
            <ReactCrop
              className=""
              src={verificationImage}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
            />
          ) : (
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
