import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import contactUsEmail from '../assets/email.png'
import { TextField, Button, Typography, IconButton } from '@material-ui/core';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
    },
    homepage: {
        margin: '10px',
        color: 'rgba(0, 0, 0, 0.54)',
        textDecoration: 'none'
    }
}));

const TwoStep = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        token: props.match.params.token,
        code: '',
        popup: false,
        popupInfo: {

        }
    })

    const changeCode = (event) => {
        setState({
            ...state,
            code: event.target.value
        })
    }

    const verifyCode = async () => {
        try {
            let codeValid = await axios({
                method: 'post',
                url: `/api/users/verify_2fa/${state.token}?code=${+state.code}`
            })

            if(codeValid.data.message && codeValid.data.message === 'Successfully!') {
                // Logged in
                dispatch({
                    type: 'login',
                    user: codeValid.data.user
                })

                // Redirect
                props.history.push('/success')
            } else {
                // Not logged in

                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        horizontal: 'center',
                        vertical: 'top',
                        color: 'error',
                        message: 'Wrong code!'
                    }
                })
            }
        } catch(e) {

            // setState({
            //     ...state,
            //     popup: true,
            //     popupInfo: {
            //         horizontal: 'center',
            //         vertical: 'top',
            //         color: 'error',
            //         message: 'Something went wrong...'
            //     }
            // })
        }

        
    }

    const abortVerification = () => {
        props.history.push('/')
    }


    return (
        <>
            <AlertMessage state={state} setState={setState} />
            <Link to="/" className={classes.homepage}>
                <IconButton>
                    <ArrowBackIcon />
                </IconButton>
                Back to homepage
            </Link>
            <div className={classes.root}>
                <div className={classes.contact_us_div}>
                    <Typography className={classes.title}>2-Step Verification</Typography>
                    <form className={classes.container}>
                        <TextField value={state.code} onChange={changeCode} required name="code" className={classes.input} label="Enter your verification code..." type="text" />
                       <div className={classes.buttons}>
                            <Button onClick={verifyCode} className={classes.button} variant="contained" color="secondary">Verify</Button>
                            <Button onClick={abortVerification} className={classes.button} variant="contained" color="default">Cancel</Button>
                        </div> 
                    </form>
                </div>
            </div>
        </>
    )
}

export default TwoStep