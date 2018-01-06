import Post from 'domain/Post'
import User from 'domain/User'

export const aPost = new Post({
  id: 'an Id',
  userId: 'a user Id',
  text: 'Some text',
  date: '18/02/2018',
  time: '11:12:13'
})

export const anotherPost = new Post({
  id: 'another Id',
  userId: 'another user Id',
  text: 'Some other text',
  date: '19/02/2017',
  time: '13:14:15'
})

export const somePosts = [
  aPost,
  anotherPost
]

export const aUser = new User({
  id: 'some id',
  name: 'some name',
  about: 'about him'
})

export const anotherUser = new User({
  id: 'another id',
  name: 'another name',
  about: 'some another about text'
})

export const someUsers = [
  aUser,
  anotherUser
]
