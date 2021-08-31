import React, {useEffect, useState} from 'react';
import { Link, useParams } from'react-router-dom';
import '../styles/moviestemplate.css'
import { moviesService } from '../services/movies.service';
import { Button, Card, Modal, message } from 'antd';
import RatingBox from '../components/RatingBox';
import DrawerEdit from '../components/DrawerEdit';
import Rate from '../components/Rate';

const MovieTemplate = () => {

    const [comments, setComments] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleDrawer, setVisibleDrawer] = useState(false);
    const [movie, setMovie] = useState({});
    const [img, setImg] = useState('');

    let { id } = useParams();
   
    
    useEffect(() => {
        getMovieById();
        getCommentsForAMovie();
        //let img = movie.length > 0? arrayBufferToBase64(movie.image.data) : '';
    }, [updateList]);

    const success = () => {
        message.success('Se eliminó correctamente');
    };

    const error = () => {
        message.error('Ha ocurrido un error');
    }

    const showModal = () => {
        setVisibleModal(true);
    }

    const hideModal = () => {
        setVisibleModal(false);
    }

    const showDrawer = () => {
        setVisibleDrawer(true);
    }

    const hideDrawer = () => {
        setVisibleDrawer(false);
    }


    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return   `data:image/jpeg;base64,${window.btoa(binary)}`;
    };

    
  

    const showButtons = () => {
        if(window.localStorage.getItem('admin') == 1) 
            return (
                <div className='button-section'>
                    <Button type="link" className='button' onClick={showDrawer}>Editar</Button>
                    <Button type="link" className='button' onClick={showModal}>Eliminar</Button>
                </div>
            );
        else 
            return <div></div>
    }

    const deleteMovie = async () => {
        const response = await moviesService.deleteMovie(id);
        if(response.data.results.success) {
            setTimeout(() => {
                window.location = '/';
            }, 200)    
            success();
            hideModal();
        }
    }


    const getCommentsForAMovie = async () => {
        const results = await moviesService.getCommentsByMovie(id);
        setComments(results.data.results.results);
        setUpdateList(false);
    }

    const getMovieById = async () => {
        const results = await moviesService.getMovieById(id);
        if(results.data.success) { 
            setMovie(results.data.results[0]);
            if(results.data.results.length > 0) 
                setImg(arrayBufferToBase64(results.data.results[0].image.data))
        }
        else error();
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
        <DrawerEdit visible={visibleDrawer} onClose={hideDrawer} movie={movie}/>
        <div className='container-movie'>
            <div className='information-section'>
                <div className='movie-information'> 
                    {showButtons()}
                    <Modal
                        title="Eliminar película"
                        visible={visibleModal}
                        onOk={deleteMovie}
                        onCancel={hideModal}
                        okText="Confirmar"
                        cancelText="Cancelar"
                        >
                        <p>¿Estás seguro de que quieres eliminar esta pelicula?</p>
                    </Modal>
                    <img src={img} alt={movie.titulo} className='img'/>
                    <h1 className='title-movie'>{movie.titulo}</h1>
                    <div className='icon-section'>
                        <div className='rate-template'>{movie.promedio != null ? movie.promedio.toFixed(1) : ''}</div>

                    </div>
                    <p className='information'>{movie.descripcion}</p>
                    <div className='genres'>
                        {(movie.genero1 == null || movie.genero1 == '') ? <div></div> : <p className='information genre'>{movie.genero1}</p>}
                        {(movie.genero2 == null || movie.genero2 == '') ? <div></div> : <p className='information genre'>{movie.genero2}</p>}
                        {(movie.genero3 == null || movie.genero3 == '') ? <div></div> : <p className='information genre'>{movie.genero3}</p>}

                    </div>
                </div>
                {window.localStorage.getItem('admin') != 1 ? <div className='ratingbox'><RatingBox movie={id} setUpdateList={setUpdateList}/></div> : <div></div>}
            </div>
            <div className='comments-section'>
                
                <div className='comment-block'>
                    <div className='title-movie title-template'>Calificaciones y opiniones</div>
                    {loadComments()}
                </div>
            </div>
        </div>
        
    </div>);

}

export default MovieTemplate;