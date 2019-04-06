import axios from 'axios'
const url = 'http://localhost:3001/persons'

const findAll = () => {
    const request = axios.get(url)
  return request.then(response => response.data)
}

const createnew = newObject => {
  const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
  return request.then(response => response.data)
}

const erase = (id) => {
  return axios.delete(`${url}/${id}`)
}

export default { 
  findAll, createnew, update, erase 
}