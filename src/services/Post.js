import axios from 'axios'
import Post from 'domain/Post'

const parse = data => new Post(
  {
    id: data.postId,
    userId: data.userId,
    text: data.text,
    date: data.date,
    time: data.time
  })

class PostService {
  async createPostByUser (userId, text) {
    const request = {
      text : text
    }
    const response = await axios.post(`${process.env.REACT_APP_API_URL}user/${userId}/posts`,
      JSON.stringify(request) )

    return parse(response.data)
  }

  async getPostsOfUser(userId) {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}user/${userId}/timeline`)

    return response.data.map( post => parse(post) )
  }

  async getWallOfUser (userId) {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}user/${userId}/wall`)

    return response.data.map( post => parse(post) )
  }
}

export default new PostService()
