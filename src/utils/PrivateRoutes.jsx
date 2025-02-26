import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth()

    if(loading) {
       return<div>Loading ...</div>
    }

    return user ? children : <Navigate to="/login" />
}

export default PrivateRoutes