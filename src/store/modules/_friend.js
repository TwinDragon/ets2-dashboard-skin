/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_friend.js
 * Date: 	08/06/2021
 * Time: 	13:41
 */

/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	skins.js
 * Date: 	02/05/2020
 * Time: 	09:27
 */

import * as friendUtils from '@/utils/_friend';

// initial state
const state = () => ({
	me:      friendUtils.make( 'Me' ),
	friends: []
});

// getters
const getters = {
	me:      state => {
		return state.me;
	},
	friends: state => {
		return state.friends;
	}
};

// actions
const actions = {
	//setFirstActive( { commit, getters } ) {
	//	const active = getters.firstActive;
	//	commit( 'setCurrent', active );
	//}
};

// mutations
const mutations = {
	setMe( state, me ) {
		state.me = me;
	},
	addFriends( state, friend ) {
		state.friends.push( friend );
	}
	//setConfigActive( state, name ) {
	//	let skin = state.all.filter( skin => skin.id === name );
	//
	//	//console.log( skin, name );
	//
	//	if ( skin.length === 0 )
	//		throw 'NoSkinFound';
	//
	//	skin = _.first( skin );
	//	//console.log( skin );
	//
	//	state.currentSkin = skin;
	//}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};