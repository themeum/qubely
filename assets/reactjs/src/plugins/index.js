import GlobalSettings from "./global-settings";

const { registerPlugin } = wp.plugins;

registerPlugin("qubely-global-settings", {
	render() {
		return <GlobalSettings />;
	},
});
