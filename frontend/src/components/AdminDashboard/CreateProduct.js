import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, IconButton, FormControl, InputLabel, Select } from '@material-ui/core';
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

const CreateProduct = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        categories: [],
        name: '',
        detail: '',
        price: '',
        categoryId: '',
        image: ''
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
            image: event.target.files[0]
        })
    }

    const createProduct = async (event) => {
        event.preventDefault()

        try {
            // Request made to the backend api 
            // Send formData object 
            // console.log(formData)
            let data = await axios({
                method: 'post',
                url: "/api/products", 
                data: {
                    upload: state.image,
                    name: state.name,
                    detail: state.detail,
                    price: +state.price,
                    categoryId: state.categoryId
                }
            }); 
           
            
            if(data.data._id) {
                // Product created
                alert('Product added')
            } else {
                // Product not created
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.root}>
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
                        {state.categories.map(category => <option value={category._id}>{category.name}</option>)}
                    </Select>
                </FormControl>
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
                    Add product
                </Button>
            </form>
        </div>
    )
}



export default CreateProduct