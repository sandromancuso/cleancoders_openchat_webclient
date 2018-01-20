import Post from 'domain/Post'
import User from 'domain/User'

export const aPost = new Post({
  id: 'an Id',
  userId: 'a user Id',
  text: 'Some text',
  dateTime: new Date('2018-03-21T04:34:12Z')
})

export const anotherPost = new Post({
  id: 'another Id',
  userId: 'another user Id',
  text: 'Some other text',
  dateTime: new Date('2017-12-06T10:43:54Z')
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
