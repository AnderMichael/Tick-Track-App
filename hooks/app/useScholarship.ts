import { CreateScholarship } from "@/interfaces/administrative";
import {
  useCreateScholarshipMutation,
  useDeleteScholarshipMutation,
  useEditScholarshipMutation,
  useScholarshipQuery,
} from "@/store/api/app";

interface ScholarshipQueryParams {
  scholarship_id?: number;
}

export function useScholarship({
  scholarship_id,
}: ScholarshipQueryParams = {}) {
  const enableQuery = typeof scholarship_id === "number";

  const {
    data: scholarship,
    isFetching,
    isLoading,
    refetch,
    error: errorFetching,
  } = useScholarshipQuery({ id: scholarship_id! }, { skip: !enableQuery });

  const [
    createScholarship,
    {
      isLoading: isLoadingCreation,
      isError: isErrorCreation,
      error: errorCreation,
    },
  ] = useCreateScholarshipMutation();

  const [
    updateScholarship,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useEditScholarshipMutation();

  const [
    deleteScholarship,
    {
      isLoading: isLoadingDeletion,
      isError: isErrorDeletion,
      error: errorDeletion,
    },
  ] = useDeleteScholarshipMutation();

  async function createNewScholarship(data: CreateScholarship) {
    try {
      await createScholarship(data).unwrap();
    } catch (error) {
      console.error("Error creating scholarship:", error);
      throw errorCreation;
    }
  }

  async function editScholarship(data: Partial<CreateScholarship>) {
    if (!scholarship_id)
      throw new Error("editScholarship requires a scholarship_id");
    try {
      await updateScholarship({ id: scholarship_id, body: data }).unwrap();
    } catch (error) {
      console.error("Error updating scholarship:", error);
      throw error;
    }
  }

  async function removeScholarship() {
    if (!scholarship_id)
      throw new Error("removeScholarship requires a scholarship_id");
    try {
      await deleteScholarship({ id: scholarship_id }).unwrap();
    } catch (error) {
      console.error("Error deleting scholarship:", error);
    }
  }

  return {
    scholarship: enableQuery ? scholarship : null,
    isLoading: enableQuery ? isLoading || isFetching : false,
    errorFetching: enableQuery ? errorFetching : null,
    refetch,

    createNewScholarship,
    isLoadingCreation,
    isErrorCreation,
    errorCreation,

    editScholarship,
    isLoadingUpdate,
    isErrorUpdate,
    errorUpdate,

    removeScholarship,
    isLoadingDeletion,
    isErrorDeletion,
    errorDeletion,
  };
}
