import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import logo from '../assets/logo.png';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        color: '#fff',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    colorWhite: {
        color: '#fff'
    },
    logo: {
        width: '150px',
        height: '70px'
    },
    navigation: {
        borderRight: '1px solid #fff',
        display: 'inline-block',
        padding: '0 10px',
        marginRight: '18px'
    },
    navItems: {
        color: '#fff',
        padding: '0 15px'
    },
    buttonCont: {
        margin: '0 5px',
        border: '1px solid #fff !important'
    }
}))

const navItems = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Menu',
        path: '/menu'
    },
    {
        name: 'About us',
        path: '/about'
    },
    {
        name: 'Contact',
        path: '/contact'
    }
]

const Header = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        logged: true,
        anchorEl: null
    })

    const open = Boolean(state.anchorEl);

    const handleMenu = (event) => {
        setState({
            ...state,
            anchorEl: event.currentTarget
        })
    };

    const handleClose = () => {
        setState({
            ...state,
            anchorEl: null
        })
    };

    const logout = () => {
        setState({
            ...state,
            logged: false,
            anchorEl: null
        })
    }

    const loggedIn = () => {
        return (
            <>
                <IconButton
                    color="inherit"
                >
                    <ShoppingCartIcon />
                </IconButton>
                <IconButton
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </>
        )
    }

    const loggedOut = () => {
        return (
            <>
                <Button className={classes.buttonCont} startIcon={<PersonIcon className={classes.colorWhite} />}>
                    <Link to="/login" className={classes.button}>
                        Login
                    </Link>
                </Button>
                <Button className={classes.buttonCont} startIcon={<PersonAddIcon className={classes.colorWhite} />}>
                    <Link to="/register" className={classes.button}>
                        Signup
                    </Link>
                </Button>
            </>
        )
    }

    return (
        <AppBar position="static">
            <Toolbar className={classes.root}>
                <img src={logo} alt="logo" className={classes.logo} />
                <div>
                    {/* rute */}
                    <div className={classes.navigation}>
                        {navItems.map(item => {
                            return (
                                <Link className={classes.navItems} to={item.path}>{item.name}</Link>
                            )
                        })}
                    </div>
                    {state.logged ? loggedIn() : loggedOut()}
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header