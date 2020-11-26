import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function Modal({ openWishlist, setOpenWishlist }) {
  const handleClose = () => {
    setOpenWishlist(false);
  };

  return (
    <div>
      <Dialog
        open={openWishlist}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The plant was added to your wishlist.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Exit
          </Button>
          <Button onClick={handleClose} color="primary">
            Go to my wishlist
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
