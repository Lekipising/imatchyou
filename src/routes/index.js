const User = require('../models/user');
const fetch = require('node-fetch');

const index = async (req, res) => {
  try {
    const allData = await User.find({ _id: { $nin: req.session.sessionID } });
    const allUsers = await User.find({});
    console.log('users here ', allData);
    const dataBG = await User.find({
      interests: 'reading' // Looks in all data for people that have Board games in their interests
    });
    const dataComics = await User.find({
      interests: 'hike' // Looks in all data for people that have comics in their interests
    });

    if (req.session.sessionID) {
      // Is there a user logged in? If so then:
      
      const myData = await User.findOne({
        _id: req.session.sessionID,
      });
      console.log('we are logged in',myData);
      // load API to check the temperature of the user location
      const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=abb1c4ea2d033d357613f7a391774f83&q=' + myData.location + '&units=metric';
      const fetchResponse = await fetch(apiUrl);
      const json = await fetchResponse.json();
      console.log('weather data', json);
      const temperature = json.main.temp;
      const weatherDescription = json.weather[0].description;
      // get weather icon in png
      const weatherIcon = json.weather[0].icon;
      const weatherIconUrl = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';

      // If the weather is good show sports. In this case Mountainbike

      let filteredData = (dataToFilter) => {

        dataToFilter.forEach((result) => {
          if (result.likes.includes(myData._id) && myData.likes.includes(result._id)) {
            let cleantheArray = dataToFilter.indexOf(result);
            dataToFilter.splice(cleantheArray, 1);
          }
        });

        return dataToFilter;
      };
      console.log('weather is ', temperature);
      if (temperature > 19) {
        const dataWeather = await User.find({
          interests: 'hiking' // Looks in all data for people that have mountainbike in their interests
        });
        console.log('dataWeather', dataWeather);
        const done = (allData, myData, dataBG, dataComics, dataWeather) => {

          let allDataFiltered = filteredData(allData);
          let dataBGFiltered = filteredData(dataBG);
          let dataComicsFiltered = filteredData(dataComics);
          let dataWeatherFiltered = filteredData(dataWeather);
          let pic = 'https://res.cloudinary.com/dpnbddror/image/upload/v1646472909/photo-nic-xOigCUcFdA8-unsplash_mmp4ba.png';
          console.log('SENDING THIS ', pic);
          res.render('index', {
            user: myData,
            data: allDataFiltered,
            dataBG: dataBGFiltered,
            dataComics: dataComicsFiltered,
            dataWeather: dataWeatherFiltered,
            weatherDescription: weatherDescription,
            interests: 'hiking',
            weatherIconUrl: weatherIconUrl,
            interestPic: pic

          });
        };
        
        done(allData, myData, dataBG, dataComics, dataWeather);

        // If the weather is not so good: show games.
      } else {
        const dataWeather = await User.find({
          interests: 'reading' // Looks in all data for people that have games in their interests
        });
        let filteredData = (dataToFilter) => {

          dataToFilter.forEach((result) => {
            if (result.likes.includes(myData._id) && myData.likes.includes(result._id)) {
              let cleantheArray = dataToFilter.indexOf(result);
              dataToFilter.splice(cleantheArray, 1);
            }
          });

          return dataToFilter;
        };


        const done = (allData, myData, dataBG, dataComics, dataWeather) => {

          let allDataFiltered = filteredData(allData);
          let dataBGFiltered = filteredData(dataBG);
          let dataComicsFiltered = filteredData(dataComics);
          let dataWeatherFiltered = filteredData(dataWeather);
          console.log('SENDING THIS ', allData);

          res.render('index', {
            user: myData,
            data: allDataFiltered,
            dataBG: dataBGFiltered,
            dataComics: dataComicsFiltered,
            dataWeather: dataWeatherFiltered,
            weatherDescription: weatherDescription,
            interests: 'reading',
            weatherIconUrl: weatherIconUrl,
            interestPic: 'https://res.cloudinary.com/dpnbddror/image/upload/v1646473061/thought-catalog-OJZB0VUQKKc-unsplash_fnfmg3.webp'

          });
        };

        done(allData, myData, dataBG, dataComics, dataWeather);
      }

    } else if (!req.session.sessionID) { // If there is no user logged in:
      console.log('NOT LOGGED ', allUsers, dataBG, dataComics, req.session.user);
      const done = (allUsers, dataBG, dataComics) => {
        res.render('index', {
          data: allUsers,
          dataBG: dataBG,
          dataComics: dataComics,
        });
      };
      done(allUsers, dataBG, dataComics);
    }
  }
  catch (err) {
    res.send('something went wrong in the gathering the data');
  }
};

module.exports = index;
