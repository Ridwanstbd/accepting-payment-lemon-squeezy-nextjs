import React from 'react';
import Image from 'next/image';

const ProductImage = ({ imageUrl, productName }) => {
    return (
        <div className="md:w-1/2 relative">
            <div className="relative w-full h-[400px]">
                <Image
                    src={imageUrl}
                    alt={productName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
        </div>
    );
};

export default ProductImage;