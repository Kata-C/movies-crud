import React, {useState, useContext} from 'react';
import AuthContext from '../auth.context';
import { Link } from'react-router-dom';
import '../styles/header.css';
import {Button, Popover} from 'antd';
import { userService } from '../services/user.service';


const Header = ({setVisible, setVisibleAdding}) => {

    const auth = useContext(AuthContext);
    const showDrawer = () => {
        setVisible(true);
    };

    const showDrawerAdd = () => {
        setVisibleAdding(true);
    }

    const logout = async () => {
        auth.setUser('');
        auth.setAdmin(false);
        window.localStorage.removeItem('usuario');
        window.localStorage.removeItem('admin');
        window.localStorage.removeItem('idusuario');
        window.localStorage.removeItem('token');
        window.location = '/';
    }

 
    const contentPopOver = (<Button type='link' onClick={logout}>
        Cerrar sesión
    </Button>);


    
    let menu = () => {
        if(window.localStorage.getItem('usuario') == null || window.localStorage.getItem('admin') == null){
            console.log('localstorage' + window.localStorage.getItem('admin'))
            return (
                <div className="menu">
                    <Button type='link' className="text"><Link className="link" to="/">Películas</Link></Button>
                    <Button type="primary" onClick={showDrawer}>
                        Iniciar sesión
                    </Button>
                </div>);
        } else {
           
            if(window.localStorage.getItem('admin') == 1 ) {
                return (
                <div className="menu">
                    <Button type='link' className="text" onClick={showDrawerAdd}>Agregar peliculas</Button>
                    <Button type='link' className="text"><Link className="link" to="/" >Películas</Link></Button>
                    <Button type='link' className="text"><Popover trigger='hover' content={contentPopOver}>
                        Administrador
                    </Popover></Button>  
                </div>);
            } else if(window.localStorage.getItem('usuario') != '') {
                return (
                <div className="menu">
                    <Button type='link'className="text"><Link className="link" to="/">Películas</Link></Button>
                    <Button type='link'className="text"><Popover trigger='hover' content={contentPopOver}>
                        {window.localStorage.getItem('usuario')}
                    </Popover></Button>  
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