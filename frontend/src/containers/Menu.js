import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Filters from '../components/Filters'
import photo1 from '../assets/categories/1.jpg'
import photo2 from '../assets/categories/2.jpeg'
import photo3 from '../assets/categories/3.jpg'
import photo4 from '../assets/categories/4.jpg'
import photo5 from '../assets/categories/5.jpg'

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '100vh',
        width: '70%',
        maxWidth: '1300px',
        margin: '80px auto',
        display: 'flex',
        flexDirection: 'column'
    },
    productContainer: {
        width: '100%',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderBottom: '1px solid #ccc',
        paddingBottom: '2rem',
        borderTop: '1px solid #ccc',
        paddingTop: '2.4rem'
    },
    pagination: {
        alignSelf: 'center',
        marginTop: '3rem'
    } 
}))

let products = [
    {
        image: photo1,
        alt: 'Photo 1',
        name: 'Product 1',
        description: 'Description for product 1',
        category: 'Category 2'
    },
    {
        image: photo2,
        alt: 'Photo 2',
        name: 'Product 2',
        description: 'Description for product 2',
        category: 'Category 2'
    },
    {
        image: photo3,
        alt: 'Photo 3',
        name: 'Product 3',
        description: 'Description for product 3',
        category: 'Category 2'
    },
    {
        image: photo4,
        alt: 'Photo 4',
        name: 'Product 4',
        description: 'Description for product 4',
        category: 'Category 2'
    },
    {
        image: photo5,
        alt: 'Photo 5',
        name: 'Product 5',
        description: 'Description for product 5',
        category: 'Category 2'
    },
    {
        image: photo1,
        alt: 'Photo 1',
        name: 'Product 1',
        description: 'Description for product 1',
        category: 'Category 2'
    },
    {
        image: photo2,
        alt: 'Photo 2',
        name: 'Product 2',
        description: 'Description for product 2',
        category: 'Category 2'
    },
    {
        image: photo3,
        alt: 'Photo 3',
        name: 'Product 3',
        description: 'Description for product 3',
        category: 'Category 2'
    },
    {
        image: photo4,
        alt: 'Photo 4',
        name: 'Product 4',
        description: 'Description for product 4',
        category: 'Category 2'
    },
    {
        image: photo5,
        alt: 'Photo 5',
        name: 'Product 5',
        description: 'Description for product 5',
        category: 'Category 2'
    },
    {
        image: photo1,
        alt: 'Photo 1',
        name: 'Product 1',
        description: 'Description for product 1',
        category: 'Category 2'
    },
    {
        image: photo2,
        alt: 'Photo 2',
        name: 'Product 2',
        description: 'Description for product 2',
        category: 'Category 2'
    },
    {
        image: photo3,
        alt: 'Photo 3',
        name: 'Product 3',
        description: 'Description for product 3',
        category: 'Category 2'
    },
    {
        image: photo4,
        alt: 'Photo 4',
        name: 'Product 4',
        description: 'Description for product 4',
        category: 'Category 2'
    },
    {
        image: photo5,
        alt: 'Photo 5',
        name: 'Product 5',
        description: 'Description for product 5',
        category: 'Category 2'
    },
    {
        image: photo1,
        alt: 'Photo 1',
        name: 'Product 1',
        description: 'Description for product 1',
        category: 'Category 2'
    },
    {
        image: photo2,
        alt: 'Photo 2',
        name: 'Product 2',
        description: 'Description for product 2',
        category: 'Category 2'
    },
    {
        image: photo3,
        alt: 'Photo 3',
        name: 'Product 3',
        description: 'Description for product 3',
        category: 'Category 2'
    },
    {
        image: photo4,
        alt: 'Photo 4',
        name: 'Product 4',
        description: 'Description for product 4',
        category: 'Category 2'
    },
    {
        image: photo5,
        alt: 'Photo 5',
        name: 'Product 5',
        description: 'Description for product 5',
        category: 'Category 2'
    }
]

const Menu = () => {
    const classes = useStyles()

    const getChunk = (array, perChunk) => (
        array.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)

            if(!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [] // start a new chunk
            }
          
            resultArray[chunkIndex].push(item)
          
            return resultArray
        }, [])
    )

    const [state, setState] = React.useState({
        chunkProducts: getChunk(products, 10),
        productsPage: 0,
        message: ''
    })

    const changePage = (event, value) => {
        setState({
            ...state,
            productsPage: value - 1,
        })
    }

    return (
        <>
            <Header />
            <div className={classes.container}>
                <Filters state={state} setState={setState} getChunk={getChunk} products={products} />
                <div className={classes.productContainer}>
                    {state.chunkProducts[state.productsPage].map((product, i) => (
                        <Card key={i} image={product.image} alt={product.alt} name={product.name} description={product.description} />
                    ))}
                    {state.message}
                </div>
                <Pagination className={classes.pagination} page={state.productsPage + 1} count={state.chunkProducts.length} color="primary" onChange={changePage} showFirstButton showLastButton />
            </div>
            <Footer />
        </>
    )
}


export default Menu