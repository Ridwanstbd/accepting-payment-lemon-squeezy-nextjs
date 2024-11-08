/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/Button";
import { useEffect, useState } from "react"
const Subscriptions = ({ customerId }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState(null)
    const [loadingId, setLoadingId] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const fetchSubscriptions = async () => {
        try {
            const response = await fetch(`/api/customers/${customerId}`)
            if (!response.ok) {
                throw new Error('Failed to fetch subscriptions');
            }
            const data = await response.json()
            setSubscriptions(data.subscriptions)
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchSubscriptions()
    }, [customerId])


    useEffect(() => {
        if (successMessage) {
            fetchSubscriptions()
        }
    }, [successMessage])


    const handleResubscribe = async (subscriptionId) => {
        setLoadingId(subscriptionId);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch('/api/customers/resubscribe', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subscriptionId }),
            });

            if (!response.ok) {
                throw new Error('Failed to resubscribe');
            }

            const data = await response.json();
            setSuccessMessage(data.message);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingId(false);
        }
    };

    const handleUnsubscribe = async (id) => {
        setLoadingId(id);
        try {
            const response = await fetch(`/api/customers/unsubscribe/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Failed to unsubscribe')
            }
            const data = await response.json()
            setSuccessMessage(data.message)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoadingId(null);
        }
    }
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Subscriptions</h2>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {subscriptions?.length > 0 ? (
                <ul>
                    {subscriptions.map((sub) => (
                        <div key={sub.id} className="flex justify-between mb-4 p-4 border rounded">
                            <li>
                                <p><strong>Status:</strong> {sub.attributes?.status}</p>
                                <p><strong>Product:</strong> {sub.attributes?.product_name}</p>
                                <p><strong>Expired At:</strong> {new Date(sub.attributes?.renews_at).toLocaleDateString()}</p>
                            </li>
                            {sub.attributes?.status === 'active' ? (
                                <div>
                                    <Button
                                        onClick={() => handleUnsubscribe(sub.id)}
                                        variant="danger"
                                        className="text-sm py-2 px-3"
                                        disabled={loadingId === sub.id}
                                    >
                                        {loadingId ? 'Cancelling...' : 'Cancel Subcription'}
                                    </Button>
                                </div>
                            ) : (
                                sub.attributes?.status === 'cancelled' && (
                                    <div>
                                        <Button
                                            onClick={() => handleResubscribe(sub.id)}
                                            variant="primary"
                                            className="text-sm py-2 px-3"
                                            disabled={loadingId === sub.id}
                                        >
                                            {loadingId === sub.id ? 'Resubscribing...' : 'Resubscribe'}
                                        </Button>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No active subscriptions</p>
            )}
        </div>
    );
};

export default Subscriptions;