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

const CreateCategory = () => {
    const classes = useStyles()


    const [state, setState] = React.useState({
        name: '',
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

    const createCategory = async (event) => {
        event.preventDefault()

        try {
            // Request made to the backend api 
            // Send formData object 
            // console.log(formData)
            let data = await axios({
                method: 'post',
                url: "/api/categories", 
                data: {
                    upload: state.image,
                    name: state.name,
                    imageUrl: './images/categories/2.jpeg'
                }
            }); 
           
            
            if(data.data._id) {
                // Category created
                alert('Category added')
            } else {
                // Category not created
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.root}>
            <form className={classes.container} onSubmit={createCategory}>
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
                    Upload photo
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