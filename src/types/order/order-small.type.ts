export type TOrderSmall = {
    id: number;
    additionalnformation: string;
    created_at: Date;
    total_price: number;
    full_name: string;
    status_id: number;
    IntDocNumber: string;
}

export type TOrderByStatus = {
    status_id: number;
    orders: TOrderSmall[]
}