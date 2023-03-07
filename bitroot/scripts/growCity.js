/** @param {NS} ns */
import { Hosts } from '/scripts/files.js';

//If hack lvl is higher than server security, grow the server bank acct.
export async function main(ns) {
	let lvl = ns.getHackingLevel();
	while (true) {
		await ns.sleep(30000);//30s
		ns.print('Time to hoe and grow!')
		for (let i = 0; i < Hosts.length; i++) {
			let hn = Hosts[i];
			// ns.tprint(ns.getServerRequiredHackingLevel(Hosts[i]) <= lvl);
			if (ns.getServerRequiredHackingLevel(Hosts[i]) <= (lvl)) {
				ns.tprint("Safe Secs! F***ing with " + Hosts[i])
				await ns.grow(Hosts[i])
			} else {
				ns.tprint(Hosts[i] + " isn't safe yet. F*** around and find out...")
			}
		}
		ns.print('Hoe phase completed.')
	}
}