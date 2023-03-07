// With alias set, you run `sys` followed by case argument
//		Arguments: start, stop, reset

/** @param {NS} ns */
import { Files } from '/scripts/files.js';
import { Hosts } from '/scripts/files.js';


export async function main(ns) {
	let cmd = ns.args[0];
	let remote = ns.fileExists("/scripts/remotefiles.js")
	for (let i = 0; i < Hosts.length; i++) {					//Specify host
		let host = Hosts[i]
		ns.tprint("Targeting " + host)
		if (!remote){
			ns.tprint("Remote files = " + remote + ". Installing.")
			ns.scp("/scripts/remotefiles.js")
		}
		switch (cmd) {											//Confirm action
			case 'start':
				ns.tprint("	Booting up...")
				await ns.run('/scripts/growCity.js')
				ns.tprint('	Start growCity.js')
				break;
			case 'stop':
				ns.tprint("	Shutting down...");
				await ns.kill('/scripts/growCity.js')
				break;
			case 'reset':
				ns.tprint("	Resetting...");
				await ns.kill('/scripts/growCity.js')
				await ns.run('/scripts/growCity.js')
				break;
		}
		for (let j = 0; j < Files.length; j++) {				//Acting on files
			let file = Files[j]
			switch (cmd) {
				case 'start':
					await startup(ns, file, host);
					// ns.tprint("	Online.")
					break;
				case 'stop':
					await shutdown(ns, file, host);
					break;
				case 'reset':
					await reset(ns, file,host);
					break;
				case 'exec':
					await execRemote(ns, ns.args[1], ns.args[2]);
					break;
			}
		}
		switch (cmd) {											//Concluding action
			case 'start':
				ns.tprint("	Online.")
				break;
			case 'stop':
				ns.tprint("	Offline.");
				break;
			case 'reset':
				ns.tprint("System restarted.");
				break;
		}
	}
}
// run /scripts/sysCtrl.js startup()
async function startup(ns, file, host) {
	ns.tprint("	Start " + file + " for " + host);
	if (!ns.fileExists(file,host)){
		ns.print("	File exist? " + ns.fileExists(file,host))
		ns.tprint("	File: " + file + " missing. Installing...")
		await ns.scp(file, host);	
		// await ns.exec(file, host);						//Run file if it isn't already
		ns.tprint("	\u2b91 Done.")						//copy file to server's /script/ dir
	} else if (!ns.isRunning(file, host)) {
		ns.print("	File running? " + ns.isRunning(file,host))
		ns.tprint("	\u2b91 Running " + file)
		// await ns.exec(file, host);						//Run file if it isn't already
	} else {
		null;
	}
	await ns.exec(file, host);						//Run file if it isn't already
}

// run /scripts/sysCtrl.js shutdown()
async function shutdown(ns,file,host) {
	ns.tprint("	Stop " + file + " for " + host);
			if (ns.isRunning(file, host)) {
				// ns.tprint("	\u2b91 Running " + file)
				await ns.kill(file, host);							//copy file to server's /script/ dir
			} else {
				null;
			}
		}

// run /scripts/sysCtrl.js shutdown()
async function reset(ns, file, host) {
	// ns.tprint("Resetting")
	await shutdown(ns, file, host);
	await ns.rm(file, host)
	await startup(ns, file, host);
}