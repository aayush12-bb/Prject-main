import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../apps/Reducers/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart || { items: [] });

  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl mb-4">Your cart is empty 🛒</h2>
        <Link to="/" className="viewdetails-btn">Continue Shopping</Link>
      </div>
    );
  }

  const subtotal = items.reduce((sum, it) => sum + Number(it.finalPrice) * it.quantity, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto mt-36">
      <h2 className="text-3xl mb-6">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Items list */}
        <div className="md:col-span-2 flex flex-col">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4 bg-surface rounded mb-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded" />

              <div className="flex-1">
                <h3 className="text-text font-semibold">{item.title}</h3>
                <p className="text-muted text-sm">Rs. {item.finalPrice}</p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => { if (item.quantity > 1) dispatch(decreaseQuantity(item._id)); }}
                    className={`viewdetails-btn ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    aria-label="Decrease quantity"
                    title={item.quantity > 1 ? 'Decrease quantity' : 'Minimum quantity is 1'}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button> 

                  <div className="px-4 py-2 bg-background text-text rounded">{item.quantity}</div>

                  <button
                    onClick={() => dispatch(increaseQuantity(item._id))}
                    className="viewdetails-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="viewdetails-btn ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-text font-semibold">Rs. {Number(item.finalPrice) * item.quantity}</p>
                <p className="text-muted text-sm">(item total)</p>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between">
            <button onClick={() => dispatch(clearCart())} className="viewdetails-btn">Clear Cart</button>
            <Link to="/" className="viewdetails-btn">Continue Shopping</Link>
          </div>
        </div>

        {/* Order summary */}
        <aside className="bg-surface p-6 rounded h-fit">
          <h4 className="text-xl mb-4">Order Summary</h4>
          <div className="flex justify-between mb-2">
            <span className="text-muted">Subtotal</span>
            <span className="text-text">Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-muted">Shipping</span>
            <span className="text-text">Free</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total</span>
              <span className="text-xl font-semibold">Rs. {subtotal}</span>
            </div>

            <button className="buynow-btn w-full">Proceed to Checkout</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Cart