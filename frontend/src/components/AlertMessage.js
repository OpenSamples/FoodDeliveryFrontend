import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertMessage = (props) => {
    const handleClose = () => {
        props.setState({
            ...props.state,
            popup: false
        })
    }

    return (
        <>
            <Snackbar anchorOrigin={{vertical: props.state.popupInfo.vertical || 'top', horizontal: props.state.popupInfo.horizontal || 'center'}} open={props.state.popup} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.state.popupInfo.color || 'error'}>
                    {props.state.popupInfo.message || ''}
                </Alert>
            </Snackbar>
        </>
    )
    
}

export default AlertMessage