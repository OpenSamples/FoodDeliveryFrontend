import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { host } from '../config/config'
import { useSelector, useDispatch } from 'react-redux'
import { popularProductsAction, categoriesAction } from '../store/actions'
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ItemCarousel from '../components/ItemCarousel'
import Card from '../components/Card'
import AlertMessage from '../components/AlertMessage'
import { Typography } from '@material-ui/core'


const useStyles = makeStyles(() => ({
    body: {
        minHeight: '100vh',
        width: '70%',
        maxWidth: '1300px',
        margin: '80px auto'
    },
    slider: {
        width: '100%'
    },
    popular: {
        color: 'rgba(0, 0, 0, 0.54)',
        marginTop: '40px',
        fontSize: '1.4rem',
        marginBottom: '20px' 
    },
    popularContainer: {
        width: '100%',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}))



const Home = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    useEffect(async () => {
        try {
            let { data } = await axios({
                method: 'get',
                url: '/api/products/show/popular-products'
            })


            dispatch({
                type: popularProductsAction,
                popularProducts: data
            })

            let categoriesAll = await axios({
                method: 'get',
                url: '/api/categories/'
            })

            let categories = categoriesAll.data

            dispatch({
                type: categoriesAction,
                categories
            })

            setState({
                ...state,
                popularProducts: data.slice(0, 10),
                items: categories
            })

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

    }, [])

    const [state, setState] = useState({
        logged: true,
        popularProducts: useSelector(state => state.popularProducts).slice(0, 10),
        items: useSelector(state => state.categories),
        popup: false,
        popupInfo: {

        },
        successPage: true
    })


    if(props.success && state.successPage) {
        setState({
            ...state,
            popup: true,
            popupInfo: {
                vertical: 'top',
                horizontal: 'center',
                color: 'success',
                message: 'Successfully!'
            },
            successPage: false
        })
    }
    
    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.body}>
                <Carousel className={classes.slider} animation="slide" interval={6000} timeout={1000}>
                    {state.items.map( (item, i) => (
                        <Link to={"/category/" + item._id}>
                            <ItemCarousel key={i} name={item.name} src={host + item.imageUrl} />
                        </Link>
                    ) )}
                </Carousel>
                <Typography className={classes.popular}>Popular products:</Typography>
                <div className={classes.popularContainer}>
                    {state.popularProducts.map((item) => (
                        <Card productId={item._id} image={host + item.imageUrl} alt={item.name} name={item.name} description={item.detail} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;