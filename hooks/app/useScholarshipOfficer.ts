import { CreateScholarshipOfficer } from "@/interfaces/administrative";
import {
  useCreateScholarshipOfficerMutation,
  useDeleteScholarshipOfficerMutation,
  useEditScholarshipOfficerMutation,
  useLockScholarshipOfficerMutation,
  useScholarshipOfficerQuery,
  useUnlockScholarshipOfficerMutation,
} from "@/store/api/app";

interface UseScholarshipOfficerParams {
  officer_id?: number;
}

export function useScholarshipOfficer({
  officer_id,
}: UseScholarshipOfficerParams = {}) {
  const enableQuery = typeof officer_id === "number";

  const {
    data: officer,
    isFetching,
    isLoading,
    refetch,
    error: errorFetching,
  } = useScholarshipOfficerQuery({ id: officer_id! }, { skip: !enableQuery });

  const [
    createScholarshipOfficer,
    { isLoading: isLoadingCreation, error: errorCreation },
  ] = useCreateScholarshipOfficerMutation();

  const [
    updateScholarshipOfficer,
    { isLoading: isLoadingUpdate, error: errorUpdate },
  ] = useEditScholarshipOfficerMutation();

  const [
    deleteScholarshipOfficer,
    { isLoading: isLoadingDeletion, error: errorDeletion },
  ] = useDeleteScholarshipOfficerMutation();

  const [lockScholarshipOfficer] = useLockScholarshipOfficerMutation();
  const [unlockScholarshipOfficer] = useUnlockScholarshipOfficerMutation();

  async function createNewOfficer(data: CreateScholarshipOfficer) {
    await createScholarshipOfficer(data).unwrap();
  }

  async function editOfficer(data: Partial<CreateScholarshipOfficer>) {
    if (!officer_id) throw new Error("editOfficer requires officer_id");
    await updateScholarshipOfficer({ id: officer_id, body: data }).unwrap();
  }

  async function removeOfficer() {
    if (!officer_id) throw new Error("removeOfficer requires officer_id");
    await deleteScholarshipOfficer({ id: officer_id }).unwrap();
  }

  async function lockOfficer() {
    if (!officer_id) throw new Error("lockOfficer requires officer_id");
    await lockScholarshipOfficer({ upbCode: officer_id }).unwrap();
  }

  async function unlockOfficer() {
    if (!officer_id) throw new Error("unlockOfficer requires officer_id");
    await unlockScholarshipOfficer({ upbCode: officer_id }).unwrap();
  }

  return {
    officer: enableQuery ? officer : null,
    isLoading: enableQuery ? isLoading || isFetching : false,
    errorFetching: enableQuery ? errorFetching : null,
    refetch,

    createNewOfficer,
    isLoadingCreation,
    errorCreation,

    editOfficer,
    isLoadingUpdate,
    errorUpdate,

    removeOfficer,
    isLoadingDeletion,
    errorDeletion,

    lockOfficer,
    unlockOfficer,
  };
}
