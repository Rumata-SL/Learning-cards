import './App.css';
import React, {useEffect} from 'react';
import {Navbar} from '../features/nav/Navbar';
import {Pages} from './Pages';
import {ErrorBar} from '../common/errorBar/ErrorBar';
import {useAppDispatch, useAppSelector} from '../bll/store';
import {CircularProgress, LinearProgress} from '@mui/material';
import {authMeTC} from './appReducer';

function App() {

    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitial)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    useEffect(()=>{
        if (isLoggedIn) return
        dispatch(authMeTC())
    }, [])

    if (!isInitialized) {
        return <div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></div>
    }

    return (
        <div className="app">
            <Navbar/>

            <div className="linearProgress">{appStatus === 'loading' && <LinearProgress/>}</div>

            <div className="app-wrapper">
                <Pages/>
            </div>
            <ErrorBar/>
        </div>
    );
}

export default App;
