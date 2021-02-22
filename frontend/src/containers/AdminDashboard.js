import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from '../components/Sidebar'
import UserAdmin from '../components/AdminDashboard/UserAdmin'
import ProductAdmin from '../components/AdminDashboard/ProductAdmin'
import Statistics from '../components/AdminDashboard/Statistics'
import CategoriesAdmin from '../components/AdminDashboard/CategoriesAdmin'

const useStyles = makeStyles((theme) => ({
    root: {

    },
    container: {
        float: 'right',
        padding: '50px 0',
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
        page = (<UserAdmin />)
    } else if(state.page === 'products') {
        page = (<ProductAdmin />)
    } else if(state.page === 'categories') {
        page = <CategoriesAdmin />
    } else {
        page = <Statistics />
    }

    return (
        <div className={classes.root}>
            <Sidebar state={state} setState={setState} open={open} setOpen={setOpen} />
            <div className={containerClasses.join(' ')}>
                {page}
            </div>
        </div>
    )
}


export default AdminDashboard