'use client'

import { createContext, useContext, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../lib/cartQueries'
import { useAuth } from '@/hooks/useAuth' 

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const { user } = useAuth() 
  const [couponError, setCouponError] = useState('')
  const [isCouponLoading, setIsCouponLoading] = useState(false)
  const [isCouponRemoveLoading, setIsCouponRemoveLoading] = useState(false)


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
  
  const applyCouponMutation = useMutation({
    mutationFn: async (couponCode) => {
      setIsCouponLoading(true)
      const response = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to apply coupon')
      }
      return response.json()
    },
    onMutate: async (couponCode) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey })
      const previousCart = queryClient.getQueryData(cartQueryKey)
      setCouponError('')
      return { previousCart }
    },
    onError: (err, couponCode, context) => {
      queryClient.setQueryData(cartQueryKey, context.previousCart)
      setCouponError(err.message)
    },
    onSuccess: (newCartData) => {
      queryClient.setQueryData(cartQueryKey, newCartData.cart)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
      setIsCouponLoading(false)
    },
  })

  // New mutation for removing a coupon
  const removeCouponMutation = useMutation({
    mutationFn: async () => {
      setIsCouponRemoveLoading(true)
      const response = await fetch('/api/coupons', {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to remove coupon')
      }
      return response.json()
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey })
      const previousCart = queryClient.getQueryData(cartQueryKey)
      setCouponError('')
      return { previousCart }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(cartQueryKey, context.previousCart)
      setCouponError(err.message)
    },
    onSuccess: (newCartData) => {
      queryClient.setQueryData(cartQueryKey, newCartData)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey })
      setIsCouponRemoveLoading(false)
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
        applyCoupon: applyCouponMutation.mutate,
        removeCoupon: removeCouponMutation.mutate,
        cartTotalPrice,
        cartTotalQuantity,
        couponError,
        isCouponLoading,
        isCouponRemoveLoading
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)