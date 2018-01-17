import Post from 'domain/Post'
import userService from 'services/User'
import postService from 'services/Post'

function expectPostDefined (post) {
  expect(post).toBeInstanceOf(Post)
  expect(post.id).toBeDefined()
  expect(post.userId).toBeDefined()
  expect(post.text).toBeDefined()
  expect(post.date).toBeDefined()
  expect(post.time).toBeDefined()
}

const text = 'some text'

describe('PostService', () => {
  let userId
  let post

  beforeEach( async () => {
    const userData = { userName: 'user'+Math.random(), password: 'aPassword', about: 'an about' }
    const user = await userService.register(userData)
    userId = user.id
    post = await postService.createPostByUser(userId, text)
  })

  it('creates a user post', async () => {
    const result = await postService.createPostByUser(userId, text)

    expectPostDefined(result)
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
