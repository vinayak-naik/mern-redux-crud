import React, { useState, useEffect } from "react";
import style from "./register.module.scss";
import { MdVisibility } from "react-icons/md";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import Navbar from "../../components/navbar";
import { useHistory } from "react-router-dom";
import { Visibility } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/userActions";
import Alert from "@material-ui/lab/Alert";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const routeHandler = () => history.replace("/login");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(register(name, email, password));
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  return (
    <div className={style.container}>
      <Navbar goto="Login" route={routeHandler} />
      <div className={style.outerBox}>
        <div className={style.innerBox}>
          <form>
            <Grid container spacing={2}>
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
                  disabled={!name || !email || !password || loading}
                  onClick={onSubmitHandler}
                  style={{ height: 50 }}
                >
                  {loading ? <CircularProgress size={30} /> : "register"}
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

export default RegisterComponent;
