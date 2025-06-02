import {
    CreateWork,
    useCreateWorkMutation,
    useDeleteWorkMutation,
    useEditWorkMutation,
    useWorkQuery,
} from "@/store/api/app";

interface WorkQueryParams {
    work_id?: number;
}

export function useWork({ work_id }: WorkQueryParams = {}) {
    const enableQuery = typeof work_id === "number";

    const {
        data: work,
        isFetching,
        isLoading,
        refetch,
        error: errorFetching,
    } = useWorkQuery(
        { id: work_id! },
        { skip: !enableQuery }
    );

    const [createWork, { isLoading: isLoadingCreation, isError: isErrorCreation, error: errorCreation }] = useCreateWorkMutation();
    const [updateWork, { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate }] = useEditWorkMutation();
    const [deleteWork, { isLoading: isLoadingDeletion, isError: isErrorDeletion, error: errorDeletion }] = useDeleteWorkMutation();

    async function createNewWork(workData: CreateWork) {
        try {
            await createWork(workData).unwrap();
        } catch (error) {
            console.error("Error creating work:", error);
            throw errorCreation
        }
    }

    async function editWork(workData: Partial<CreateWork>) {
        if (!work_id) throw new Error("editWork requires a work_id");
        try {
            await updateWork({ id: work_id, body: workData }).unwrap();
        } catch (error) {
            console.error("Error updating work:", error);
            throw error;
        }
    }

    async function removeWork() {
        if (!work_id) throw new Error("removeWork requires a work_id");
        try {
            await deleteWork({ id: work_id }).unwrap();
        } catch (error) {
            console.error("Error deleting work:", error);
        }
    }

    return {
        work: enableQuery ? work : null,
        isLoading: enableQuery ? isLoading || isFetching : false,
        errorFetching: enableQuery ? errorFetching : null,
        refetch: refetch,

        createNewWork,
        isLoadingCreation,
        isErrorCreation,
        errorCreation,

        editWork,
        isLoadingUpdate,
        isErrorUpdate,
        errorUpdate,

        removeWork,
        isLoadingDeletion,
        isErrorDeletion,
        errorDeletion,
    };
}
