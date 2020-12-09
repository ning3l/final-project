import React from "react";
import FormUpdatePlant from "./FormUpdatePlant";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function Modal({
  openEdit,
  setOpenEdit,
  selectedPlant,
  setSelectedPlant,
  setMyRepo,
  myRepo,
  setNeedsCare,
}) {
  const handleClose = () => {
    setOpenEdit(false);
    setSelectedPlant(null);
  };

  return (
    <div>
      <Dialog
        open={openEdit}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Please Fill Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out all fields in order to update your plant.
          </DialogContentText>
          {selectedPlant && (
            <FormUpdatePlant
              selectedPlant={selectedPlant}
              setMyRepo={setMyRepo}
              myRepo={myRepo}
              setNeedsCare={setNeedsCare}
              setOpenEdit={setOpenEdit}
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
