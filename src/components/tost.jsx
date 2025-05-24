import {toast} from "react-toastify"

export const mysuccess=(sms)=>{
toast.success(sms,{
    postion:"top-right"
})
}
export const myerror=(sms)=>{
toast.error(sms,{
    postion:"top-right"
})
}