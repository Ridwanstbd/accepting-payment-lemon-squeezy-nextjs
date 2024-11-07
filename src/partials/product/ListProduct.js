import React from 'react';
import Card from '@/components/Card';

const ListProduct = ({ products, onProductClick }) => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        imageUrl={product.attributes.thumb_url}
                        title={product.attributes.name}
                        price={product.attributes.price_formatted}
                        onClick={() => onProductClick(product.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListProduct;