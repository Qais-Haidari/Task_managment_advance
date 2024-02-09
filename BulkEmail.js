function getDateForWeekAndDay(selectedWeek, selectedDay) {
    // Get the current date
    var currentDate = new Date();

    // Set the current date to the first day of the week (Sunday)
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());

    // Calculate the target date based on the selected week and day
    var targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + (selectedWeek - 1) * 7 + selectedDay);

    // Format the date as a string (e.g., "YYYY-MM-DD")
    var formattedDate = targetDate.toISOString().split('T')[0];

    return formattedDate;
}

// Example usage:
var selectedWeek = 3;  // Replace with the desired week
var selectedDay = 1;   // Replace with the desired day of the week (0 for Sunday, 1 for Monday, and so on)

var resultDate = getDateForWeekAndDay(selectedWeek, selectedDay);
console.log(resultDate);

  



// var last_friday_of_month, print_last_fridays_of_month;

// last_friday_of_month = function(year, month) {
//   var i, last_day;
//   i = 0;
//   while (true) {
//     last_day = new Date(year, month, i);
//     if (last_day.getDay() === 5) {
//       return last_day.toDateString();
//     }
//     i -= 1;
//   }
// };

// print_last_fridays_of_month = function(year) {
//   var month, results;
//   results = [];
//   for (month = 1; month <= 12; ++month) {
//     results.push(console.log(last_friday_of_month(year, month)));
//   }
//   return results;
// };

// (function() {
//   var year;
//   year = parseInt(process.argv[2]);
//   return print_last_fridays_of_month(year);
// })();






// const moment = require('moment');

// function getNthWeekday(startDate, occurance = 1, day = 0) {
//     let startOfMonth = moment(startDate).utc().startOf("month").startOf("week");
//     let finalDate = moment(startDate)
//       .utc()
//       .startOf("month")
//       .startOf("week")
//       .add(day, "d")
//       .add(occurance, "w");
//     if (finalDate.month() == startOfMonth.month()) {
//       finalDate = finalDate.subtract(1, "w");
//     }
//     return finalDate;
//   }
//   console.log(getNthWeekday('02/09/2024'))
//   console.log(moment().format('MM/DD/YYYY'))
