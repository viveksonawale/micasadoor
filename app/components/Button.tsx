import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const combinedStyles = `${styles.base} ${styles[variant]} ${styles[size]} ${className}`;

  const content = (
    <span className={styles.btnContentWrapper}>
      <span className={styles.btnContent}>
        <span className={styles.textPrimary}>{children}</span>
        <span className={styles.textHover} aria-hidden="true">{children}</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {content}
    </button>
  );
}
