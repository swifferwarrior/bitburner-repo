// Lowers security level of target server until it's lvl 7
// Installed on target server

/** @param {NS} ns */
export async function main(ns) {
	let serv = ns.getHostname();
	let servLvl = ns.getServerSecurityLevel(serv);

	//initial
	ns.tprint("		Security lvl: " + servLvl)
	if (servLvl > 7) {
		ns.tprint("		\u2b91 Weakening " + ns.getHostname())
		await ns.weaken(ns.getHostname())
	} else {
		ns.tprint(ns.getHostname() + " is harmless.")
	}


	//loop
	while (true) {
		await ns.sleep(30000)
		ns.print("Security lvl: " + servLvl)
		if (servLvl > 7) {
			ns.print("\u2b91 Weakening " + ns.getHostname())
			await ns.weaken(ns.getHostname())
		} else {
			ns.tprint(ns.getHostname() + " is harmless.")
			break;
		}
	}
}