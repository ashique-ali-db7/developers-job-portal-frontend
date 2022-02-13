import React, { Fragment } from 'react'
import AdminLogin from '../../Components/Admin/AdminLogin/AdminLogin'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'


function AdminSignin() {
  return (
    <Fragment>
<AdminNavbar/>
<AdminLogin/>
    </Fragment>
  )
}

export default AdminSignin