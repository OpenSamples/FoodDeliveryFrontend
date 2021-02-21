import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  body: {
    width: "70%",
    maxWidth: "1300px",
    margin: "80px auto",
    minHeight: "60vh",
  },
}));

export default function AdminStatistics() {
  const classes = useStyles();

  const [state, setState] = useState({
    logged: true,
  });
  return (
    <>
      <Header />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
      />
      <div className={classes.body}>
        <i class="fa fa-pie-chart fa-5x"></i>
      </div>
      <Footer />
    </>
  );
}
