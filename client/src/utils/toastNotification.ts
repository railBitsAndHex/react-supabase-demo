import { toast } from 'react-toastify';
const toastError = (errorMsg: string) => {
    toast.error(errorMsg, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2900,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true, 
        draggable: false,
        theme: 'dark'
    })
}
const toastSuccess = (successMsg: string) => {
    toast.success(successMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2900,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable:false,
        theme:'dark'
    })
}
export {toastError, toastSuccess}