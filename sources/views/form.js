import { JetView } from "webix-jet";

import { contactsCollection, statusesCollection, countriesCollection } from "../models/collections.js";
export const combo1Id = "combo1";
export const combo2Id = "combo2";

const contactsFormLocalId = "contacts-form";

export class FormView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const formViewBtnWidth = 100;

		const btnSave = {
			width: formViewBtnWidth,
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

					values.Status = this.$$(combo2Id).config.value;
					contactsCollection.updateItem(values.id, values);
				}
			}
		};
		
		const btnDelete = {
			width: formViewBtnWidth,
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
			localId: combo1Id,
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
			localId: combo2Id,
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
			localId: contactsFormLocalId,
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
			this.$$(contactsFormLocalId).setValues(value);
		});
	}
}