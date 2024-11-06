import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function DetailProduct({ productId }) {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="flex flex-col">
            <div className="relative w-full h-64 mb-4">
                {product.attributes.large_thumb_url ? (
                    <Image
                        src={product.attributes.large_thumb_url}
                        alt={product.attributes.name}
                        layout="fill"
                        objectFit="cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}
            </div>

            <h2 className="text-2xl font-bold mb-2">{product.attributes.name}</h2>
            <p className="text-xl font-bold text-gray-700 mb-4">{product.attributes.price_formatted}</p>

            <div className="prose prose-sm max-w-none mb-4"
                dangerouslySetInnerHTML={{ __html: product.attributes.description }}
            />

            {product.attributes.status === 'published' && (
                <a
                    href={product.attributes.buy_now_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
                >
                    Buy Now
                </a>
            )}

            {product.attributes.test_mode && (
                <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                    This product is in test mode
                </div>
            )}
        </div>
    );
}