import { createSlice, nanoid,createAsyncThunk,createEntityAdapter } from "@reduxjs/toolkit";
import {getAllBlogs,createBlog,deleteBlog,updateBlog} from '../services/usersServices'
import {sub} from 'date-fns-jalali';
const blogAdapter = createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
});
const initialState=blogAdapter.getInitialState({
    status:"idle",
    error:null
})
console.log(initialState)
// const initialState ={
//     blogs:[],
//     status:"idle",
//     error:null
// } 
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
   
        reactionAdded:(state,action)=>{
            const {blogId,reaction} = action.payload;
            const existingBlog=state.entities[blogId];
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
            blogAdapter.upsertMany(state,action.payload);
        })
        .addCase(fetchBlogs.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addNewBlog.fulfilled,(state,action)=>{
            blogAdapter.addOne(action.payload)
        })
        .addCase(deleteApiBlog.fulfilled,(state,action)=>{
           blogAdapter.removeOne(action.payload)
        })
        .addCase(updateApiBlog.fulfilled,(state,action)=>{
            // const updatedBlog=state.blogs.findIndex(blog=>blog.id===action.payload.id)
            // state.blogs[updatedBlog]=action.payload;
            blogAdapter.updateOne(action.payload)
        })
    }
})
// export const selectAllBlogs = (state) => state.blogs.blogs;
// export const selectBlogById = (state,blogId) => state.blogs.blogs.find(blog=>blog.id ===blogId)
export const {
    selectAll:selectAllBlogs,
    selectById:selectBlogById,
    selectIds:selectBlogIds
} = blogAdapter.getSelectors(state=>state.blogs)
export const {blogAdded,blogUpdated,blogDeleted,reactionAdded}=blogSlice.actions;
export default blogSlice.reducer;