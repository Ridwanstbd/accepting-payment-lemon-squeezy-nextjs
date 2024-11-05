"use client"
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const buyProduct1 = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/purchaseProduct', {
        productId: "586600"
      })
      if (response.data.checkoutUrl) {
        window.open(response.data.checkoutUrl, "_blank");
      } else {
        alert("Checkout URL not found in the response");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert('error');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center justify-between sm:items-start">
      <button
        onClick={buyProduct1}
        className={`p-3 border border-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Buy Product 1 for 150.000 IDR'}
      </button>
    </main>
  );
}
