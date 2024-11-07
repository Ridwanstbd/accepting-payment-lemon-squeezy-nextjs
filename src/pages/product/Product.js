import { useState, useEffect } from 'react';
import axios from 'axios';
import ListProduct from '@/partials/product/ListProduct';
import Modal from '@/partials/Modal';
import DetailProduct from './DetailProduct';

export default function Product() {
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <>
            <ListProduct
                products={products}
                onProductClick={setSelectedProductId}
            />

            <Modal
                isOpen={!!selectedProductId}
                onClose={() => setSelectedProductId(null)}
            >
                <DetailProduct productId={selectedProductId} />
            </Modal>
        </>
    )
}