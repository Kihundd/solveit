import React from 'react'
import Appbar from '../components/home/Appbar'
import Setting from '../components/admin/Setting'
import Report from '../components/admin/Report'
import App from '../App'
import { Outlet } from 'react-router-dom'

function Admin() {
    return (
        <div>
            <Appbar />
            <Setting />
        </div>
    )
}

export default Admin
