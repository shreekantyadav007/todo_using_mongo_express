import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://todo-using-mongo-express-backend.onrender.com/api',
})

export default instance;
