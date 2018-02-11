import axios from 'axios'
import User from 'domain/User'
import APIError from 'domain/APIError'

axios.interceptors.response.use(
  response => response,
  error => error.response
    ? Promise.reject(new APIError(error.response))
    : Promise.reject(error)
)

const parse = data => new User({
  id: data.id,
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
      `${process.env.REACT_APP_API_URL}users`,
      JSON.stringify(request))

    this.user = parse(response.data)
    localStorage.setItem('user', JSON.stringify(this.user))
    return this.user
  }

  async login ({ userName, password }) {
    const request = {
      username: userName,
      password: password
    }
    const response = await axios.post(`${process.env.REACT_APP_API_URL}login`,
      JSON.stringify(request))

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
    const users = response.data.map(user => parse(user))

    this.usersHash = users.reduce((map, user) => {
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
      `${process.env.REACT_APP_API_URL}followings`,
      JSON.stringify(request))
  }

  async getFollowees () {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}followings/${this.user.id}/followees`)

    return response.data.map(user => parse(user))
  }

  async isFollowee (id) {
    const followees = await this.getFollowees()
    return followees.some(user => user.id === id)
  }
}

export default new UserService()
