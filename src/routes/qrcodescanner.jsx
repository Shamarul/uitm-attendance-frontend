import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { GET_INFO, CHECK_OUT, SCAN_QR } from '../redux/ducks/actions/ActionTypes';
import { Tooltip, AutoComplete, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { QrReader } from 'react-qr-reader';
// import QrReader from 'react-qr-scanner'

export default function QrCodeScanner() {

    const previewStyle = {
        height: 240,
        width: 320,
    }

    const [data, setData] = useState('No result');

    const dispatch = useDispatch();
    const infoData = useSelector((state) => state.init.infoData)

    const navigate = useNavigate();

    const handleScan = (data) => {
        console.log(data)
        // setData(data)
        // dispatch({type: CHECK_OUT, result})
    }

    const handleError = (err) => {
      console.error(err)
    }

    useEffect(() => {
        const fetchData = async () => {
            // if(!infoData) {
            //     dispatch({
            //         type: GET_INFO
            //     })
            // }
        };
    
        fetchData();
    }, [dispatch]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: 15, height: '100vh'}}>
            <h1 style={{alignItems: 'center', textAlign: 'center'}}>Checkout</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            />
            <div style={{padding: 10}} />
            <div style={{alignItems: 'center'}}>
            <QrReader
                constraints={{ facingMode: 'user' }}
                videoContainerStyle={{backgroundColor: 'rgba(0,0,0,0.1)'}}
                onResult={(result, error) => {
                if (!!result) {
                    setData(result?.text);
                    dispatch({type: CHECK_OUT, result})
                }

                if (!!error) {
                    console.info(error);
                }
                }}
                style={{ width: '100%' }}
            />
            {/* <QrReader
                delay={100}
                // style={previewStyle}
                onError={handleError}
                onScan={handleScan}
                legacyMode={true}
            /> */}
            <Button onClick={()=>{navigate('/dashboard')}} style={{width: '100%', height: 50, fontWeight: 'bold'}} type="primary">Back</Button>
            </div>
        </div>
    );
}