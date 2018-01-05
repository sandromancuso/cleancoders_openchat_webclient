import axios from 'axios'
import User from 'domain/User'

const parse = data => new User({
  id: data.userId,
  name: data.username,
  about: data.about
})

class UserService {
  async register (user) {
    const request = {
      username: user.name,
      password: user.password,
      about: user.about
    }
    //const response = await axios.post(process.env.API_URL + 'registration/', JSON.stringify(request))

    const response = {
      userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      username: "Alice",
      about: "I love playing the piano and travelling."
    }
    this.user = parse(response)
    return Promise.resolve( parse(response) )
  }

  async login ({ userName, password }) {
    const request = {
      username : userName,
      password : password
    }
    //const response = await axios.post(process.env.API_URL + 'login/', JSON.stringify(request))

    const response = {
      "userId" : "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "username" : "Alice",
      "about" : "I love playing the piano and travelling."
    }
    this.user = parse(response)
    return Promise.resolve( parse(response) )
  }

  async logout () {
    this.user = null
  }

  async follow (current, toFollow) {
    const request = {
      followerId: current,
      followeeId: toFollow
    }
    //const response = await axios.post(process.env.API_URL + 'follow/', JSON.stringify(request))

    return Promise.resolve(true)
  }

  async getUsers () {
    //const response = await axios.get(process.env.API_URL + 'users/'))
    const response = [{
      "userId" : "123e4567-e89b-12d3-a456-426655440000",
      "username" : "Alice",
      "about" : "I love playing the pianno and travel.",
    },{
      "userId" : "093f2342-e89b-12d3-a456-426655440000",
      "username" : "Bob",
      "about" : "Writer and photographer. Passionate about food and languages.",
      "follows" : "false"
    },{
      "userId" : "316h3543-e89b-12d3-a456-426655440000",
      "username" : "Charlie",
      "about" : "I'm a basketball player, love cycling and meeting new people. ",
      "follows" : "true"
    }]

    this.users = response.map(user => parse(user) )
      .reduce( (map, user) => {
        map[user.id] = user
        return map
      })

    return Promise.resolve( response.map(user => parse(user) ))
  }

  async findById (id) {
    if (!this.users) await this.getUsers()
    return this.users[id]
  }
}

export default new UserService()
