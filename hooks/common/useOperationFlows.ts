import { useState } from "react";

export function useOperationFlows() {
    const [reload, setReload] = useState(false);
    const [reloadList, setReloadList] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const activateReload = () => {
        setReload(true);
    }

    const deactivateReload = () => {
        setReload(false);
    }

    const activateReloadList = () => {
        setReloadList(true);
    }

    const deactivateReloadList = () => {
        setReloadList(false);
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
        reloadList,
        activateReloadList,
        deactivateReloadList
    };
}