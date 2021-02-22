import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import { Avatar } from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'
import photo1 from '../assets/categories/3.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    avatarContainer: {
        marginTop: '60px'
    },
    avatar: {
        width: '230px',
        height: '230px'
    },
    container: {
        width: '70%',
        margin: '100px auto',
        alignSelf: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center'
    }
}))

const EditProfile = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        two_fa: false
    })

    const handleChange = () => {
        setState({
            ...state,
            two_fa: !state.two_fa
        })
    }

    return (
        <>
            <Header />
            <div className={classes.root}>
                <div className={classes.avatarContainer}>
                    <Avatar alt="Logo" src={photo1} className={classes.avatar} />
                </div>
                <div className={classes.container}>
                    <TextField required name="firstName" className={classes.input} label="Your first name" type="text" />
                    <TextField required name="lastName" className={classes.input} label="Your last name" type="text" />
                    <TextField required name="email" className={classes.input} label="Your email" type="email" />
                    <TextField name="address" className={classes.input} label="Your primary address" type="text" />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.two_fa}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="2FactorAuth (2FA)"
                    />
                    <Button className={classes.button} variant="outlined" color="primary">Change password</Button>
                    <Button className={classes.button} variant="contained" color="primary">Update</Button>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default EditProfile