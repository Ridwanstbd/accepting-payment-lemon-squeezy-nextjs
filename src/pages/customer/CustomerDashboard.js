import CustomerInfo from './CustomerInfo';
import Subscriptions from './Subscriptions';
import Orders from './Orders';
import Button from '@/components/Button';

const CustomerDashboard = ({ customerData, onLogout }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Customer Dashboard</h1>
                <Button onClick={onLogout} className="bg-red-500 hover:bg-red-600">
                    Logout
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomerInfo customerData={customerData} />
                <Subscriptions customerId={customerData.id} />
                <Orders orders={customerData.orders} />
            </div>
        </>
    );
};

export default CustomerDashboard;