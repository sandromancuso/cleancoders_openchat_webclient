import showError from 'utils/showError'
import swal from 'sweetalert'
jest.mock('sweetalert')

describe('showError', () => {
  it('shows errors', () => {
    const error = new Error('An error name')
    error.name = 'Some error data'

    showError(error)

    expect(swal).toHaveBeenCalledWith({
      title: error.name,
      text: error.message,
      icon: 'error',
      dangerMode: true
    })
  })
})
