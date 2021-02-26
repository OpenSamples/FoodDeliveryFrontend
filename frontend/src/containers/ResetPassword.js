import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'

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

    const [state, setState] = React.useState({
        token: props.match.params.token,
        password: '',
        password2: ''
    })

    const updatePassword = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const resetPassword = async () => {
        try {

        } catch(e) {

        }
    }

    return (
        <>
            <Header />
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