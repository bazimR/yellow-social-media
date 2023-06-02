import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN



export async function userSignup(creds) {
    try {
        const { data: { Message }, status } = await axios.post(`/signup`, creds);
        if (status === 201) {
            return Promise.resolve(Message)
        }
        else {
            return Promise.reject({ error: "something went wrong" })
        }
    } catch (error) {
        return Promise.reject({ error, err: "axios /signup -b" })
    }
}

export async function userLogin({ email, password }) {
    try {

        const { data: { token } } = await axios.post('/login', { email, password })
        
        return Promise.resolve(token)
    } catch (error) {
        return Promise.reject({ error: "password doest match" })
    }
}

export async function adminLogin({ email, password }) {
    try {
        const { data: { ADMINTOKEN } } = await axios.post('/admin-login', { email, password })
        return Promise.resolve(ADMINTOKEN)
    } catch (error) {
        return Promise.reject({ error: "password doest match" })
    }
}