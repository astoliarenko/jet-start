import { JetView } from "webix-jet";
import { contactsCollection, statusesCollection, countriesCollection } from "../models/collections";
import FormView from "./form.js";
import constants from "../constants.js";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const сontactsList = {
			localId: constants.CONTACTS_LIST_VIEW_ID,
			view: "list",
			template: (obj) => {

				const country = countriesCollection.getItem(obj.Country);
				const status = statusesCollection.getItem(obj.Status);
				// return `<span class='webix_icon wxi-${statusesCollection.getItem(obj.Status).Icon} user-list-close'></span>
				const contactsInfo = `${_(status ? status.Name : "Unknown status")}
				: ${obj.Name} ${obj.Email} ${_("from")} ${country ? country.Name : "unknown lands"}`;

				return `${contactsInfo}<span class='webix_icon wxi-close user-list-close'></span>`;
			},
			select: true,
			onClick: {
				"user-list-close": function (e, id) {
					contactsCollection.remove(id);
					return false;
				},
			},
			on: {
				onItemClick: (id) => {
					const item = contactsCollection.getItem(id);
					this.app.callEvent("setFormValue", [item]);
					this.setParam("id", id, true);
					// console.dir(item);
				}
			}
		};
		const ui = {
			cols: [сontactsList, FormView],
		};

		return ui;
	}
	init(view) {
		// this.getRoot() = view здесь
		this.$$(constants.CONTACTS_LIST_VIEW_ID).sync(contactsCollection);
		contactsCollection.waitData.then(() => {
			const id = view.getFirstId();
			view.select(id);
		});
	}
	urlChange() {
		const id = this.getParam("id");
		const list = this.$$(constants.CONTACTS_LIST_VIEW_ID);
		if (id && list.exists(id)) {
			const item = contactsCollection.getItem(id);
			list.select(id);
			this.app.callEvent("setFormValue", [item]);
		} else {
			// console.log("ELSE");
			this.setParam("id", 1, true);
		}
	}
}
