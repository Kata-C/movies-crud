import api from "../api";

const getAllMovies = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const response = await api.get(`/movies/`);
    
             resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

const getMovieById = (movieid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.get(`/movies/${movieid}`);
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

const updateMovie = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.put(`/movies/update/${data.idpelicula}`, data,
            { headers: { 'content-type': 'application/json' }});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

const addMovie = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/movies/`, data,
            { headers: { 'content-type': 'application/json' }});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

// const addMovie = (data) => {
//     console.log(data.portada);
//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await api.post(`/upload`, data.portada);
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//       }); 
// }

const deleteMovie = (movieid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.delete(`/movies/delete/${movieid}`);
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

const getCommentsByMovie = (movieid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.get(`/movies/comments/${movieid}`);
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

/**
 * 
 * @param {*} data - Object that must include: idusuario, calificacion, idpelicula; it can include comentario, but it is not mandatory.
 * @returns - Promise that consumes the endpoint to save a rating and a comment about a certain movie
 */
const addRateAndComment = (data) => {
    let headers = {
        'content-type': 'application/json',
        'authorization': window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null
    }
    console.log(headers.authorization);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/movies/rate/`, data,
            { headers});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

/**
 * 
 * @param {*} idmovie - Integer, it is an Id of a movie, its name could be idpelicula
 * @returns - Promise that consumes the endpoint to calculate the rate average and update this average in database
 */
const calculateAverage = (idmovie) => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.put(`/movies/rate/${idmovie}`,
            { headers: { 'content-type': 'application/json'}});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}


export const moviesService = {
    getAllMovies,
    getMovieById,
    updateMovie,
    addMovie,
    deleteMovie,
    getCommentsByMovie,
    addRateAndComment,
    calculateAverage
}
