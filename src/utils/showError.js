import swal from 'sweetalert'

const showError = error => swal({
  title: error.name,
  text: error.message,
  icon: 'error',
  dangerMode: true
})

export default showError
