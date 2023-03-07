// For execution of remote scripts via CLI
// incomplete

/** @param {NS} ns */
export function main(ns) {
	let cmd = ns.args[0];
	ns.tprint("Running " + cmd);
	let target = ns.args[2];
	
	switch (cmd){
		case 'exec':
			execRemote(ns, ns.args[1], ns.args[2]);
			break;
		case 'test':
			ns.tprint("Switch test success!");
			break;
		// default:
		// 	await reset();
	}
	ns.tprint("Done. Ran " + cmd + " on " + target);
}

export async function reset(ns) {
	await ns.tprint('This does nothing just yet...');
}

export async function execRemote(ns, file, serv) {
	ns.tprint('Running ' + file + ' on ' + serv)
	ns.exec(file,serv)
}