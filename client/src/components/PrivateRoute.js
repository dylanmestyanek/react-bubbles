import React, { Component } from "react"
import { Route, Redirect } from 'react-router-dom'

// Step 1D
// Build PrivateRoute component
export const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => 
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to="/" />
    } />
}