import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter } from "webix-jet";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			name: "My first App",
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: true,
			start: "/top/start",
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => new MyApp().render());
}
