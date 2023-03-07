/** @param {NS} ns */
import { Hosts } from '/scripts/files.js';

export async function main(ns) {
	for(let host of Hosts){
		let money = ns.getServerMoneyAvailable(host);
		ns.tprint(host + ": $" + money);	
	}
	ns.tprint(ns.getTotalScriptIncome())
	// await ns.sleep(30000);//30s
}