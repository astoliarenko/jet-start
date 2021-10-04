function getMenuView(app) {
	const _ = app.getService("locale")._;
	return {
		view: "menu",
		id: "top:menu",
		css: "app_menu",
		width: 180,
		layout: "y",
		select: true,
		template: "<span class='webix_icon #icon#'></span> #value# ",
		data: [
			{ value: _("Contacts"), id: "contacts", icon: "wxi-user" },
			{ value: _("Data"), id: "data", icon: "wxi-calendar" },
			{ value: _("Settings"), id: "settings", icon: "wxi-pencil" },
		],
	};
}
export default getMenuView;