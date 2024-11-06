import { lemonSqueezyApiInstance } from "@/utils/axios"

export async function GET() {
    try {
        const response = await lemonSqueezyApiInstance.get('/products');
        const products = response.data.data;
        console.log(products);

        return Response.json({ products }, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}