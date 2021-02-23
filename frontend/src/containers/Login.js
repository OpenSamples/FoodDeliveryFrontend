import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { login } from '../store/actions'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
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
    a: {
        textDecoration: 'none',
        color: 'blue'
    },
    google: {
        textDecoration: 'none',
        alignSelf: 'center',
        marginBottom: '20px',
        backgroundColor: '#3f51b5',
        color: '#fff',
        padding: '10px'
    },
    textColor: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    logo: {
        width: '150px',
        height: '100px',
        alignSelf: 'center',
        marginBottom: '20px'
    },
    homepage: {
        margin: '10px',
        color: 'rgba(0, 0, 0, 0.54)',
        textDecoration: 'none'
    }
}))

const Login = () => {
    const classes = useStyles()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const tryLogin = async (event) => {
        event.preventDefault()

        try {
            let data = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/users/login',
                headers: {}, 
                data: {
                  email: user.email, // This is the body part
                  password: user.password
                }
            });
        
            console.log(data)
            if(data.data.message === 'Successfully logged in!') {
                // alert('Logged in!')
                dispatch({
                    type: 'login',
                    user: data.data.user
                })


            } else {
                alert('Wrong creds!')
            }
              
        } catch(e) {
            // console.log(e)
            alert('error')
        }
        // console.log(user)
    }

    const updateUser = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <Link to="/" className={classes.homepage}>
                <IconButton>
                    <ArrowBackIcon />
                </IconButton>
                Back to homepage
            </Link>
            <div className={classes.root}>
                <form className={classes.container} onSubmit={tryLogin}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <TextField onChange={updateUser} required name="email" className={classes.input} label="Your email" type="email" />
                    <TextField onChange={updateUser} required name="password" className={classes.input} label="Your password" type="password" />
                    <Button type="submit" className={classes.button} variant="contained" color="primary">Login</Button>
                    <Typography className={classes.textColor}>Or sign in with...</Typography>
                    <Link className={classes.google} to="/login-google">Google</Link>
                    <Typography className={classes.textColor}>Does not have an account? <Link className={classes.a} to="/register">Sign-up now</Link></Typography>
                    <Typography className={classes.textColor}>Forgot password?<Link className={classes.a} to="/forgot-password"> Reset now</Link></Typography>
                </form>
            </div>
        </>
    )
}


export default Login