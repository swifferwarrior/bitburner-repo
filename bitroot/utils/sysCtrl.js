/** @param {NS} ns */
import { Files } from '/config.js';
import { Hosts } from '/config.js';
// import { } from '/scripts/remote.js'

// With alias set, you run `sys` followed by case argument
//		Arguments: start, stop, reset

export async function main(ns) {
	let cmd = ns.args[0];
	let remote = "/scripts/remotefiles.js";

	switch (cmd) {
		case 'start':
			ns.tprint("Booting up...")
			break;
		case 'stop':
			ns.tprint("Shutting down...");
			break;
		case 'reset':
			ns.tprint("Resetting...");
			break;
		case 'update':
			ns.tprint("Updating...");
			break;
	}

	//For every host...
	for (let i = 0; i < Hosts.length; i++) {
		let host = Hosts[i]
		ns.tprint(`	${cmd.toUpperCase()} ${host}`)
		// Add rev. file list if missing
		if (!ns.fileExists(remote)) {
			ns.print("	Updating remote config.")
			await ns.scp(remote)
		}

		// Then act on each file within host
		for (let j = 0; j < Files.length; j++) {
			let file = Files[j]

			switch (cmd) {
				case 'start':
					await startup(ns, file, host);
					break;
				case 'stop':
					await shutdown(ns, file, host);
					break;
				case 'reset':
					await reset(ns, file, host);
					break;
				case 'update':
					await update(ns, file, host);
					break;
			}
		}


	}
		// Finally, conclude the action.
		switch (cmd) {
			case 'start':
				ns.tprint("Online.")
				break;
			case 'stop':
				ns.tprint("Offline.");
				break;
			case 'reset':
				ns.tprint("System restarted.");
				break;
			case 'update':
				ns.tprint("Update completed.");
				break;
		}
}
// run /scripts/sysCtrl.js startup()
async function startup(ns, file, host) {
	ns.print("	Start " + file + " for " + host);

	// Check if file is missing
	if (!ns.fileExists(file, host)) {
		ns.print("	Missing " + file + ". Installing...")
		await ns.scp(file, host);
		ns.print("	Starting...")
		await ns.exec(file, host);
		ns.print("	\u2b91 Done.")
	} else { null }

	//Check turn on file if not running
	if (!ns.isRunning(file, host)) {
		ns.print("	\u2b91 Running " + file)
		await ns.exec(file, host);
	} else { null }
}

// run /scripts/sysCtrl.js shutdown()
async function shutdown(ns, file, host) {
	ns.print("	Stopping " + file + " for " + host);
	if (ns.isRunning(file, host)) {
		await ns.kill(file, host);
	} else {
		null;
	}
}

// run /scripts/sysCtrl.js shutdown()
async function reset(ns, file, host) {
	await shutdown(ns, file, host);
	await startup(ns, file, host);
}

// run /scripts/sysCtrl.js shutdown()
async function update(ns, file, host) {
	await shutdown(ns, file, host);
	await ns.rm(file, host)
	await startup(ns, file, host);
