import React, { useState, useEffect } from "react";
import style from "./view.module.scss";
import { Box, Button, Grid, t, TextField, Paper } from "@material-ui/core";
import Navbar from "../../components/navbar";
import { useHistory, useParams } from "react-router-dom";
import { ArrowBack, Delete, Edit, SettingsInputComponent } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { customerDetails, deleteCustomer } from "../../redux/actions/customerActions";
import EditCustomerDialog from "./editCustomer";

const ViewComponent = () => {
  const [open, setOpen] = useState(false); 

  const history = useHistory();
  const dispatch = useDispatch();
  const params=useParams()
  const routeHandler = () => history.replace("/home");

  const customerDetailsState = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetailsState;
  const customerDeleteState = useSelector((state) => state.customerDelete);
  const { deleteSuccess } = customerDeleteState;
  const customerUpdateState = useSelector((state) => state.customerUpdate);
  const { updateSuccess } = customerUpdateState;

useEffect(() => {
  dispatch(customerDetails(params.id))
}, [open])
useEffect(() => {
  if (deleteSuccess){
    history.replace("/home") 
  }
  if (updateSuccess){
    setOpen(false)
  }
}, [deleteSuccess, updateSuccess])

const deleteHandler = (id) => {
  if (window.confirm('Are you sure')) {
    dispatch(deleteCustomer(id))
  }
}

  return (
    <div className={style.container}>
      <Navbar route={routeHandler} goto="home" />
      <div className={style.mainBox}>
        <div className={style.contentBox}>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Name:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.text}>{customer.name}</span>
            </Grid>
          </Grid>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Email:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.text}>{customer.email}</span>
            </Grid>
          </Grid>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Account Balance:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.text}>{customer.balance}.00&nbsp;₹</span>
            </Grid>
          </Grid>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Address:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.textAddress}>
              {customer.address}
              </span>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                startIcon={<ArrowBack />}
                onClick={routeHandler}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                // style={{backgroundColor:'red'}}
                startIcon={<Edit />}
                onClick={()=>setOpen(true)}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
                onClick={() => deleteHandler(customer._id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <EditCustomerDialog  id={customer._id} open={open} handleClose={()=>setOpen(false)}/>

    </div>
  );
};

export default ViewComponent;
