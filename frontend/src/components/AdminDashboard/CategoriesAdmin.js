import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Typography } from "@material-ui/core";
import AlertMessage from '../AlertMessage'


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

export default function AdminEditCategories(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    logged: true,
    categories: [],
    popup: false,
    popupInfo: {

    }
  });

  React.useEffect(async () => {
    try {
      let allCategories = await axios({
        method: 'get',
        url: '/api/categories'
      })

      if(allCategories.data.length > 0) {
        setState({
          ...state,
          categories: allCategories.data
        })
      }
    } catch(e) {
      setState({
        ...state,
        popup: true,
        popupInfo: {
          vertical: 'top',
          horizontal: 'center',
          color: 'error',
          message: 'Something went wrong while fetching categories...'
        }
      })
    }

  }, [])


  const deleteCategory = async (id) => {
    try {
      let deletedCategory = await axios({
        method: 'delete',
        url: '/api/categories/' + id
      })


      if(deletedCategory.data.deletedCount) {
        setState({
          ...state,
          categories: state.categories.filter(category => category._id !== id),
          popup: true,
          popupInfo: {
            vertical: 'top',
            horizontal: 'center',
            color: 'success',
            message: 'Successfully deleted category...'
          }
        })
      }

    } catch(e) {
      setState({
        ...state,
        popup: true,
        popupInfo: {
          vertical: 'top',
          horizontal: 'center',
          color: 'error',
          message: 'Something went wrong while deleting category...'
        }
      })
    }
  }

  const changePage = () => {
    props.setState({
      ...props.state, 
      page: 'create-category'
    })
  }

  return (
      <div className={classes.body}>
        <AlertMessage state={state} setState={setState} />
        <span className={classes.spaceBetween}>
          <Typography className={classes.textColor}>All Categories:</Typography>
          <Link to="/admin-dashboard/create-category" onClick={changePage}>
            <Button variant="outlined" color="primary">Create new category</Button>
          </Link>
        </span>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Image Path</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.categories.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.imageUrl}</TableCell>
                  <TableCell align="right">
                    
                    <Button
                      onClick={() => deleteCategory(row._id)}
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
