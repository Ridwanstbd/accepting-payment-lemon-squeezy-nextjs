import { lemonSqueezyApiInstance } from "@/utils/axios";

export async function PATCH(req) {
    const { subscriptionId } = await req.json();

    if (!subscriptionId) {
        return new Response(JSON.stringify({ message: 'Subscription ID is required' }), { status: 400 });
    }

    try {
        const response = await lemonSqueezyApiInstance.patch(`/subscriptions/${subscriptionId}`, {
            data: {
                type: 'subscriptions',
                id: subscriptionId,
                attributes: { cancelled: false },
            },
        });

        return new Response(JSON.stringify({ message: 'Subscription resumed successfully', data: response.data }), { status: 200 });
    } catch (error) {
        // Log error details
        console.error('Error resuming subscription:', {
            message: error.message,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data,
            } : null,
            stack: error.stack,
        });

        return new Response(
            JSON.stringify({
                message: error.response?.data?.errors[0]?.detail || 'An error occurred while resuming the subscription.',
            }),
            { status: 500 }
        );
    }
}