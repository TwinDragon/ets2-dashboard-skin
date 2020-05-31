/**
 * @author:	Emmanuel SMITH <emmanuel.smith@live-session.fr>
 * project:	customDefault
 * file: 	server.helpers.js
 * Date: 	26-Apr-20
 * Time: 	15:56
 */

import bodyParser        from 'body-parser';
import express           from 'express';
import fs                from 'fs';
import http              from 'http';
import path              from 'path';
import socketio          from 'socket.io';
import truckSimTelemetry from 'trucksim-telemetry';
import { logIt }         from './utils.helpers';

let app, server, io, telemetry, port, interval, pathDist;
const configFilePath = path.resolve( process.cwd(), './config.ets2-dashboard-skin.json' );

const init = () => {
	app       = express();
	server    = http.createServer( app );
	io        = socketio( server );
	telemetry = truckSimTelemetry();
	port      = 3000;
	interval  = 15;
	pathDist  = path.resolve( __dirname, '../../../dist' );
	
	app.use( bodyParser.json() );
	app.use( express.static( pathDist ) );
	
	app.post( '/config', ( req, res ) => {
		fs.writeFileSync( configFilePath, JSON.stringify( req.body, null, 2 ) );
		
		res.send( req.body );
	} );
	
	app.get( '/config', ( req, res ) => {
		const file = fs.readFileSync( configFilePath, 'UTF-8' );
		
		res.send( file );
	} );
	
	telemetry.watch( { interval: interval }, data => {
		io.emit( 'update', data );
	} );
	
	io.on( 'connection', socket => {
		io.emit( 'update', telemetry.data );
	} );
	
	server.listen( port, () => {
		const url  = `localhost:${ port }`;
		const data = {
			url:  url,
			port: port
		};
		
		logIt( 'server.listen', data, `Euro Truck Simulator 2 dashboard is running at http://${ url }/` );
	} );
};

export {
	app,
	server,
	io,
	telemetry,
	port
};

export default init;
