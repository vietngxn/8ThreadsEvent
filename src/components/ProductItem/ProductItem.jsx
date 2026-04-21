"use client";
import "./ProductItem.css";

function ProductItem({
  id,               
  color,
  name,
  price,
  qty,              
  onQuantityChange  
}) {
  
  const formatPrice = (value) =>
    value.toLocaleString("vi-VN") + "đ";

  return (
    <div className="product-wrapper">
      <div
        className="product-swatch"
        style={{ backgroundColor: color }}
      />

      <div className="product-info">
        <span className="product-name">{name}</span>
        <span className="product-price">
          Đơn giá: {formatPrice(price)}
        </span>
      </div>

      <div className="qty-wrapper">
        <button
          className="qty-btn"
          onClick={() => onQuantityChange(id, qty - 1)}
        >
          −
        </button>

        <span className="qty-value">{qty}</span>

        <button
          className="qty-btn"
          onClick={() => onQuantityChange(id, qty + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductItem;