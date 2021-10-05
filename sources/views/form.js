import { JetView } from "webix-jet";

import { contactsCollection, statusesCollection, countriesCollection } from "../models/collections.js";
export const combo1Id = "combo1";
export const combo2Id = "combo2";


export class FormView extends JetView {
	config() {
		const contactsFormLocalId = "contacts-form";
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
				const form = this.getRoot();
				if (form.validate()) {
					let values = form.getValues();
					values.Country = this.$$(combo1Id).config.value;
					values.Status = this.$$(combo2Id).config.value;
					// console.dir(this.$$(combo1Id));
					//получить данные из боксов и передать их в коллекцию
					// const values = this.getValues();
					contactsCollection.updateItem(values.id, values);
					// console.dir();
				}
			}
		};
		
		const btnDelete = {
			width: btnWidth,
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
				this.app.callEvent("setValueCombo1", [0]);
				this.app.callEvent("setValueCombo2", [0]);
			}
		};
		
		const comboCountries = {
			view: "combo", 
			// label: "Contact",
			localId: combo1Id,
			// id: combo1Id,
			label: _("Country"),
			// value: "Name",
			suggest: {
				data: countriesCollection,
				body: {
					template: "#Name#",
				}
			},
			// on: {
			// 	"Combo1Select": (value) => {
			// 		console.log("COMBO1 was changed");
			// 		this.$$(combo1Id).setValue(value[0]);
			// 	}
			// }
			$init: () => {
				this.on(this.app, "setValueCombo1", (value) => {
					// this.$$(combo1Id).config.value = value;
					//проверить есть ли вообще такое value в коллекции
					// if(countriesCollection.getItem(value).Name) {
						this.$$(combo1Id).setValue(value);
					// }
						// console.log(countriesCollection.getItem(value).Name);
						// countriesCollection.getItem(value).Name
					// }
					
				});
			}
			// options: contactsCollection
		};
		
		const comboStatuses = {
			view: "combo",
			// id: combo2Id,
			localId: combo2Id,
			// label: "Status",
			label: _("Status"),
			// value: "Name",
			suggest: {
				data: statusesCollection,
				body: {
					template: "#Name#",
				}
			},
			// on: {
			// 	"Combo2Select": (value) => {
			// 		this.$$(combo2Id).setValue(value[0]);
			// 	}
			// }
			$init: () => {
				this.on(this.app, "setValueCombo2", (value) => {
					// this.$$(combo1Id).config.value = value;
					this.$$(combo2Id).setValue(value);
				});
			}
			// options: statusesCollection
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
							invalidMessage: _("not correct"),	
						},
						{
							view: "text",
							// label: "Email",
							label: _("Email"),
							// localId: "",
							name: "Email",
							// invalidMessage: "Title must not be empty",

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
			},
			$init: () => {
				this.on(this.app, "setFormValue", (value) => {
					// this.$$(combo1Id).config.value = value;
					// console.log(this.$$(contactsFormLocalId));
					this.$$(contactsFormLocalId).setValues(value);
				});
			}
		};

		return form;
	}
}