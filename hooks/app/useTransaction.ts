import { Payment } from "@/interfaces/payments";
import { usePaymentMutation, useRemoveTransactionMutation, useStudentCommentMutation, useTransactionQuery } from "@/store/api/app";

export function useTransaction(transaction_id: string) {
    const { isLoading: isLoadingFetching, isError: isErrorQuery, data: transactionDetails, refetch, isFetching } = useTransactionQuery({ transaction_id })
    const [createTransaction, { isLoading: isLoadingCreation, isError: isErrorCreation }] = usePaymentMutation();
    const [removeTransaction, { isLoading: isLoadingDeletion, isError: isErrorDeletion }] = useRemoveTransactionMutation();
    const [postStudentComment, { isLoading: isLoadingPostStudentComment, isError: isErrorPostStudentComment }] = useStudentCommentMutation();

    async function createNewTransaction(transactionData: Payment) {
        try {
            await createTransaction(transactionData).unwrap();
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    }

    async function deleteTransaction() {
        try {
            await removeTransaction({ transaction_id }).unwrap();
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    }

    async function publishStudentComment(comment: string) {
        try {
            await postStudentComment({ transaction_id, comment }).unwrap();
        } catch (error) {
            console.error("Error publishing student comment:", error);
        }
    }

    const isLoadingQuery = isLoadingFetching || isFetching;

    const isLoadingMutation = isLoadingCreation || isLoadingDeletion || isLoadingPostStudentComment;

    const isErrorMutation = isErrorCreation || isErrorDeletion || isErrorPostStudentComment;

    return {
        transactionDetails,
        isLoadingQuery,
        isErrorQuery,
        refetch,

        createNewTransaction,
        deleteTransaction,
        publishStudentComment,

        isLoadingCreation,
        isLoadingDeletion,
        isLoadingPostStudentComment,

        isErrorCreation,
        isErrorDeletion,
        isErrorPostStudentComment,
    };

}