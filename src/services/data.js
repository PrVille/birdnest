import axios from "axios"

const baseUrl = "/api/data"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getPilot = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export default { getAll, getPilot }
