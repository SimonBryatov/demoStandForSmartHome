import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Store from "./store"
import {observer} from "mobx-react"
import ReactSpeedometer from "react-d3-speedometer";

let store = new Store();

@observer class App extends Component {
  renderSliders() {
    let res = []
    for(let i=0; i < 10; i++) {
      res.push( <Grid item xs={4}>
        <Chip label={`Slider ${i+1}`} />
        <Slider max={255} min={0} key={i} step={1} onChange={(e, v) => {store.controls.sliders[i].set(v); store.controlMsg(`Slider${i+1}`, v)}} value={store.controls.sliders[i].get()} aria-labelledby="label" />
        </Grid>)
    }
    return res
  }
  renderSwitches() {
    let res = []
    for(let i=0; i < 10; i++) {
      res.push(<Grid item xs={4}>
        <Chip label={`Switch ${i+1}`} />
        <Switch checked={store.controls.switches[i].get()} onChange={(e, v)=> {store.controls.switches[i].set(v);  store.controlMsg(`Switch${i+1}`, Number(v))}} />
        </Grid>)
    }
    return res
  }
  renderButtons() {
    let res = []
    for(let i=0; i < 10; i++) {
      res.push( <Grid item xs={4}>
        <Button variant="contained" color="primary" onMouseDown={() => {store.controlMsg(`Button${i+1}`, 1)}} onMouseUp={() => {store.controlMsg(`Button${i+1}`, 0)}}>
        {`Button ${i+1}`}
      </Button>
      </Grid>)
    }
    return res
  }
  renderDataScreens() {
    let res = []
    for(let i=0; i < 20; i++) {
      res.push( <Grid item xs={4}>
        <Chip label={`Data Screen ${i+1}`} />
        <div>{store.data[i]}</div>
      </Grid>)
    }
    return res
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Демо - Стенд</h1>
        </header>
      <Grid container direction={"row"} spacing={48}>
        <Grid item xs={6}>
        <Grid container justify="center" direction={"row"} spacing={16}>
        {this.renderSliders()}
        {this.renderSwitches()}
        {this.renderButtons()}
        </Grid>
        </Grid>
        <Grid item xs={6}>
        <Grid container justify="center" spacing={16}>
        {this.renderDataScreens()}
        <ReactSpeedometer value = {store.data[3]}/>
        </Grid>
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
