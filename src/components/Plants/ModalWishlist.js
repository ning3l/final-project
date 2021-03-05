import React from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function Modal({
  openWishlist,
  setOpenWishlist,
  singlePlant,
  setMyWishlist,
}) {
  const handleClose = () => {
    axios
      .post(`/api/users/wish`, {
        plantId: singlePlant._id,
        plantName: singlePlant.latin,
      })
      .then((res) => {
        setMyWishlist((prevWishes) => [...prevWishes, res.data]);
      })
      .catch((err) => console.log(err));

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
            x
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
