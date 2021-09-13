import React, { useState,useEffect } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  listCustomer,
  createCustomer,
} from "../../redux/actions/customerActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";


const CreateCustomerDialog = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const dispatch = useDispatch();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(createCustomer(name, email, address, balance));
  };
  const customerCreate = useSelector((state) => state.customerCreate)
  const {
    error,success: successCreate,
  } = customerCreate

  useEffect(() => {
    setName("")
    setEmail("")
    setAddress("")
    setBalance("")
  }, [successCreate])
 
  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <DialogTitle>
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2 style={{ color: "#388e3c" }}>Update Profile</h2>
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
              <TextField
                fullWidth
                required
                label="Address"
                variant="outlined"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Balance"
                variant="outlined"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                disabled={!name || !email || !address || !balance}
                style={{ height: 50 }}
              >
                {/* {loading ? <CircularProgress size={30} /> : "login"} */}
                create
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && (
        <Alert  severity="error">
          {error}
        </Alert>
      )}
      </DialogTitle>
    </Dialog>
  );
};

export default CreateCustomerDialog;
