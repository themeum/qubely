const { __ } = wp.i18n;
const { render } = wp.element;

import "./components/FieldRender";
import "./components/format-library";

import "./blocks/scss/style.scss";
import "./editor.scss";

import "./blocks/accordion"; // Accordion
import "./blocks/advancedlist"; // Advanced List
import "./blocks/animatedheadline"; // Animated Headline
import "./blocks/button"; // Button
import "./blocks/buttongroup"; // Button Group
import "./blocks/contactform"; // Contact Form
import "./blocks/counter"; // counter
import "./blocks/divider"; // Divider
import "./blocks/heading"; // Heading Box
import "./blocks/icon"; // Icon
import "./blocks/iconlist"; // Icon List
import "./blocks/image"; // Image
import "./blocks/image-comparison"; // image-comparison
import "./blocks/infobox"; // Info Box
import "./blocks/map"; // Map
import "./blocks/pieprogress"; // PieProgress
import "./blocks/postgrid"; // Postgrid
import "./blocks/pricing"; // pricing
import "./blocks/progressbar"; // Progress Bar
import "./blocks/row"; // Row
import "./blocks/row/column"; // Column
import "./blocks/socialicons"; // Social Icons
import "./blocks/table-of-contents";
import "./blocks/tabs"; // Tabs
import "./blocks/tabs/tab"; // Inner Tabs
import "./blocks/team"; // Team
import "./blocks/testimonial"; // Testimonial
import "./blocks/text"; // Text
import "./blocks/timeline"; // Timeline
import "./blocks/videopopup"; // Video popup
import "./blocks/wrapper"; // Wrapper

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


