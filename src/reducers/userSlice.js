import { createAsyncThunk, createSlice, nanoid,createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { getAllUsers,createUser, deleteUser } from "../services/usersServices";
import { useSelector } from "react-redux";
import { selectAllBlogs } from "./blogSlice";
const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();
export const fetchUsers = createAsyncThunk("/users/fetchUsers", async()=>{
    const response = await getAllUsers();
    return response.data
})
export const createApiUser = createAsyncThunk("/users/createApiUser" , async(initialUser)=>{
    const response = await createUser(initialUser);
    return response.data
})
export const deleteApiUser = createAsyncThunk("/users/deleteApiUser" , async(initialUserId)=>{
    await deleteUser(initialUserId);
    return initialUserId
})
const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{

    },
    extraReducers:builder=>{
        builder.addCase(fetchUsers.fulfilled , userAdapter.setAll)
        .addCase(createApiUser.fulfilled , userAdapter.addOne)
        .addCase(deleteApiUser.fulfilled , userAdapter.removeOne)
    }
});
// export const selectUserById = (state,userId) => state.users.find(user=>user.id===userId);
export const {
    selectAll:selectAllUsers,
    selectById:selectUserById,
    selectIds
    }=userAdapter.getSelectors(state=>state.users)
export const userBlogs = createSelector(
    [selectAllBlogs,(_,userId)=>userId],
    (blogs,userId)=>blogs.filter(blog=>blog.user===userId)
);
export default userSlice.reducer;