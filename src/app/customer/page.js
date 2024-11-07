'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmailModal from '@/components/EmailModal';
import { setCustomerSession, getCustomerSession, removeCustomerSession } from '@/utils/session';
import Loading from '@/components/Loading';
import CustomerDashboard from '@/pages/customer/CustomerDashboard';
import Button from '@/components/Button';

export default function CustomerPage() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const customerId = getCustomerSession();
        if (customerId) {
            fetchCustomerData(customerId);
        } else {
            setShowModal(true);
            setLoading(false);
        }
    }, []);

    const fetchCustomerData = async (customerId) => {
        try {
            const response = await fetch(`/api/customers/${customerId}`);
            const data = await response.json();
            if (response.ok) {
                setCustomerData(data);
            } else {
                throw new Error(data.error || 'Failed to fetch customer data');
            }
        } catch (error) {
            console.error('Error fetching customer data:', error);
            removeCustomerSession();
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = (data) => {
        setCustomerData(data);
        setCustomerSession(data.id);
        setShowModal(false);
    };

    const handleLogout = () => {
        removeCustomerSession();
        setCustomerData(null);
        setShowModal(true);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-4">
            <EmailModal
                isOpen={showModal}
                onClose={() => router.push('/')}
                onSubmit={handleEmailSubmit}
            />

            {customerData ? (
                <CustomerDashboard
                    customerData={customerData}
                    onLogout={handleLogout}
                />
            ) : (
                <div className="text-center">
                    <p>Please enter your email to view your customer dashboard.</p>
                    <Button onClick={() => setShowModal(true)} className="mt-4">
                        Enter Email
                    </Button>
                </div>
            )}
        </div>
    );
}