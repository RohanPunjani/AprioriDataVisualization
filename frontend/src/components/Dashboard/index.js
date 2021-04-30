import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import BasicStats from "../BasicStats";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Grid from "@material-ui/core/Grid";
import ReceivedDataGraph from "../ReceivedDataGraph";
import { Divider, Typography } from "@material-ui/core";
import ItemsSoldDataGraph from "../ItemsSoldDataGraph";
import { Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Switch>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <Sidebar />
        <main className={classes.content}>
          <Route exact path="/">
            <Toolbar />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6} md={6}>
                <BasicStats />
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="h5" color="initial">
                  Graphical Representation of Received Data
                </Typography>
                <br />
                <ReceivedDataGraph />
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6} md={6}>
                <ItemsSoldDataGraph type="by_date" />
              </Grid>
              <Grid item xs={6} md={6}>
                <ItemsSoldDataGraph type="by_month" />
              </Grid>
            </Grid>
            <Toolbar />
          </Route>
        </main>
        <main className={classes.content}>
          <Route exact path="/predict">
            <Toolbar />
            <Typography variant="h2" color="initial">Select Any Product of your choice</Typography>
          </Route>
        </main>
      </div>
    </Switch>
  );
}
