import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";


const EditProfileDialog = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // dispatch(login(email, password));

  };
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <DialogTitle>
      <form onSubmit={onSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2 style={{ color: "#388e3c" }}>Update Profile {props.id}</h2>
          </Grid>

          
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                disabled={!name || !email}
                style={{ height: 50 }}
              >
                {/* {loading ? <CircularProgress size={30} /> : "login"} */}
                update
              </Button>
            </Grid>
        </Grid>
          </form>
      </DialogTitle>
    </Dialog>
  );
};

export default EditProfileDialog;
