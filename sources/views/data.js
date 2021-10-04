import { JetView } from "webix-jet";
import { countriesCollection } from "../models/collections.js";
import { statusesCollection } from "../models/collections.js";

const statusesDtLocalId = "statuses-dt";
const countriesDtLocalId = "countries-dt";

export default class DataView extends JetView {
	config() {
		
		const _ = this.app.getService("locale")._;

		const countriesDt = {
			// maxWidth: 500,
			localId: countriesDtLocalId,
			view: "datatable",
			hover: "myHover",
			// data: countries,
			editable: true,
			select: true,
			scrollX: false,
			columns: [
				{
					id: "Name",
					// header: "Country",
					header: _("Country"),
					fillspace: true,
					editor: "text"
				},
				{
					id: "delete",
					header: "",
					css: "rank",
					template:
            "<span class ='webix_icon wxi-trash removeItemDatatable'></span>",
				},
			],
			onClick: {
				removeItemDatatable: function (e, id) {
					// this.remove(id);
					countriesCollection.remove(id);
					return false;
				},
			},
		};

		const statusesDt = {
			localId: statusesDtLocalId,
			view: "datatable",
			hover: "myHover",
			// data: statuses,
			editable: true,
			select: true,
			scrollX: false,
			columns: [
				{
					id: "id",
					header: "#",
					width: 50,
				},
				{
					id: "Name",
					// header: "Name",
					header: _("Name"),
					fillspace: true,
					editor: "text"
				},
				{
					id: "Icon",
					// header: "Icon",
					header: _("Icon"),
					template: "<span class ='webix_icon wxi-#Icon#'></span>",
				},
				{
					id: "delete",
					header: "",
					css: "rank",
					template:
            "<span class ='webix_icon wxi-trash removeItemDatatable'></span>",
				},
			],
			onClick: {
				removeItemDatatable: function (e, id) {
					// this.remove(id);
					statusesCollection.remove(id);
					return false;
				},
			},
		};

		const dataMultiview = {
			rows: [
				{
					cols: [
						{
							view: "tabbar",
							maxWidth: 300,
							value: countriesDtLocalId,
							options: [
								{ value: _("Country"), 
									id: countriesDtLocalId
								},
								{ value: _("Status"), 
									id: statusesDtLocalId
								},
							],
							on: {
								onChange: (newId) => {
									this.$$(newId).show();
									// console.log("ON");
								}
							}
						},
						{}
					]
				},
				{
					cells: [
						// {
						// 	rows: [
						// 		countriesDt,
						// 		{
						// 			view: "button",
						// 			label: _("Add"),
						// 			// label: "Add",
						// 			type: "form",
						// 		},
						// 	]
						// },
						// {
						// 	rows: [
						// 		statusesDt,
						// 		{
						// 			view: "button",
						// 			label: _("Add"),
						// 			// label: "Add",
						// 			type: "form",
						// 		},
						// 	]
						// }
						countriesDt,
						statusesDt
					],
				},
			],
		};

		return dataMultiview;
	}
	init() {
		console.log("OPA");
		this.$$(statusesDtLocalId).sync(statusesCollection);
		this.$$(countriesDtLocalId).sync(countriesCollection);
		// this.$$(statusesDtLocalId).parse(statuses);
		// console.log(this.$$(statusesDtLocalId).data.order);
		// this.$$(countriesDtLocalId).parse(countries);
	}
}