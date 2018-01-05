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
    //const response = await axios.post(`${process.env.API_URL}user/${userId}/posts' , JSON.stringify(request))
    const response = {
      "postId" : "263fd28a-dd21-40e3-b434-c0efbdd52f94",
      "userId" : "123e4567-e89b-12d3-a456-426655440000",
      "text" : "Anything interesting happening tonight?",
      "date" : "10/01/2018",
      "time" : "11:30:00"
    }
    return Promise.resolve( parse(response) )
  }

  getPostsOfUser(userId) {
    //const response = await axios.post(`${process.env.API_URL}user/${userId}/timeline' , JSON.stringify(request))
    const response = [{
      "postId" : "263fd28a-dd21-40e3-b434-c0efbdd52f94",
      "userId" : "123e4567-e89b-12d3-a456-426655440000",
      "text" : "Anything interesting happening tonight?",
      "date" : "10/01/2018",
      "time" : "11:30:00"
    },{
      "postId" : "1e13634e-9cdd-4a93-8ccf-acf98f342b13",
      "userId" : "123e4567-e89b-12d3-a456-426655440000",
      "text" : "Hello everyone. I'm Alice.",
      "date" : "10/01/2018",
      "time" : "09:00:00"
    }]

    return Promise.resolve(response.map( post => parse(post) ))
  }

  getWallOfUser (userId) {
    //const response = await axios.post(`${process.env.API_URL}user/${userId}/wall' , JSON.stringify(request))
    const response = [{
      "postId" : "599bad7d-f5a3-4635-9c0f-f273290de5eb",
      "userId" : "093f2342-e89b-12d3-a456-426655440000",
      "text" : "Planning to eat something with Charlie. Wanna join us?",
      "date" : "10/01/2018",
      "time" : "13:25:00"
    },{
      "postId" : "263fd28a-dd21-40e3-b434-c0efbdd52f94",
      "userId" : "123e4567-e89b-12d3-a456-426655440000",
      "text" : "Anything interesting happening tonight?",
      "date" : "10/01/2018",
      "time" : "11:30:00"
    },{
      "postId" : "078bbfae-f69e-4b7f-9c32-06c87d79fbc3",
      "userId" : "093f2342-e89b-12d3-a456-426655440000",
      "text" : "What's up everyone?",
      "date" : "10/01/2018",
      "time" : "11:20:50"
    },{
      "postId" : "eb0c15fb-f4ce-428d-a3b5-eba626ed5ffb",
      "userId" : "316h3543-e89b-12d3-a456-426655440000",
      "text" : "Hi all. Charlie here.",
      "date" : "10/01/2018",
      "time" : "09:15:34"
    },{
      "postId" : "1e13634e-9cdd-4a93-8ccf-acf98f342b13",
      "userId" : "123e4567-e89b-12d3-a456-426655440000",
      "text" : "Hello everyone. I'm Alice.",
      "date" : "10/01/2018",
      "time" : "09:00:00"
    }]
    return Promise.resolve(response.map( post => parse(post) ))
  }
}

export default new PostService()
