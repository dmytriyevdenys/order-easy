
export type TProduct = {
    id: number;
    name: string;
    quantity: number | null;
    weight: number | null;
    sku: string | null;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    indexId: number;
}