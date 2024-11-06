import { lemonSqueezyApiInstance } from "@/utils/axios"

export async function GET({ params }) {
    const { productId } = params
    try {
        const productResponse = await lemonSqueezyApiInstance.get(`/products/`, {
            id: productId
        });
        const product = productResponse.data.data;
        console.log(product);

        return Response.json({ product }, { status: 200 });
    } catch (error) {
        return Response.json({ error: 'Failed to fetch product details' }, { status: 500 });
    }
}