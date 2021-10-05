import { JetView } from "webix-jet";
import { countriesCollection } from "../models/collections.js";
import { statusesCollection } from "../models/collections.js";
import constants from "../constants.js";

export default class DataView extends JetView {
	config() {
		
		const _ = this.app.getService("locale")._;

		const countriesDt = {
			// maxWidth: 500,
			localId: constants.DATA_VIEW_IDS.COUNTRIES_DT_ID,
			view: "datatable",
			hover: "myHover",
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
					countriesCollection.remove(id);
					return false;
				},
			},
		};

		const statusesDt = {
			localId: constants.DATA_VIEW_IDS.STATUSES_DT_ID,
			view: "datatable",
			hover: "myHover",
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
					template: (obj) => _(obj.Name),
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
							value: constants.DATA_VIEW_IDS.COUNTRIES_DT_ID,
							options: [
								{ value: _("Country"), 
									id: constants.DATA_VIEW_IDS.COUNTRIES_DT_ID
								},
								{ value: _("Status"), 
									id: constants.DATA_VIEW_IDS.STATUSES_DT_ID
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
						countriesDt,
						statusesDt
					],
				},
			],
		};

		return dataMultiview;
	}
	init() {
		this.$$(constants.DATA_VIEW_IDS.STATUSES_DT_ID).sync(statusesCollection);
		this.$$(constants.DATA_VIEW_IDS.COUNTRIES_DT_ID).sync(countriesCollection);
	}
}