import React, {useEffect, useState} from 'react';
import { Link } from'react-router-dom';
import '../styles/moviestemplate.css'
import { moviesService } from '../services/movies.service';
import { Card } from 'antd';
import RatingBox from '../components/RatingBox';

const MovieTemplate = ({location}) => {

    const [comments, setComments] = useState([]);
    const [updateList, setUpdateList] = useState(false);

    let portada = location.data.portada;
    let idpelicula = location.data.idpelicula;
    let titulo = location.data.titulo;
    let descripcion = location.data.descripcion;
    let promedio = location.data.promedio;
    let genero1 = location.data.genero1;
    let genero2 = location.data.genero2;
    let genero3 = location.data.genero3;

    let img = `/images/${portada}`;


    useEffect(() => {
        getCommentsForAMovie();
    }, [updateList]);

    const getCommentsForAMovie = async () => {
        const results = await moviesService.getCommentsByMovie(idpelicula);
        setComments(results.data.results);
    }

    const loadComments = () => {
        if(comments.length>0)
            return comments.map(comment => {
                return (
                    <Card className='comment'>
                        <div className='icon-section-comment'>
                            <div className='username'>{comment.usuario}</div>
                            <div className='icon-section' style={{width:'fit-content'}}>
                                <img src='/icons/star-rate.png' className='icon' />
                                <div className='rate-template'>{comment.calificacion.toFixed(1)}</div>
                            </div>
                        </div>
                        {(comment.comentario == null || comment.comentario == "") ? <div></div> : <div className='information'>{comment.comentario}</div>}
                    </Card>
                );
            });
        else
            return <div>No hay comentarios ni calificaciones</div>
    }

    return (
    <div>
        <div className='container-movie'>
            <div className='information-section'>
                <img src={img} alt={titulo} className='img'/>
                <h1 className='title-movie'>{titulo}</h1>
                <div className='icon-section'>
                    <img src='/icons/star-rate.png' className='icon' />
                    <div className='rate-template'>{promedio.toFixed(1)}</div>

                </div>
                <p className='information'>{descripcion}</p>
                <div className='genres'>
                    {(genero1 == 0) ? <div></div> : <p className='information genre'>{genero1}</p>}
                    {(genero2 == 0) ? <div></div> : <p className='information genre'>{genero2}</p>}
                    {(genero3 == 0) ? <div></div> : <p className='information genre'>{genero3}</p>}

                </div>
            </div>
            <div className='comments-section'>
                <RatingBox movie={idpelicula} setUpdateList={setUpdateList}/>
                <div className='comment-block'>
                    <div className='title-movie title-template'>Calificaciones y opiniones</div>
                    {loadComments()}
                </div>
            </div>
        </div>
        
    </div>);

}

export default MovieTemplate;