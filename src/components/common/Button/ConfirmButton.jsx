"use client";

import styles from "./Button.module.css";
import clsx from "clsx";

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "goldSilver",
  size = "md",
  className,
}) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
}
