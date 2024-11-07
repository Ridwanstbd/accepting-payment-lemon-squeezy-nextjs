const Subscriptions = ({ subscriptions }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Subscriptions</h2>
            {subscriptions?.length > 0 ? (
                <ul>
                    {subscriptions.map((sub) => (
                        <li key={sub.id} className="mb-4 p-4 border rounded">
                            <p><strong>Status:</strong> {sub.attributes?.status}</p>
                            <p><strong>Product:</strong> {sub.attributes?.product_name}</p>
                            <p><strong>Price:</strong> ${sub.attributes?.recurring_price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No active subscriptions</p>
            )}
        </div>
    );
};

export default Subscriptions;