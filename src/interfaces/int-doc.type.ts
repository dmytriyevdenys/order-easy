export type IntDoc = { 
    id: number,
    createdAt: Date,
    updatedAt: Date,
    IntDocNumber: string,
    Ref: string | null,
    CostOnSite: string | null,
    EstimatedDeliveryDate: string | null
    addedOffline?: Boolean;
}