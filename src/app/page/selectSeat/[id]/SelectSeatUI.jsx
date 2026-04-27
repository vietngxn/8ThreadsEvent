"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "../SelectSeat.module.css";
import Navbar from "@/components/common/Navbar/Navbar";
import Diagram from "@/components/Diagram/Diagram";
import ProductItem from "@/components/ProductItem/ProductItem";
import GoldButton from "@/components/common/Button/GoldButton";
import SeatLegend from "@/components/Diagram/Legend/SeatLegend";
import NotificationModal from "@/components/common/Notification/NotificationModal.jsx";
import BackButton from "@/components/common/Button/BackButton";

export default function SelectSeatUI({ ticketTypes, eventId }) {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "warning",
    message: "",
    subMessage: "",
    buttonText: "Xác nhận",
    onConfirm: null,
  });

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const openModal = (config) => {
    setModalConfig({
      isOpen: true,
      type: config.type || "warning",
      message: config.message,
      subMessage: config.subMessage || "",
      buttonText: config.buttonText || "Xác nhận",
      onConfirm: config.onConfirm || closeModal,
    });
  };

  const handleAddToCart = (ticket) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === ticket.id);

      if (existingItem) {
        if (existingItem.qty >= ticket.maxQty) {
          openModal({
            message: "Thông cảm khu vực này",
            subMessage: `chỉ còn đúng ${ticket.maxQty} vé thôi ạ!`,
          });
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === ticket.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      if (ticket.maxQty < 1) {
        openModal({
          message: "Khu vực này đã cháy vé!",
          subMessage: "Vui lòng chọn khu vực khác trên sơ đồ.",
        });
        return prevCart;
      }

      return [...prevCart, { ...ticket, qty: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.id === id) {
            if (newQty > item.maxQty) {
              openModal({
                message: `Khu vực này chỉ còn tối đa ${item.maxQty} vé!`,
              });
              return item;
            }
            return { ...item, qty: newQty };
          }
          return item;
        }),
      );
    }
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const handleConfirm = () => {
    if (cart.length === 0) {
      openModal({
        message: "Giỏ vé đang trống!",
        subMessage: "Vui lòng chọn ít nhất 1 vé trên sơ đồ nhé.",
      });
      return;
    }

    openModal({
      type: "success",
      message: "Xác nhận đơn hàng",
      subMessage: "Hệ thống đang chuyển đến trang thanh toán...",
      buttonText: "Tiếp tục",
      onConfirm: () => {
        localStorage.setItem("temp_cart", JSON.stringify(cart));
        router.push(`/page/checkout?eventId=${eventId}`);
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.navigation}>
            <BackButton label="Trở về" />
          </div>

          <div className={styles.pageHeader}>
            <p className={styles.subTitle}>Chọn vé</p>
          </div>

          <div className={styles.placeholder}></div>
        </div>

        <div className={styles.mainLayout}>
          <div className={styles.diagramArea}>
            <Diagram onZoneClick={handleAddToCart} ticketTypes={ticketTypes} />
          </div>
          <div className={styles.legendArea}>
            <SeatLegend />
          </div>
          <div className={styles.cartArea}>
            <div className={styles.cartContent}>
              <h3 className={styles.cartTitle}>Giỏ vé</h3>
              <div className={styles.cartItems}>
                {cart.length === 0 ? (
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      fontSize: "14px",
                      marginTop: "20px",
                    }}
                  >
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
                  <span className={styles.totalPrice}>
                    {totalPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className={styles.btnWrapper}>
                  <GoldButton onClick={handleConfirm}>Xác nhận</GoldButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        message={modalConfig.message}
        subMessage={modalConfig.subMessage}
        buttonText={modalConfig.buttonText}
        onConfirm={modalConfig.onConfirm}
        onClose={closeModal}
      />
    </div>
  );
}
