import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    className,
    ...props
}) => {
    const baseStyles = 'font-semibold rounded-md transition-colors';
    const variantStyles = {
        primary: 'bg-gray-800 text-white hover:bg-gray-900',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    };
    const sizeStyles = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2',
        large: 'px-6 py-3 text-lg',
    };

    const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`;

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};