import swal from 'sweetalert'

const showError = error => swal(error.name, error.message, 'error')

export default showError
