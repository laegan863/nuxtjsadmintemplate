import Swal from "sweetalert2";
export default function useDeleteLoading(title: string = "", message: string = "") {
    return Swal.fire({
            title: title,
            html: message,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
}