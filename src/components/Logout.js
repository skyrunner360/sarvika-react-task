import React from 'react'
import { Link } from 'react-router-dom'

export default function Logout() {
    // A small and simple component to Logout
    return (
        <div>
            <Link to="/" className="btn btn-danger" >Logout</Link>
        </div>
    )
}
