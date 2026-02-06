import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { removeFromwish } from '../apps/Reducers/wishList';

function WishList() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wish || { items: [] });

  if (!items || items.length === 0) {
    return <h2 className="p-8 text-center">Your wishlist is empty 🛒</h2>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto mt-38">
      <h2 className="text-2xl mb-4">Your wish</h2>

      {items.map((item) => (
        <div
          key={item._id}
          className="flex justify-between border-b py-3"
        >
          <div>
            <h3>{item.title}</h3>
            <p>
              Rs. {item.finalPrice} × {item.quantity}
            </p>
          </div>

          <button
            onClick={() => dispatch(removeFromwish(item._id))}
            className="viewdetails-btn"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default WishList;