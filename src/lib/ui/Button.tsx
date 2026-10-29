'use client';

import type { ReactNode } from 'react';

type ButtonProps = {
  text: ReactNode;
  onClick?: () => void;
  className?: string;
};

function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}

export default Button;
