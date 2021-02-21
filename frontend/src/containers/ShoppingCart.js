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
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        '& h2': {
            color: 'rgba(0, 0, 0, 0.54)'
        }
    },
    placeOrderBtn: {
        alignSelf: 'flex-end',
        marginTop: '2em'
    },
    noItems: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1.3rem',
        margin: '0 auto'
    }
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

const ShoppingCart = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        qty: 3,
        itemsInCart: items.length
    })

    let itemsCards = () => (
        <></>
    )

    let title = "Your Shopping Cart Items:"

    if(state.itemsInCart) {
        itemsCards = () => (
            items.map((item, i) => (
                <ShoppingCartItem state={state} setState={setState} key={i} name={item.name} details={item.details} qty={item.qty} price={item.price} thumbnail={item.thumbnail} />
            ))
        )
    } else {
        itemsCards = () => (
            <p className={classes.noItems}>No items in your shopping cart...</p>
        )
        title = ""
    }

    return (
        <>
            <Header />
            <div className={classes.root}>
                <div className={classes.container}>
                    <h2>{title}</h2>
                    {itemsCards()}
                    <Button disabled={state.itemsInCart ? false : true} variant="outlined" color="primary" className={classes.placeOrderBtn}>Place order</Button>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default ShoppingCart