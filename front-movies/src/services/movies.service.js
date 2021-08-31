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

const updateMovie = (data, idpelicula) => {
    let authorization = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null ;
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.put(`/movies/update/${idpelicula}`, data,
            { headers: { 'content-type': 'multipart/form-data', 'Authorization': authorization }});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

const addMovie = (data) => {
    let authorization = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null ;
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/movies/`, data,
            { headers: { 'content-type': 'multipart/form-data', 'Authorization': authorization }});
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
    let authorization = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null ;
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.delete(`/movies/delete/${movieid}`, {
                headers: { 'Authorization': authorization }
            });
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

const getRateByUser = (idmovie, iduser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.get(`/movies/${idmovie}/user/${iduser}`);
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
    let authorization = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null ;
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/movies/rate/`, data,
            { headers: { 'content-type': 'application/json', 'Authorization': authorization}});
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
const calculateAverage = (idmovie, data) => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.put(`/movies/rate/${idmovie}`, data,
            { headers: { 'content-type': 'application/json'}});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

const validateMovie = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/movies/title/`, data,
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
    calculateAverage,
    getRateByUser,
    validateMovie
}
