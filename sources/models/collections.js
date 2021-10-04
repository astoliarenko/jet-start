import { contacts } from "./contacts.js";
import { statuses } from "./statuses.js";
import { countries } from "./countries.js";

export const contactsCollection = new webix.DataCollection({
	data: contacts,
});

export const statusesCollection = new webix.DataCollection({
	data: statuses,
});

export const countriesCollection = new webix.DataCollection({
	data: countries,
});