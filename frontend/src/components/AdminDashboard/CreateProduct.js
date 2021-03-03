import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, IconButton, FormControl, InputLabel, Select } from '@material-ui/core';
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

const CreateProduct = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        categories: [],
        name: '',
        detail: '',
        price: '',
        categoryId: '',
        messageUpload: 'Upload photo *',
        image: '',
        popup: false,
        popupInfo: {

        }
    })

    React.useEffect( async () => {
        try {
            let categories = await axios({
                method: 'get',
                url: '/api/categories'
            })

            if(categories.data.length > 0 ) {
                setState({
                    ...state,
                    categories: categories.data
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
                    message: 'Something went wrong while fetching categories...'
                }
            })
        }
    }, [])

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

    const createProduct = async (event) => {
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

            let formDataProduct = new FormData()

            formDataProduct.append('name', state.name)
            formDataProduct.append('imageUrl', state.image)
            formDataProduct.append('detail', state.detail)
            formDataProduct.append('price', +state.price)
            formDataProduct.append('categoryId', state.categoryId)


            let data = await axios({
                method: 'post',
                url: "/api/products", 
                data: formDataProduct
            }); 
           
            if(data.data._id) {
                // Product created
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'success',
                        message: 'Product created!'
                    }
                })
            } else {
                // Product not created
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'error',
                        message: 'Something went wrong while creating product'
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
        <div className={classes.root}>
            <AlertMessage state={state} setState={setState} />
            <form className={classes.container} onSubmit={createProduct} encType="multipart/form-data">
                <TextField
                    required
                    name="name"
                    onChange={updateInput}
                    className={classes.input}
                    label="Name"
                    type="text"
                />
                <TextField
                    required
                    onChange={updateInput}
                    name="detail"
                    className={classes.input}
                    label="Description"
                    type="text"
                />
                <TextField
                    required
                    name="price"
                    onChange={updateInput}
                    className={classes.input}
                    label="Price"
                    type="number"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="categoryId">Category</InputLabel>
                    <Select
                        native
                        className={classes.input}
                        onChange={updateInput}
                        inputProps={{
                            name: 'categoryId',
                            id: 'categoryId',
                            required: true
                        }}
                    >
                        <option aria-label="None" value="" />
                        {state.categories.map((category, i) => <option key={i + ' ' + category.name} value={category._id}>{category.name}</option>)}
                    </Select>
                </FormControl>
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
                    Add product
                </Button>
            </form>
        </div>
    )
}



export default CreateProduct