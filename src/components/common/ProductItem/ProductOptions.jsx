"use client";

import { useState } from "react";
import styles from "./ProductOptions.module.css";
import SuccessModel from "../Notification/SuccessModel"; 

export default function ProductOptions({ 
  productName = "ATVNCG – Gathering Tee", 
  price = "500.000đ" 
}) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {

    setShowSuccess(true);

  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{productName}</h2>
      <p style={{ color: "#cbb37a", marginBottom: "15px", fontWeight: "bold" }}>{price}</p>

      <div className={styles.selectionArea}>
        {/* Chọn màu */}
        <div>
          <span className={styles.label}>Màu sắc: Red</span>
          <div className={`${styles.colorCircle} ${styles.active}`}>
            <div className={styles.innerCircle}></div>
          </div>
        </div>

        {/* Chọn Size */}
        <div>
          <span className={styles.label}>Kích thước: {selectedSize}</span>
          <div className={styles.optionsRow}>
            {["M", "L", "XL"].map((size) => (
              <div
                key={size}
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.quantityRow}>
        <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span className={styles.qtyValue}>{quantity}</span>
        <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <span className={styles.guideText}>Hướng dẫn chọn size</span>

      <button className={styles.addToCartBtn} onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </button>

      {/* Hiển thị thông báo khi thành công */}
      {showSuccess && <SuccessModel />} 
    </div>
  );
}