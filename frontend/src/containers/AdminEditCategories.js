import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  body: {
    width: "70%",
    maxWidth: "1300px",
    margin: "80px auto",
    minHeight: "60vh",
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: "5px",
  },
}));
function createData(name, imagePath) {
  return { name, imagePath };
}

const rows = [
  createData("Meals", "/images/categories/meals.jpg"),
  createData("Deals", "/images/categories/deals.jpg"),
  createData("Deserts", "/images/categories/deserts.jpg"),
];

export default function AdminEditCategories() {
  const classes = useStyles();

  const [state, setState] = useState({
    logged: true,
  });

  return (
    <>
      <Header />
      <div className={classes.body}>
        <Typography className={classes.textColor}>Edit Categories:</Typography>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Image Path</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.imagePath}</TableCell>
                  <TableCell align="right">
                    <Button
                      type="submit"
                      className={classes.button}
                      variant="contained"
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      type="submit"
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </>
  );
}