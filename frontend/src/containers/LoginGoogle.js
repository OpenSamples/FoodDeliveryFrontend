import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Home from './Home'

const LoginGoogle = (props) => {
    const [state, setState] = React.useState({
        token: props.match.params.token
    })

    const dispatch = useDispatch();

    (async () => {
        try {
            let response = await axios({
                method: 'get',
                url: '/api/users/google_login/' + state.token
            })
    
            let user = response.data
    
            dispatch({
                type: 'login',
                user: {
                    ...user.user
                }
            })
    
            props.history.push('/success')
        } catch(e) {
            props.history.push('/')
        }
    })()

    return (
        <>
            <Home />
        </>
    )
}

export default LoginGoogle