import React from 'react';

const Price = ({ amount, className = '' }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    return (
        <p className={`text-3xl font-bold text-blue-600 ${className}`}>
            {typeof amount === 'number' ? formatPrice(amount) : amount}
        </p>
    );
};

export default Price;