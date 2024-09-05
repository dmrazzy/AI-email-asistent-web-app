import React from 'react';

const Spinner = ({ size = 'default', className = '' }) => {
    const sizeClasses = {
        small: 'h-4 w-4',
        default: 'h-6 w-6',
        large: 'h-8 w-8',
    };

    return (
        <div className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${className}`} role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    );
};

export default Spinner;