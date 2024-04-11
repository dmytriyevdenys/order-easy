import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useActiveOverlay = (isActive: boolean) => {
    const client = useQueryClient();
    
    useEffect(() => {
        client.setQueryData(['isActiveOverlay'], isActive);
    }, [isActive, client]);

    const query = useQuery(['isActiveOverlay'], () => client.getQueryData(['isActiveOverlay']) || false);
    const isActiveOverlay = query.data;

    return { isActiveOverlay };
}
