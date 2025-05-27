import { useState } from "react";

export function useStateOperation() {
    const [reload, setReload] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const activateReload = () => {
        setReload(true);
    }

    const deactivateReload = () => {
        setReload(false);
    }

    const cancelDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    }

    return {
        showDeleteModal,
        cancelDeleteModal,
        openDeleteModal,
        reload,
        activateReload,
        deactivateReload,
    };
}