import { CreatePercentage } from "@/interfaces/administrative";
import {
  useCreatePercentageMutation,
  useDeletePercentageMutation,
  useGetPercentageByIdQuery,
  useUpdatePercentageMutation,
} from "@/store/api/app";

interface PercentageQueryParams {
  scholarship_id: number;
  detail_id?: number;
}

export function usePercentage({
  scholarship_id,
  detail_id,
}: PercentageQueryParams) {
  const enableQuery = typeof detail_id === "number";

  const {
    data: percentage,
    isFetching,
    isLoading,
    refetch,
    error: errorFetching,
  } = useGetPercentageByIdQuery(
    { id: scholarship_id, detailId: detail_id! },
    { skip: !enableQuery }
  );

  const [
    createPercentage,
    {
      isLoading: isLoadingCreation,
      isError: isErrorCreation,
      error: errorCreation,
    },
  ] = useCreatePercentageMutation();

  const [
    updatePercentage,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdatePercentageMutation();

  const [
    deletePercentage,
    {
      isLoading: isLoadingDeletion,
      isError: isErrorDeletion,
      error: errorDeletion,
    },
  ] = useDeletePercentageMutation();

  async function createNewPercentage(data: CreatePercentage) {
    try {
      await createPercentage({ id: scholarship_id, body: data }).unwrap();
    } catch (error) {
      console.error("Error creating percentage:", error);
      throw errorCreation;
    }
  }

  async function editPercentage(data: Partial<CreatePercentage>) {
    if (!detail_id) throw new Error("editPercentage requires a detail_id");
    try {
      await updatePercentage({
        id: scholarship_id,
        detailId: detail_id,
        body: data,
      }).unwrap();
    } catch (error) {
      console.error("Error updating percentage:", error);
      throw error;
    }
  }

  async function removePercentage() {
    if (!detail_id) throw new Error("removePercentage requires a detail_id");
    try {
      await deletePercentage({
        id: scholarship_id,
        detailId: detail_id,
      }).unwrap();
    } catch (error) {
      console.error("Error deleting percentage:", error);
    }
  }

  return {
    percentage: enableQuery ? percentage : null,
    isLoading: enableQuery ? isLoading || isFetching : false,
    errorFetching: enableQuery ? errorFetching : null,
    refetch,

    createNewPercentage,
    isLoadingCreation,
    isErrorCreation,
    errorCreation,

    editPercentage,
    isLoadingUpdate,
    isErrorUpdate,
    errorUpdate,

    removePercentage,
    isLoadingDeletion,
    isErrorDeletion,
    errorDeletion,
  };
}
