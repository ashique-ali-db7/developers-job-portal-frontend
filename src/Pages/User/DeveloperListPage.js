import React, { Fragment } from 'react'
import { Container,Card } from 'react-bootstrap'
import DeveloperList from '../../Components/User/DeveloperList/DeveloperList'
import Navbars from '../../Components/User/Navbars/Navbars'
import SearchBarCard from '../../Components/User/SearchBarCard/SearchBarCard'


function DeveloperListPage() {
  return (
   <Fragment>
      <Navbars LoggedIn = {true}/>
      <Container>
     <SearchBarCard/>
     <DeveloperList/>
      </Container>
   </Fragment>
  )
}

export default DeveloperListPage