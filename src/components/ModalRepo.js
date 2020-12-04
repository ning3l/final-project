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

export default function Modal({ openRepo, setOpenRepo, setMyRepo }) {
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
          <FormAddPlant setMyRepo={setMyRepo} />
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
