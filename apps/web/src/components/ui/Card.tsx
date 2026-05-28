'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-lg border border-white/5 ${
        hoverable ? 'hover:border-primary/30 hover:shadow-glow transition-all cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
