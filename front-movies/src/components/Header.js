import React, {useState} from 'react';
import { Link } from'react-router-dom';
import '../styles/header.css';
import {Button} from 'antd';


const Header = ({isLogged, visible, setVisible}) => {

    const showDrawer = () => {
        setVisible(true);
    };


    let menuWhenIsLogged = (<>
        <div className="text">Películas</div>
        <div className="text"><Link className="link" to="/login">Cerrar sesión</Link></div>
    </>);

    let menuWhenIsNotLogged = (<>
       <div className="text"><Link className="link" to="/login">Iniciar sesión</Link></div>
    </>)

    return (
        <div className="header">
            <div className="menu">
                {/* <ul>
                    <li className="text">
                        <Link className="link" to="/movies/comments">Comentarios</Link>
                    </li>
                    <li className="text">
                        <Button type="primary" onClick={showDrawer}>
                            Iniciar sesión
                        </Button>
                    </li>
                </ul> */}
                
                <div className="text"><Link className="link" to="/">Películas</Link></div>
                {/* Complete here, signing out needs to manage sessions */}
                <Button type="primary" onClick={showDrawer}>
                    Iniciar sesión
                </Button>
            </div>
        </div>
    );
}

export default Header;