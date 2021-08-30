import api from "../api";

// const getMovieById = (movieid) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await api.get(`/movies/${movieid}`);
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//       }); 
// }

const login = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/user/login/`, data,
            { headers: { 'content-type': 'application/json' }});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

const logout = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/user/logout/`,
            { headers: { 'content-type': 'application/json' }});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}

const addUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/user/`, data,
            { headers: { 'content-type': 'application/json' }});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}


export const userService = {
    addUser,
    login,
    logout
}
