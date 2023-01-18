import axios from "axios"

const getDrones = async () => {
  const response = await axios.get("api/drones")
  return response.data
}

const getViolations = async () => {
  const response = await axios.get(`api/violations`)
  return response.data
}

export default { getDrones, getViolations }
