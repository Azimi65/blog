import { useParams ,Link,useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { blogDeleted } from "../reducers/blogSlice";
import {selectBlogById} from '../reducers/blogSlice'
import ShowUser from "./ShowUser";
import TimeShow from "./TimeShow";
import ReactionButtons from "./ReactionButtons";
const SingleBlogPage=()=>{
    const {blogId} = useParams();
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const blog = useSelector(state=>selectBlogById(state,blogId))
    const handleBlogDelete=()=>{
        if(blog){
            dispatch(blogDeleted({id:blog.id}));
            navigate('/')
        }
        
    }
    if(!blog){
        return (
            <section style={{marginRight:'25px',marginLeft:'25px',border:'1px solid blue',marginTop:'15px',borderRadius:'7px' ,padding:'10px'}}>
                <h3>وبلاگ مورد نظر وجود ندارد</h3>
            </section>
        )
    }
    return(
        <section style={{marginRight:'25px',marginLeft:'25px',border:'1px solid blue',marginTop:'15px',borderRadius:'7px' ,padding:'10px'}}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <ShowUser userId={blog.user}/>{" "}
            <TimeShow timestamp={blog.date}/>
            <br/>
            <ReactionButtons blog={blog}/>
           <Link to={`/editblogs/${blogId}`} type="button" style={{marginLeft:'5px'}}>ویرایش پست</Link>
           <button className="accent-button" type="button" onClick={handleBlogDelete}>حذف پست</button>
        </section>
    )
}
export default SingleBlogPage;