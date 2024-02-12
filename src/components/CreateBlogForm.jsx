import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addNewBlog  } from "../reducers/blogSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
const CreateBlogForm = () =>{
    const navigate=useNavigate()
    const[title,setTitle]=useState("");
    const[content,setContent]=useState("");
    const[userId,setUserId]=useState("");
    const titleChange = (e)=>{setTitle(e.target.value)}
    const contentChange = (e) =>{setContent(e.target.value)}
    const userChange = (e) => {setUserId(e.target.value)}
    const dispatch = useDispatch();
    const users = useSelector(state=>state.users);
    const handleSubmitForm = async ()=>{
        if(content&&title){
            try{
                await dispatch(addNewBlog({
                id:nanoid(),
                date:new Date().toISOString(),
                title:title,
                content:content,
                user:userId,
                reactions:{
                    heart:"0",
                    like:"0"
                }
                    }))
                    navigate("/")
                    setTitle(""),
                    setContent("")
                    setUserId("")
                }
                catch(error){
                    console.error('error occured')
                    }
                    
                    
                 }
        }
        
    return(
        <section style={{marginRight:'25px',marginLeft:'25px'}}>
            <h2>ساخت پست جدید</h2>
            <form>
                <label htmlFor="blogTitle">عنوان پست:</label>
                <input type="text" name="blogTitle" id="blogTitle" value={title} onChange={titleChange}/>
                <label htmlFor="blogUser">نویسنده پست:</label>
                <select name=""  onChange={userChange} value={userId}>
                    <option value="">انتخاب کنید</option>
                    {users.map(user=>
                        <option key={user.id} value={user.id}>{user.fullname}</option>
                )}
                </select>
                
                <label htmlFor="blogContent">محتوای پست:</label>
                <textarea name="blogContent" id="blogContent" cols="30" rows="10" value={content} onChange={contentChange}></textarea>
                <button type="button" onClick={handleSubmitForm}>ذخیره پست</button>
            </form>
        </section>
    )
}
export default CreateBlogForm;