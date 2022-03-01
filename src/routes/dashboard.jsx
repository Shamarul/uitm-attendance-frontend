import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { GET_INFO, CHECKING_OUT } from '../redux/ducks/actions/ActionTypes';
import { Tooltip, AutoComplete, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";
import { useQueryParam, StringParam } from 'use-query-params';

export default function Dashboard() {

    const [id, setId] = useQueryParam('id', StringParam);

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
            if(id) {
                dispatch({
                    type: CHECKING_OUT, id
                })
            }
        };
    
        fetchData();
    }, [dispatch, id, infoData]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: 15, height: '100vh'}}>
            <h1 style={{alignItems: 'center', textAlign: 'center', backgroundColor: 'rgba(252, 186, 3, 0.4)', border: 'solid', borderWidth: 1}}>Welcome</h1>
            <h2 style={{alignItems: 'center', textAlign: 'center'}}>{infoData?.name}</h2>
            <nav
                style={{
                    borderBottom: "solid 1px",
                }}
            />
            <div style={{padding: 10}} />
            <div style={{alignItems: 'center'}}>
                <div style={{borderRadius:'10px', backgroundColor: 'rgba(220, 231, 250, 0.6)', fontWeight: 'bold', alignItems: 'center', borderWidth: 0.5, borderStyle: 'solid'}}>
                    <div style={{paddingTop: '8px'}} />
                    <p style={{textAlign: 'center', }}>Check in time: {infoData?.checkIn&&moment(infoData.checkIn).format('Do MMMM YYYY, h:mm:ss a')}</p>
                </div>

                {infoData?.checkOut &&
                    <div style={{borderRadius:'10px', backgroundColor: 'rgba(220, 231, 250, 0.6)', fontWeight: 'bold', alignItems: 'center', borderWidth: 0.5, borderStyle: 'solid', marginTop: 15}}>
                        <div style={{paddingTop: '8px'}} />
                        <p style={{textAlign: 'center', }}>Check out time: {infoData?.checkOut&&moment(infoData.checkOut).format('Do MMMM YYYY, h:mm:ss a')}</p>
                    </div>
                }
                <div style={{padding: 10}} />
                <div style={{backgroundColor: 'rgba(220, 231, 250, 0.6)', fontWeight: 'bold', alignItems: 'center', padding: 5, borderWidth: 0.5, borderStyle: 'solid'}}>
                    <p style={{textAlign: 'center'}}>Infomation view</p>
                    <div style={{textAlign: 'center'}}>
                        ...
                        ...
                    </div>
                    <div style={{textAlign: 'center'}}>
                        ...
                        ...
                    </div>
                    <div style={{textAlign: 'center'}}>
                        ...
                        ...
                    </div>
                    <div style={{padding:10}} />
                </div>
                {infoData?.checkOut &&
                    <Button onClick={()=>{navigate('/cert')}} style={{backgroundColor: '#26C281', width: '100%', height: 50, fontWeight: 'bold'}} type="primary">View certificate</Button>
                }
                {!infoData?.checkOut &&
                    <Button onClick={()=>{navigate('/scanner')}} style={{width: '100%', height: 50, fontWeight: 'bold'}} type="primary">Check out</Button>
                }
            </div>
        </div>
    );
}