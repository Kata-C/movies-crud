import React, {useState, useContext} from 'react';
import AuthContext from '../auth.context';
import { Link } from'react-router-dom';
import '../styles/header.css';
import {Button, Popover} from 'antd';
import { userService } from '../services/user.service';


const Header = ({isLogged, setVisible, setVisibleAdding}) => {

    const auth = useContext(AuthContext);
    const showDrawer = () => {
        setVisible(true);
    };

    const showDrawerAdd = () => {
        setVisibleAdding(true);
    }

    const logout = async () => {
        const response = await userService.logout();
        if(response.data.success) {
            auth.setUser('');
            auth.setAdmin(false);
            //window.localStorage.removeItem('auth');
            window.localStorage.removeItem('usuario');
            window.localStorage.removeItem('admin');
            window.localStorage.removeItem('idusuario');
            window.localStorage.removeItem('token');
            window.location = '/';
        }
    }

 
    const contentPopOver = (<Button type='link' onClick={logout}>
        Cerrar sesión
    </Button>);


    
    let menu = () => {
        if(window.localStorage.getItem('usuario') == null || window.localStorage.getItem('admin') == null){
            return (
                <div className="menu">
                    <div className="text"><Link className="link" to="/">Películas</Link></div>
                    <Button type="primary" onClick={showDrawer}>
                        Iniciar sesión
                    </Button>
                </div>);
        } else {
            if(window.localStorage.getItem('admin') === true) {
                return (
                <div className="menu">
                    <div className="text" onClick={showDrawerAdd}>Agregar peliculas</div>
                    <div className="text"><Link className="link" to="/" >Películas</Link></div>
                    <div className="text"><Popover trigger='hover' content={contentPopOver}>
                        Administrador
                    </Popover></div>  
                </div>);
            } else if(window.localStorage.getItem('usuario') != '') {
                console.log('entró al if de usuario')
                return (
                <div className="menu">
                    <div className="text"><Link className="link" to="/">Películas</Link></div>
                    <div className="text"><Popover trigger='hover' content={contentPopOver}>
                        {window.localStorage.getItem('usuario')}
                    </Popover></div>  
                </div>);
            } 
        }
    };

    return (
        <div className="header">
           {menu()}
        </div>
    );
}

export default Header;