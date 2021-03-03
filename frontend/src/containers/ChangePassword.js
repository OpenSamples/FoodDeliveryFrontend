import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import contactUsEmail from '../assets/email.png'
import { TextField, Button, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import AlertMessage from '../components/AlertMessage';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        width: '300px',
        flexDirection: 'column',
        marginTop: '7%',
        border: '1px solid #ccc',
        padding: '50px',
        height: '50%',
        paddingTop: '0'
    },
    input: {
        margin: '15px 0'
    },
    button: {
        margin: '20px 0'
    },
}));


const TwoStep = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        oldPassword: '',
        password: '',
        password2: '',
        popup: false,
        popupInfo: {

        }
    })

    const updatePassword = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const changePassword = async (event) => {
        event.preventDefault()

        if(state.password2 === state.password) {
            try {
                let newData = await axios({
                    method: 'post',
                    url: '/api/users/user-data/change-password',
                    data: {
                        oldPassword: state.oldPassword,
                        password: state.password
                    }
                })


                if(newData.data._id) {
                    setState({
                        ...state,
                        popup: true,
                        popupInfo: {
                            vertical: 'top',
                            horizontal: 'center',
                            color: 'success',
                            message: 'Successfully'
                        }
                    })
                } else if(newData.data.message) {
                    setState({
                        ...state,
                        popup: true,
                        popupInfo: {
                            vertical: 'top',
                            horizontal: 'center',
                            color: 'error',
                            message: newData.data.message
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
                // setState({
                //     ...state,
                //     popup: true,
                //     popupInfo: {
                //         vertical: 'top',
                //         horizontal: 'center',
                //         color: 'error',
                //         message: 'Something went wrong...'
                //     }
                // })
            }
        } else {
            setState({
                ...state,
                popup: true,
                popupInfo: {
                    vertical: 'top',
                    horizontal: 'center',
                    color: 'error',
                    message: 'New Password Must be Matching!'
                }
            })
        }
    }

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>
                <form className={classes.container} onSubmit={changePassword}>
                    <TextField onChange={updatePassword} value={state.oldPassword} required name="oldPassword" className={classes.input} label="Enter your old password" type="password" />
                    <TextField onChange={updatePassword} value={state.password} required name="password" className={classes.input} label="Enter your new password" type="password" />
                    <TextField onChange={updatePassword} value={state.password2} required name="password2" className={classes.input} label="Confirm your new password" type="password" />
                    <Button type="submit" className={classes.button} variant="contained" color="primary">Change password</Button>
                </form>                
            </div>
            <Footer />
        </>
    )
}

export default TwoStep