import { lemonSqueezyApiInstance } from "@/utils/axios"

export async function GET() {
    try {
        const response = await lemonSqueezyApiInstance.get('/products');
        const products = response.data.data;

        return Response.json({ products }, { status: 200 });
    } catch (error) {
        return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}