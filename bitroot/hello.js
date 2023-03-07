// Hacks server for income stream
// installed on target server
export async function main(ns) {
	let mark = ns.getHostname();

	if (ns.getServerMoneyAvailable < 15000) {
		await ns.sleep(720000)
	};

	while (true) {
		do { await ns.hack(mark) }
		while (ns.getServerMoneyAvailable >= 15000);
	};
}