import {useReducer} from 'react'
const api = {
  key:'3b3d66e6fd0fafb2fe923421ca903742',
  baseUrl:'http://api.openweathermap.org/data/2.5/'
}
function App () {
  // const [query,setQuery] =useState('');
  // const [weather,setWeather] =useState({});
  const initialState = {
    query:'',
    weather:''
  };
  
 const reducer = (state,action) => {
    switch (action.type) {
      case 'query':
        return {...state, query: action.payload}
      case 'weather':
        return {...state, weather: action.payload}
      default:
        return state
    }
  }


  const [state,dispatch] = useReducer(reducer,initialState);



  const search = e=>{
    if(e.key === 'Enter'){
      fetch(`${api.baseUrl}/weather?q=${state.query}&units=metric&APPID=${api.key} `).then(res=>res.json())
      .then(data=>{
        dispatch({type:'weather', payload:data})
        dispatch({type:'query', payload:''})
      }
      )
    }
  }  
   const dataBuilder = (s)=>{
  let months =[ 'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December '];
  let days =['Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday']
  let day = days[s.getDay()]
  let date = s.getDate();
  let month =months[s.getMonth()]
  let year = s.getFullYear();
  return `${day} ${date} ${month} ${year}`
 } 
 return (
    <div className="App  ">
      <main>
        <div className='search-box'>
        <input type="text"  onKeyPress={search} value ={state.query }
         onChange={ e=>
          dispatch({type: 'query',  payload: e.target.value} )} 
         className='search-bar' placeholder='Search' />   
        </div>
        {typeof  state.weather.main != 'undefined'?( <div className='location-box'>
          <div className='location'>
                {state.weather.name}   {state.weather.sys.country} 
          </div>
          <div className='date'>
            {dataBuilder(new Date())}
          </div>
          <div className='weather-box'>
         <div className='temp'>{
          Math.round(state.weather.main.temp)
         }C </div>
         <div className='weather'>
          {
            state.weather.weather[0].main
          } </div>
        </div>
        </div>):''}
      </main>
    
    </div>
  );
}

export default App;
