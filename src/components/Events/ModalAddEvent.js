import React from "react";
import FormAddEvent from "./FormAddEvent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function Modal({
  openAddEvent,
  setOpenAddEvent,
  setMyEvents,
  setAllEvents,
  myEvents,
}) {
  const handleClose = () => {
    setOpenAddEvent(false);
  };

  return (
    <div>
      <Dialog
        open={openAddEvent}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add your event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Plant Bazaar? Collective Repotting? Please feel free to add any
            event that might be of interest to our community.
          </DialogContentText>
          <FormAddEvent
            setMyEvents={setMyEvents}
            handleClose={handleClose}
            setAllEvents={setAllEvents}
            myEvents={myEvents}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            x
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
