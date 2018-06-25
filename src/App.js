import React, { Component } from 'react';
import {Grid,Col,Row} from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LocationList from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';

import './App.css';


const cities=['Buenos Aires, ar',
                'Washington DC., US',
                'Bogota,col',
                'Mexico City,mx',
                'Madrid,es',
                'Santiago, CL'];

class App extends Component {
  

  constructor(){
    super();
    this.state={city:null}
  }


  handleSelectionLocation = city => {
    this.setState({city})
    console.log(`handleSelectionLocation ${city} `);
  }

  render() {
    
    const {city}= this.state;

    return (

      <Grid>
        <Row>
          <Col xs={12} >
            <AppBar position="static">
              <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
                 Weather App
                </Typography>
              </Toolbar>
           </AppBar>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}  >
            <LocationList   onSelectedLocation={this.handleSelectionLocation}  cities={cities} />
          </Col>
          <Col xs={12} md={6} >
            <Paper elevation={10} >
              <div className='detail' >
                {city && <ForecastExtended city={city} /> }
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default App;
