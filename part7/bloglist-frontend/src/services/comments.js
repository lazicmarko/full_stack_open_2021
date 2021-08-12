import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async (blogId, comment) => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment, config)

  return response.data
}

export default { create, setToken }
