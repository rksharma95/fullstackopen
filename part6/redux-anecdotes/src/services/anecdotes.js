import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(baseUrl, 
    {content:anecdote, id: getId(), votes:0})
  return response.data
}
export default { getAll, create }