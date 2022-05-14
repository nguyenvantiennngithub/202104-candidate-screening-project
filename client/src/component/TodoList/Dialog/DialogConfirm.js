import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DialogConfirm = ({
    isOpenDialog,
    handleCloseDialog,
    handleClearCompleted,
}) => {
    const handleClickAgree = () => {
        handleCloseDialog();
        handleClearCompleted();
    };

    return (
        <Dialog
            open={isOpenDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Are you sure"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    you want to clear completed tasks
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Disagree</Button>
                <Button onClick={handleClickAgree}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirm;
