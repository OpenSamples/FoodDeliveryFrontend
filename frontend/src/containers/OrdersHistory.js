import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core/';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import axios from 'axios'
import AlertMessage from '../components/AlertMessage'

const useStyles = makeStyles({
    root: {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '100px'
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
    },
    btnCompleted: {
        textAlign: 'center',
        width: '45px',
        color: 'green'
    }
});


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
            // setState({
            //     ...state,
            //     popup: true,
            //     popupInfo: {
            //         vertical: 'top',
            //         horizontal: 'center',
            //         color: 'error',
            //         message: 'Something went wrong while fetching orders..'
            //     }
            // })
        }
    }, [])

    const markAsCompleted = async (id) => {

        try {
            let orderFinished = await axios({
                method: 'post',
                url: '/api/orders/finishOrder/' + id
            })

            if(orderFinished.data._id) {
               
                setState({
                    ...state,
                    popup: true,
                    popupInfo: {
                        vertical: 'top',
                        horizontal: 'center',
                        color: 'success',
                        message: 'Order completed'
                    },
                    orders: state.orders.filter(order => {
                        if(order._id === id) {
                            order.isOrderCompleted = true
                            return order
                        } 
                        return order
                    })
                })
            } else {
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
        } catch(e) {
            // setState({
            //     ...state,
            //     popup: true,
            //     popupInfo: {
            //         vertical: 'top',
            //         horizontal: 'center',
            //         color: 'error',
            //         message: 'Something went wrong...'
            //     }
            // })
        }
    }


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
                        {state.orders.map((row, i) => (
                            <TableRow key={row.name + '' + i} className={classes.tableRow}>
                                <TableCell component="th" scope="row">
                                    {row.fullName}
                                </TableCell>
                                <TableCell align="right" className={classes.tableData}>{row.orderPlaced.slice(0, 10)}</TableCell>
                                <TableCell align="right" className={classes.tableData} style={{color: 'white'}}>{row.orderTotal}</TableCell>
                                <TableCell align="right" className={classes.tableData}>{row.address}</TableCell>
                                {row.isOrderCompleted ? 
                                    <TableCell align="right" className={classes.tableData} style={{color: 'green'}}>Completed</TableCell> :
                                    <>
                                        <TableCell align="right" className={classes.tableData} style={{color: 'yellow'}}>In process</TableCell>
                                        <TableCell align="right" className={classes.btnCompleted} >
                                            <IconButton onClick={() => markAsCompleted(row._id)} color="inherit">
                                                <CheckCircleOutlineIcon />
                                            </IconButton>
                                        </TableCell>                                    
                                    </>
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