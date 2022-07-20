import React, { useContext } from 'react';
import AuthContext from './auth.context';
import { userService } from './services/user.service';




const SignIn = async (data) => {
    const auth = useContext(AuthContext);
    const response = await userService.login(data);
    if(response.data.success) {
        auth.setUser(response.data.usuario);
        auth.setAdmin(response.data.admin);
        window.localStorage.setItem('auth', auth);
        //window.location = '/';
    }
    return response.data.success
}

const SignUp = async (data) => {
    const response = await userService.addUser(data);
    console.log(response);
    if(response.data.success) {
        return true;
    } else return false;
    
}


export const LogInOut = {
    SignIn,
    SignUp
}