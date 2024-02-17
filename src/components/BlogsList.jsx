import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { fetchBlogs, selectAllBlogs } from "../reducers/blogSlice";
import TimeShow from './TimeShow'
import ShowUser from './ShowUser'
import { useEffect,memo, useMemo } from "react";
import ReactionButtons from "./ReactionButtons";
import Spinner from "./Spinner";
import { useGetBlogsQuery } from "../api/apiSlice";
let Blog=({blog})=>{
    return(
       
        <div key={blog.id} style={{border:'1px solid blue',padding:'25px',margin:'10px'}}>
            <h3>{blog.title}</h3>
            <div>
                <TimeShow timestamp = {blog.date}/>{" "}
                <ShowUser userId = {blog.user}/>
            </div>
            <ReactionButtons blog={blog}/>
            <div>{blog.content.substring(0,100)}</div>
            <Link className="button" to={`/blogs/${blog.id}`} style={{marginTop:'15px'}}>ادامه مطلب</Link>
        </div>
        
    )
}
// Blog = memo(Blog)

const BlogsList = ()=>{
    const {
        data:blogs=[],
        isLoading,
        isSuccess,
        isError,
        error}=useGetBlogsQuery();
    // const dispatch=useDispatch();
    // const blogs = useSelector(selectAllBlogs);
    const orderedBlogs =useMemo(()=>{
        const orderedBlogs=blogs.slice();
        orderedBlogs.sort((a,b)=>b.date.localeCompare(a.date))
        return orderedBlogs
    },[blogs]) 
    
    // const blogStatus=useSelector(state=>state.blogs.status)
    // useEffect(()=>{
    //     if(blogStatus==='idle'){
    //          dispatch(fetchBlogs())
    //     }
       
    // },[blogStatus,dispatch])
    const navigate = useNavigate();
    let content;
    if(isLoading){
        content = <Spinner/>
        
    }
    else if(isSuccess){
        content = orderedBlogs.map((blog)=>{
            return(
               <Blog key={blog.id} blog={blog}/> 
            )  
        })
    }
    
 return(
    <section className="">
        <button className="full-button" style={{marginTop:'10px'}} onClick={()=>navigate('/blogs/create-blog')}>ساخت پست جدید</button>
        <h3>تمامی پست ها</h3>
            {content}
        
    </section>
 )
}   
    
export default BlogsList;