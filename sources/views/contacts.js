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
				"user-list-close": (e, id) => {
					contactsCollection.remove(id);
					let urlId = this.getParam("id");
					console.log(urlId);
					console.log(this.$$(constants.CONTACTS_LIST_VIEW_ID).getSelectedId());
					if(urlId > id) {
						//если мы удаляем айтем и есть выбранный айтем, и айди этого выбранного айтема
						// больше чем айди удаляемого то нужно в урле изменить id--
						this.show(`/top/contacts?id=${--urlId}`);
					}

					if (this.getParam("id") === id) {
						this.show("/top/contacts");
						this.app.callEvent(constants.WEBIX_EVENTS.CLEAR_FORM);
					}
					// (проверить выбрана ли эта запись)
					// очистить параметр в url
					
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
	init() {
		// this.getRoot() = view здесь
		const list = this.$$(constants.CONTACTS_LIST_VIEW_ID);
		list.sync(contactsCollection);
		contactsCollection.waitData.then(() => {
			const prevId = this.getParam("id");
			if (prevId && list.exists(prevId)) {
				list.select(prevId);
			} else {
				const id = list.getFirstId();
				list.select(id);
				this.show(`/top/contacts?id=${id}`);
				// console.log("select");
			}
		});
		this.on(this.app, constants.WEBIX_EVENTS.UNSELECT_LIST_ITEMS, () => {
			list.unselectAll();
			this.show("/top/contacts");
		});
	}
	urlChange() {
		const id = this.getParam("id");
		const list = this.$$(constants.CONTACTS_LIST_VIEW_ID);
		if (id && list.exists(id)) {
			const item = contactsCollection.getItem(id);
			list.select(id);
			this.app.callEvent(constants.WEBIX_EVENTS.SET_FORM_VALUE, [item]);
		}	
	}
}
