import { Semester } from "@/interfaces/administrative";
import {
  useCreateSemesterMutation,
  useDeleteSemesterMutation,
  useEditSemesterMutation,
  useSemesterQuery,
} from "@/store/api/app";

interface Props {
  semester_id?: number;
}

export function useSemester({ semester_id }: Props = {}) {
  const {
    data: semester,
    isLoading: isLoadingSemester,
    isFetching: isFetchingSemester,
    isError: isErrorSemester,
    refetch,
    error: errorFetchingSemester,
  } = useSemesterQuery({ id: semester_id! }, { skip: !semester_id });

  const [
    createSemester,
    {
      isLoading: isCreatingSemester,
      isSuccess: isCreateSemesterSuccess,
      isError: isCreateSemesterError,
      error: createSemesterError,
    },
  ] = useCreateSemesterMutation();

  const [
    updateSemester,
    {
      isLoading: isUpdatingSemester,
      isSuccess: isUpdateSemesterSuccess,
      isError: isUpdateSemesterError,
      error: updateSemesterError,
    },
  ] = useEditSemesterMutation();

  const [
    deleteSemester,
    {
      isLoading: isDeletingSemester,
      isSuccess: isDeleteSemesterSuccess,
      isError: isDeleteSemesterError,
      error: deleteSemesterError,
    },
  ] = useDeleteSemesterMutation();

  const handleCreateSemester = async (semesterData: Omit<Semester, "id" | "name">) => {
    try {
      await createSemester(semesterData).unwrap();
    } catch (error) {
      console.error("Error creating semester:", error);
      throw error;
    }
  };

  const handleUpdateSemester = async (semesterData: Omit<Semester, "id" | "name">) => {
    if (!semester_id)
      throw new Error("handleUpdateSemester requires a semester_id");
    try {
      await updateSemester({ id: semester_id, body: semesterData }).unwrap();
    } catch (error) {
      console.error("Error updating semester:", error);
      throw error;
    }
  };

  const handleDeleteSemester = async () => {
    if (!semester_id)
      throw new Error("handleDeleteSemester requires a semester_id");
    try {
      await deleteSemester({ id: semester_id }).unwrap();
    } catch (error) {
      console.error("Error deleting semester:", error);
      throw error;
    }
  };

  return {
    handleCreateSemester,
    isCreatingSemester,
    isCreateSemesterSuccess,
    isCreateSemesterError,
    createSemesterError,

    handleUpdateSemester,
    isUpdatingSemester,
    isUpdateSemesterSuccess,
    isUpdateSemesterError,
    updateSemesterError,

    handleDeleteSemester,
    isDeletingSemester,
    isDeleteSemesterSuccess,
    isDeleteSemesterError,
    deleteSemesterError,

    semester,
    isLoadingSemester,
    isFetchingSemester,
    isErrorSemester,
    errorFetchingSemester,

    refetch
  };
}
