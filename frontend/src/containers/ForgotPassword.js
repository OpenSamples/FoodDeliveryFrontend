import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from "@material-ui/core/styles";
import contactUsEmail from '../assets/email.png'
import { TextField, Button, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios'
import AlertMessage from '../components/AlertMessage'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '60%',
        justifyContent: "center",
        alignItems: "center"
    },
    contact_us_div: {
        border: "1px solid #ccc",
        width: "550px",
        margin: "100px auto",
        height: '350px',
        borderRadius: "10px",
        boxShadow: "6px 7px 4px 1px rgba(0,0,0,0.75);",
        padding: "10px"
    },
    emailLogo: {
        width: "250px",
        height: "250px",
    },
    button: {
        width: "100%",
        margin: "auto",
        padding: "10px"
    },
    input: {
        margin: "30px",
        width: "50%"
    },
    title: {
        fontSize: "35px",
        marginBottom: "10px",
        textAlign: "center"
    },
    title2: {
        fontSize: "16px",
        textAlign: "center",
        color: "gray",
        fontStyle: "italic"
    },
    lock: {
        width: "30px",
        height: "30px",
    },
    titleContainer: {
        height: '40%'
    }
}));

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1,
            width:"80%"
        }}
    />
);

const TwoStep = () => {
    const classes = useStyles();
    
    const [state, setState] = React.useState({
        email: '',
        popup: false,
        popupInfo: {

        }
    })

    const sendResetLink = async (event) => {
        event.preventDefault()
        try {
            let response = await axios({
                method: 'post',
                url: '/api/users/reset-password/' + state.email
            })

            if(response.data.message === 'Reset link sent!') {
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'success',
                        message: 'Reset link sent...'
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
    }

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>
                <div className={classes.contact_us_div}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.title}>Reset Your Password</Typography>
                        <Typography className={classes.title2}>Forgot password or want to change it ?</Typography>
                        <Typography className={classes.title2}>Reset it now, You just need to provide us your email address.</Typography>
                        <ColoredLine color="gray" />
                    </div>
                    <form className={classes.container} onSubmit={sendResetLink}>
                        <LockIcon className={classes.lock}></LockIcon>
                        <TextField required name="email" value={state.email} onChange={event => setState({...state, email: event.target.value})} className={classes.input} label="Enter your email" type="email" />
                        <div className={classes.buttons}>
                            <Button type="submit" className={classes.button} variant="contained" color="secondary">Send Reset Link</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TwoStep