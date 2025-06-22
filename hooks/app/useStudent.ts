import {
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useEditStudentMutation,
  useLockStudentMutation,
  useStudentQuery,
  useUnlockStudentMutation,
} from "@/store/api/app";
import { CreateStudent } from "@/interfaces/administrative";

interface StudentQueryParams {
  student_id?: number;
}

export function useStudent({ student_id }: StudentQueryParams = {}) {
  const enableQuery = typeof student_id === "number";

  const {
    data: student,
    isFetching,
    isLoading,
    refetch,
    error: errorFetching,
  } = useStudentQuery(
    { id: student_id! },
    { skip: !enableQuery }
  );

  const [
    createStudent,
    {
      isLoading: isLoadingCreation,
      isError: isErrorCreation,
      error: errorCreation,
    },
  ] = useCreateStudentMutation();

  const [
    updateStudent,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
    },
  ] = useEditStudentMutation();

  const [
    deleteStudent,
    {
      isLoading: isLoadingDeletion,
      isError: isErrorDeletion,
      error: errorDeletion,
    },
  ] = useDeleteStudentMutation();

  const [
    lockStudentMutation,
    {
      isLoading: isLoadingLock,
      isError: isErrorLock,
      error: errorLock,
    },
  ] = useLockStudentMutation();

  const [
    unlockStudentMutation,
    {
      isLoading: isLoadingUnlock,
      isError: isErrorUnlock,
      error: errorUnlock,
    },
  ] = useUnlockStudentMutation();

  async function createNewStudent(data: CreateStudent) {
    try {
      await createStudent(data).unwrap();
    } catch (error) {
      console.error("Error creating student:", error);
      throw errorCreation;
    }
  }

  async function editStudent(data: Partial<CreateStudent>) {
    if (!student_id) throw new Error("editStudent requires student_id");
    try {
      await updateStudent({ id: student_id, body: data }).unwrap();
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  }

  async function removeStudent() {
    if (!student_id) throw new Error("removeStudent requires student_id");
    try {
      await deleteStudent({ id: student_id }).unwrap();
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  }

  async function lockStudent() {
    if (!student_id) throw new Error("lockStudent requires student_id");
    try {
      await lockStudentMutation({ upbCode: student_id }).unwrap();
    } catch (error) {
      console.error("Error locking student:", error);
      throw error;
    }
  }

  async function unlockStudent() {
    if (!student_id) throw new Error("unlockStudent requires student_id");
    try {
      await unlockStudentMutation({ upbCode: student_id }).unwrap();
    } catch (error) {
      console.error("Error unlocking student:", error);
      throw error;
    }
  }

  return {
    student: enableQuery ? student : null,
    isLoading: enableQuery ? isLoading || isFetching : false,
    errorFetching: enableQuery ? errorFetching : null,
    refetch,

    createNewStudent,
    isLoadingCreation,
    isErrorCreation,
    errorCreation,

    editStudent,
    isLoadingUpdate,
    isErrorUpdate,
    errorUpdate,

    removeStudent,
    isLoadingDeletion,
    isErrorDeletion,
    errorDeletion,

    lockStudent,
    isLoadingLock,
    isErrorLock,
    errorLock,

    unlockStudent,
    isLoadingUnlock,
    isErrorUnlock,
    errorUnlock,
  };
}
