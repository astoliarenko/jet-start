import { JetView } from "webix-jet";
// import { contacts } from "../models/contacts";
import { contactsCollection, statusesCollection, countriesCollection } from "../models/collections";
import { FormView } from "./form.js";
const сontactsListLocalId = "contacts-list";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const сontactsList = {
			localId: сontactsListLocalId,
			view: "list",
			template: (obj) => {

				const country = countriesCollection.getItem(obj.Country);
				const status = statusesCollection.getItem(obj.Status);
				// return `<span class='webix_icon wxi-${statusesCollection.getItem(obj.Status).Icon} user-list-close'></span>
				// return `${_(statusesCollection.getItem(obj.Status).Name)}
				// : ${obj.Name} ${obj.Email} ${_("from")} ${countriesCollection.getItem(obj.Country).Name}
				return `${_(status?status.Name:"Unknown status")}
				: ${obj.Name} ${obj.Email} ${_("from")} ${country?country.Name:"unknown lands"}
				<span class='webix_icon wxi-close user-list-close'></span>`;
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
					this.getRoot().queryView("form").setValues(item);
					this.setParam("id", id, true);
					// console.dir(item);
				}
			}
		};
		// getContactsForm.bind(this);
		const ui = {
			cols: [сontactsList, FormView],
		};

		return ui;
	}
	init(view) {
		// this.getRoot() = view здесь
		this.$$(сontactsListLocalId).sync(contactsCollection);
		contactsCollection.waitData.then(() => {
			const id = view.getFirstId();
			view.select(id);
		});
	}
	urlChange() {
		const id = this.getParam("id");
		const list = this.$$(сontactsListLocalId);
		const data = contactsCollection.getItem(id);
		if (id && list.exists(id)) {
			const item = contactsCollection.getItem(id);
			list.select(id);
			this.app.callEvent("setFormValue", [item]);
			this.app.callEvent("setValueCombo1", [data.Country]);
			this.app.callEvent("setValueCombo2", [data.Status]);
		} else {
			// console.log("ELSE");
			this.setParam("id", 1, true);
		}
	}
}
