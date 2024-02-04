import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { selectAllBlogs } from "../reducers/blogSlice";
import TimeShow from './TimeShow'
import ShowUser from './ShowUser'
import ReactionButtons from "./ReactionButtons";
const BlogsList = ()=>{
    const blogs = useSelector(selectAllBlogs);
    const orderedBlogs = blogs.slice().sort((a,b)=>b.date.localeCompare(a.date))
    const navigate = useNavigate();
    const renderedBlogs = orderedBlogs.map((blog)=>{
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
    // console.log(renderedBlogs)
 return(
    <section className="">
        <button className="full-button" style={{marginTop:'10px'}} onClick={()=>navigate('/blogs/create-blog')}>ساخت پست جدید</button>
        <h3>تمامی پست ها</h3>
            {renderedBlogs}
        
    </section>
 )
}   
    
export default BlogsList;