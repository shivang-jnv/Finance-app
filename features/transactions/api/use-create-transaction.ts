import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  > ({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({json});
      return await response.json();
    },
    onMutate: async (json) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      await queryClient.cancelQueries({ queryKey: ["summary"] });

      const previousTransactions = queryClient.getQueryData(["transactions"]);
      const previousSummary = queryClient.getQueryData(["summary"]);

      queryClient.setQueryData(["transactions"], (old: any) => {
        // Optimistic update logic (simplified - just appending for now or refetching)
        // Since we don't have the ID yet, appending might be tricky without a temp ID.
        // For create, often just invalidating is safer unless we generate a temp ID.
        // However, standard pattern:
        return old; 
      });

      return { previousTransactions, previousSummary };
    },
    onSuccess: () => {
      toast.success("Transaction created")
    },
    onError: (err, newTodo, context) => {
       const ctx = context as { previousTransactions: any, previousSummary: any } | undefined;
       toast.error("Failed to create transaction")
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