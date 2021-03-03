import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import axios from 'axios'
import AlertMessage from '../AlertMessage'

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

const CreateCategory = () => {
    const classes = useStyles()


    const [state, setState] = React.useState({
        name: '',
        image: '',
        messageUpload: 'Upload photo *',
        popup: false,
        popupInfo: {

        }
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
            image: event.target.files[0],
            messageUpload: 'File selected'
        })
    }

    const createCategory = async (event) => {
        event.preventDefault()
        
        if(!state.image) {
            setState({
                ...state,
                popup: true,
                popupInfo: {
                    vertical: 'top',
                    horizontal: 'center',
                    color: 'error',
                    message: 'Please upload an image.'
                }
            })
            return;
        }

        try {
            // Request made to the backend api 
            // Send formData object 
            // console.log(formData)            

            let bodyData = new FormData()

            bodyData.append('imageUrl', state.image)
            bodyData.append('name', state.name)

            let data = await axios({
                method: 'post',
                url: "/api/categories", 
                data: bodyData
            });

            if(data.data._id) {
                // Category created
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'success',
                        message: 'Category created!'
                    }
                })
            } else {
                // Category not created
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'error',
                        message: 'Something went wrong while creating category!'
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

    return (
        <div className={classes.root}>
            <AlertMessage state={state} setState={setState} />
            <form className={classes.container} onSubmit={createCategory} encType="multipart/form-data">
                <TextField
                    required
                    name="name"
                    className={classes.input}
                    label="Name"
                    type="text"
                    onChange={updateInput}
                    value={state.name}
                />
                <Button
                    variant="contained"
                    component="label"
                >
                    {state.messageUpload}
                    <input
                        type="file"
                        name="image"
                        hidden
                        onChange={selectImage}
                    />
                </Button>
                <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    Add category
                </Button>
            </form>
        </div>
    )
}



export default CreateCategory