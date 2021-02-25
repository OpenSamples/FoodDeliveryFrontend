import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles(() => ({
    root: {
        width: "70%",
        maxWidth: "1300px",
        margin: "80px auto",
        minHeight: "60vh",
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '7%',
        height: '50%',
        paddingTop: '0'
    },
    input: {
      margin: "15px 0",
      width: '300px'
    },
    button: {
      margin: "20px 0",
      width: '300px'
    },
}))

const CreateUser = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: ''
    })

    const updateInput = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const selectImage = event => {
        setState({
            ...state,
            image: event.target.files[0]
        })
    }

    const createUser = async (event) => {
        event.preventDefault()

        try {
            // Request made to the backend api 
            // Send formData object 
            // console.log(formData)
            let data = await axios({
                method: 'post',
                url: "/api/users", 
                data: {
                    upload: state.image,
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    password: state.password
                }
            }); 
           
            console.log(data)
            if(data.data.user._id) {
                // User created
                alert('User added')
            } else {
                // User not created
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={createUser}>
                <TextField
                    required
                    name="firstName"
                    value={state.firstName}
                    onChange={updateInput}
                    className={classes.input}
                    label="First Name"
                    type="text"
                />
                <TextField
                    required
                    name="lastName"
                    value={state.lastName}
                    onChange={updateInput}
                    className={classes.input}
                    label="Last Name"
                    type="text"
                />
                 <TextField
                    required
                    name="email"
                    value={state.email}
                    onChange={updateInput}
                    className={classes.input}
                    label="Email"
                    type="email"
                />
                <TextField
                    required
                    name="password"
                    value={state.password}
                    onChange={updateInput}
                    className={classes.input}
                    label="Password"
                    type="password"
                />
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload photo
                    <input
                        type="file"
                        name="image"
                        onChange={selectImage}
                        hidden
                    />
                </Button>
                <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    Add user
                </Button>
            </form>
        </div>
    )
}



export default CreateUser