/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_config.js
 * Date: 	08/04/2020
 * Time: 	17:50
 */

import axios       from 'axios';
import FileSaver   from 'file-saver';
import defaultData from '../data/ets2-dashboard-skin.config.json';

const generateEmptyData = ( config, configSkins ) => {
	let emptyData = {};
	
	//console.log( config, configSkins );
	
	config.categories.forEach( category => {
		category.elements.forEach( element => {
			emptyData[ element.id ] = null;
		} );
	} );
	
	Object.entries( configSkins ).forEach( ( [ key, skin ] ) => {
		console.log( key, 'Plop', skin );
		skin.categories.forEach( category => {
			category.elements.forEach( element => {
				emptyData[ element.id ] = null;
			} );
		} );
	} );
	
	//console.log( emptyData );
	
	return emptyData;
};

const emptyData = () => {
	return defaultData;
};

const save = data => {
	return axios
		.post( '/config', data )
		.then( response => {
			return response.data;
			//console.log( 'Save', response.data );
		}, error => {
			console.log( error );
			return error;
		} );
};

const download = () => {
	load()
		.then( data => {
			const file = new File(
				[ JSON.stringify( data, null, 2 ) ],
				'ets2-dashboard-skin.config.json',
				{ type: 'application/json;charset=utf-8' }
			);
			
			FileSaver.saveAs( file );
		} );
};

const load = () => {
	return axios.get( '/config' )
				.then( response => {
					//console.log(  'Load', response.data );
					return response.data;
				}, error => {
					console.warn( error );
					return emptyData();
				} );
};

const upload = file => {
	if ( file.type !== 'application/json' )
		throw 'Invalid file type';
	
	return new Promise( ( resolve, reject ) => {
		let reader = new FileReader();
		reader.readAsText( file, 'UTF-8' );
		
		reader.onload  = evt => {
			const data = JSON.parse( evt.target.result );
			console.log( data );
			
			save( data )
				.then( data => {
					console.log( 'Data' );
					
					resolve( data );
				}, error => error );
		};
		reader.onerror = () => {
			reject( 'Error reading file' );
		};
	} );
};


export default {
	load,
	generateEmptyData,
	emptyData,
	save,
	download,
	upload
};
