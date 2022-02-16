const { __ } = wp.i18n;
const { render } = wp.element;

import "./components/FieldRender";
import "./components/format-library";

import "./editor.scss";
import "./blocks/scss/style.scss";

import "./blocks/row"; // Row
import "./blocks/row/column"; // Column
import "./blocks/button"; // Button
import "./blocks/text"; // Text
import "./blocks/icon"; // Icon
import "./blocks/map"; // Map
import "./blocks/divider"; // Divider
import "./blocks/infobox"; // Info Box
import "./blocks/image"; // Image
import "./blocks/testimonial"; // Testimonial
import "./blocks/accordion"; // Accordion
import "./blocks/heading"; // Heading Box
import "./blocks/videopopup"; // Video popup
import "./blocks/progressbar"; // Progress Bar
import "./blocks/counter"; // counter
import "./blocks/tabs"; // Tabs
import "./blocks/tabs/tab"; // Inner Tabs
import "./blocks/socialicons"; // Social Icons
import "./blocks/contactform"; // Contact Form
import "./blocks/buttongroup"; // Button Group
import "./blocks/advancedlist"; // Advanced List
import "./blocks/iconlist"; // Icon List
import "./blocks/wrapper"; // Wrapper
import "./blocks/team"; // Team
import "./blocks/pricing"; // pricing
import "./blocks/timeline"; // Timeline
import "./blocks/postgrid"; // Postgrid
import "./blocks/animatedheadline"; // Animated Headline
import "./blocks/pieprogress"; // PieProgress
import "./blocks/table-of-contents";
import "./blocks/image-comparison"; // image-comparison

import "./plugins";

// Global Settings
import "./blocks/pagesettings";

window.qubelyDevice = "md";
window.bindCss = false;
window.globalData = {
	settings: {
		colorPreset1: qubely_admin.palette[0],
		colorPreset2: qubely_admin.palette[1],
		colorPreset3: qubely_admin.palette[2],
		colorPreset4: qubely_admin.palette[3],
		colorPreset5: qubely_admin.palette[4],
		colorPreset6: qubely_admin.palette[5],
	},
};
window.globalSaving = false;

// Save CSS in Database/File
import ParseCss from "./helpers/ParseCss";

let unSubscribe = wp.data.subscribe(() => {
	try {
		if (window.bindCss === false) {
			const hasNonPostEntityChanges = wp.data.select("core/editor").hasNonPostEntityChanges();
			const isSaving = wp.data.select("core/editor").isSavingPost();
			const isAutosaving = wp.data.select("core/editor").isAutosavingPost();
			const isPublishing = wp.data.select("core/editor").isPublishingPost();

			if (isPublishing || (isSaving && !isAutosaving)) {
				ParseCss(true);
				window.bindCss = true;
			} else {
				const isPreviewing = wp.data.select("core/editor").isPreviewingPost();
				if (isPreviewing) {
					ParseCss(false);
				} else {
					if (hasNonPostEntityChanges) {
						$(
							".components-button.editor-post-publish-button.editor-post-publish-button__button.is-primary"
						).click(() => {
							setTimeout(() => {
								if (window.bindCss === false) {
									$(".components-button.editor-entities-saved-states__save-button.is-primary").bind(
										"click",
										function () {
											console.log("saving hasNonPostEntityChanges");
											ParseCss(true);
										}
									);
									window.bindCss = true;
								}
							});
						});
					}
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
});

//UPDATE BLOCK CATEGORY ICON
wp.blocks.updateCategory("qubely", {
	icon: (
		<img
			style={{ height: "20px", "margin-top": "-2px" }}
			src={qubely_admin.plugin + "assets/img/blocks/block-qubely.svg"}
			alt={__("Qubely")}
		/>
	),
});

import { ImportButton } from "./components/others";

wp.domReady(function () {
	setTimeout(function () {
		const toolbar = document.querySelector(".edit-post-header__toolbar");
		const toolbarChild = document.querySelector(".edit-post-header-toolbar");

		if (!toolbar) {
			return;
		}
		const qubelyImportWrapper = document.createElement("div");
		qubelyImportWrapper.classList.add("qubely-import-button-wrapper");

		if (!toolbar.querySelector(".qubely-import-button-wrapper")) {
			render(<ImportButton />, qubelyImportWrapper);
			toolbar.insertBefore(qubelyImportWrapper, toolbarChild);
		}
	}, 100);
});
