import User from 'domain/User'
import userService from 'services/User'

describe('UserService', () => {
  it('logs in', async () => {
    const data = { user: 'a user', password: 'a password' }

    const result = await userService.login(data)

    expect(result).toBeInstanceOf(User)
    expect(result.id).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result.about).toBeDefined()
    expect(userService.user).toEqual(result)
  })

  it('registers', async () => {
    const data = { user: 'a user', password: 'a password', about: 'an about' }

    const result = await userService.register(data)

    expect(result).toBeInstanceOf(User)
    expect(result.id).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result.about).toBeDefined()
    expect(userService.user).toEqual(result)
  })

  it('logs out', async () => {
    const data = { user: 'a user', password: 'a password', about: 'an about' }
    await userService.register(data)
    await userService.logout()

    expect(userService.user).toBe(null)
  })

  it('follows', async () => {
    const current = { user: 'a user', password: 'a password', about: 'an about' }
    const toFollow = { user: 'a user', password: 'a password', about: 'an about' }

    await userService.register(current)
    await userService.register(toFollow)

    const result = await userService.follow(current, toFollow)

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
