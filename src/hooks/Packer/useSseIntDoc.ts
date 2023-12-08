import { useQueryClient } from "@tanstack/react-query";
import { IntDoc } from "../../interfaces/int-doc.type";
import { ApiResponse } from "../../interfaces/api-response.interface";
import { useCallback, useEffect } from "react";

export const useSseIntDoc = (options: { limit?: number; page?: number }) => {
  const client = useQueryClient();

  const handleSeeEvent = useCallback(
    (data: any) => {
      const parseData = JSON.parse(data.data);
      client.setQueryData<ApiResponse<IntDoc[]>>(
        ["packer", "allIntDocs", options],
        (oldData) => {          
          if (oldData) {
            return {
              ...oldData,
              data: [parseData, ...oldData.data],
            };
          }
          return oldData;
        }
      );
    },
    [client]
  );
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8000/internet-document/sse"
    );
    eventSource.onmessage = handleSeeEvent;

    return () => {
      eventSource.close();
    };
  }, [handleSeeEvent]);

  return handleSeeEvent;
};
