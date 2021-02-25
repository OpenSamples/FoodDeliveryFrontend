import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from "@material-ui/core/styles";
import contactUsEmail from '../assets/email.png'
import { TextField, Button, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

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
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        padding:"10px"
    },
    contact_us_div: {
        border: "1px solid #ccc",
        width: "30%",
        margin: "auto",
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
        padding: "20px",
        width: "50%",
        margin: "auto"
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
    return (
        <>
            <Header />
            <div className={classes.root}>
                <div className={classes.contact_us_div}>
                        <Typography className={classes.title}>Reset Your Password</Typography>
                        <Typography className={classes.title2}>Forgot password or want to change it ?</Typography>
                        <Typography className={classes.title2}>Reset it now, provide us your email address.</Typography>
                        <ColoredLine color="gray" />
                    <form className={classes.container}>
                    <LockIcon className={classes.lock}></LockIcon>
                        <TextField required name="code" className={classes.input} label="Enter your email" type="email" />
                        <div className={classes.buttons}>
                            <Button className={classes.button} variant="contained" color="secondary">Send Reset Link</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TwoStep