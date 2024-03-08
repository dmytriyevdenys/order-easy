export type TOrderSmall = {
    id: number;
    additionalnformation: string;
    created_at: Date;
    total_price: number;
    full_name: string;
    status_id: number;
    intdocnumber: string;
}

export type TOrderByStatus = Record<number, TOrderSmall[]>