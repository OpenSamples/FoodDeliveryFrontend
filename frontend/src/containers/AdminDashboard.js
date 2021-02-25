import React from 'react'
import { IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from '../components/Sidebar'
import UserAdmin from '../components/AdminDashboard/UserAdmin'
import ProductAdmin from '../components/AdminDashboard/ProductAdmin'
import Statistics from '../components/AdminDashboard/Statistics'
import CategoriesAdmin from '../components/AdminDashboard/CategoriesAdmin'
import CreateUser from '../components/AdminDashboard/CreateUser'
import CreateProduct from '../components/AdminDashboard/CreateProduct'
import CreateCategory from '../components/AdminDashboard/CreateCategory'

const useStyles = makeStyles((theme) => ({
    root: {

    },
    container: {
        float: 'right',
        padding: '10px 0',
        '-webkit-transition': 'width .25s ease-in-out',
        '-moz-transition': 'width .25s ease-in-out',
        '-o-transition': 'width .25s ease-in-out',
        'transition': 'width .25s ease-in-out'
    },
    widthOpen: {
        width: 'calc(100% - 270px)'
    },
    widthClosed: {
        width: `calc(100% - ${theme.spacing(12) + 1}px)`,
    },
    homepage: {
        margin: '10px',
        color: 'rgba(0, 0, 0, 0.54)',
        textDecoration: 'none'
    }
}))

const AdminDashboard = (props) => {
    const classes = useStyles()

    const [open, setOpen] = React.useState(true);

    const [state, setState] = React.useState({
        page: props.match.params.page
    })

    const containerClasses = open ? [classes.container, classes.widthOpen] : [classes.container, classes.widthClosed]

    let page = (<></>)

    if(state.page === 'users') {
        page = (<UserAdmin state={state} setState={setState} />)
    } else if(state.page === 'products') {
        page = (<ProductAdmin state={state} setState={setState} />)
    } else if(state.page === 'categories') {
        page = <CategoriesAdmin state={state} setState={setState} />
    } else if(state.page === 'create-user') {
        page = <CreateUser />
    } else if(state.page === 'create-product') {
        page = <CreateProduct />
    } else if(state.page === 'create-category') {
        page = <CreateCategory />
    } else {
        page = <Statistics />
    }

    return (
        <div className={classes.root}>
            <Sidebar state={state} setState={setState} open={open} setOpen={setOpen} />
            <div className={containerClasses.join(' ')}>
                <Link to="/" className={classes.homepage}>
                    <IconButton>
                        <ArrowBackIcon />
                    </IconButton>
                    Back to homepage
                </Link>
                {page}
            </div>
        </div>
    )
}


export default AdminDashboard