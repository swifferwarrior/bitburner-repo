//  Cycles through servers and hacks them sequentially

import { Hosts } from 'scripts/files.js'

export async function main(ns) {
	while (true) {
		ns.tprint('Running hax... q(≧▽≦q)')
		for (let i = 0; i < Hosts.length; i++) {
			//await tryHack(i);
			await ns.hack(Hosts[i]);
			ns.tprint(i + ": " + Hosts[i])
		}
		ns.tprint("Hax complete (*^▽^*)")
	}
}

export async function tryHack(i) {
	await ns.hack(Hosts[i]);
	ns.print(i + ". " + Hosts[i]);
}