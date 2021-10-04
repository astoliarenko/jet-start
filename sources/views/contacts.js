import { JetView } from "webix-jet";
// import { contacts } from "../models/contacts";
import FormView from "./form.js";
import { contactsCollection, statusesCollection } from "../models/collections";

export default class ContactsView extends JetView {
	config() {
		const сontactsList = {
			// header: "Contacts list",
			localId: "contacts-list",
			view: "list",
			// data: contactsCollection,
			template: "#Name# #Email#<span class='webix_icon wxi-close user-list-close'></span>",
			//в список нужно еще подтянуть статус и страну, записывать  в значение их id (те цифру 1 а не Russia)
			// брать из коллекции нужно ( из)
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
		console.dir(view);
		// this.getRoot() = view здесь
		this.$$("contacts-list").sync(contactsCollection);
	}
	ready() {
		const list = this.getRoot().queryView("list");
		const firstId = list.getFirstId();
		list.select(firstId);
	}
}
