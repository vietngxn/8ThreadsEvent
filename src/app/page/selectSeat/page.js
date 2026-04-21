"use client";

import { useState, useMemo } from "react";
import styles from "./SelectSeat.module.css";
import Navbar from "@/components/common/Navbar/Navbar";
import Diagram from "@/components/Diagram/Diagram";
import ProductItem from "@/components/ProductItem/ProductItem";
import GoldButton from "@/components/common/Button/GoldButton";
import SeatLegend from "@/components/Diagram/Legend/SeatLegend";

export default function SelectSeatPage() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (ticket) => {
    setCart((prevCart) => {

      const existingItem = prevCart.find((item) => item.id === ticket.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === ticket.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prevCart, { ...ticket, qty: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty === 0) {

      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <p className={styles.subTitle}>Chọn vé</p>
        </div>

        <div className={styles.mainLayout}>
          
          <div className={styles.diagramArea}>

            <Diagram onZoneClick={handleAddToCart} />
          </div>

          <div className={styles.legendArea}>
            <SeatLegend />
          </div>

          <div className={styles.cartArea}>
            <div className={styles.cartContent}>
              <h3 className={styles.cartTitle}>Giỏ vé</h3>
              
              <div className={styles.cartItems}>
                {cart.length === 0 ? (
                  <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", fontSize: "14px", marginTop: "20px" }}>
                    Chưa có vé nào. Vui lòng chọn khu vực trên sơ đồ!
                  </p>
                ) : (
                  cart.map((item) => (
                    <ProductItem 
                      key={item.id}
                      id={item.id}
                      name={item.name} 
                      price={item.price} 
                      color={item.color} 
                      qty={item.qty} 
                      onQuantityChange={handleUpdateQuantity}
                    />
                  ))
                )}
              </div>

              <div className={styles.cartFooter}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Tổng cộng:</span>
                  {/* Hiển thị tổng tiền động đã được format */}
                  <span className={styles.totalPrice}>
                    {totalPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                
                <div className={styles.btnWrapper}>
                  <GoldButton>Xác nhận</GoldButton>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}