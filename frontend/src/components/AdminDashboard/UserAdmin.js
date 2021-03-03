import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@material-ui/core'
import axios from 'axios'
import AlertMessage from '../AlertMessage'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

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
  },
  colorGreen: {
    color: 'green'
  }
}));

const AdminEditUsers = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    logged: true,
    users: [],
    popup: false,
    popupInfo: {

    }
  });

  React.useEffect(async () => {
    try {
      let allUsers = await axios({
        method: 'get',
        url: '/api/users'
      })

      if(allUsers.data.length > 0) {
        setState({
          ...state,
          users: allUsers.data
        })
      }
    } catch(e) {
      // setState({
      //   ...state,
      //   popup: true,
      //   popupInfo: {
      //     vertical: 'top',
      //     horizontal: 'center',
      //     color: 'error',
      //     message: 'Something went wrong while fetching users...'
      //   }
      // })
    }

  }, [])

  const deleteUser = async (id) => {
    try {
      let deletedUser = await axios({
        method: 'delete',
        url: '/api/users/' + id
      })


      if(deletedUser.data.deletedCount) {
        setState({
          ...state,
          users: state.users.filter(user => user._id !== id),
          popup: true,
          popupInfo: {
            vertical: 'top',
            horizontal: 'center',
            color: 'success',
            message: 'Successfully deleted user...'
          }
        })
      } else {
        setState({
          ...state,
          popup: true,
          popupInfo: {
            vertical: 'top',
            horizontal: 'center',
            color: 'error',
            message: 'Something went wrong while deleting user...'
          }
        })
      }

    } catch(e) {
      // setState({
      //   ...state,
      //   popup: true,
      //   popupInfo: {
      //     vertical: 'top',
      //     horizontal: 'center',
      //     color: 'error',
      //     message: 'Something went wrong while deleting user...'
      //   }
      // })
    }
  }

  const changePage = () => {
    props.setState({
      ...props.state, 
      page: 'create-user'
    })
  }


  const updateRole = async (id, role) => {
    try {
      let updatedUser = await axios({
        method: 'post',
        url: '/api/users/role/change',
        data: {
          id,
          role: !role
        }
      })


      if(updatedUser.data._id) {
        // updated

        setState({
          ...state,
          popup: true,
          users: state.users.map(user => {
            if(user._id === id) {
              user.role = !role
            }
            return user
          }),
          popupInfo: {
            vertical: 'top',
            horizontal: 'center',
            color: 'success',
            message: 'Successfully'
          }
        })
      } else {
        setState({
          ...state,
          popup: true,
          popupInfo: {
            vertical: 'top',
            horizontal: 'center',
            color: 'error',
            message: 'Something went wrong...'
          }
        })
      }
    } catch(e) {
      // console.log(e)
      // setState({
      //   ...state,
      //   popup: true,
      //   popupInfo: {
      //     vertical: 'top',
      //     horizontal: 'center',
      //     color: 'error',
      //     message: 'Something went wrong...'
      //   }
      // })
    }
  }

  return (
      <div className={classes.body}>
        <AlertMessage state={state} setState={setState} />
        <span className={classes.spaceBetween}>
          <Typography className={classes.textColor}>All Users:</Typography>
          <Link to="/admin-dashboard/create-user" onClick={changePage}>
            <Button variant="outlined" color="primary">Create new user</Button>
          </Link>
        </span>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Email is Verified</TableCell>
                <TableCell align="right">Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.users.map((row, i) => (
                <TableRow key={row.name + ' ' + i}>
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{'' + !!row.email_is_verified}</TableCell>

                  <TableCell align="right" className={row.role ? classes.colorGreen : ''}>
                    <IconButton color="inherit" onClick={ () => updateRole(row._id, row.role)}>
                      {row.role ? 
                        <CheckBoxIcon /> :
                        <CheckBoxOutlineBlankIcon />
                      }
                    </IconButton>
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      onClick={() => deleteUser(row._id)}
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
};

export default AdminEditUsers;
