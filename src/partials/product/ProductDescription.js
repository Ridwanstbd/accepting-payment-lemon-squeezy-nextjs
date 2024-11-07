import React from 'react';

const ProductDescription = ({ description }) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <div
                className="prose prose-sm"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};

export default ProductDescription;