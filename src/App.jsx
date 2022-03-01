import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { SEARCH_PARTICIPANT, LOGIN } from './redux/ducks/actions/ActionTypes';
import { Tooltip, AutoComplete, Input, Button } from 'antd';
import 'antd/dist/antd.css';

export default function App() {

  const [showPassInst, setShowPassInst] = useState(false)
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearch = val => {
    setName(val);
    if(val)dispatch({type: SEARCH_PARTICIPANT, name: val, setUid, setOptions, setIsLoading});
  };
  
  const onSelect = (val, option) => {
    setName(option.value);
    setUid(option.uid);
  };

  const globalLoad = useSelector((state) => state.init.globalLoad);

  return (
    <div style={{display: 'flex', flexDirection: 'column', padding: 15, height: '100vh'}}>
      <h1>UiTM Attendance</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Login</Link>
      </nav>
      <div style={{alignItems: 'center'}}>
        <div style={{padding: 10}} />
        <AutoComplete
          style={{
            width: '100%',
          }}
          options={options}
          onSelect={(val, option) => onSelect(val, option)}
          onSearch={onSearch}
          notFoundContent={name?isLoading?"Searching..":"Attendance not exist":"Enter your name"}
        >
          <Input.Search placeholder="Search Name" loading={isLoading}/>
        </AutoComplete>
        <div style={{padding: 10}} />
        <Tooltip placement="bottomLeft" title={"Last 6 digit phone number. Eg:- 60136951509 (951509)"} visible={showPassInst}>
          <Input.Password onChange={e => setPassword(e.target.value)} onFocus={()=>{setShowPassInst(true)}} onBlur={()=>{setShowPassInst(false)}} placeholder="Password" />
        </Tooltip>
        <div style={{padding: 40}} />
        <Button onClick={()=>{dispatch({type: LOGIN, navigate, uid, password});}} disabled={!(uid && password.length === 6)} style={{width: '100%', height: 50, fontWeight: 'bold'}} type="primary">Login</Button>
      </div>
    </div>
  );
}