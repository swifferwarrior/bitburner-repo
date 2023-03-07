// Spoofs bank account of target server to grow their reserves
// Installed on target servers

export async function main(ns) {
	let mark = ns.getHostname();
	while (true) {
		await ns.grow(mark);
		await ns.sleep(30000);//30s
		ns.print('Spoofed ' + mark)
	}
}