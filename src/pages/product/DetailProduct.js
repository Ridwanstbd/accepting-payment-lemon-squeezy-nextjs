import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@/components/Button';
import Price from '@/components/Price';
import ProductImage from '@/partials/product/ProductImage';
import ProductVariants from '@/partials/product/ProductVariants';
import ProductDescription from '@/partials/product/ProductDescription';

export default function DetailProduct({ productId }) {
    const [productDetail, setProductDetail] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}`);
                setProductDetail(response.data);
                if (response.data.variants.length > 0) {
                    setSelectedVariant(response.data.variants[0]);
                }
                setLoading(false);
            } catch (error) {
                setError('Failed to load product details');
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetail();
        }
    }, [productId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                {error}
            </div>
        );
    }

    if (!productDetail) return null;

    const { product, variants } = productDetail;

    const handleBuyNow = async () => {
        try {
            const variantId = selectedVariant?.id;
            const response = await axios.post('/api/purchaseProduct', {
                productId: variantId
            })
            window.open(response.data.checkoutUrl, "_blank")
        } catch (error) {
            alert("pembelian gagal")
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <ProductImage
                imageUrl={product.attributes.thumb_url}
                productName={product.attributes.name}
            />

            <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">{product.attributes.name}</h2>

                <ProductDescription description={product.attributes.description} />

                <ProductVariants
                    variants={variants}
                    selectedVariant={selectedVariant}
                    onVariantSelect={setSelectedVariant}
                />

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Price</h3>
                    <Price
                        amount={
                            selectedVariant
                                ? selectedVariant.attributes.price
                                : product.attributes.price_formatted
                        }
                    />
                </div>

                <Button
                    onClick={handleBuyNow}
                    variant="primary"
                    className="w-full py-3"
                >
                    Buy Now
                </Button>
            </div>
        </div>
    );
}