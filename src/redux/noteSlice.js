import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

//save the note
export const saveNote=createAsyncThunk("saveNote",async(info,thunkAPI)=>{
try{
const response=await axios.post("https://task-back-rosy.vercel.app/note/save",info,{
    withCredentials:true
})
return response.data;

}catch(err){

const message=err.response?.data?.message || "Something went wrong!";
return thunkAPI.rejectWithValue(message);
}
})


//fetch the all notes
export const allNotes=createAsyncThunk("allNotes",async(info,thunkAPI)=>{

    try{
const response=await axios.post("https://task-back-rosy.vercel.app/note/allnote",info,{
    withCredentials:true
})
// console.log(response.data)
return response.data;
    }
    catch(err){
        const message=err.response?.data?.message || "Something went wrong!";
        return thunkAPI.rejectWithValue(message);
    }

})

//update notes
export const updateNote=createAsyncThunk("updateNote",async(info,thunkAPI)=>{
    // info should have id,question,answer
    try{
const response=await axios.post("https://task-back-rosy.vercel.app/note/update",info,{withCredentials:true});
return response.data;
    }
    catch(err){
        const message=err.response?.data?.message || "Something went wrong!";
        return thunkAPI.rejectWithValue(message);
    }
    
})


//delete note
export const deleteNote=createAsyncThunk("deleteNote",async(info,thunkAPI)=>{
    // info should have id
    try{
const response=await axios.post("https://task-back-rosy.vercel.app/note/delete",info,{withCredentials:true});
return response.data;
    }
    catch(err){
        const message=err.response?.data?.message || "Something went wrong!";
        return thunkAPI.rejectWithValue(message);
    }
    
})


//------------------

const initialState={
    noteLoding:false,
    notes:[],
    noteError:false,
    message:""
};
const noteSlice=createSlice({
name:"notes",
initialState,
reducers:{

},
extraReducers:(builder)=>{

//saveNote
builder.addCase(saveNote.pending,(state,action)=>{
    state.noteLoding=true;
    state.noteError=false;
})
builder.addCase(saveNote.fulfilled,(state,action)=>{
    state.noteLoding=false;
    state.message=action.payload.message;

})
builder.addCase(saveNote.rejected,(state,action)=>{
 state.noteError=true;
 state.message=action.payload ||"some issue to save the note";
})

//allNotes
builder.addCase(allNotes.pending,(state,action)=>{
    state.noteLoding=true;
    state.noteError=false;
})
builder.addCase(allNotes.fulfilled,(state,action)=>{
    state.noteLoding=false;
    state.notes=action.payload.notes;
    state.message=action.payload.message;

})
builder.addCase(allNotes.rejected,(state,action)=>{
    state.noteLoding=false;
 state.noteError=true;
 state.message=action.payload ||"some issue to showing your notes";
})


//update notes
builder.addCase(updateNote.pending,(state,action)=>{
    state.noteLoding=true;
    state.noteError=false;
})
builder.addCase(updateNote.fulfilled,(state,action)=>{
    state.noteLoding=false;
    state.message=action.payload.message;

})
builder.addCase(updateNote.rejected,(state,action)=>{
    state.noteLoding=false;
 state.noteError=true;
 state.message=action.payload ||"some issue in note updating";
})
//delete note
builder.addCase(deleteNote.pending,(state,action)=>{
    state.noteLoding=true;
    state.noteError=false;
})
builder.addCase(deleteNote.fulfilled,(state,action)=>{
    state.noteLoding=false;
    state.notes=action.payload.notes;
    state.message=action.payload.message;

})
builder.addCase(deleteNote.rejected,(state,action)=>{
 state.noteError=true;
 state.noteLoding=false;
 state.message=action.payload ||"some issue in note updating";
})
}
});

export default noteSlice.reducer