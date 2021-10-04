import { contacts } from "./contacts.js";
import { statuses } from "./statuses.js";
export const contactsCollection = new webix.DataCollection({
	data: contacts,
});

export const statusesCollection = new webix.DataCollection({
	data: statuses,
});
