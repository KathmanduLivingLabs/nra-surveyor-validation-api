
var xlsx = require('node-xlsx');

var appRootPath = require('app-root-path');

var excel2Json = require('node-excel-to-json');

module.exports = {

	parse : function(){
		
		var obj = xlsx.parse(appRootPath+'/surveyorslist/surveyorslist.xls'); 

		var jsonObj = JSON.parse(JSON.stringify(obj[0]['data'])) 

		var exits = false;

		var objnumber = 9846563096;

		// console.log(jsonObj[2])

		// for(var obj in jsonObj){
		// 	console.log(jsonObj[obj])

		// }

		var surveyorsList = [];

		for(var row=2 ; row<jsonObj.length ; row++){

			var surveyor = {
				'program' : jsonObj[row][1],
				'crn' : jsonObj[row][2],
				'name' : jsonObj[row][3],
				'address' : jsonObj[row][4],
				'mobile' : jsonObj[row][5],
				'district' :jsonObj[row][6]
			};
			
			surveyorsList.push(surveyor);
			


		}

		return surveyorsList;

		// console.log('***',exits)


		// for(var row=2 ; row<jsonObj.length ; row++){
		// 	// console.log(jsonObj[row][5]);
		// 	var number = Number(jsonObj[row][5]);
		// 	if(Number.isInteger(number) && number === objnumber ){
		// 		exits = true
		// 	}


		// }

		// console.log('***',exits)

		// excel2Json(appRootPath+'/surveyorslist/surveyorslist.xls', function(err, output) {
		// 	console.log(output)
		// });
	}

}