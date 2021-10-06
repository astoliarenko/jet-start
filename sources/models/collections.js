import { contacts } from "./contacts.js";
import { statuses } from "./statuses.js";
import { countries } from "./countries.js";

export const contactsCollection = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/"
	// data: contacts
});

export const statusesCollection = new webix.DataCollection({
	// data: statuses,
	url: "http://localhost:8096/api/v1/statuses/",
	save: "rest->http://localhost:8096/api/v1/statuses/"
});

export const countriesCollection = new webix.DataCollection({
	// data: countries,
	url: "http://localhost:8096/api/v1/countries/",
	save: "rest->http://localhost:8096/api/v1/countries/"
});