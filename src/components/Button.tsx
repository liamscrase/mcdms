// Button component
// Wraps IonButton with consistent default props and strong typing.

import React from 'react';
import { IonButton } from '@ionic/react';

type ButtonFill = 'clear' | 'default' | 'outline' | 'solid';
type ButtonSize = 'default' | 'large' | 'small';
type ButtonColor =
  | 'danger'
  | 'dark'
  | 'light'
  | 'medium'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'tertiary'
  | 'warning';

interface ButtonProps {
  children: React.ReactNode;
  color?: ButtonColor;
  expand?: 'block' | 'full';
  fill?: ButtonFill;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'reset' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  expand,
  fill = 'solid',
  size = 'default',
  disabled = false,
  onClick,
  type = 'button',
}) => {
  return (
    <IonButton
      color={color}
      expand={expand}
      fill={fill}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </IonButton>
  );
};

export default Button;
