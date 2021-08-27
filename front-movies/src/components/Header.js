import React, {useState} from 'react';
import { Link } from'react-router-dom';
import '../styles/header.css';


const Header = ({isLogged}) => {

    let menuWhenIsLogged = (<>
        <div className="text">Comentarios</div>
        <div className="text"><Link className="link" to="/login">Cerrar sesión</Link></div>
    </>);

    let menuWhenIsNotLogged = (<>
       <div className="text"><Link className="link" to="/login">Iniciar sesión</Link></div>
    </>)

    return (
        <div className="header">
            <div className="menu">
                <div className="text">Comentarios</div>
                {/* Complete here, signing out needs to manage sessions */}
                <div className="text"><Link className="link" to="/login">Iniciar sesión</Link></div>
            </div>
        </div>
    );
}

export default Header;