import * as Swal from "sweetalert2";
const Toast = (Swal as any).mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.addEventListener('mouseenter', (Swal as any).stopTimer)
    toast.addEventListener('mouseleave', (Swal as any).resumeTimer)
  }
})

export default Toast
