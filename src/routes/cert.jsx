import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { GET_INFO, CHECKING_OUT } from '../redux/ducks/actions/ActionTypes';
import { Tooltip, AutoComplete, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";
import ReactToPrint from 'react-to-print';

export default function Cert() {

    const componentRef = useRef();
    const dispatch = useDispatch();
    const infoData = useSelector((state) => state.init.infoData)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if(!infoData) {
                dispatch({
                    type: GET_INFO
                })
            }
        };
    
        fetchData();
    }, [dispatch]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: 15, height: '100vh'}}>
            <div ref={componentRef} style={{alignItems: 'center', textAlign: 'center', padding: 15, borderWidth: 1, border: 'solid'}}>
                <h1 style={{alignItems: 'center', textAlign: 'center', backgroundColor: 'rgba(252, 186, 3, 0.4)', border: 'solid', borderWidth: 1}}>Certificate</h1>
                <h2 style={{alignItems: 'center', textAlign: 'center'}}>{infoData?.name}</h2>
                <p> ... </p>
                <p> ... </p>
                <p> ... </p>
            </div>
            <div style={{padding: 20 }} />
            {/* <Button onClick={()=>{}} style={{width: '100%', height: 50, fontWeight: 'bold'}} type="primary">Print</Button> */}
            <ReactToPrint
                trigger={() => <button>PRINT</button>}
                content={() => componentRef.current}
            />
            <div style={{padding: 10 }} />
            <Button onClick={()=>{navigate('/dashboard')}} style={{backgroundColor: '#fff',width: '100%', height: 50, fontWeight: 'bold', color: '#000'}} type="primary">Back</Button>
        </div>
    );
}