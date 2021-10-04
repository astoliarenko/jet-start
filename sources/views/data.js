import { JetView } from "webix-jet";
import { countries } from "../models/countries";
import { statuses } from "../models/statuses";

const statusesDtLocalId = "statuses-dt";
const countriesDtLocalId = "countries-dt";

export default class DataView extends JetView {
	config() {
		
		// const _ = this.app.getService("locale")._;

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
					header: "Country",
					// header: _("Country"),
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
					this.remove(id);
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
					header: "Name",
					// header: _("Name"),
					fillspace: true,
					editor: "text"
				},
				{
					id: "Icon",
					header: "Icon",
					// header: _("Icon"),
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
					this.remove(id);
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
								{ value: "Country", 
									id: countriesDtLocalId
								},
								{ value: "Status", 
									id: statusesDtLocalId
								},
							],
							on: {
								onChange: (newId) => {
									this.$$(newId).show();
								}
							}
						},
						{}
					]
				},
				{
					cells: [
						countriesDt,
						//добавить кнопку
						statusesDt,
						//добавить кнопку
					],
				},
			],
		};

		return dataMultiview;
	}
	init() {
		this.$$(countriesDtLocalId).parse(countries);
		this.$$(statusesDtLocalId).parse(statuses);
	}
}