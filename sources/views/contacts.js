import { JetView } from "webix-jet";
// import { contacts } from "../models/contacts";
import { contactsCollection, statusesCollection, countriesCollection } from "../models/collections";
import { FormView, combo1Id, combo2Id } from "./form.js";
const сontactsListLocalId = "contacts-list";

export default class ContactsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const сontactsList = {
			localId: сontactsListLocalId,
			view: "list",
			template: (obj) => {
				// return `<span class='webix_icon wxi-${statusesCollection.getItem(obj.Status).Icon} user-list-close'></span>
				return `${_(statusesCollection.getItem(obj.Status).Name)}
				: ${obj.Name} ${obj.Email} ${_("from")} ${countriesCollection.getItem(obj.Country).Name}
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
			const data = contactsCollection.getItem(id);
			view.queryView("form").setValues(data);
			// this.$$(combo1Id).setValue(data.Country);
			// this.$$(combo2Id).setValue(data.Status);
		});
	}
	urlChange() {
		const id = this.getParam("id");
		const list = this.$$(сontactsListLocalId);
		const data = contactsCollection.getItem(id);
		if (id && list.exists(id)) {
			const item = contactsCollection.getItem(id);
			this.getRoot().queryView("form").setValues(item);
			list.select(id);
			// console.log(this.getRoot().queryView("combo"));
			// this.$$(combo1Id).setValue(data.Country);
			// this.$$(combo2Id).setValue(data.Status);
			this.app.callEvent("Combo1Select", [data.Country]);
			this.app.callEvent("Combo2Select", [data.Status]);
		} else {
			this.setParam("id", 1, true);
			// this.app.callEvent("Combo1Select", [0]);
			// this.app.callEvent("Combo2Select", [0]);
		}
	}
}
