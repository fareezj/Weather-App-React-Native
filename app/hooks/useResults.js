import {useState, useEffect} from 'react';
import axios from 'axios';
import RNLocation from 'react-native-location';

const apiKey = 'db8ba431e6d1a0c3b20197d305a6b4c7';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const getCurrentLocation = () => {
    RNLocation.configure({
      distanceFilter: 5.0,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then(granted => {
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
          locations => {
            setLatitude(locations[0].latitude);
            setLongitude(locations[0].longitude);
            getWeatherApi(locations[0].latitude, locations[0].longitude);
            //console.log(locations);
          },
        );
      }
    });
  };

  const getWeatherApi = async (lat, lon) => {
    await axios
      .post(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
      )
      .then(res => {
        if (res !== null) {
          setResults(res.data);
          console.log('res data', res.data);
        }
      })
      .catch(err => {
        setErrorMessage(err);
      });
  };

  return [
    getCurrentLocation,
    results,
    errorMessage,
    latitude,
    longitude,
    getWeatherApi,
  ];
};

// const getWeatherApi = () => {
//   setResults({
//     coord: {
//       lon: -122.08,
//       lat: 37.39,
//     },
//     weather: [
//       {
//         id: 800,
//         main: 'Clear',
//         description: 'clear sky',
//         icon: '01d',
//       },
//     ],
//     base: 'stations',
//     main: {
//       temp: 282.55,
//       feels_like: 281.86,
//       temp_min: 280.37,
//       temp_max: 284.26,
//       pressure: 1023,
//       humidity: 100,
//     },
//     visibility: 16093,
//     wind: {
//       speed: 1.5,
//       deg: 350,
//     },
//     clouds: {
//       all: 1,
//     },
//     dt: 1560350645,
//     sys: {
//       type: 1,
//       id: 5122,
//       message: 0.0139,
//       country: 'US',
//       sunrise: 1560343627,
//       sunset: 1560396563,
//     },
//     timezone: -25200,
//     id: 420006353,
//     name: 'Mountain View',
//     cod: 200,
//   });
// };
