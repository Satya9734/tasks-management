import {configureStore} from "@reduxjs/toolkit"
import tasksSlice from "./tasksSlice.js"
import noteSlice from "./noteSlice.js"
const store =configureStore({
    reducer:{
tasks:tasksSlice,
notes:noteSlice
    }
})

export default store