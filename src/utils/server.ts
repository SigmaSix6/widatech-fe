/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios from "axios"
axios.defaults.baseURL = "http://localhost:3001"

const getTotalInvoice = async () => {
  try {
    const response = await axios.get(`/invoice/getTotalInvoice/`)
    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}

const getInvoice = async (idx: string) => {
  try {
    const response = await axios.get(`/invoice/getInvoice/${idx}`)
    return response.data
  } catch (error) {
    console.error(error)
    return error
  }
}

const insertInvoice = async (data: unknown) => {
  try {
    const response = await axios.post("/invoice/insertInvoice", data)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

export { getInvoice, insertInvoice, getTotalInvoice }
