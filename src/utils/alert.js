import swal from 'sweetalert2'

export function warningAlert (message) {
  return swal({
    title: 'Error!',
    text: message,
    type: 'error',
    confirmButtonText: 'Ok'
  })
}

export function confirmationAlert (title, message, onSuccess, onCancel) {
  return swal({
    title: title,
    text: message,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ok',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.value) {
      onSuccess()
    } else if (result.dismiss === swal.DismissReason.cancel) {
      onCancel()
    }
  })
}

export function successAlert (message) {
  return swal({
    title: 'Sukses!',
    text: message,
    type: 'success',
    confirmButtonText: 'Ok'
  })
}
