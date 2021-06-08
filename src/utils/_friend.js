/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_friend.js
 * Date: 	08/06/2021
 * Time: 	17:39
 */

const make = ( name, code = null ) => {
	let c = code;
	
	if ( c === null ) {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const numbers = '0123456789';
		c             = '';
		
		for ( let i = 0; i < 2; i++ )
			c += letters.charAt( Math.floor( Math.random() * letters.length ) );
		
		c += '-';
		
		for ( let i = 0; i < 4; i++ )
			c += numbers.charAt( Math.floor( Math.random() * numbers.length ) );
	}
	
	return {
		code: c,
		name: name
	};
};

export {
	make
};