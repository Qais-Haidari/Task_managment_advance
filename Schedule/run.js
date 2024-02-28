const cron = require("node-cron");
const axios = require('axios')

// /Friday/Schedule
// /Thursday/Schedule
// /Wednesday/Schedule
// /Tuesday/Schedule
// /Monday/Schedule
// /Daily/Schedule


function Daily(){axios.get('http://10.0.0.116:5000/Daily/Schedule').then((res) => {}).catch((err) => {})}
function Monday(){axios.get('http://10.0.0.116:5000/Monday/Schedule').then((res) => {}).catch((err) => {})}
function Tuesday(){axios.get('http://10.0.0.116:5000/Tuesday/Schedule').then((res) => {}).catch((err) => {})}
function Wednesday(){axios.get('http://10.0.0.116:5000/Wednesday/Schedule').then((res) => {}).catch((err) => {})}
function Thursday(){axios.get('http://10.0.0.116:5000/Thursday/Schedule').then((res) => {}).catch((err) => {})}
function Friday(){axios.get('http://10.0.0.116:5000/Friday/Schedule').then((res) => {}).catch((err) => {})}

// 0 Monday
// 1 Tuesday
// 2 Wednesday
// 3 Thursday
// 4 Friday

function Run(){
    Daily()
    const date = new Date();
    const today = date.getDay();
    switch (today) {
        case 1:
            Monday();
            break;
        case 2:
            Tuesday();
            break;
        case 3:
            Wednesday();
            break;
        case 4:
            Thursday();
            break;
        case 5:
            console.log('5')
            // Friday();
            break;
        default:
            return 'NON'
    }
}
// Run()
cron.schedule("0 0 2 * * *", function () {
    Run()
});