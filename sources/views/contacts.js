import { JetView } from "webix-jet";
// import { contacts } from "../models/contacts";
import FormView from "./form.js";
import { contactsCollection } from "../models/collections";

export default class ContactsView extends JetView {
	config() {
		const сontactsList = {
			// header: "Contacts list",
			localId: "contacts-list",
			view: "list",
			// data: contactsCollection,
			template: "#Name# #Email#<span class='webix_icon wxi-close user-list-close'></span>",
			select: true,
			onClick: {
				"user-list-close": function (e, id) {
					contactsCollection.remove(id);
					return false;
				},
			}
		};

		const сontactsForm = new FormView(this.app);
		const ui = {
			cols: [сontactsList, сontactsForm],
		};

		return ui;
	}
	init(view) {
		// view.$$("contacts-list").sync(contactsCollection);
		// view.$$("contacts-list").sync(contactsCollection);
		// view.$scope.app.webix.$$("contacts-list").sync(contactsCollection);
		console.dir(view);
		// this.getRoot() = view здесь
		// view.queryView("list").parse(contactsCollection);
		this.$$("contacts-list").parse(contactsCollection);
	}
	ready() {
		const list = this.getRoot().queryView("list");
		const firstId = list.getFirstId();
		list.select(firstId);
	}
}
