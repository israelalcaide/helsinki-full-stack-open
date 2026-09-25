import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const updatePerson = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject)
}

const removePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, updatePerson , removePerson}