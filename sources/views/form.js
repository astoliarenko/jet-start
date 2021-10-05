import { JetView } from "webix-jet";
import constants from "../constants.js";
import { contactsCollection, statusesCollection, countriesCollection } from "../models/collections.js";

const defBtnWidth = 100;

export default class FormView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		// const formViewBtnWidth = 100;
		const btnSave = {
			width: defBtnWidth,
			view: "button",
			// id: "btn-add-new-item",
			type: "form",
			// value: "Save",
			value: _("Save"),
			css: "webix_primary",
			click: () => {
				const form = this.getRoot();
				if (form.validate()) {
					const values = form.getValues();
					contactsCollection.updateItem(values.id, values);
				}
			}
		};
		
		const btnDelete = {
			width: defBtnWidth,
			view: "button",
			// id: "btn-add-new-item",
			type: "form",
			// value: "Delete",
			value: _("Delete"),
			click: () => {
				const form = this.getRoot();
				const values = form.getValues();
				// contactsCollection.updateItem(values.id, values);
				contactsCollection.remove(values.id);
				form.clear();
				form.clearValidation();
			}
		};
		
		const comboCountries = {
			view: "combo",
			name: "Country",
			// label: "Contact",
			localId: constants.CONTACTS_FORM_VIEW_IDS.COUNTRY_COMBO_ID,
			label: _("Country"),
			data: countriesCollection,	
			suggest: {
				data: countriesCollection,
				body: {
					template: "#Name#",
				}
			}
		};
		
		const comboStatuses = {
			view: "combo",
			localId: constants.CONTACTS_FORM_VIEW_IDS.STATUS_COMBO_ID,
			name: "Status",
			// label: "Status",
			label: _("Status"),
			suggest: {
				data: statusesCollection,
				body: {
					template: "#Name#",
				}
			}
		};
		
		const form = {
			view: "form",
			localId: constants.CONTACTS_FORM_VIEW_IDS.FORM_ID,
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
							invalidMessage: _("not correct")

						},
						comboCountries,
						comboStatuses
					],
				},
				{
					cols: [{}, btnSave, btnDelete,{}],
				},
				{}
			],
			rules: {
				Email: (value) => {
					//если будет несколько @ подряд, то все равно пройдет валидацию
					const reg = /\S+@\S+\.\S+/;
					return reg.test(value);
				}
			}
		};

		return form;
	}
	init() {
		this.on(this.app, "setFormValue", (value) => {
			this.$$(constants.CONTACTS_FORM_VIEW_IDS.FORM_ID).setValues(value);
		});
	}
}