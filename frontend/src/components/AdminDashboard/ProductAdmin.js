import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import axios from 'axios'

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
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  }
}));


export default function AdminEditProducts(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    logged: true,
    products: []
  });

  React.useEffect(async () => {
    try {
      let allProducts = await axios({
        method: 'get',
        url: '/api/products'
      })

      if(allProducts.data.length) {
        setState({
          ...state,
          products: allProducts.data
        })
      }
    } catch(e) {

    }
  }, [])

  const deleteProduct = async (id) => {
    try {
      let deletedProduct = await axios({
        method: 'delete',
        url: '/api/products/' + id
      })


      if(deletedProduct.data.deletedCount) {
        setState({
          ...state,
          products: state.products.filter(product => product._id !== id)
        })
      }

    } catch(e) {

    }
  }

  const changePage = () => {
    props.setState({
      ...props.state, 
      page: 'create-product'
    })
  }

  return (
      <div className={classes.body}>
        <span className={classes.spaceBetween}>
          <Typography className={classes.textColor}>All Products:</Typography>
          <Link to="/admin-dashboard/create-product" onClick={changePage}>
            <Button variant="outlined" color="primary">Create new product</Button>
          </Link>
        </span>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Details</TableCell>
                <TableCell align="right">Image Path</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.products.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.detail}</TableCell>
                  <TableCell align="right">{row.imageUrl}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => deleteProduct(row._id)}
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
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
  );
}
