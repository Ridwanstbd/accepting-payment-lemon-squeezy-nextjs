const CustomerInfo = ({ customerData }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <p><strong>Name:</strong> {customerData.attributes?.name}</p>
            <p><strong>Email:</strong> {customerData.attributes?.email}</p>
        </div>
    );
};

export default CustomerInfo;