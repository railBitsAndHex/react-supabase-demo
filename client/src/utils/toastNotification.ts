import { toast } from 'react-toastify';
const toastError = (errorMsg: string, timeClose: number) => {
    toast.error(errorMsg, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: timeClose,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true, 
        draggable: false,
        theme: 'dark'
    })
}
const toastSuccess = (successMsg: string, timeClose: number) => {
    toast.success(successMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: timeClose,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable:false,
        theme:'dark'
    })
}
export {toastError, toastSuccess}