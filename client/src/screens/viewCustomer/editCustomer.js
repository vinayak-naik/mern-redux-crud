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
import { updateCustomer } from "../../redux/actions/customerActions";



const EditCustomerDialog = (props) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();



  

const customerDetails={name, balance, address}
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(updateCustomer(customerDetails, props.id));
  };


 
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
                label="Balance"
                variant="outlined"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                disabled={!name || !balance || !address}
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

export default EditCustomerDialog;
