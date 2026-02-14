import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  > ({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-delete"]["$post"]({json});
      return await response.json();
    },
    onMutate: async (json) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      await queryClient.cancelQueries({ queryKey: ["summary"] });

      const previousTransactions = queryClient.getQueryData(["transactions"]);
      const previousSummary = queryClient.getQueryData(["summary"]);

      queryClient.setQueryData(["transactions"], (old: any) => {
        if (!old) return [];
        const idsToDelete = new Set(json.ids);
        return old.filter((t: any) => !idsToDelete.has(t.id));
      });

      return { previousTransactions, previousSummary };
    },
    onSuccess: () => {
      toast.success("Transactions deleted");
    }, 
    onError: (err, variables, context) => {
      const ctx = context as { previousTransactions: any, previousSummary: any } | undefined;
      toast.error("Failed to delete transactions")
      if (ctx?.previousTransactions) {
        queryClient.setQueryData(["transactions"], ctx.previousTransactions);
      }
      if (ctx?.previousSummary) {
        queryClient.setQueryData(["summary"], ctx.previousSummary);
      }
    },
    onSettled: () => {
       queryClient.invalidateQueries({ queryKey: ["transactions"]});
       queryClient.invalidateQueries({ queryKey: ["summary"]});
    },
  });

  return mutation;
}