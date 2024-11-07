'use client';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { setCustomerSession } from '@/utils/session';

export default function EmailModal({ isOpen, onClose, onSubmit }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Pertama, dapatkan customer ID berdasarkan email
            const emailResponse = await fetch(`/api/customers?email=${encodeURIComponent(email)}`);
            const emailData = await emailResponse.json();

            if (!emailResponse.ok) {
                throw new Error(emailData.error || 'Failed to verify email');
            }

            // Simpan ID ke session
            setCustomerSession(emailData.id);

            // Kemudian, ambil detail lengkap customer
            const detailResponse = await fetch(`/api/customers/${emailData.id}`);
            const customerData = await detailResponse.json();

            if (!detailResponse.ok) {
                throw new Error(customerData.error || 'Failed to fetch customer details');
            }

            onSubmit(customerData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Enter Your Email">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded"
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? 'Verifying...' : 'Submit'}
                </Button>
            </form>
        </Modal>
    );
}