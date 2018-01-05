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
      "postId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1",
      "userId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "text" : "Anything interesting happening tonight?",
      "date" : "10/01/2018",
      "time" : "11:30:00"
    }
    return Promise.resolve( parse(response) )
  }

  getPostsOfUser(userId) {
    //const response = await axios.post(`${process.env.API_URL}user/${userId}/timeline' , JSON.stringify(request))
    const response = [{
      "postId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1",
      "userId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "text" : "Anything interesting happening tonight?",
      "date" : "10/01/2018",
      "time" : "11:30:00"
    },{
      "postId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx2",
      "userId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "text" : "Hello everyone. I'm Alice.",
      "date" : "10/01/2018",
      "time" : "09:00:00"
    }]
    return Promise.resolve(response.map( post => parse(post) ))
  }

  getWallOfUser (userId) {
    //const response = await axios.post(`${process.env.API_URL}user/${userId}/wall' , JSON.stringify(request))
    const response = [{
      "postId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx3",
      "userId" : "BOB_IDxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "text" : "Planning to eat something with Charlie. Wanna join us?",
      "date" : "10/01/2018",
      "time" : "13:25:00"
    },{
      "postId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1",
      "userId" : "ALICE_ID-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "text" : "Anything interesting happening tonight?",
      "date" : "10/01/2018",
      "time" : "11:30:00"
    },{
      "postId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx4",
      "userId" : "BOB_IDxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "text" : "What's up everyone?",
      "date" : "10/01/2018",
      "time" : "11:20:50"
    },{
      "postId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx5",
      "userId" : "CHARLIE_IDxx-xxxx-xxxx-xxxxxxxxxxxx",
      "text" : "Hi all. Charlie here.",
      "date" : "10/01/2018",
      "time" : "09:15:34"
    },{
      "postId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx6",
      "userId" : "ALICE_ID-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "text" : "Anything interesting happening tonight?",
      "date" : "10/01/2018",
      "time" : "09:00:00"
    }]
    return Promise.resolve(response.map( post => parse(post) ))
  }
}

export default new PostService()
