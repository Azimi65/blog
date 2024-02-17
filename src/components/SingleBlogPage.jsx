import { useParams ,Link,useNavigate} from "react-router-dom";
import {deleteApiBlog } from "../reducers/blogSlice";
import {selectBlogById} from '../reducers/blogSlice'
import { useGetBlogQuery } from "../api/apiSlice";
import ShowUser from "./ShowUser";
import TimeShow from "./TimeShow";
import ReactionButtons from "./ReactionButtons";
import Spinner from "./Spinner";
const SingleBlogPage=()=>{
    const {blogId} = useParams();
    const {
        data:blog,
        isFetching,
        isSuccess,
        isError,
        isLoading
    }=useGetBlogQuery(blogId)
    const navigate=useNavigate()
    const handleBlogDelete=()=>{
        if(blog){
            dispatch(deleteApiBlog(blog.id));
            navigate('/')
        }
        
    }
    let content;
    if(isLoading){
        content=<Spinner/>
    }
    else if (isSuccess){
        content=
        <>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <ShowUser userId={blog.user}/>{" "}
            <TimeShow timestamp={blog.date}/>
            <br/>
            <ReactionButtons blog={blog}/>
           <Link to={`/editblogs/${blogId}`} type="button" style={{marginLeft:'5px'}}>ویرایش پست</Link>
           <button className="accent-button" type="button" onClick={handleBlogDelete}>حذف پست</button>
        </>     
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
            {content}
        </section>
    )
}
export default SingleBlogPage;