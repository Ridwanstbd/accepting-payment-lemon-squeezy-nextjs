import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import DetailProduct from './DetailProduct';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        setSelectedProductId(productId);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <Image
                            src={product.attributes.thumb_url}
                            alt={product.attributes.name}
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{product.attributes.name}</h3>
                            <p className="text-gray-600 font-bold">{product.attributes.price_formatted}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProductId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setSelectedProductId(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <DetailProduct productId={selectedProductId} />
                    </div>
                </div>
            )}
        </div>
    )
}