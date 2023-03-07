// Runs remote scripts on other servers

export async function main(ns) {
	let cmd = ns.args[0];
	ns.tprint("Running '" + cmd + "' command");
	let target = ns.args[2];
	
	switch (cmd){
		case 'exec':
			ns.execRemote(ns, ns.args[1], ns.args[2]);
			break;
		case 'test':
			ns.tprint("Switch test success!");
			break;
		case 'kill':
			ns.tprint("Killing " + ns.args[1] + " on " + ns.args[2] + ".")
			await ns.scriptKill(ns.args[1], ns.args[2])
			// ns.tprint("Success!")
			break;
		case 'grow':
			ns.tprint("Spoofing " + ns.args[1])
			await ns.grow(ns.args[1])
			break;
		case 'weaken':
			ns.tprint('Weakening ' + ns.args[1])
			ns.weaken(ns.args[1])
		// default:
		// 	await reset();
	}
	ns.tprint("Done. Ran " + cmd + " on " + target);
}

export async function reset(ns) {
	await ns.tprint('This does nothing just yet...');
}