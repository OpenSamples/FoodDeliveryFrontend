import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Person, Category, Fastfood, Equalizer } from '@material-ui/icons';

let drawerWidth = 250

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        backgroundColor: '#3f51b5',
        color: '#fff',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        backgroundColor: '#3f51b5',
        color: '#fff',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    navItems: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    colorWhite: {
        color: '#fff !important'
    }
}));


const Sidebar = props => {
    const classes = useStyles()

    const theme = useTheme();
  
    const handleDrawerOpen = () => {
      props.setOpen(true);
    };
  
    const handleDrawerClose = () => {
      props.setOpen(false);
    };

    const changeBody = (value) => {
        props.setState({
            ...props.state,
            page: value
        })
    }

    const closeButton = (
        <IconButton color="inherit" onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
    )

    const openButton = (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
        >
            <MenuIcon />
        </IconButton>
    )

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                {props.open ? closeButton : openButton }
            </div>
            <Divider />
            <List>
                {[{name: 'Statistics', icon: <Equalizer />}, {name: 'Users', icon: <Person />}, {name: 'Categories', icon: <Category />}, {name: 'Products', icon: <Fastfood />}].map((item, index) => (
                    <Link to={'/admin-dashboard/' + item.name.toLowerCase()} onClick={() => changeBody(item.name.toLowerCase())} className={classes.navItems}>
                        <ListItem button key={item.name}>
                                <ListItemIcon className={classes.colorWhite}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar