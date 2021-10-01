import { JetView, plugins } from "webix-jet";
import menu from "./menu";

export default class TopView extends JetView {
	config() {
		const header = {
			type: "header",
			template: this.app.config.name,
			css: "webix_header app_header",
		};

		const ui = {
			type: "clean",
			paddingX: 10,
			paddingY: 10,
			margin: 10,
			css: "app_layout",
			cols: [
				{
					rows: [{ css: "webix_shadow_medium", rows: [header, menu] }],
				},
				{ type: "wide", rows: [{ $subview: true }] },
			],
		};

		return ui;
	}
	init() {
		this.use(plugins.Menu, "top:menu");
		//!!!!!!!чекнуть плагин потом
	}
}
