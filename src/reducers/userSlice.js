import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getAllUsers,createUser, deleteUser } from "../services/usersServices";
import { useSelector } from "react-redux";

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
    initialState:[],
    reducers:{

    },
    extraReducers:builder=>{
        builder.addCase(fetchUsers.fulfilled , (state,action)=>{
            return action.payload;
        })
        .addCase(createApiUser.fulfilled , (state,action)=>{
             state.push(action.payload)
        })
        .addCase(deleteApiUser.fulfilled , (state,action)=>{
            return state.filter(user=>user.id !== action.payload)
        })
    }
});
export const selectUserById = (state,userId) => state.users.find(user=>user.id===userId);
export default userSlice.reducer;