import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/movie.css'

const Movie = ({data}) => {
    let genero1, genero2, genero3 = '';
    if(data.genero1!==null || data.genero1!=='') genero1 = data.genero1
    if(data.genero2!==null || data.genero2!=='') genero2 = data.genero2
    if(data.genero3!==null || data.genero3!=='') genero3 = data.genero3

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    let directory = `data:image/jpeg;base64,${arrayBufferToBase64(data.image.data)}`
    return (
        <div>
        <Link
        to= {`/movies/${data.idpelicula}/comments`}
        >   
            <div className="container" >
              
                <img src={directory} alt={data.titulo}/>
                <div style={{padding:'8px'}}>
                    <div className="title">{data.titulo}</div>
                    <div className="rate">{data.promedio.toFixed(1)}</div>
                </div>
                
            
            </div>
        </Link> 
        </div>
    )
}

export default Movie