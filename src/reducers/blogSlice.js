import { createSlice, nanoid } from "@reduxjs/toolkit";
import {sub} from 'date-fns-jalali';
const initialState ={
    blogs:[
    {
        id: nanoid(),
        date: sub(new Date(),{minutes:5}).toISOString(),
        title: "اولین پست",
        content:"محتوای اولین پست من",
        user:"1",
        reactions:{
            heart:0,
            like:0
        }
    },
    {
        id: nanoid(),
        date: new Date().toISOString(),
        title: "دومین پست",
        content:"لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.",
        user:"2",
        reactions:{
            heart:0,
            like:0
        }
    }
],
} 
const blogSlice = createSlice({
    name:'blogs',
    initialState:initialState,
    reducers:{
        blogAdded : {
            reducer(state,action){
               state.blogs.push(action.payload) 
            },
            prepare(title,content){
                return{
                    payload:{
                        id:nanoid(),
                        title,
                        content
                    }
                }
            }
            
        },
        // ...
blogUpdated: (state, action) => {
    const { id, title, content } = action.payload;
    const editedBlog = state.blogs.find(blog => blog.id === id); 
    if (editedBlog) {
        editedBlog.title = title;
        editedBlog.content = content;
        console.log(editedBlog.title);
    }
},
blogDeleted: (state,action)=>{
    const {id} = action.payload;
    state.blogs = state.blogs.filter((blog)=>blog.id !== id);
    console.log(state)
},
reactionAdded:(state,action)=>{
    const {blogId,reaction} = action.payload;
    const existingBlog=state.blogs.find(blog=>blog.id===blogId);
    if(existingBlog){
        existingBlog.reactions[reaction]++;
    }
}


    },
})
export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state,blogId) => state.blogs.blogs.find(blog=>blog.id ===blogId)
export const {blogAdded,blogUpdated,blogDeleted,reactionAdded}=blogSlice.actions;
export default blogSlice.reducer;