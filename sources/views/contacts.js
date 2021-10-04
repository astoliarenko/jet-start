import { JetView } from "webix-jet";
// import { contacts } from "../models/contacts";
import FormView from "./form.js";
import { contactsCollection, statusesCollection, countriesCollection } from "../models/collections";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const сontactsList = {
			localId: "contacts-list",
			view: "list",
			template: (obj) => {
				// return `<span class='webix_icon wxi-${statusesCollection.getItem(obj.Status).Icon} user-list-close'></span>` +
				return _(statusesCollection.getItem(obj.Status).Name) +
				": " + obj.Name + " " + obj.Email + ` ${_("from")} ` + countriesCollection.getItem(obj.Country).Name
				+ "<span class='webix_icon wxi-close user-list-close'></span>";
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
					this.$$("contacts-form").setValues(item);
					
					// contactsCollection.updateItem(id, item);
					// console.dir(item);
				}
			}
		};

		const сontactsForm = new FormView(this.app);
		const ui = {
			cols: [сontactsList, сontactsForm],
		};

		return ui;
	}
	init() {
		// this.getRoot() = view здесь
		this.$$("contacts-list").sync(contactsCollection);
		contactsCollection.waitData.then(() => {
			view.select(view.getFirstId());
		});
	}
	ready() {
		const list = this.$$("contacts-list");
		const firstId = list.getFirstId();
		list.select(firstId);
	}
	urlChange() {
		const id = this.getParam("id");
		const list = this.$$("contacts-list");
		console.log("id = ", id);
		// console.dir(this.$$("contacts-list"));
		if (id && this.$$("contacts-list").exists(id)) {
			const item = contactsCollection.getItem(id);
			console.log("item",item);
			console.log(this.$$("contacts-form"));
			// this.$$("contacts-form").setValues(item);
		} else {
			this.setParam("id", 1, true);
			// this.$$("contacts-form").setValues(item);
			// list.select(list.getFirstId());
		}
	}
}
