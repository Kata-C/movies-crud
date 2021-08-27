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
            { headers: { 'content-type': 'multipart/form-data' }});
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
            { headers: { 'content-type': 'multipart/form-data' }});
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


export const moviesService = {
    getAllMovies,
    getMovieById,
    updateMovie,
    addMovie,
    deleteMovie
}
