const Orders = ({ orders }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            {orders?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Order ID</th>
                                <th className="text-left p-2">Date</th>
                                <th className="text-left p-2">Total</th>
                                <th className="text-left p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="p-2">{order.id}</td>
                                    <td className="p-2">
                                        {new Date(order.attributes?.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">${order.attributes?.total}</td>
                                    <td className="p-2">{order.attributes?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );
};

export default Orders;