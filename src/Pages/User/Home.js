import React, { Fragment } from 'react';
import HomePageTop from '../../Components/User/HomePageTop/HomePageTop';
import Navbars from '../../Components/User/Navbars/Navbars';


function Home() {
  return <Fragment>
<Navbars LoggedIn={true}/>

<HomePageTop/>

  </Fragment>;
}

export default Home;
