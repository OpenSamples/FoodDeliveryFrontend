import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from "@material-ui/core/styles";
import contactUsEmail from '../assets/email.png'
import { TextField, Button, Typography } from '@material-ui/core';
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
        height: '100%',
    },
    contact_us_div: {
        border: "1px solid #ccc",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "60%",
        margin: "150px auto",
        height: '450px',
        borderRadius: "10px",
        boxShadow:"6px 7px 4px 1px rgba(0,0,0,0.75);"
    },
    contact_us_div_left: {
        textAlign: "center",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        borderRight: "1px solid #ccc",
        backgroundColor:"#3f51b5",
        borderTopLeftRadius:"10px",
        borderBottomLeftRadius:"10px"
    },
    contact_us_div_right: {
        padding: "5px"
    },
    emailLogo: {
        width: "250px",
        height: "250px",
    },
    textarea: {
        resize: "none",
        margin: "10px 20px",
        outline: "none",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        fontSize:"14px"
    },
    button: {
        width: "50%",
        margin: "auto"
    },
    input: {
        margin: "10px 20px",
        // padding:"10px"
    },
    left_text1:{
        color:"white"
    },
    left_text2:{
        color:"white",
        margin:"5px",
        fontSize:"22px"
    },
    left_text:{
        width:"80%",
        fontStyle:"italic",
    }
}));

const Contact = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        name: '',
        email: '',
        message: '',
        popup: false,
        popupInfo: {

        }
    })

    const sendMail = async (event) => {
        event.preventDefault()

        try {
            let response = await axios({
                method: 'post',
                url: '/api/users/contact_form/contact',
                data: {
                    name: state.name,
                    email: state.email,
                    message: state.message
                }
            })

            if(response.data.message && response.data.message === 'Successfully') {
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
    }

    const changeInput = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>
                <div className={classes.contact_us_div}>
                    <div className={classes.contact_us_div_left}>
                        <img src={contactUsEmail} alt="emailLogo" className={classes.emailLogo} />
                        <div className={classes.left_text}>
                        <Typography className={classes.left_text1}>If you have questions or just want to get in touch use the form to contact us!
                        We look forward to hearing from you!
                           </Typography>
                          <Typography className={classes.left_text2}> <b>Bon Appétit</b></Typography> 
                          </div>  
                    </div>
                    <div className={classes.contact_us_div_right}>
                        <form className={classes.container} onSubmit={sendMail}>
                            <TextField onChange={changeInput} value={state.name} required name="name" className={classes.input} label="Your name..." type="text" />
                            <TextField onChange={changeInput} value={state.email} required name="email" className={classes.input} label="Your email..." type="email" />
                            <textarea onChange={changeInput} value={state.message} name="message" cols="20" rows="10" required className={classes.textarea} placeholder="Your message..."></textarea>
                            <Button type="submit" className={classes.button} variant="contained" color="primary">Send</Button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact