import User from 'domain/User'
import userService from 'services/User'

const userData = { user: 'a user', password: 'a password' }

describe('UserService', () => {
  it('logs in', async () => {
    const result = await userService.login(userData)

    expect(result).toBeInstanceOf(User)
    expect(result.id).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result.about).toBeDefined()
    expect(userService.user).toEqual(result)
  })

  it('registers', async () => {
    const result = await userService.register(userData)

    expect(result).toBeInstanceOf(User)
    expect(result.id).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result.about).toBeDefined()
    expect(userService.user).toEqual(result)
  })

  it('logs out', async () => {
    await userService.register(userData)
    await userService.logout()

    expect(userService.user).toBe(null)
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
    expect(result[0]).toBeInstanceOf(User)
    expect(result[0].id).toBeDefined()
    expect(result[0].name).toBeDefined()
    expect(result[0].about).toBeDefined()
  })

})
