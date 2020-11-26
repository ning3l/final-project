import React from "react";
import FormAddPlant from "./FormAddPlant";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function Modal({ openRepo, setOpenRepo }) {
  const handleClose = () => {
    setOpenRepo(false);
  };

  return (
    <div>
      <Dialog
        open={openRepo}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Please Fill Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to give you the best experience during your visit, we need
            to collect some infos concerning your care routine. Please note: If
            you choose not to provide any data, no maintenance notfications will
            be available for this plant.
          </DialogContentText>
          <FormAddPlant />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Add Plant
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}