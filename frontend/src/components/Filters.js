import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Button, Select, FormControl, InputLabel, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import AlertMessage from './AlertMessage'

const useStyles = makeStyles((theme) => ({
    filters: {
        '& *': {
            display: 'inline-block'
        }
    },
    formControl: {
        width: '150px',
        margin: '10px 20px 20px'
    },
    button: {
        margin: '20px'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade('#3f51b5', 0.15),
        '&:hover': {
          backgroundColor: fade('#3f51b5', 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1.5, 1, 1.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    }
}))

const Filters = (props) => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        category: '',
        searchText: '',
        message: '',
        categories: [],
        popup: false,
        popupInfo: {
            
        }
    })

    const filterProducts = () => {
        // products = []
        // Perform filter

        let filteredProducts = props.products.filter((product) => {
                if((state.category === '' || product.categoryId === state.category) && 
                    (state.searchText === '' || product.name.toLowerCase().includes(state.searchText.toLowerCase()) || 
                        product.detail.toLowerCase().includes(state.searchText.toLowerCase()))) {
    
                    return product
                }
        })


        let chunkArrProduct = props.getChunk(filteredProducts, 10)
        let message = ''

        if(!filteredProducts[0]) {
            chunkArrProduct = [[]]
            message = 'No products found'
        }

        props.setState({
            ...props.state,
            chunkProducts: chunkArrProduct,
            message,
            productsPage: 0
        })
    }

    React.useEffect(async () => {
        try {
            let categoriesAll = await axios({
                method: 'get',
                url: '/api/categories'
            })

            if(categoriesAll.data.length > 0) {
                setState({
                    ...state,
                    categories: categoriesAll.data
                })
            }
        } catch(e) {
            // setState({
            //     ...state,
            //     popup: true,
            //     popupInfo: {
            //         vertical: 'top',
            //         horizontal: 'center',
            //         color: 'error',
            //         message: 'Failed to fetch categories'
            //     }
            // })
        }
    }, [])

    const handleChangeCategory = (event) => {
        setState({
          ...state,
          category: event.target.value,
        });
    };

    const handleChangeSearch = event => {
        setState({
            ...state,
            searchText: event.target.value
        })
    }

    return (
        <>
            <AlertMessage state={state} setState={setState} />
            <div className={classes.filters}>
                {
                    props.disableSelect ? 
                     '' :
                     <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="categories">Category</InputLabel>
                        <Select
                            native
                            value={state.category}
                            onChange={handleChangeCategory}
                            inputProps={{
                                name: 'category',
                                id: 'categories',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {state.categories.map((category, i) => <option key={i} value={category._id}>{category.name}</option>)}
                        </Select>
                    </FormControl>
                }
                
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        value={state.searchText}
                        onChange={handleChangeSearch}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <Button variant="outlined" color="primary" onClick={filterProducts} className={classes.button}>Search</Button>
            </div>
            {state.message}
        </>
    )
}


export default Filters