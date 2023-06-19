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

        const { data } = await axios.post('/login', { email, password })
        return Promise.resolve(data)
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

export async function newPost(formData) {
    const token = localStorage.getItem('token')
    try {
        await axios.post('/user/newpost', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "authorization": `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error(error)
        return Promise.reject({ error: 'Post failed' })
    }
}

export async function homePost(userId, pageParams) {
    try {

        const { data } = await axios.get(`/home/homeposts/${userId}`, {
            params: {
                page: pageParams
            }
        })
        const datasaver = {
            results: data.data,
            total: data.total,
            next: data.total > data.page * data.limit
                ? pageParams + 1
                : undefined,
        };
        return datasaver;
    } catch (error) {
        console.error(error)
        return Promise.reject({ error: "fetching posts failed" })
    }
}

export async function likePost({ postId, userId }) {
    const token = localStorage.getItem('token');
    try {
        return await axios.put(`/post/like/${postId}`, { userId }, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error(error);
        return Promise.reject({ error, msg: "Liking posts failed" });
    }
}

export async function getComments(postId, userId) {
    const token = localStorage.getItem('token');
    try {
        const { data } = await axios.get(`/user/comments/${postId}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            }
            ,
            params: {
                userId
            }
        },)
        return data
    } catch (error) {
        console.error(error);
        return Promise.reject({ error, msg: "getting comments failed" });
    }
}


export async function addComment(formData) {
    const token = localStorage.getItem('token')
    try {
        return await axios.post('/user/newcomment', formData, {
            headers: {
                "Content-Type": 'application/json',
                "authorization": `Bearer ${token}`
            }
        })

    } catch (error) {
        console.error(error);
        return Promise.reject({ error, msg: "sending comments failed" });
    }
}


export async function deleteComment(commentId) {
    const token = localStorage.getItem('token');
    try {
        return await axios.put(
            '/user/deletecomment',
            { commentId }, // Place the commentId directly in the request body
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }
        );
        // Handle the response data if necessary
    } catch (error) {
        console.error(error);
        return Promise.reject({ error, msg: "delete comment failed" });
    }
}


export async function addStory(formData) {

    const token = localStorage.getItem('token');
    try {
        await axios.post('/user/newstory', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "authorization": `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error(error);
        return Promise.reject({ error, msg: "creating story failed" });
    }
}

export async function homeStory(userId) {
    try {
        const { data } = await axios.get(`/home/homestory/${userId}`)
        return data
    } catch (error) {
        console.error(error);
        return Promise.reject({ error, msg: "story retriving failed" });
    }
}

export async function googleSignIn(creds) {
    try {
        const { data } = await axios.post('/user/googlesignin', creds)
        return Promise.resolve(data)
    } catch (error) {
        console.error(error);
        return Promise.reject({ error, msg: "google sign in failed" });
    }
}