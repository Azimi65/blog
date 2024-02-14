import { useSelector } from "react-redux";
import { useParams,Link } from "react-router-dom";
import { selectAllBlogs, selectBlogById } from "../reducers/blogSlice";
import { selectUserById,userBlogs } from "../reducers/userSlice";
const UserBlogs = () =>{  
    const {userId} =useParams(); 
    // const userBlogs = useSelector(selectAllBlogs)
    const user = useSelector(state=>selectUserById(state,userId))
    // const allBlogs=userBlogs.filter(blog=>blog.user===userId)
    const allBlogs = useSelector((state)=>userBlogs(state,userId))
    const blogTitles =  allBlogs.map(blog=>(
        <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
    ))
    
    return(
        <>
        <div style={{marginRight:'20px'}}>{user.fullname}</div>
       <ul>
        {allBlogs.length>0 ? blogTitles : 'پستی نیست برای این نویسنده'}
       </ul> 
        </>
        
    )
}
export default UserBlogs;