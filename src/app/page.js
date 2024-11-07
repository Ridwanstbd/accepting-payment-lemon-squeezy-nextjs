"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListProduct from '@/pages/product/ListProduct';
import Modal from '@/components/Modal';
import Loading from '@/components/Loading';
import DetailProduct from '@/pages/product/DetailProduct';

export default function Home() {
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
      <Loading />
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