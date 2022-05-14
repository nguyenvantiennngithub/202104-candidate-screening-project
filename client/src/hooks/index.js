import { useState } from "react";

function useDialog() {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    };

    return {
        isOpenDialog,
        setIsOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
    };
}

export { useDialog };
