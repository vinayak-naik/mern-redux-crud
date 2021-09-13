import React, { useState, useEffect } from "react";
import style from "./login.module.scss";
import { AiFillAmazonCircle } from "react-icons/ai";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userActions";
import Alert from "@material-ui/lab/Alert";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const routeHandler = () => history.replace("/register");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  return (
    <div className={style.container}>
      <Navbar goto="Register" route={routeHandler} />
      <div className={style.outerBox}>
        <div className={style.innerBox}>
          <form onSubmit={onSubmitHandler}>
            <Grid container spacing={2}>
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
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  size="large"
                  variant="contained"
                  disabled={!email || !password || loading}
                  style={{ height: 50 }}
                >
                  {loading ? <CircularProgress size={30} /> : "login"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      {error && (
        <Alert className={style.toast} severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default LoginComponent;
