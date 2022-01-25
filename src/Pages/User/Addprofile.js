import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import AddProfileForm from '../../Components/User/AddProfileForm/AddProfileForm';
import Navbars from '../../Components/User/Navbars/Navbars';

function Addprofile() {
  return <Fragment>
<Navbars LoggedIn={true}/>
<Container>
<AddProfileForm/>
</Container>

</Fragment>;
}

export default Addprofile;
