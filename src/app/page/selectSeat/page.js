"use client";

import styles from "./SelectSeat.module.css";
import Navbar from "@/components/common/Navbar/Navbar";
import Diagram from "@/components/Diagram/Diagram";
// import ProductItem from "@/components/common/ProductItem/ProductItem";
import ProductItem from "@/components/ProductItem/ProductItem";
import GoldButton from "@/components/common/Button/GoldButton";
import SeatLegend from "@/components/Diagram/Legend/SeatLegend";

export default function SelectSeatPage() {
  return (
    <div className={styles.wrapper}>
      {/* 1. Header (Navbar) */}
      <Navbar />

      <div className={styles.container}>
        {/* Tiêu đề trang nhỏ ở giữa phía trên sơ đồ */}
        <div className={styles.pageHeader}>
          <p className={styles.subTitle}>Chọn vé</p>
        </div>

        <div className={styles.mainLayout}>
          
          {/* CỘT 1: SƠ ĐỒ GHẾ NGỒI (DIAGRAM) */}
          <div className={styles.diagramArea}>
            <Diagram />
          </div>

          {/* CỘT 2: GHI CHÚ (SEAT LEGEND) */}
          <div className={styles.legendArea}>
            <SeatLegend />
          </div>

          {/* CỘT 3: GIỎ VÉ (CART) */}
          <div className={styles.cartArea}>
            <div className={styles.cartContent}>
              <h3 className={styles.cartTitle}>Giỏ vé</h3>
              
              <div className={styles.cartItems}>
                {/* Đây là các component ProductItem mà Đại ca đã viết */}
                <ProductItem 
                  name="SỤC SÔI 2" 
                  price={1200000} 
                  color="#00bfa5" 
                  initialQty={1} 
                />
                <ProductItem 
                  name="RỰC LỬA 1" 
                  price={1200000} 
                  color="#5bc0de" 
                  initialQty={2} 
                />
              </div>

              <div className={styles.cartFooter}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Tổng cộng:</span>
                  <span className={styles.totalPrice}>3.600.000đ</span>
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