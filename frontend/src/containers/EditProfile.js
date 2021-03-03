import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { TextField, Button, Typography, IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import { Avatar } from '@material-ui/core'
import  { useSelector, useDispatch } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import photo1 from '../assets/categories/3.jpg'
import { host } from '../config/config'
import axios from 'axios'
import AlertMessage from '../components/AlertMessage'
import Alert from '@material-ui/lab/Alert';

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
    },
    verifyEmail: {
        width: '70%',
        margin: '20px 0',
        '& .MuiAlert-message': {
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%'
        },
        '& span:last-child': {
            color: 'blue',
            cursor: 'pointer'
        }
    },
    uploadBtn: {
        margin: '20px 0',
        width: '230px'
    }
}))

const EditProfile = () => {
    const classes = useStyles()
    
    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        two_fa: useSelector(state => state.user.two_fa.enabled),
        messageUpload: 'Upload photo',
        image: '',
        user: useSelector(state => state.user),
        firstName: useSelector(state => state.user.firstName) || '',
        lastName: useSelector(state => state.user.lastName) || '',
        email: useSelector(state => state.user.email) || '',
        address: useSelector(state => state.user.addresses[0]) || '',
        popup: false,
        popupInfo: {

        }
    })

    const handleChange = () => {
        setState({
            ...state,
            two_fa: !state.two_fa
        })
    }

    const changeInput = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const updateProfileInfo = async () => {
        if( !state.image && state.two_fa === state.user.two_fa.enabled && state.firstName === state.user.firstName && state.lastName === state.user.lastName && state.email === state.user.email && ( state.address === state.user.addresses[0] || state.address === '')) {
            // Nothing changed
        } else {
            try {
                let formData = new FormData()

                if(state.image) {
                    formData.append('userImage', state.image)
                }
                formData.append('firstName', state.firstName)
                formData.append('lastName', state.lastName)
                formData.append('addresses', [state.addresses])
                formData.append('two_fa', state.two_fa)


                let updatedUser = await axios({
                    method: 'post',
                    url: '/api/users/update',
                    data: formData
                })


                if(updatedUser.data._id) {
                    // Update user on front, get refresh token

                    dispatch({
                        type: 'updateUser',
                        user: {
                            email: state.email,
                            firstName: state.firstName,
                            lastName: state.lastName,
                            addresses: [state.address],
                            two_fa: {
                                enabled: state.two_fa
                            },
                            logoUrl: updatedUser.data.logoUrl
                        }
                    })

                    setState({
                        ...state,
                        popup: true,
                        popupInfo: {
                            vertical: 'top',
                            horizontal: 'center',
                            color: 'success',
                            message: 'Profile updated!'
                        },
                        user: {
                            ...state.user,
                            logoUrl: updatedUser.data.logoUrl
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
    }

    const sendVerificationLink = async () => {
        try {
            let response = await axios({
                method: 'post',
                url: '/api/users/resend_email_verification'
            })

            if(response.data.message === 'Successfully!') {
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'success',
                        message: 'Successfully!'
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

    const selectImage = event => {
        setState({
            ...state,
            image: event.target.files[0],
            messageUpload: 'File selected'
        })
    }

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>

                {
                    state.user.email_is_verified ? '' :

                    <Alert className={classes.verifyEmail} severity="warning">
                        <span>
                            Your email is not verified! Please verify now... 
                        </span>
                        <span onClick={sendVerificationLink}>Resend verification link</span>
                    </Alert>
                }

                <div className={classes.avatarContainer}>
                    <Avatar alt="Logo" src={host + state.user.logoUrl} className={classes.avatar} />
                    <Button
                        variant="contained"
                        component="label"
                        className={classes.uploadBtn}
                    >
                        {state.messageUpload}
                        <input
                            type="file"
                            name="image"
                            hidden
                            onChange={selectImage}
                        />
                    </Button>
                </div>
                <div className={classes.container}>
                    <TextField value={state.firstName} onChange={changeInput} required name="firstName" className={classes.input} label="Your first name" type="text" />
                    <TextField value={state.lastName} onChange={changeInput} required name="lastName" className={classes.input} label="Your last name" type="text" />
                    <TextField value={state.email} disabled required name="email" className={classes.input} label="Your email" type="email" />
                    <TextField value={state.address} onChange={changeInput} name="address" className={classes.input} label="Your primary address" type="text" />
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
                    <Link to="/change-password">
                        <Button className={classes.button} variant="outlined" color="primary">Change password</Button>
                    </Link>
                    <Button onClick={updateProfileInfo} className={classes.button} variant="contained" color="primary">Update</Button>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default EditProfile