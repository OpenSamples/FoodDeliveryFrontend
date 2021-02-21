import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core/styles'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ItemCarousel from '../components/ItemCarousel'
import Card from '../components/Card'
import photo1 from '../assets/categories/1.jpg'
import photo2 from '../assets/categories/2.jpeg'
import photo3 from '../assets/categories/3.jpg'
import photo4 from '../assets/categories/4.jpg'
import photo5 from '../assets/categories/5.jpg'
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

let items = [
    {
        name: "Name of category",
        src: photo1
    },
    {
        name: "Name of category",
        src: photo2
    },
    {
        name: "Name of category",
        src: photo3
    },
    {
        name: "Name of category",
        src: photo4
    },
    {
        name: "Name of category",
        src: photo5
    }
]

let popularProducts = [
    {
        image: photo1,
        alt: 'Photo 1',
        name: 'Product 1',
        description: 'Description for product 1'
    },
    {
        image: photo2,
        alt: 'Photo 2',
        name: 'Product 2',
        description: 'Description for product 2'
    },
    {
        image: photo3,
        alt: 'Photo 3',
        name: 'Product 3',
        description: 'Description for product 3'
    },
    {
        image: photo4,
        alt: 'Photo 4',
        name: 'Product 4',
        description: 'Description for product 4'
    },
    {
        image: photo5,
        alt: 'Photo 5',
        name: 'Product 5',
        description: 'Description for product 5'
    },
    {
        image: photo1,
        alt: 'Photo 1',
        name: 'Product 1',
        description: 'Description for product 1'
    },
    {
        image: photo2,
        alt: 'Photo 2',
        name: 'Product 2',
        description: 'Description for product 2'
    },
    {
        image: photo3,
        alt: 'Photo 3',
        name: 'Product 3',
        description: 'Description for product 3'
    },
    {
        image: photo4,
        alt: 'Photo 4',
        name: 'Product 4',
        description: 'Description for product 4'
    },
    {
        image: photo5,
        alt: 'Photo 5',
        name: 'Product 5',
        description: 'Description for product 5'
    }
]

const Home = () => {
    const classes = useStyles()

    const [state, setState] = useState({
        logged: true
    })
    
    return (
        <>
            <Header />
            <div className={classes.body}>
                <Carousel className={classes.slider} animation="slide" interval={6000} timeout={1000}>
                    {items.map( (item, i) => (
                        <ItemCarousel key={i} name={item.name} src={item.src} />
                    ) )}
                </Carousel>
                <Typography className={classes.popular}>Popular products:</Typography>
                <div className={classes.popularContainer}>
                    {popularProducts.map((item) => (
                        <Card image={item.image} alt={item.alt} name={item.name} description={item.description} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;