import React, {useState, useEffect, useContext} from 'react';
import '../styles/moviesview.css'
import { moviesService } from '../services/movies.service';
import Movie from '../components/Movie';
// import AuthContext from '../auth.context';

const MoviesView = () => {

    const [movies, setMovies] = useState([]);
    const [response, setResponse] = useState('');
    const [data, setData] = useState({});
    const [save, setSave] = useState(true);

    // const auth = useContext(AuthContext);
    useEffect(() => {
        moviesService.getAllMovies()
        .then(response => {
            if(response.data.success===false) {
                console.log("Sucedió un error durante la consulta en la base de datos");
            }
            setMovies(response.data.results);
        })
        .catch(err => console.log(err));

    },[]);

    
    return (
        <>
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
        </>
        
    );

   
}

export default MoviesView;

