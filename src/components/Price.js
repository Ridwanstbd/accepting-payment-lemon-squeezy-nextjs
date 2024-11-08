import React from 'react';

const Price = ({ amount, className = '' }) => {
    const cleanPrice = (price) => {
        return price % 100 === 0 ? price / 100 : price;
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(cleanPrice(price));
    };

    return (
        <p className={`text-3xl font-bold text-blue-600 ${className}`}>
            {typeof amount === 'number' ? formatPrice(amount) : amount}
        </p>
    );
};

export default Price;