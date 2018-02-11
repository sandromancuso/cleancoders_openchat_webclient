import User from 'domain/User'
import APIError from 'domain/APIError'
import userService from 'services/User'

function expectUserDefined (user) {
  expect(user).toBeInstanceOf(User)
  expect(user.id).toBeDefined()
  expect(user.name).toBeDefined()
  expect(user.about).toBeDefined()
}

const randomUserData = () => ({ userName: 'user' + Math.random(), password: 'aPassword', about: 'an about' })

describe('UserService', () => {
  let userData

  beforeEach(() => {
    userData = randomUserData()
  })

  it('logs in', async () => {
    await userService.register(userData)
    await userService.logout()

    const result = await userService.login(userData)

    expectUserDefined(result)
    expect(userService.user).toEqual(result)
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(result))
  })

  it('handles invalid login credentials', async () => {
    const error = new APIError({
      config: {
        url: `${process.env.REACT_APP_API_URL}login`,
        method: 'post'
      },
      data: 'Invalid Credentials'
    })

    const request = userService.login(userData)

    await expect(request).rejects.toEqual(error)
  })

  it('handles invalid register credentials', async () => {
    const error = new APIError({
      config: {
        url: `${process.env.REACT_APP_API_URL}users`,
        method: 'post'
      },
      data: 'Username already in use.'
    })
    await userService.register(userData)

    const request = userService.register(userData)

    await expect(request).rejects.toEqual(error)
  })

  it('registers', async () => {
    const result = await userService.register(userData)

    expectUserDefined(result)
    expect(userService.user).toEqual(result)
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(result))
  })

  it('logs out', async () => {
    localStorage.clear.mockClear()
    await userService.register(userData)

    await userService.logout()

    expect(userService.user).toBe(null)
    expect(localStorage.clear).toHaveBeenCalledTimes(1)
  })

  it('follows', async () => {
    const toFollow = await userService.register(randomUserData())
    await userService.register(userData)

    await userService.follow(toFollow.id)
  })

  it('gets users', async () => {
    const user = await userService.register(userData)

    const result = await userService.getUsers()

    expect(result).toBeInstanceOf(Array)
    expect(result).toContainEqual(user)
  })

  it('finds users by Id', async () => {
    const user = await userService.register(userData)

    const result = await userService.findById(user.id)

    expect(result).toEqual(user)
  })

  it('gets followees', async () => {
    const followee = await userService.register(randomUserData())
    await userService.register(userData)
    await userService.follow(followee.id)

    const result = await userService.getFollowees()

    expect(result).toBeInstanceOf(Array)
    expect(result).toContainEqual(followee)
  })

  it('identifies followees', async () => {
    const followee = await userService.register(randomUserData())
    await userService.register(userData)

    const notFollowing = await userService.isFollowee(followee.id)
    await userService.follow(followee.id)
    const following = await userService.isFollowee(followee.id)

    expect(notFollowing).toBe(false)
    expect(following).toBe(true)
  })
})
