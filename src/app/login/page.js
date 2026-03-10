"use client";

import { useState, Suspense } from "react"; 
import styles from "./login.module.css";
import Button from "@/components/common/Button/ConfirmButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
);

function LoginForm() {
  const searchParams = useSearchParams();
  const [account, setAccount] = useState(searchParams.get("account") || "");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user_active", "true");
    window.location.href = "/highlight";
  };

  return (
    <div className={styles.loginCard}>
      <Link href="/" className="absolute top-6 left-6 text-gray-400 text-sm flex items-center gap-2 hover:text-white transition italic z-20">
         ← Trở về
      </Link>

      <div className={styles.logoArea}>
        <img src="/assets/images/logo.png" alt="8THREADS" style={{ width: "110px" }} />
        <h2 className={styles.title}>Login</h2>
      </div>

      <form onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <input 
            type="text" 
            value={account} 
            onChange={(e) => setAccount(e.target.value)} 
            placeholder="Nhập tên đăng nhập hoặc Email" 
            required 
          />
        </div>

        <div className={styles.inputGroup}>
          <input 
            type={showPass ? "text" : "password"} 
            placeholder="••••••••" 
            required 
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className={styles.eyeButton}>
            {showPass ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        
        <div className="text-right mb-6">
          <a href="#" className="text-[11px] text-gray-500 hover:text-[#cbb37a] transition">Forgot password?</a>
        </div>

        <Button size="lg" className="w-full font-bold tracking-widest uppercase">Login</Button>
      </form>

      <div className={styles.divider}>or</div>

      <div className={styles.socialIcons}>
        <span>FB</span>
        <span>GG</span>
        <span>X</span>
      </div>

      <div className="text-center text-[12px] text-gray-500">
        Don&apos;t have an account? <Link href="/register" className="text-[#cbb37a] hover:underline ml-1">Register now</Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <img 
        src="/FirstPage.png" 
        alt="Stage Ready Background" 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none spotlight-beam beam-1" style={{ zIndex: 1 }} />

      <Suspense fallback={<div className="text-[#cbb37a] tracking-widest relative z-20">LOADING...</div>}>
        <div className="relative z-10 w-full flex justify-center">
          <LoginForm />
        </div>
      </Suspense>
    </div>
  );
}