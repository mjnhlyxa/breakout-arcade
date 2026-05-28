'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-primary/20">
        {title && (
          <h2 className="font-orbitron text-xl font-bold text-primary mb-4">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
