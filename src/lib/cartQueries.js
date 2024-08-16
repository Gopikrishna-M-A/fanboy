import axios from 'axios'

export const fetchCart = async () => {
  const response = await axios.get('/api/carts')
  return response.data
}

export const addToCart = async ({ jerseyId, quantity, size }) => {
  const response = await axios.post('/api/carts', { jerseyId, quantity, size })
  return response.data
}

export const updateCartItem = async ({ jerseyId, quantity, size }) => {
  const response = await axios.put('/api/carts', { jerseyId, quantity, size })
  return response.data
}

export const removeFromCart = async ({ jerseyId, size }) => {
  const response = await axios.delete(`/api/carts?id=${jerseyId}&size=${size}`)
  return response.data
}

export const clearCart = async () => {
  const response = await axios.delete('/api/carts')
  return response.data
}