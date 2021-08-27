import React, {useState, useEffect} from 'react';
import '../styles/moviesview.css'
import Movie from '../components/Movie';
import { moviesService } from '../services/movies.service';


const MoviesView = () => {

    const [movies, setMovies] = useState([]);
    const [response, setResponse] = useState('');
    const [data, setData] = useState({});
    const [save, setSave] = useState(true);

    
    useEffect(() => {
        moviesService.getAllMovies()
        .then(response => {
            if(response.data.success===false) {
                console.log("Sucedió un error durante la consulta en la base de datos");
            }
            setMovies(response.data.results);
        })
        .catch(err => console.log(err));


        //GET ONE
        // moviesService.getMovieById(1)
        // .then(response => {
        //     if(response.data.success===false) {
        //         console.log("Sucedió un error durante la consulta en la base de datos");
        //     }
        //     setMovies(response.data.results);
        // })
        // .catch(err => console.log(err));


        //UPDATE
        // moviesService.updateMovie(16, {
        //     titulo: 'Avengers',
        //     descripcion: 'Héroes que salvan el planeta',
        //     genero1: 'Accion',
        //     genero2: 'Fantasia',
        //     genero3: '',
        //     promedio: 0
        // })
        // .then(response => {
        //     if(response.data.success===false) {
        //         console.log("Sucedió un error durante la consulta en la base de datos");
        //     }
        //     setResponse(response.data.results);
        // })
        // .catch(err => console.log(err));



        // SAVE
        // movies.forEach(movie => {
        //     if(movie.titulo === data.titulo) {
        //         setSave(false);
        //     }
        // });

        // if(save) {
        //     moviesService.addMovie({
        //         titulo: 'Tenet',
        //         descripcion: 'Una persona debe de recuperar el control de la entropía para salvar al mundo',
        //         genero1: 'Accion',
        //         genero2: 'Ciencia ficción',
        //         genero3: '',
        //     })
        //     .then(response => {
        //         if(response.data.success===false) {
        //             console.log("Sucedió un error durante la consulta en la base de datos");
        //         }
        //         setResponse(response.data.results);
        //     })
        //     .catch(err => console.log(err));


        
    //    // DELETE
    //     moviesService.deleteMovie(16)
    //     .then(response => {
    //         if(response.data.success===false) {
    //             console.log("Sucedió un error durante la consulta en la base de datos");
    //         }
    //         setResponse(response.data.results);
    //     })
    //     .catch(err => console.log(err));


    },[]);
    

    console.log(movies);
    return (
        <div className="containerMovies">

            {
                movies.length > 0 ?
                movies.map((movie) => {return (
                    <div>  
                        <Movie data={movie} key={movie.id}/> 
                    </div>
                )}) 
                : <p>No existen registros</p>
            }
        </div>
        
    );

   
}

export default MoviesView;

