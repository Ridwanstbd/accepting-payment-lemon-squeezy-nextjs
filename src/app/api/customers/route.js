import { lemonSqueezyApiInstance } from '@/utils/axios';

const fetchCustomersByEmail = async (email) => {
    const response = await lemonSqueezyApiInstance.get('/customers', {
        params: {
            filter: {
                email: email
            }
        }
    });
    return response.data.data;
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        // Cari customer berdasarkan email
        const customers = await fetchCustomersByEmail(email);
        if (customers.length === 0) {
            return Response.json({ error: 'Customer not found' }, { status: 404 });
        }

        // Hanya kembalikan ID customer
        const customerId = customers[0].id;
        return Response.json({ id: customerId });

    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}