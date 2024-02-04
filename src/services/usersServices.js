import axios from "axios";
const SERVER_URL="http://localhost:9000"
export const getAllUsers = () =>{
    const url=`${SERVER_URL}/users`;
    return axios.get(url)
}