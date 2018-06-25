import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from '../services/transformForecast';
import './styles.css';

const apiKey ='5cc8519596ace1fd36fc360a35642b4a'
const  url ='http://api.openweathermap.org/data/2.5/forecast'

class ForecastExtended extends Component{

  constructor(){
    super();
    this.state={
      forecastData:null,
    }
  }

  componentDidMount(){
    const url_forecast = `${url}?q=${this.props.city}&appid=${apiKey}`;
    fetch(url_forecast)
    .then(data=>data.json())
    .then(weather_data=>{
      const forecastData = transformForecast(weather_data);
      this.setState({forecastData})
    });
  }

  renderForecastItemDays(forecastData){
    return forecastData.map(forecast=>(<ForecastItem weekDay={forecast.weekDay}
       key={`${forecast.weekDay}${forecast.hour}`} 
       hour={forecast.hour} 
       data={forecast.data}  />))
  }

  renderProgress = () =>{
      return <h3>'Cargando pronostico extendido...'</h3> 
  }

  render(){
    const {forecastData} = this.state;
    const {city} = this.props;

    return(
      <div >
          <h2 className='forecast-title' > Pronostico extendido para {city}</h2>
          { forecastData ?  this.renderForecastItemDays(forecastData) : this.renderProgress()}
      </div>
    )
  }
}

ForecastExtended.propTypes = {
  city:PropTypes.string.isRequired,
}

export default ForecastExtended;

