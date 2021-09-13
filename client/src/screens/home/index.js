import React, { useEffect, useState } from "react";
import style from "./home.module.scss";
import { Box, Grid, Paper, CircularProgress } from "@material-ui/core";
import Navbar from "../../components/navbar";
import { useHistory } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { listCustomer } from "../../redux/actions/customerActions";
import CreateCustomerDialog from "./createCustomer";

const HomeComponent = () => {
  const [open, setOpen] = useState(false); 

  const history = useHistory();
  const routeHandler = () => history.replace("/profile");
  const dispatch = useDispatch();
  const customerList = useSelector((state) => state.customerList);
  const { loading, error, customers } = customerList;

  const customerCreate = useSelector((state) => state.customerCreate)
  const {
    success: successCreate,
  } = customerCreate

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      history.push("/login");
    } else {
      dispatch(listCustomer());
      if(successCreate){
        setOpen(false)
      }
    }
  }, [successCreate]);
  if (error == "Not authorized, token failed") {
    history.replace("/login");
  }
 

  return (
    <div className={style.container}>
      <Navbar route={routeHandler} user="vinayak" />
      {loading ? (
        <div className={style.loaderPage}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className={style.mainBox}>
          <Grid container spacing={2}>
            {customers &&
              customers.map((item, k) => (
                <Grid
                  key={k}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={style.cardGrid}
                >
                  <Paper elevation={2}>
                    <Box
                      className={style.cardContainer}
                      onClick={() => history.replace(`/view/${item._id}`)}
                    >
                      <h2>{item.name}</h2>
                      <p>{item.email}</p>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            {customers && (
              <div className={style.fab} onClick={()=>setOpen(true)}>
                <Add className={style.fabIcon} />
              </div>
            )}
          </Grid>
        </div>
      )}
      <CreateCustomerDialog open={open} handleClose={()=>setOpen(false)}/>
    </div>
  );
};

export default HomeComponent;
