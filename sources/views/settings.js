import { JetView } from "webix-jet";


export default class SettingsView extends JetView {
	config() {
		// const param = this.app.getService("locale");
		// const _ = param._;
		// const language = param.getLang();
		
		// const _ = this.app.getService("locale")._;
		// const language = this.app.getService("locale").getLang();
		// console.log(language);
		
		const settingsBtn = {
			width: 100,
			view: "segmented",
			// value: language,
			value: "en",
			//вэлью задает дефолт состояние по id из options ( en - id: "en")
			options: [
				{ id: "ru", value: "RU" },
				{ id: "en", value: "EN" },
			],
			click: () => {
				// console.log(this.app);
				console.log(this.app.getService("locale"));
				//проверил и "locales"
				// this.app.getService("locale").setLang(this.getRoot().getValue());
			}
		};
		return settingsBtn;
	}
}
