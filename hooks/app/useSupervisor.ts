import {
  useCreateSupervisorMutation,
  useDeleteSupervisorMutation,
  useEditSupervisorMutation,
  useLockSupervisorMutation,
  useSupervisorQuery,
  useUnlockSupervisorMutation,
} from "@/store/api/app";
import { CreateSupervisor } from "@/interfaces/administrative";

interface SupervisorQueryParams {
  supervisor_id?: number;
}

export function useSupervisor({ supervisor_id }: SupervisorQueryParams = {}) {
  const enableQuery = typeof supervisor_id === "number";

  const {
    data: supervisor,
    isFetching,
    isLoading,
    refetch,
    error: errorFetching,
  } = useSupervisorQuery(
    { id: supervisor_id! },
    { skip: !enableQuery }
  );

  const [
    createSupervisor,
    {
      isLoading: isLoadingCreation,
      isError: isErrorCreation,
      error: errorCreation,
    },
  ] = useCreateSupervisorMutation();

  const [
    updateSupervisor,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
    },
  ] = useEditSupervisorMutation();

  const [
    deleteSupervisor,
    {
      isLoading: isLoadingDeletion,
      isError: isErrorDeletion,
      error: errorDeletion,
    },
  ] = useDeleteSupervisorMutation();

  const [
    lockSupervisorMutation,
    {
      isLoading: isLoadingLock,
      isError: isErrorLock,
      error: errorLock,
    },
  ] = useLockSupervisorMutation();

  const [
    unlockSupervisorMutation,
    {
      isLoading: isLoadingUnlock,
      isError: isErrorUnlock,
      error: errorUnlock,
    },
  ] = useUnlockSupervisorMutation();

  async function createNewSupervisor(data: CreateSupervisor) {
    try {
      await createSupervisor(data).unwrap();
    } catch (error) {
      console.error("Error creating supervisor:", error);
      throw errorCreation;
    }
  }

  async function editSupervisor(data: Partial<CreateSupervisor>) {
    if (!supervisor_id) throw new Error("editSupervisor requires supervisor_id");
    try {
      await updateSupervisor({ id: supervisor_id, body: data }).unwrap();
    } catch (error) {
      console.error("Error updating supervisor:", error);
      throw error;
    }
  }

  async function removeSupervisor() {
    if (!supervisor_id) throw new Error("removeSupervisor requires supervisor_id");
    try {
      await deleteSupervisor({ id: supervisor_id }).unwrap();
    } catch (error) {
      console.error("Error deleting supervisor:", error);
      throw error;
    }
  }

  async function lockSupervisor() {
    if (!supervisor_id) throw new Error("lockSupervisor requires supervisor_id");
    try {
      await lockSupervisorMutation({ upbCode: supervisor_id }).unwrap();
    } catch (error) {
      console.error("Error locking supervisor:", error);
      throw error;
    }
  }

  async function unlockSupervisor() {
    if (!supervisor_id) throw new Error("unlockSupervisor requires supervisor_id");
    try {
      await unlockSupervisorMutation({ upbCode: supervisor_id }).unwrap();
    } catch (error) {
      console.error("Error unlocking supervisor:", error);
      throw error;
    }
  }

  return {
    supervisor: enableQuery ? supervisor : null,
    isLoading: enableQuery ? isLoading || isFetching : false,
    errorFetching: enableQuery ? errorFetching : null,
    refetch,

    createNewSupervisor,
    isLoadingCreation,
    isErrorCreation,
    errorCreation,

    editSupervisor,
    isLoadingUpdate,
    isErrorUpdate,
    errorUpdate,

    removeSupervisor,
    isLoadingDeletion,
    isErrorDeletion,
    errorDeletion,

    lockSupervisor,
    isLoadingLock,
    isErrorLock,
    errorLock,

    unlockSupervisor,
    isLoadingUnlock,
    isErrorUnlock,
    errorUnlock,
  };
}
