import { useState } from "react";
import { useDispatch} from "react-redux";
import { blogAdded } from "../reducers/blogSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
const CreateBlogForm = () =>{
    const navigate=useNavigate()
    const[title,setTitle]=useState("");
    const[content,setContent]=useState("");
    const titleChange = (e)=>{setTitle(e.target.value)}
    const contentChange = (e) =>{setContent(e.target.value)}
    const dispatch = useDispatch();
    const handleSubmitForm = ()=>{
        if(content&&title){
            dispatch(blogAdded(title,content))
            navigate("/")
            setTitle(""),
            setContent("")
        }
    }
    return(
        <section style={{marginRight:'25px',marginLeft:'25px'}}>
            <h2>ساخت پست جدید</h2>
            <form>
                <label htmlFor="blogTitle">عنوان پست:</label>
                <input type="text" name="blogTitle" id="blogTitle" value={title} onChange={titleChange}/>
                <label htmlFor="blogContent">محتوای پست:</label>
                <textarea name="blogContent" id="blogContent" cols="30" rows="10" value={content} onChange={contentChange}></textarea>
                <button type="button" onClick={handleSubmitForm}>ذخیره پست</button>
            </form>
        </section>
    )
}
export default CreateBlogForm;