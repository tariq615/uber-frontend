import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Protected({ children, authentication = true }) {
    const roleStatus = useSelector((state) => state.role.status);
    const role = useSelector((state) => state.role.role);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (authentication && roleStatus !== authentication) {
            role === "captain" ? navigate('/captain-login'): navigate('/login') // user is not authenticated and having access for the pages that can be accessed by the authenticated user, eg: post, edit etc.
        } else if (!authentication && roleStatus !== authentication) {
            role === "captain" ? navigate('/captain-home'): navigate('/home') // user is authenticated and having access for the login and signup pages
        }
        setLoader(false);
    }, [navigate, roleStatus, authentication]);

    return loader ? 'loading...' : (
        <>{children}</>   // this will execute if the user is trying to access for login and signup page if user is not logged in, and if user is logged and  trying to access for its pages like post, edit etc. 
    );
}
