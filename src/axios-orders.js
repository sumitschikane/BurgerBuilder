import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-my-burger-6f0cb.firebaseio.com/"
});

export default instance;
