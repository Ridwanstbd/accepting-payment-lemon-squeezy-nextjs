import { lemonSqueezyApiInstance } from '@/utils/axios';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { error: 'Customer ID is required' },
            { status: 400 }
        );
    }

    try {
        // Ambil detail customer
        const customerDetailResponse = await lemonSqueezyApiInstance.get(`/customers/${id}`);
        const customerDetail = customerDetailResponse.data.data;
        // Ambil semua orders dan filter di sisi server
        const ordersResponse = await lemonSqueezyApiInstance.get('/orders');
        const allOrders = ordersResponse.data.data;
        const customerOrders = allOrders.filter(order =>
            order.attributes.customer_id.toString() === id.toString()
        );
        // Ambil semua subscriptions dan filter di sisi server
        const subscriptionsResponse = await lemonSqueezyApiInstance.get('/subscriptions');
        const allSubscriptions = subscriptionsResponse.data.data;
        const customerSubscriptions = allSubscriptions.filter(subscription =>
            subscription.attributes.customer_id.toString() === id.toString()
        );
        // Gabungkan semua data
        const customerData = {
            ...customerDetail,
            orders: customerOrders,
            subscriptions: customerSubscriptions
        };

        return NextResponse.json(customerData);
    } catch (error) {
        console.error('Error fetching customer data:', error.response?.data || error.message);

        if (error.response?.status === 404) {
            return NextResponse.json(
                { error: 'Customer not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch customer data' },
            { status: error.response?.status || 500 }
        );
    }
}