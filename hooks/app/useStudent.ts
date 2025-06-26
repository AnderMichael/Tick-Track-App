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

  const [createStudent, { isLoading: isLoadingCreation, isError: isErrorCreation, error: errorCreation }] =
    useCreateStudentMutation();

  const [updateStudent, { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate }] =
    useEditStudentMutation();

  const [deleteStudent, { isLoading: isLoadingDeletion, isError: isErrorDeletion, error: errorDeletion }] =
    useDeleteStudentMutation();

  const [lockStudentMutation, { isLoading: isLoadingLock, isError: isErrorLock, error: errorLock }] =
    useLockStudentMutation();

  const [unlockStudentMutation, { isLoading: isLoadingUnlock, isError: isErrorUnlock, error: errorUnlock }] =
    useUnlockStudentMutation();

  async function createNewStudent(data: CreateStudent) {
    await createStudent(data).unwrap();
    if (errorCreation) throw errorCreation;
  }

  async function editStudent(data: Partial<CreateStudent>) {
    if (!student_id) throw new Error("editStudent requires student_id");
    await updateStudent({ id: student_id, body: data }).unwrap();
    if (errorUpdate) throw errorUpdate;
  }

  async function removeStudent() {
    if (!student_id) throw new Error("removeStudent requires student_id");
    await deleteStudent({ id: student_id }).unwrap();
    if (errorDeletion) throw errorDeletion;
  }

  async function lockStudent() {
    if (!student_id) throw new Error("lockStudent requires student_id");
    await lockStudentMutation({ upbCode: student_id }).unwrap();
    if (errorLock) throw errorLock;
  }

  async function unlockStudent() {
    if (!student_id) throw new Error("unlockStudent requires student_id");
    await unlockStudentMutation({ upbCode: student_id }).unwrap();
    if (errorUnlock) throw errorUnlock;
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
