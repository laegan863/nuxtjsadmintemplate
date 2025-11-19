import Swal from "sweetalert2";
export default function useSwalSuccess(title: string = "", message: string = "") {
    return Swal.fire({
            icon: 'success',
            title: title,
            html: message,
            confirmButtonText: 'OKs'
        });
}