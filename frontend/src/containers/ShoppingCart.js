import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ShoppingCartItem from '../components/ShoppingCartItem'
import photo1 from '../assets/categories/1.jpg'

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        width: '60%',
        margin: '5rem auto'
    },
    container: {
        width: '100%',
        // border: '1px solid #ccc',
        padding: '2rem'
    },
    placeOrderBtn: {
        float: 'right'
    }
}))

const items = [
    {
        name: 'Product 1',
        details: 'Details about product 1',
        qty: 2,
        price: 12,
        thumbnail: photo1
    },
    {
        name: 'Product 2',
        details: 'Details about product 2',
        qty: 1,
        price: 7,
        thumbnail: photo1
    },
    {
        name: 'Product 3',
        details: 'Details about product 3',
        qty: 5,
        price: 8,
        thumbnail: photo1
    }
]

const ShoppingCart = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({qty: 3})

    return (
        <>
            <Header />
            <div className={classes.root}>
                <div className={classes.container}>
                    {items.map((item, i) => (
                        <ShoppingCartItem state={state} setState={setState} key={i} name={item.name} details={item.details} qty={item.qty} price={item.price} thumbnail={item.thumbnail} />
                    ))}
                    <Button variant="outlined" color="primary" className={classes.placeOrderBtn}>Place order</Button>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default ShoppingCart