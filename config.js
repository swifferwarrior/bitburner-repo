// /** @param {NS} ns */

// import { deeper, expandList } from '/scripts/autoHack.js'
// export let rootedServers = []
// ENVIRONMENT VARIABLES
export const PortCrackers = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];

// ARRAYS
export let Hosts = [
	'n00dles',
	'foodnstuff',
	'sigma-cosmetics',
	'hong-fang-tea',
	'harakiri-sushi',
	'iron-gym',
	// 'joesguns';
	'nectar-net',
	'CSEC',
	'zer0',
	'max-hardware',
	'neo-net',
	'phantasy',
	'silver-helix',
	'avmnite-02h',
	'omega-net'
];

export const Files = [
	'weaken.js',
	'hello.js',
	'grow.js'
	// 'macguffin.js'
];

export const Utils = [
	'sysCtrl.js'
]

export async function main(ns) {
	// let item = args[0]
	// let list = args[1]
	let newList = ns.exec('scripts/listRoot.js','home')
	ns.tprint(newList + ' is:')
	ns.tprint(typeof newList)
	for (let item of newList){
		if (!Hosts.includes(item)) {
			list.push(item)
		}
	}
}


export async function main(ns) {
	let depth1 = await ns.scan('home')
	let { depth2, depth3, depth4, depth5 } = []
	let expandedList = []; //set of servers not in files

	depth2 = await deeper(ns, depth1, expandedList)
	depth3 = await deeper(ns, depth2, expandedList)
	depth4 = await deeper(ns, depth3, expandedList)
	depth5 = await deeper(ns, depth4, expandedList)
	ns.tprint(`Depth5 = ${depth5}`)
	await expandList(ns, depth5, expandedList)
	ns.tprint(`After case 5 expandedList = ${expandedList}`)

	// for (let server of expandedList) {
	// 	if (ns.hasRootAccess(server)) {
	// 		ns.tprint(`${server} is rooted.`)
	// 		rootedServers.push(server)
	// 	}
	// }

	// ns.tprint(`Final rootedServers = ${rootedServers}`)
	// for (let server of rootedServers){
	// 	if (!Hosts.includes(server)){
	// 		Hosts.push(server)
	// 	}
	// }
}