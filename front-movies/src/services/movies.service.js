import api from "../api";

const getAllMovies = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const response = await api.get(`/movies/`
        //     , {
        //     params: {
        //     },
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
          );
    
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

const updateMovie = (movieid, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.put(`/movies/update/${movieid}`, data,
            { headers: { 'content-type': 'application/x-www-form-urlencoded' }});
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
            { headers: { 'content-type': 'application/x-www-form-urlencoded' }});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

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
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            const response = await api.post(`/movies/rate/`, data,
            { headers: { 'content-type': 'application/x-www-form-urlencoded' }});
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
            { headers: { 'content-type': 'application/x-www-form-urlencoded' }});
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
