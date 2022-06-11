import { toast } from 'react-toastify';
const toastError = (errorMsg: string) => {
    toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover:true, 
        draggable: false,
        theme: 'dark'
    })
}
export {toastError}