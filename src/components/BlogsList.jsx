import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { fetchBlogs, selectAllBlogs } from "../reducers/blogSlice";
import TimeShow from './TimeShow'
import ShowUser from './ShowUser'
import { useEffect } from "react";
import ReactionButtons from "./ReactionButtons";
import Spinner from "./Spinner";
const BlogsList = ()=>{
    const dispatch=useDispatch();
    const blogs = useSelector(selectAllBlogs);
    const orderedBlogs = blogs.slice().sort((a,b)=>b.date.localeCompare(a.date))
    const blogStatus=useSelector(state=>state.blogs.status)
    useEffect(()=>{
        if(blogStatus==='idle'){
             dispatch(fetchBlogs())
        }
       
    },[blogStatus,dispatch])
    const navigate = useNavigate();
    let content;
    if(blogStatus==="loading"){
        content = <Spinner/>
        
    }
    else if(blogStatus==="completed"){
        content =orderedBlogs.map((blog)=>{
            return(
                <div key={blog.id} style={{border:'1px solid blue',padding:'25px',margin:'10px'}}>
                <h3>{blog.title}</h3>
                <div>
                    <TimeShow timestamp={blog.date}/>{" "}
                    <ShowUser userId={blog.user}/>
                </div>
                <ReactionButtons blog={blog}/>
                <div>{blog.content.substring(0,100)}</div>
                <Link className="button" to={`/blogs/${blog.id}`} style={{marginTop:'15px'}}>ادامه مطلب</Link>
                </div>
            )  
        })
    }
    
    // console.log(renderedBlogs)
 return(
    <section className="">
        <button className="full-button" style={{marginTop:'10px'}} onClick={()=>navigate('/blogs/create-blog')}>ساخت پست جدید</button>
        <h3>تمامی پست ها</h3>
            {content}
        
    </section>
 )
}   
    
export default BlogsList;