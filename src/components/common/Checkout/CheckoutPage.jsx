"use client";

import styles from "./Checkout.module.css";

export default function CheckoutPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.checkoutContainer}>
        
        <div className={styles.panel}>
          <h3 className={styles.title}>Thông tin giao hàng</h3>
          <div className={styles.formGrid}>
            <input className={styles.input} placeholder="Nhập họ và tên" />
            <input className={styles.input} placeholder="Nhập email" />
            <input className={styles.input} placeholder="Nhập số điện thoại" />
            <input className={styles.input} value="Việt Nam" readOnly style={{opacity: 0.5}} />
            <input className={`${styles.input} ${styles.fullWidth}`} placeholder="Địa chỉ, tên đường" />
            <input className={`${styles.input} ${styles.fullWidth}`} placeholder="Địa chỉ, tên đường" />
          </div>

          <div style={{marginTop: '35px'}}>
            <p className={styles.title} style={{fontSize: '12px', marginBottom: '10px'}}>Mã khuyến mãi</p>
            <button className={styles.promoBtn}>+ Thêm khuyến mãi</button>
          </div>

          <div style={{marginTop: '45px'}}>
            <h3 className={styles.title}>Phương thức thanh toán</h3>
            <div className={styles.paymentBox}>
               <input type="radio" checked readOnly style={{accentColor: '#cbb37a', width: '18px', height: '18px'}} />
               <img src="/assets/images/image 10.png" alt="VNPAY" className={styles.vnpayLogo} />
               <span style={{fontSize: '14px', fontWeight: 500, marginLeft: '5px'}}>VNPAY/Ứng dụng ngân hàng</span>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <h3 className={styles.title} style={{textAlign: 'center', marginBottom: '35px'}}>Giỏ hàng</h3>
          
          <div className={styles.cartItem}>
            <div className={styles.productImg}></div>
            <div style={{flex: 1}}>
              <h4 style={{fontSize: '13px', margin: '0 0 5px', fontWeight: 600}}>ATVNCG – Gathering Tee</h4>
              <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0}}>
                Đen/M • <span className={styles.goldText}>600.000đ</span>
              </p>
            </div>
            <div className={styles.qtyBox}>
              <span style={{cursor: 'pointer', color: '#cbb37a'}}>–</span> 
              <span style={{fontWeight: 700}}>2</span> 
              <span style={{cursor: 'pointer', color: '#cbb37a'}}>+</span>
            </div>
          </div>

          <div className={styles.summarySection}>
            <div className={styles.summaryRow}>
              <span>Tổng tiền hàng</span>
              <span className={styles.goldText}>600.000đ</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Phí vận chuyển</span>
              <span className={styles.goldText}>100.000đ</span>
            </div>
            <div className={styles.totalRow}>
              <span style={{fontSize: '14px'}}>Tổng thanh toán</span>
              <span className={styles.goldText} style={{fontSize: '22px'}}>700.000đ</span>
            </div>
            
            <p style={{
              fontSize: '11px', 
              color: 'rgba(255,255,255,0.4)', 
              marginTop: '15px', 
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Bằng việc tiến hành thanh toán, bạn đã đồng ý với <br/>
              <span style={{textDecoration: 'underline', cursor: 'pointer', color: '#fff'}}>điều khoản sử dụng</span> của chúng tôi.
            </p>
          </div>

          <button className={styles.btnThanhToan}>
            Thanh Toán
          </button>
        </div>

      </div>
    </div>
  );
}