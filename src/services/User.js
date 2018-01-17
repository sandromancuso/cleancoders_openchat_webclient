import axios from 'axios'
import User from 'domain/User'

const parse = data => new User({
  id: data.userId,
  name: data.username,
  about: data.about
})

class UserService {
  constructor () {
    const userData = localStorage.getItem('user')
    if (userData) this.user = new User(JSON.parse(userData))
  }

  async register (user) {
    const request = {
      username: user.userName,
      password: user.password,
      about: user.about
    }
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}registration`,
      JSON.stringify(request) )

    this.user = parse(response.data)
    localStorage.setItem('user', JSON.stringify(this.user))
    return this.user
  }

  async login ({ userName, password }) {
    const request = {
      username : userName,
      password : password
    }
    const response = await axios.post(`${process.env.REACT_APP_API_URL}login`,
      JSON.stringify(request) )

    this.user = parse(response.data)
    localStorage.setItem('user', JSON.stringify(this.user))
    return this.user
  }

  async logout () {
    this.user = null
    localStorage.clear()
  }

  async getUsers () {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}users`)
    const users = response.data.map(user => parse(user) )

    this.usersHash = users.reduce( (map, user) => {
      map[user.id] = user
      return map
    }, {})

    return users
  }

  async findById (id) {
    const userNotCached = !this.usersHash || !this.usersHash[id]
    if (userNotCached) await this.getUsers()

    return this.usersHash[id]
  }

  async follow (id) {
    const request = {
      followerId: this.user.id,
      followeeId: id
    }
    await axios.post(
      `${process.env.REACT_APP_API_URL}follow`,
      JSON.stringify(request))
  }

  async getFollowees () {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}user/${this.user.id}/followees`)

    return response.data.map(user => parse(user) )
  }
}

export default new UserService()
