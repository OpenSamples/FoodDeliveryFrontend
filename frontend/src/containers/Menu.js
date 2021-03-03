import React, { useEffect, useMemo } from 'react'
import axios from 'axios'
import { host } from '../config/config'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Filters from '../components/Filters'
import { products as productAction } from '../store/actions/'
import AlertMessage from '../components/AlertMessage'

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


const Menu = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    useEffect(async () => {
        try {
            let { data } = await axios({
                method: 'get',
                url: '/api/products'
            })
    
            dispatch({
                type: productAction,
                products: data
            })

            setProducts(data)

            let msgForState = ''
            
            if(!data.length) {
                msgForState = 'No product found!'
            }

            setState({
                ...state,
                chunkProducts: getChunk(data, 10),
                msg: msgForState
            })

        } catch(e) {
            setState({
                ...state,
                msg: 'Something went wrong...',
                // popup: true,
                // popupInfo: {
                //     vertical: 'top',
                //     horizontal: 'center',
                //     color: 'error',
                //     message: 'Something went wrong...'
                // }
            })

        }
    }, [])   


    const [products, setProducts] = React.useState(useSelector(state => state.products))

    const getChunk = (array, perChunk) => {
        if(!array.length) {
            return [[]]
        }

        return array.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)

            if(!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [] // start a new chunk
            }
          
            resultArray[chunkIndex].push(item)
          
            return resultArray
        }, [])
    }

    const [state, setState] = React.useState({
        chunkProducts: getChunk(products, 10),
        productsPage: 0,
        message: '',
        msg: 'Loading...',
        popup: false,
        popupInfo: {

        }
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
            <AlertMessage state={state} setState={setState} />
            <div className={classes.container}>
                <Filters state={state} setState={setState} getChunk={getChunk} products={products} />
                <div className={classes.productContainer}>
                    {state.chunkProducts[state.productsPage].map((product, i) => {
                        return (
                            <Card productId={product._id} key={i} image={host + product.imageUrl} alt={product.name} name={product.name} description={product.detail} />
                        )
                    })}
                    {state.message || state.msg}
                </div>
                <Pagination className={classes.pagination} page={state.productsPage + 1} count={state.chunkProducts.length} color="primary" onChange={changePage} showFirstButton showLastButton />
            </div>
            <Footer />
        </>
    )
}


export default Menu