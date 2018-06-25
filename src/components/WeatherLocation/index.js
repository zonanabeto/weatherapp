import React, {Component} from "react";
import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';
import transformWeather from "../../services/transformWeather";
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';


const apiKey ='5cc8519596ace1fd36fc360a35642b4a'
const  url ='http://api.openweathermap.org/data/2.5/weather'


class WeatherLocation extends Component{

    constructor({city}){
        super();
        this.state={
            data:null,
            city,
        }
    }

    
    componentWillMount() {
        const {city}=this.state;
        const api_weather = `${url}?q=${city}&appid=${apiKey}`;
        fetch(api_weather)
        .then(a=>a.json())
        .then(weather_data=>{
            const data =transformWeather(weather_data);
            this.setState({ data });
            
        })
    }


    render=()=>{
        const {onWeatherLocationClick} = this.props;
        const{city,data}=this.state;
        return(
        <div className='weatherLocationCont' onClick={onWeatherLocationClick} >
            <Location city={city}/>
           {data ? <WeatherData data={data}/> :  <CircularProgress />} 
        </div>)
    };
}

WeatherLocation.propTypes={
    city:PropTypes.string,
    onWeatherLocationClick:PropTypes.func,
}

export default WeatherLocation;