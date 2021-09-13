import React, { useState } from "react";
import style from "./profile.module.scss";
import { Box, Button, Grid} from "@material-ui/core";
import Navbar from "../../components/navbar";
import { useHistory } from "react-router-dom";
import { Delete, DiscFull, Edit, ExitToApp, Visibility } from "@material-ui/icons";
import { logout } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import EditProfileDialog from "./editProfile";

const ProfileComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const routeHandler = () => history.replace("/home");
  const [open, setOpen] = useState(false);

 

  

  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : history.replace("/login");

  const logoutHandler = () => {
    dispatch(logout());
    history.replace("/login")
  };

  return (
    <div className={style.container}>
      <Navbar goto="home" route={routeHandler} />
      <div className={style.mainBox}>
        <div className={style.contentBox}>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Name:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.text}>{user.name}</span>
            </Grid>
          </Grid>
          <Grid container className={style.row}>
            <Grid item xs={4} className={style.gridItem}>
              <span className={style.head}>Email:&nbsp;</span>
            </Grid>
            <Grid item xs={8}>
              <span className={style.text}>{user.email}</span>
            </Grid>
          </Grid>

          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            {/* <Grid item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={()=>setOpen(true)}
                disabled
              >
                Edit Profile
              </Button>
            </Grid> */}
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<ExitToApp />}
                onClick={logoutHandler}
                // onClick={() => history.replace("/login")}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>

      <EditProfileDialog id={user._id} open={open} handleClose={()=>setOpen(false)}/>
    </div>
  );
};

export default ProfileComponent;
