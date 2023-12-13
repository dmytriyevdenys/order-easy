import { useQuery } from "@tanstack/react-query";
import { packerService } from "../../services/packer.service";

export const useIntDocs = (
  options: { limit?: number; page?: number; filter?: string; search?: string } = {},
  packerId?: number,
  pageUrl?: string
) => {
  const queryKey = packerId
    ? ["packer", packerId, options]
    : ["allIntDocs", options];
  return useQuery({
    queryKey,
    queryFn: () =>
      packerService.getIntDocs({
        packerId,
        options,
        pageUrl
      }),
    select: (data) => ({
      ...data,
      data: data.data.map((intDoc) => ({
        ...intDoc,
        createdAt: new Date(intDoc.createdAt).toLocaleString(),
      })),
    }),
  });
};
