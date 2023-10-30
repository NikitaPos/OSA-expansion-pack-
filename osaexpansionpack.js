// OSA expansion pack
// by NikitaPos
// An addon is guaranteed to run only after all groups are loaded.

const { base } = require('../constants.js');

module.exports = ({ Class }) => {

	// This addon is enabled by default.
	// You can also disable addons by not making them end with '.js'
	// If you want to disable, simply uncomment line below 
//	return console.log('[exampleAddon.js] Addon disabled by default');

	let MAX_CHILDREN = 0,
		GUNS = [],
		TURRETS = [],

	alreadySeen = [],
	next = ['basic'],
	limit = 1000;
	while (next.length && limit--) {
		let current = next;
		next = [];
		for (let i = 0; i < current.length; i++) {

			// Handle string definition references
			let now = current[i];
	        if ("string" == typeof now) {
	            if (!(now in Class)) throw Error(`Definition ${now} is attempted to be gotten but does not exist!`);
	            now = Class[now];
	        }

			// Handles tanks with multiple ways to upgrade to them, like Overgunner.
			if (alreadySeen.includes(now.LABEL)) continue;
			alreadySeen.push(now.LABEL);

			// Add guns, turrets and additional max child count to our current list of stuff for our abomination to have.
			if (now.MAX_CHILDREN) MAX_CHILDREN += now.MAX_CHILDREN;
			if (now.GUNS) GUNS.push(...now.GUNS);
			if (now.TURRETS) TURRETS.push(...now.TURRETS);

			// Add upgrades of current tank to next iteration
			for (let key of Object.keys(now)) if (key.startsWith('UPGRADES_TIER_')) next.push(...now[key]);
		}
	}

	// This adds the tank to the definitions and to the fun menu
exports.osaaddontank1 = {
   PARENT: [exports.genericTank],
   LABEL: 'osaaddontank1',
   GUNS: [ {
         POSITION: [ 21, 8, 1, 0, -4, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 21, 8, 1, 0, 4, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 16, 5, 1, 0, -4, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, {
         POSITION: [ 16, 5, 1, 0, 4, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, }, 
     ],
};
//misc
  exports.faketank = {
   PARENT: [exports.genericTank],
   LABEL: 'fakeTank',
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         }, 
     ],
};

//
	Class.OSA_Addon = {
	    PARENT: "menu",
	    LABEL: "Osa expansion Addon",
	    UPGRADES_TIER_0: ["osaaddontank1", "faketank"]
	};
	Class.addons.UPGRADES_TIER_0.push("OSA_Addon");
};
