import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, IconButton, FormControl, InputLabel, Select } from '@material-ui/core';
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardOrder from '../components/CardPlaceOrderItem'
import photo1 from '../assets/categories/1.jpg'

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '100px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '7%',
        borderLeft: '1px solid #ccc',
        padding: '50px',
        height: '50%',
        maxHeight: '550px',
        paddingTop: '0',
        width: '350px',
        overflowY: 'scroll',
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        '& h4': {
            color: 'rgba(0, 0, 0, 0.64)'
        }
    },
    formControl: {
        margin: '20px 0'
    },
    totalPrice: {
        color: 'rgba(0, 0, 0, 0.64)',
        '& span': {
            color: '#388e3c'
        }
    },
    input: {
        margin: '15px 0'
    },
    button: {
        margin: '30px 0'
    },
}))

const items = [
    {
        name: 'Product 1',
        details: 'Details for product 1',
        qty: 2,
        price: 14,
        thumbnail: photo1
    },
    {
        name: 'Product 2',
        details: 'Details for product 2',
        qty: 5,
        price: 10,
        thumbnail: photo1
    },
    {
        name: 'Product 3',
        details: 'Details for product 3',
        qty: 1,
        price: 4,
        thumbnail: photo1
    }
]

const PlaceOrder = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        category: '',
        qty: 3,
        itemsInCart: items.length
    })

    const handleChangeCategory = (event) => {
        setState({
          ...state,
          category: event.target.value,
        });
    };

    let itemsCards = () => (
        <></>
    )

    if(state.itemsInCart) {
        itemsCards = () => (
            items.map((item, i) => (
                <CardOrder state={state} setState={setState} key={i} name={item.name} details={item.details} qty={item.qty} price={item.price} thumbnail={item.thumbnail} />
            ))
        )
    } else {
        itemsCards = () => (
            <p className={classes.noItems}>No items in your shopping cart...</p>
        )
    }

    return (
        <>
            <Header />
            <div className={classes.root}>
                <div className={classes.container}>
                    <h4>Items in shopping cart (scroll to view more)</h4>
                    {itemsCards()}
                </div>
                <form className={classes.container}>
                    <h3 className={classes.totalPrice}>Total price: <span>$3000</span></h3>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="categories">Payment option</InputLabel>
                        <Select
                            native
                            value={state.category}
                            onChange={handleChangeCategory}
                            inputProps={{
                                name: 'category',
                                id: 'categories',
                            }}
                        >
                            {/* <option aria-label="None" value="" /> */}
                            <option value='Cash'>Cash</option>
                        </Select>
                    </FormControl>
                    <TextField required name="firstName" className={classes.input} label="Your first name" type="text" />
                    <TextField required name="lastName" className={classes.input} label="Your last name" type="text" />
                    <TextField required name="phone" className={classes.input} label="Your phone number" type="text" />
                    <TextField required name="address" className={classes.input} label="Your address" type="text" />
                    <Button className={classes.button} variant="contained" color="primary">Place order</Button>
                </form>
            </div>
            <Footer />
        </>
    )
}


export default PlaceOrder