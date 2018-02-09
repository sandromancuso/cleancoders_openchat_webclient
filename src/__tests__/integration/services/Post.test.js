import Post from 'domain/Post'
import userService from 'services/User'
import postService from 'services/Post'

function validDate (date) {
  const now = new Date()
  expect(date.getFullYear()).toEqual(now.getFullYear())
  expect(date.getMonth()).toEqual(now.getMonth())
  expect(date.getDate()).toEqual(now.getDate())
  expect(date.getHours()).toEqual(now.getHours())
  expect(date.getMinutes()).toEqual(now.getMinutes())
}

function expectValidPost (post, userId, text) {
  expect(post).toBeInstanceOf(Post)
  expect(post.id).toBeDefined()
  expect(post.userId).toEqual(userId)
  expect(post.text).toEqual(text)
  validDate(post.dateTime)
}

const text = 'some text'

describe('PostService', () => {
  let userId
  let post

  beforeEach(async () => {
    const userData = { userName: 'user' + Math.random(), password: 'aPassword', about: 'an about' }
    const user = await userService.register(userData)
    userId = user.id
    post = await postService.createPostByUser(userId, text)
  })

  it('creates a user post', async () => {
    const result = await postService.createPostByUser(userId, text)

    expectValidPost(result, userId, text)
  })

  it('gets posts of a user', async () => {
    const result = await postService.getPostsOfUser(userId)

    expect(result).toBeInstanceOf(Array)
    expect(result).toContainEqual(post)
  })

  it('gets the wall of a user', async () => {
    const result = await postService.getWallOfUser(userId)

    expect(result).toBeInstanceOf(Array)
    expect(result).toContainEqual(post)
  })
})
