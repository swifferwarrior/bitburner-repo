/** @param {NS} ns */
import { Hosts } from '/config.js';
import {orderOne} from '/scripts/toggle.js'
let Scripts = ['hello.js', 'grow.js', 'weaken.js']

export async function main(ns) {
	ns.tprint('	===========================================')
	ns.tprint('	[$]		BANKROLL		[$]')
	ns.tprint('	===========================================')
	for (let host of Hosts) {
		let money = ns.nFormat(ns.getServerMoneyAvailable(host), "$0,0")
		// let amt = ns.getServerMoneyAvailable(host)
		let colon = ""

		if ( money.length < 8 && ns.isRunning('hello.js',host)){
			ns.tprint(`	Low on funds! Pausing hack for ${host}.`)
			await orderOne(ns, host, Scripts, [0,1,0])
		}

		if (host.length > 13) {
			colon = "		: "
		} else if (host.length < 8) {
			colon = "			: "
		} else {
			colon = "		: "
		}
		// nFormat(1.23e9, "$0.000a")
		ns.tprint(`	${host}${colon}${money}`);
	}
	// ns.tprint(ns.getTotalScriptIncome())
	// await ns.sleep(30000);//30s
}