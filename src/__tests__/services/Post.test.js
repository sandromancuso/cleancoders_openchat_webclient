import Post from 'domain/Post'
import postService from 'services/Post'

describe('PostService', () => {
  it('creates a user post', async () => {
    const userId = 'an Id'
    const text = 'some text'

    const result = await postService.createPostByUser(userId, text)

    expect(result).toBeInstanceOf(Post)
    expect(result.id).toBeDefined()
    expect(result.userId).toBeDefined()
    expect(result.text).toBeDefined()
    expect(result.date).toBeDefined()
    expect(result.time).toBeDefined()
  })

  it('gets posts of a user', async () => {
    const userId = 'an Id'

    const result = await postService.getPostsOfUser(userId)

    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(Post)
    expect(result[0].id).toBeDefined()
    expect(result[0].userId).toBeDefined()
    expect(result[0].text).toBeDefined()
    expect(result[0].date).toBeDefined()
    expect(result[0].time).toBeDefined()
  })

  it('gets the wall of a user', async () => {
    const userId = 'an Id'

    const result = await postService.getWallOfUser(userId)

    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toBeInstanceOf(Post)
    expect(result[0].id).toBeDefined()
    expect(result[0].userId).toBeDefined()
    expect(result[0].text).toBeDefined()
    expect(result[0].date).toBeDefined()
    expect(result[0].time).toBeDefined()
  })
})
