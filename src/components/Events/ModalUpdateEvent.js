import React from "react";
import FormUpdateEvent from "./FormUpdateEvent";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function Modal({
  openEditEvent,
  setOpenEditEvent,
  selectedEvent,
  setSelectedEvent,
  setMyEvents,
  setAllEvents,
}) {
  const handleClose = () => {
    setOpenEditEvent(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <Dialog
        open={openEditEvent}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Please Fill Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all fields in order to update your event.
          </DialogContentText>
          {selectedEvent && (
            <FormUpdateEvent
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
              setOpenEditEvent={setOpenEditEvent}
              setMyEvents={setMyEvents}
              setAllEvents={setAllEvents}
            />
          )}
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
