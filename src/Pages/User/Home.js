import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import HomePageTop from "../../Components/User/HomePageTop/HomePageTop";
import Navbars from "../../Components/User/Navbars/Navbars";

function Home() {
  return (
    <Fragment>
      <Navbars LoggedIn={true} />
      <Container>
        <HomePageTop />
      </Container>
    </Fragment>
  );
}

export default Home;
