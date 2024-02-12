import axios from "axios";
const SERVER_URL="http://localhost:9000"
export const getAllUsers = () =>{
    const url=`${SERVER_URL}/users`;
    return axios.get(url)
}
export const getAllBlogs = () =>{
    const url=`${SERVER_URL}/blogs`;
    return axios.get(url)
}
export const createBlog = (blog)=>{
    const url=`${SERVER_URL}/blogs`;
    return axios.post(url,blog)
}
export const deleteBlog = (blogId) =>{
    const url=`${SERVER_URL}/blogs/${blogId}`;
    console.log(blogId+'deleted')
    return axios.delete(url)
    
}
export const updateBlog = (blog,blogId)=>{
    const url=`${SERVER_URL}/blogs/${blogId}`;
    return axios.put(url,blog)
}
export const createUser = (user) => {
    const url = `${SERVER_URL}/users`;
    return axios.post(url,user)
}
export const deleteUser = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`;
    return axios.delete(url)
}