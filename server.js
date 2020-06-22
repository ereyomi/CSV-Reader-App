// Require Express to run server and routes
const express = require( 'express' );

// Start up an instance of app
const app = express();

/* Dependences */
const bodyParser = require( 'body-parser' );

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require( 'cors' );
app.use( cors() );

// Initialize the main project folder
app.use( express.static( 'client' ) );

//neatCSV
const neatCsv = require( 'neat-csv' );

//-----------
const fs = require( 'fs' )


const getNeatCsv = ( req, res ) => {
    let csv;
    fs.readFile( './file.csv', async ( err, data ) => {
        if ( err )
        {
            console.error( err )
            return { error: err }
                    
        }
            
        try {
            csv = await neatCsv( data )
        } catch (error) {
            csv = error
        }
        res.send( [
            csv,
            data,
        ])
    } ) 
}


// require csvtojson module
    const CSVToJSON = require( 'csvtojson' );

const getCsvToJSON = ( req, res ) => {

    // convert users.csv file to JSON array
    CSVToJSON().fromFile('test-file.csv')
        .then(data => {
            // users is a JSON array
            // log the JSON array
            res.send( data )
        }).catch(err => {
            // log error if any
            res.send( err )
        });
}
// Setup Server

const port = 8000;

const server = app.listen( port, () => {
    console.log( "server running" );
    console.log( "running on localhost: ", port );
} )

// Callback function to complete GET '/all'
app.get( '/api/getdata', getCsvToJSON)
