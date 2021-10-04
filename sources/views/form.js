import { JetView } from "webix-jet";
import { contactsCollection, statusesCollection } from "../models/collections.js";

export default class FormView extends JetView {
	//list and form
	config() {
		const _ = this.app.getService("locale")._;
		const btnWidth = 100;

		const btnSave = {
			width: btnWidth,
			view: "button",
			// id: "btn-add-new-item",
			type: "form",
			// value: "Save",
			value: _("Save"),
			css: "webix_primary",
			click: () => {
				const values = this.getRoot().getValues();
				contactsCollection.updateItem(values.id, values);
			},
		};

		const btnDelete = {
			width: btnWidth,
			view: "button",
			// id: "btn-add-new-item",
			type: "form",
			// value: "Delete",
			value: _("Delete"),
			// css: "webix_primary",
			// click: saveForm,
		};

		const comboContacts = {
			view: "combo", 
			// label: "Contact",
			label: _("Contact"),
			// value: "Name",
			suggest: {
				data: contactsCollection,
				body: {
					template: "#Name#",
				}
			},
			// options: contactsCollection
		};

		const comboStatuses = {
			view: "combo", 
			// label: "Status",
			label: _("Status"),
			// value: "Name",
			suggest: {
				data: statusesCollection,
				body: {
					template: "#Name#",
				}
			},
			// options: statusesCollection
		};

		const ContactsForm = {
			view: "form",
			localId: "contacts-form",
			gravity: 0.5,
			minWidth: 200,
			data: contactsCollection,
			elements: [
				{ view: "template", template: _("Edit info"), type: "section" },
				{
					rows: [
						{
							view: "text",
							// label: "Name",
							label: _("Name"),
							// localId: "",
							name: "Name",
							// invalidMessage: "Title must not be empty",
						},
						{
							view: "text",
							// label: "Email",
							label: _("Email"),
							// localId: "",
							name: "Email",
							// invalidMessage: "Title must not be empty",
						},
						comboContacts,
						comboStatuses
					],
				},
				{
					cols: [{}, btnSave, btnDelete,{}],
				},
				{}
			],
		};

		return ContactsForm;
	}
	init(view) {
		view.parse(contactsCollection);
		// view.sync(contactsCollection);
		contactsCollection.waitData.then(() => {
			view.select(view.getFirstId());
		});
		// this.$$("contacts-form").sync(contactsCollection);
		// this.getRoot().queryView("form").sync(contactsCollection);
		// Use this.getRoot() to get to the top Webix widget inside a Jet class view.
		// Use this.$$() to look for Webix widgets by their IDs inside the current Jet view
	}
}
