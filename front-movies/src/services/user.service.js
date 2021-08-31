import api from "../api";

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
            const response = await api.get(`/user/logout/`);
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

const validateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await api.post(`/user/username/`, data,
            { headers: { 'content-type': 'application/json'}});
            resolve(response);
        } catch (error) {
            reject(error);
        }
      }); 
}



export const userService = {
    addUser,
    login,
    logout,
    validateUser
}
