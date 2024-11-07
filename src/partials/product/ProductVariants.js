import React from 'react';
import Button from '@/components/Button';

const ProductVariants = ({ variants, selectedVariant, onVariantSelect }) => {
    if (!variants?.length) return null;

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Variants</h3>
            <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                    <Button
                        key={variant.id}
                        onClick={() => onVariantSelect(variant)}
                        variant={selectedVariant?.id === variant.id ? 'primary' : 'secondary'}
                        size="sm"
                        className="rounded-full"
                    >
                        {variant.attributes.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ProductVariants;