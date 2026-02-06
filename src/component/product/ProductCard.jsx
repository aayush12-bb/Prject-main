import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../apps/Reducers/cartSlice"
import { addTowish } from "../../apps/Reducers/wishList"
import { toast } from 'react-hot-toast'

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleWishlist = () => {
    dispatch(addTowish(product));
    toast.success('Added to wishlist');
    navigate('/wishlist');
  };

  const handleCart = () => {
     dispatch(addToCart(product));  
    console.log("Added to cart:", product._id);
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const productLink = `/product/${product._id}`;

  return (
    <div className="relative flex flex-col items-center p-4 bg-background text-text shadow rounded border hover:shadow-xl transition">
      
      {/* Wishlist + Cart */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleWishlist}
          className="p-2 bg-white rounded-full shadow hover:bg-pink-100"
        >
          <FaRegHeart className="text-pink-500 size-3 md:size-4" />
        </button>

        <button
          onClick={handleCart}
          className="p-2 bg-white rounded-full shadow hover:bg-blue-100 border border-gray-200 cursor-pointer"
          aria-label="Add to cart"
          title="Add to cart"
        >
          <ShoppingCart className="text-black size-3 md:size-4" />
        </button>
      </div>

      {/* Image */}
      <div className="w-25 h-35 md:w-50 md:h-60 flex items-center justify-center overflow-hidden rounded-lg bg-background mb-1">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="mt-2 text-center">
        <h3 className="text-sm font-semibold text-text">{product.title}</h3>
        <p className="text-xs text-muted">
          Rs. {product.finalPrice}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-nowrap gap-1">
        <Link to={productLink}>
          <button className="viewdetails-btn whitespace-nowrap">
            View Details
          </button>
        </Link>

        <button
          onClick={handleBuyNow}
          className="buynow-btn whitespace-nowrap"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

