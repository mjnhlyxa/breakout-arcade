'use client';

import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'info', children, className = '' }: BadgeProps) {
  const variantStyles = {
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-secondary/20 text-secondary border border-secondary/30',
    error: 'bg-error/20 text-error border border-error/30',
    info: 'bg-primary/20 text-primary border border-primary/30',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
