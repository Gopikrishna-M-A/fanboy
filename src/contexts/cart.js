'use client'

import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../lib/cartQueries'
import { useAuth } from '@/hooks/useAuth' 

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const { user } = useAuth() 

  const cartQueryKey = user ? ['cart', user.id] : ['cart', 'anonymous']

  const { data: cart, isLoading, error } = useQuery({
    queryKey: cartQueryKey,
    queryFn: fetchCart,
  })

  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey })
      const previousCart = queryClient.getQueryData(cartQueryKey)
      queryClient.setQueryData(cartQueryKey, (old) => ({
        ...old,
        items: [...(old?.items || []), newItem],
      }))
      return { previousCart }
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(cartQueryKey, context.previousCart)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
    },
  })

  const updateCartMutation = useMutation({
    mutationFn: updateCartItem,
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey })
      const previousCart = queryClient.getQueryData(cartQueryKey)
      queryClient.setQueryData(cartQueryKey, (old) => ({
        ...old,
        items: old.items.map((item) =>
          item.jersey._id === updatedItem.jerseyId && item.size === updatedItem.size
            ? { ...item, quantity: updatedItem.quantity }
            : item
        ),
      }))
      return { previousCart }
    },
    onError: (err, updatedItem, context) => {
      queryClient.setQueryData(cartQueryKey, context.previousCart)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
    },
  })

  const removeFromCartMutation = useMutation({
    mutationFn: removeFromCart,
    onMutate: async (removedItem) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey })
      const previousCart = queryClient.getQueryData(cartQueryKey)
      queryClient.setQueryData(cartQueryKey, (old) => ({
        ...old,
        items: old.items.filter(
          (item) => !(item.jersey._id === removedItem.jerseyId && item.size === removedItem.size)
        ),
      }))
      return { previousCart }
    },
    onError: (err, removedItem, context) => {
      queryClient.setQueryData(cartQueryKey, context.previousCart)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
    },
  })

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey })
      const previousCart = queryClient.getQueryData(cartQueryKey)
      queryClient.setQueryData(cartQueryKey, { items: [] })
      return { previousCart }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(cartQueryKey, context.previousCart)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
    },
  })

  const cartTotalPrice = cart?.items?.reduce((sum, item) => sum + item?.jersey?.price * item?.quantity, 0) || 0
  const cartTotalQuantity = cart?.items?.reduce((sum, item) => sum + item?.quantity, 0) || 0

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addToCart: addToCartMutation.mutate,
        updateCart: updateCartMutation.mutate,
        removeFromCart: removeFromCartMutation.mutate,
        clearCart: clearCartMutation.mutate,
        cartTotalPrice,
        cartTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)