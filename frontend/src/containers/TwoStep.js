import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from "@material-ui/core/styles";
import contactUsEmail from '../assets/email.png'
import { TextField, Button, Typography } from '@material-ui/core';

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
        height: '75%'
    },
    contact_us_div: {
        border: "1px solid #ccc",
        width: "30%",
        margin: "160px auto",
        height: '200px',
        borderRadius: "10px",
        boxShadow: "6px 7px 4px 1px rgba(0,0,0,0.75);",
        padding:"10px"
    },
    emailLogo: {
        width: "250px",
        height: "250px",
    },
    button: {
        width: "50%",
        margin: "auto"
    },
    input: {
        margin: "30px",
        width:"50%",
        margin:"auto"
    },
    title:{
        fontSize:"25px",
        marginBottom:"20px",
        textAlign:"center",
        height: '15%'
    },
    buttons:{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        margin:"20px"
    }
}));

const TwoStep = () => {
    const classes = useStyles();
    return (
        <>
            <Header />
            <div className={classes.root}>
                <div className={classes.contact_us_div}>
                    <Typography className={classes.title}>2-Step Verification</Typography>
                    <form className={classes.container}>
                        <TextField required name="code" className={classes.input} label="Enter your verification code..." type="text" />
                       <div className={classes.buttons}>
                            <Button className={classes.button} variant="contained" color="secondary">Verify</Button>
                            <Button className={classes.button} variant="contained" color="default">Cancel</Button>
                        </div> 
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default TwoStep