import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import AlertMessage from '../components/AlertMessage'

const useStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center'
    },
    table: {
        width: "80%",
        border: "2px solid black",
        margin: "auto",
        marginTop: "8%",
    },
    title: {
        fontWeight: "bolder",
        fontSize: "22px",
        border:"2px solid black"
    },
    title2: {
        fontWeight: "bold",
        textAlign: "center",
        border:"2px solid black",
        
    },
    tableContainer: {
        backgroundColor: "red"
    },
    tableData: {
        textAlign: "center",
        backgroundColor:"coral",
        "&:nth-child(even)": {
            backgroundColor: "#ff5c33",
            color: "white"
        }
    }
});

// function createData(name, orderDate, orderTotal, address, isCompleted) {
//     return { name, orderDate, orderTotal, address, isCompleted };
// }

// const rows = [
//     createData('Order1', "04.05.2021", 15, "Miodraga Bulatovica 12", " Completed"),
//     createData('Order2', "04.05.2021", 10, "Admirala Zmajevica 14", " Completed"),
//     createData('Order3', "01.11.2021", 45, "Josipa Broza 12", " Completed"),
//     createData('Order4', "12.03.2020", 5, "Admirala Zmjaevica 14", " Completed"),
//     createData('Order5', "04.04.2021", 16, "Admirala Zmajevica 14", " Completed"),
// ];

export default function BasicTable(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        orders: [],
        successMsg: true,
        popup: false,
        popupInfo: {

        }
    })

    if(props.success && state.successMsg) {
        setState({
            ...state,
            popup: true,
            popupInfo: {
                vertical: 'top',
                horizontal: 'center',
                color: 'success',
                message: 'Successfully'
            },
            successMsg: false
        })
    }

    React.useEffect(async () => {
        try {
            let allOrders = await axios({
                method: 'get',
                url: '/api/orders/orders-by-user'
            })

            if(allOrders.data.length > 0) {
                setState({
                    ...state,
                    orders: allOrders.data
                })
            }
        } catch(e) {
            setState({
                ...state,
                popup: true,
                popupInfo: {
                    vertical: 'top',
                    horizontal: 'center',
                    color: 'error',
                    message: 'Something went wrong while fetching orders..'
                }
            })
        }
    }, [])

    return (
        <>
            <Header />
            <AlertMessage state={state} setState={setState} />
            <div className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell className={classes.title}>Orders History</TableCell>
                            <TableCell align="right" className={classes.title2}>Order Date</TableCell>
                            <TableCell align="right" className={classes.title2}>Total Price &euro;</TableCell>
                            <TableCell align="right" className={classes.title2}>Address</TableCell>
                            <TableCell align="right" className={classes.title2}>Is Completed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.orders.map((row) => (
                            <TableRow key={row.name} className={classes.tableRow}>
                                <TableCell component="th" scope="row">
                                    {row.fullName}
                                </TableCell>
                                {console.log(row)}
                                <TableCell align="right" className={classes.tableData}>{row.orderPlaced.slice(0, 10)}</TableCell>
                                <TableCell align="right" className={classes.tableData} style={{color: 'white'}}>{row.orderTotal}</TableCell>
                                <TableCell align="right" className={classes.tableData}>{row.address}</TableCell>
                                {row.isOrderCompleted ? 
                                    <TableCell align="right" className={classes.tableData} style={{color: 'green'}}>Completed</TableCell> :
                                    <TableCell align="right" className={classes.tableData} style={{color: 'yellow'}}>In process</TableCell>
                                }
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Footer />

        </>
    );
}