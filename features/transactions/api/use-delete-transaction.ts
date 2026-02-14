import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error
  > ({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"]["$delete"]({
        param: {id},
      });
      return await response.json();
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });
      await queryClient.cancelQueries({ queryKey: ["transaction", { id }] });
      await queryClient.cancelQueries({ queryKey: ["summary"] });

      const previousTransactions = queryClient.getQueryData(["transactions"]);
      const previousTransaction = queryClient.getQueryData(["transaction", { id }]);
      const previousSummary = queryClient.getQueryData(["summary"]);

      queryClient.setQueryData(["transactions"], (old: any) => {
        if (!old) return [];
        return old.filter((t: any) => t.id !== id);
      });

      return { previousTransactions, previousTransaction, previousSummary };
    },
    onSuccess: () => {
      toast.success("Transaction deleted")
    },
    onError: (err, variables, context) => {
      const ctx = context as { previousTransactions: any, previousTransaction: any, previousSummary: any } | undefined;
      toast.error("Failed to delete transaction")
      if (ctx?.previousTransactions) {
        queryClient.setQueryData(["transactions"], ctx.previousTransactions);
      }
      if (ctx?.previousTransaction) {
        queryClient.setQueryData(["transaction", { id }], ctx.previousTransaction);
      }
      if (ctx?.previousSummary) {
        queryClient.setQueryData(["summary"], ctx.previousSummary);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });

  return mutation;
}