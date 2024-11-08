import { lemonSqueezyApiInstance } from '@/utils/axios';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { error: 'Subscription ID is required' },
            { status: 400 }
        );
    }

    try {
        const unsubscribeResponse = await lemonSqueezyApiInstance.delete(`/subscriptions/${id}`);

        return NextResponse.json(
            { message: 'Subscription successfully canceled', data: unsubscribeResponse.data },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error canceling subscription:', error.response?.data || error.message);

        if (error.response?.status === 404) {
            return NextResponse.json(
                { error: 'Subscription not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to cancel subscription' },
            { status: error.response?.status || 500 }
        );
    }
}