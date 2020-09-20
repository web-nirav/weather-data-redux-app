const INITIAL_STATE = {
    weatherData: null
}

const weatherReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_WEATHER_DATA':
            return {
                ...state,
                weatherData: action.payload
            };
        default:
            return state;
    }
}

export default weatherReducer