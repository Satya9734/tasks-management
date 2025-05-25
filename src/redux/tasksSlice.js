import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

//add
export const addTasks=createAsyncThunk("addTasks",async(info,thunkAPI)=>{
try{
const response=await axios.post("https://task-back-rosy.vercel.app/dashbord/addtask",info,{
    withCredentials:true
});
const data=await response.data;
console.log("data after add:",data);
return data.tasks;
}
catch(err){
    const message =
  err.response?.data?.error?.details?.[0]?.message || 
  err.response?.data?.message ||                    
  "Something went wrong";
  console.log("message",message)
return thunkAPI.rejectWithValue(message);
}
})


//alltask
export const allTasks=createAsyncThunk("allTasks",async(abcd,thunkAPI)=>{
try{
const response=await axios.post("https://task-back-rosy.vercel.app/dashbord/alltask",{},{
    withCredentials:true
});
const data=await response.data;
return data.data;
}
catch(err){
    const message =
  err.response?.data?.error?.details?.[0]?.message || 
  err.response?.data?.message ||                    
  "Something went wrong";
return thunkAPI.rejectWithValue(message);
}
})

//delete
export const deleteTask=createAsyncThunk("deleteTask",async(info,thunkAPI)=>{
try{
const response=await axios.post("https://task-back-rosy.vercel.app/dashbord/deletetask",info,{
    withCredentials:true
});
const data=await response.data;
return data.data;
}
catch(err){
    const message =
  err.response?.data?.error?.details?.[0]?.message || 
  err.response?.data?.message ||                    
  "Something went wrong";
return thunkAPI.rejectWithValue(message);
}
})
//isdone
export const isDone=createAsyncThunk("isDone",async(info,thunkAPI)=>{
    console.log(info)
try{
const response=await axios.post("https://task-back-rosy.vercel.app/dashbord/isdone",info,{
    withCredentials:true
});

const data=await response.data;
return data.data;
}
catch(err){
    const message =
  err.response?.data?.error?.details?.[0]?.message || 
  err.response?.data?.message ||                    
  "Something went wrong";
return thunkAPI.rejectWithValue(message);
}
})


const initialState={
loding:false,
tasks:[],
error:false,
name:""
}

const tasksSlice=createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setName:(state)=>{
            state.name=localStorage.getItem("name") || "";
        },
        removeName:(state)=>{
            state.name="";
        }
    },
    extraReducers:(builder)=>{
builder.addCase(addTasks.pending,(state,action)=>{
    state.loding=true
    // state.tasks=[]
    state.error=false
})
builder.addCase(addTasks.fulfilled,(state,action)=>{
    state.loding=false;
    state.tasks=action.payload
    state.error=false
})
builder.addCase(addTasks.rejected,(state,action)=>{
    state.loding=false;
    state.tasks=[]
    state.error=action.payload
})


//alltask
builder.addCase(allTasks.pending,(state,action)=>{
    state.loding=true
    state.tasks=[]
    state.error=false
})
builder.addCase(allTasks.fulfilled,(state,action)=>{
    state.loding=false;
    state.tasks=action.payload
    state.error=false
})
builder.addCase(allTasks.rejected,(state,action)=>{
    state.loding=false;
    state.tasks=[]
    state.error=action.payload
})



//delete
builder.addCase(deleteTask.pending,(state,action)=>{
    state.loding=true
    state.tasks=[]
    state.error=false
})
builder.addCase(deleteTask.fulfilled,(state,action)=>{
    state.loding=false;
    state.tasks=action.payload
    state.error=false
})
builder.addCase(deleteTask.rejected,(state,action)=>{
    state.loding=false;
    state.tasks=[]
    state.error=action.payload
})



//isdone
builder.addCase(isDone.pending,(state,action)=>{
    state.loding=true
    state.tasks=[]
    state.error=false
})
builder.addCase(isDone.fulfilled,(state,action)=>{
    state.loding=false;
    state.tasks=action.payload
    state.error=false
})
builder.addCase(isDone.rejected,(state,action)=>{
    state.loding=false;
    state.tasks=[]
    state.error=action.payload
})


    }

})

// export {} tasksSlice.actions
export const {setName,removeName } =tasksSlice.actions
export default tasksSlice.reducer;