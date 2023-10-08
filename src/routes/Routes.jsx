import React from "react"
import {Route, Routes} from "react-router-dom"
import EmployeeForm from "../components/Form/Form"
import ListPage from "../components/ListPage/ListPage"

function AppRoutes(){

    return(
        <>
            <Routes>
                <Route exact path="/" element={<ListPage/> } />
                <Route path="/add-employees" element={<EmployeeForm/> } /> 
            </Routes>
        </>
    )
}

export default AppRoutes