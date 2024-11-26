import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://todo-using-mongo-express-backend.vercel.app/api',
})

export default instance;
