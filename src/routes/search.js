const User = require('../models/user');

const search = async (req, res) => {
    try {
        const allData = await User.find(); // all data in database
        const myData = await User.findOne({ // find session user
            _id: req.session.sessionID,
        });
        const search = await User.find({ // find data that equals filtered activity
            _id: { $nin: req.session.sessionID },
            interests: req.body.activity
        });
        const activity = req.body.activity; // filtered activity

        if (req.session.sessionID) { // checks if there is a user logged in
            let filteredData = (dataToFilter) => {
                dataToFilter.forEach((result) => {
                    if (result.likes.includes(myData._id) && myData.likes.includes(result._id)) {
                        let cleantheArray = dataToFilter.indexOf(result);
                        dataToFilter.splice(cleantheArray, 1);
                    }
                });

                return dataToFilter;
            };

            const done = async (allData, myData, search, activity) => {
                const equalActivities = await User.find({ // finds other users with the same interests 
                    _id: { $nin: req.session.sessionID },
                    interests: myData.interests[0] // How to create loop here?
                });
                let equalActivitiesFiltered = filteredData(equalActivities);
                let allDataFiltered = filteredData(allData);
                let searchFiltered = filteredData(search);

                req.session.search = search; // makes a session on the filtered activity
                res.render('search', {
                    data: allDataFiltered,
                    user: myData,
                    dataFilter: searchFiltered,
                    activity: activity,
                    dataEqual: equalActivitiesFiltered
                });
            };
            done(allData, myData, search, activity);
        } else { // if there is no user logged in
            const done = async (allData, search, activity) => {
                req.session.search = search;
                res.render('search', {
                    data: allData,
                    dataFilter: req.session.search,
                    activity: activity
                });
            };
            done(allData, search, activity);
        }
    }
    catch (err) {
        res.send('something went wrong in the gathering the data'); // Error handling
    }
};

module.exports = search;
