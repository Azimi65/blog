import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import {getAllBlogs,createBlog,deleteBlog,updateBlog} from '../services/usersServices'
import {sub} from 'date-fns-jalali';
const initialState ={
    blogs:[],
    status:"idle",
    error:null
} 
export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async()=>{
 const response = await getAllBlogs();
 return response.data;
})
export const deleteApiBlog = createAsyncThunk("/blogs/deleteApiBlog",async initialBlog=>{
    await deleteBlog(initialBlog);
    return initialBlog;

})
export const updateApiBlog = createAsyncThunk("/blogs/updateApiBlog",async initialBlog=>{
 const response = await updateBlog(initialBlog,initialBlog.id);
 return response.data;
})
export const addNewBlog = createAsyncThunk("/blogs/addNewBlog", async initialBlog =>{
    const response = await createBlog(initialBlog);
    return response.data;
})
const blogSlice = createSlice({
    name:'blogs',
    initialState:initialState,
    reducers:{
        blogAdded : {
            reducer(state,action){
               state.blogs.push(action.payload) 
            },
            prepare(title,content,userId){
                return{
                    payload:{
                        id:nanoid(),
                        title,
                        content,
                        userId,
                        reactions:{
                            like:0,
                            heart:0
                        }
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
    extraReducers:builder=>{
        builder.addCase(fetchBlogs.pending , (state,action)=>{
            state.status="loading"
        })
        .addCase(fetchBlogs.fulfilled,(state,action)=>{
            state.status="completed"
            state.blogs = action.payload;
        })
        .addCase(fetchBlogs.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addNewBlog.fulfilled,(state,action)=>{
            state.blogs.push(action.payload)
        })
        .addCase(deleteApiBlog.fulfilled,(state,action)=>{
            state.blogs= state.blogs.filter(blog=>blog.id !== action.payload)
        })
        .addCase(updateApiBlog.fulfilled,(state,action)=>{
            const updatedBlog=state.blogs.findIndex(blog=>blog.id===action.payload.id)
            state.blogs[updatedBlog]=action.payload;
        })
    }
})
export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state,blogId) => state.blogs.blogs.find(blog=>blog.id ===blogId)
export const {blogAdded,blogUpdated,blogDeleted,reactionAdded}=blogSlice.actions;
export default blogSlice.reducer;