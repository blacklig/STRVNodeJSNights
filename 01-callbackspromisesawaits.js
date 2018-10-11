// Homework - Jiri Coufal

// Get names of all vehicles owned by Luke Skywalker
// we are using http://swapi.co)

// improvements could be done implementing timeouts and try catch block

// use 1 callbacks, 2 promises, 3 await async


// initialisation of all required repos and consts
const request = require('request');
const rp = require('request-promise');
const apiPath = 'http://swapi.co/api/people/1';


// 1) using callbacks

/*

console.log(`Fetching data using callbacks approach`);
request({uri:apiPath,json:1}, function (error, response, body) {
//request(apiPath, function (error, response, body) {

    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Prints the result

    console.log(`Vehicles owned by Mr. ${body.name} are:`);

    // here we iterate through "vehicles" of mr. Skywalker - each "vehicle" is URI for vehicle details
    body.vehicles.forEach(
        (vehicleURI) => {
            // we call each URI to get vehicle details, we only use name of it
            request({uri:vehicleURI,json:1},(error,response,body) => {
                console.log(body.name);
            });
        }
    )
});
console.log(`waiting for data`);


*/

/*

// 2) using promises

rp({uri:apiPath,json:1})
    .then((body) => {
        //console.log(body);
        console.log(`Vehicles owned by Mr. ${body.name} are:`);
        return body;
    })
    .then ((body) => {
        body.vehicles.forEach((vehicleURI)=>
            rp({uri: vehicleURI, json: 1})
                .then((body) => {
                    console.log(body.name); // here we dump name of vehicle
                }).catch((err) => {
                    console.log('Api call failed');
                })
        )
    })
    .catch(function (err) {
        console.log(`Api call failed. No wonder on SWAPI :). Should work minutes later. Error: ${err}`);
    });

console.log('Hello there, I am not blocked. Meanwhile API calls work hard.');

*/

// /*

// 3) using await - async ES2017

function parseVehicles(vehiclesURI) {
    return new Promise(resolve => {
        vehiclesURI.forEach((vehicleURI)=>
            rp({uri: vehicleURI, json: 1})
                .then((body) => {
                    console.log(body.name); // here we dump name of vehicle
                }).catch((err) => {
                console.log('Api call failed');
            })
        )}
    )
}

async function callApi () {

    let vehiclesURI =    await rp({uri:apiPath,json:1}).then((body) => {
        console.log(`Vehicles owned by Mr. ${body.name} are:`);
        return body.vehicles;
    }).catch(()=>{
        console.log('Problem with calling SW API');
        throw new Error('Problem with calling SW API');
    });

                        await parseVehicles(vehiclesURI);
}

callApi()
    .then( ()=>{console.log('Calling SW API.');})
    .catch( (err) => {console.log(`${err} - API couldnt be called`)});

// */