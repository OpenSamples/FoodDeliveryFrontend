import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AlertMessage from '../components/AlertMessage'
import axios from 'axios'
import { useDispatch } from 'react-redux'

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
}))

const ResetPassword = props => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        token: props.match.params.token,
        password: '',
        password2: '',
        popup: false,
        popupInfo: {
            
        }
    })

    const updatePassword = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const resetPassword = async (event) => {
        event.preventDefault()

        try {
            if(state.password === state.password2) {
                // Change pw
                let changedPw = await axios({
                    method: 'post',
                    url: '/api/users/get-user-reset/' + state.token,
                    data: {
                        password: state.password
                    }
                })

                console.log(changedPw)

                if(changedPw.data._id) {
                    // Login user...
                    dispatch({
                        type: 'login',
                        user: changedPw.data
                    })
    
                    // Redirect
                    props.history.push('/success')
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
            } else {
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'error',
                        message: 'Password Must be Matching!'
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

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>
                <form className={classes.container} onSubmit={resetPassword}>
                    <TextField onChange={updatePassword} value={state.password} required name="password" className={classes.input} label="Enter your new password" type="password" />
                    <TextField onChange={updatePassword} value={state.password2} required name="password2" className={classes.input} label="Confirm your new password" type="password" />
                    <Button type="submit" className={classes.button} variant="contained" color="primary">Reset password</Button>
                </form>
            </div>
            <Footer />
        </>
    )
}


export default ResetPassword