import { lemonSqueezyApiInstance } from "@/utils/axios";

export async function GET(request, { params }) {
    try {
        const { id } = params;

        const productResponse = await lemonSqueezyApiInstance.get(`/products/${id}`);
        const product = productResponse.data.data;
        const variantsResponse = await lemonSqueezyApiInstance.get(`/variants`, {
            params: {
                'filter[product_id]': id
            }
        });
        const variants = variantsResponse.data.data;
        const productDetail = {
            product,
            variants
        };

        return Response.json(productDetail);
    } catch (error) {
        if (error.response) {
            return Response.json({
                error: error.response.data.message || 'Failed to fetch product detail'
            }, {
                status: error.response.status
            });
        }

        return Response.json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}