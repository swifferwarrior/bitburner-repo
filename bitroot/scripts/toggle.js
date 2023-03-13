/** @param {NS} ns */
import { Hosts } from '/config.js'

export async function main(ns) {
	// Turn on files like: `foodnstuff 0 1 1`
	// This means turn off hack, turn on grow, turn on weaken
	let server = ns.args[0]
	let h = ns.args[1]
	let g = ns.args[2]
	let w = ns.args[3]
	//foodnstuff
	let Scripts = ['hello.js', 'grow.js', 'weaken.js']
	let Orders = [h, g, w]
	//no		yes			yes
	//should only have hack and weaken running


	if (server == 'help') {
		ns.tprint(`1 = hack, 2 = grow, 3 = weaken`)
		ns.tprint(`Syntax: toggle [server] [h] [g] [w]`)
		ns.tprint(`hack, grow, and weaken arguments are represented by 0 (off) or 1 (on). `)
	} else if (server == 'all') {
		await orderAll(ns, Scripts, Orders);
	} else {
		await orderOne(ns, server, Scripts, Orders)
	}
}

export async function orderOne(ns, server, Scripts, Orders) {

	ns.print(`Current Server: ${server} | Values: ${Orders}`)

	for (let i = 0; i < 3; i++) {
		let script = Scripts[i]
		let order = Orders[i]

		ns.print(`	Current order for ${script} is ${order} on ${server} `)

		switch (order) {
			case 0:
				await ns.scriptKill(script, server);
				ns.tprint(`	0: KILL ${script} on ${server}`)
				break;
			case 1:
				await ns.exec(script, server)
				ns.tprint(`	1: RUN ${script} on ${server}`)
				break;
			default:
				ns.tprint(`${script} untouched.`)
		}
	}
}

export async function orderAll(ns, scripts, orders) {
	ns.tprint(`Applying orders [${orders}] system-wide`)
	for (let j = 0; j < Hosts.length; j++) {
		await orderOne(ns, Hosts[j], scripts, orders)
	}
}