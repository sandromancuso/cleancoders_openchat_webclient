import User from 'domain/User'
import userService from 'services/User'

const userData = { user: 'a user', password: 'a password' }

function expectUserDefined (user) {
  expect(user).toBeInstanceOf(User)
  expect(user.id).toBeDefined()
  expect(user.name).toBeDefined()
  expect(user.about).toBeDefined()
}

describe('UserService', () => {
  it('logs in', async () => {
    const result = await userService.login(userData)

    expectUserDefined(result)
    expect(userService.user).toEqual(result)
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(result))
  })

  it('registers', async () => {
    const result = await userService.register(userData)

    expectUserDefined(result)
    expect(userService.user).toEqual(result)
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(result))
  })

  it('logs out', async () => {
    await userService.register(userData)
    await userService.logout()

    expect(userService.user).toBe(null)
    expect(localStorage.clear).toHaveBeenCalledTimes(1)
  })

  it('follows', async () => {
    const toFollow = { user: 'a user', password: 'a password', about: 'an about' }

    await userService.register(userData)
    await userService.register(toFollow)

    const result = await userService.follow(userData, toFollow)

    expect(result).toBe(true)
  })

  it('gets users', async () => {
    const result = await userService.getUsers()

    expect(result).toBeInstanceOf(Array)
    expectUserDefined(result[0])
  })

  it('finds users by Id', async () => {
    const id = '316h3543-e89b-12d3-a456-426655440000'

    const result = await userService.findById(id)

    expectUserDefined(result)
  })

})
