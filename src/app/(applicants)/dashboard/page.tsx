import { logoutUserAction } from "@/src/features/auth/server/auth.actions"
import React from "react"

const ApplicantDashboard = () =>{
    return (
    <div>
       <h1>
        Hello Applicant Dashboard
       </h1>
             <button onClick = {logoutUserAction}>Logout</button>
    </div>
    )
}


export default ApplicantDashboard