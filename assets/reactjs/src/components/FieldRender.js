//fields
import icons from "../helpers/icons";
import Alignment from "./fields/Alignment";
import Animation from "./fields/Animation";
import Background from "./fields/Background";
import Border from "./fields/Border";
import BorderRadius from "./fields/BorderRadius";
import BoxShadow from "./fields/BoxShadow";
import ButtonGroup from "./fields/ButtonGroup";
import Carousel from "./fields/Carousel";
import Color from "./fields/Color";
import ColorAdvanced from "./fields/ColorAdvanced";
import Counter from "./fields/Counter";
import Device from "./fields/Device";
import Dimension from "./fields/Dimension";
import DragDimension from "./fields/DragDimension";
import Dropdown from "./fields/DropDown";
import Gradient from "./fields/Gradient";
import Headings from "./fields/Headings";
import IconList from "./fields/IconList";
import IconSelector from "./fields/IconSelector";
import InnerPanel from "./fields/InnerPanel";
import Interaction from "./fields/Interaction";
import Margin from "./fields/Margin";
import Media from "./fields/Media";
import Padding from "./fields/Padding";
import { QubelyButtonEdit, QubelyButtonSave } from "./fields/QubelyButton";
import { QubelyIconListEdit, QubelyIconListSave } from "./fields/QubelyIconList";
import RadioAdvanced from "./fields/RadioAdvanced";
import Range from "./fields/Range";
import Select from "./fields/Select";
import Selector from "./fields/Selector";
import Separator from "./fields/Separator";
import Shape from "./fields/Shape";
import Styles from "./fields/Styles";
import Tab from "./fields/Tab";
import Tabs from "./fields/Tabs";
import Templates from "./fields/Templates";
import Toggle from "./fields/Toggle";
import Typography from "./fields/Typography";
import Url from "./fields/Url";
import Wrapper from "./fields/Wrapper";
import HeadingToolbar from "./fields/headingToolbar";

//inline
import { InlineSelector, InlineSpacer, InlineToolbar } from "./fields/inline";

// component s

import InspectorTab from "../components/InspectorTab";
import InspectorTabs from "../components/InspectorTabs";

//functions
import { CssGenerator, objectAppend, objectReplace, singleField } from "./CssGenerator";
import {
	IsInteraction,
	_equal,
	animationAttr,
	copyToClipboard,
	isArray,
	isObject,
	parseResponsiveViewPort,
	selectValue,
	setValue,
	videoBackground,
} from "./HelperFunction";

import { withCSSGenerator } from "../hooks";

//hooks

import { buttonAttributes, buttonSettings } from "./fields/ButtonSettings";
import { ContextMenu, handleContextMenu } from "./fields/ContextMenu";
import { animationSettings, globalAttributes, globalSettingsPanel, interactionSettings } from "./fields/GlobalSettings";
import { listAttributes, listSettings } from "./fields/ListSettings";

import { Pagination } from "./others";

wp.qubelyComponents = {
	Alignment,
	Animation,
	Background,
	Border,
	ContextMenu: {
		ContextMenu,
		handleContextMenu,
	},
	QubelyButton: {
		buttonAttributes,
		buttonSettings,
	},
	QubelyList: {
		listAttributes,
		listSettings,
	},
	BorderRadius,
	BoxShadow,
	ButtonGroup,
	Color,
	ColorAdvanced,
	Counter,
	Carousel,
	CssGenerator: {
		CssGenerator,
		objectReplace,
		objectAppend,
		singleField,
	},
	Dimension,
	Device,
	Dropdown,
	DragDimension,
	gloalSettings: {
		globalAttributes,
		animationSettings,
		interactionSettings,
		globalSettingsPanel,
	},
	Gradient,
	Headings,
	HeadingToolbar,
	HelperFunction: {
		_equal,
		animationAttr,
		selectValue,
		isObject,
		isArray,
		setValue,
		videoBackground,
		parseResponsiveViewPort,
		IsInteraction,
		copyToClipboard,
	},
	IconList,
	IconSelector,
	InnerPanel,
	Interaction,
	Inline: {
		InlineToolbar,
		InlineSpacer,
		InlineSelector,
	},
	Margin,
	Media,
	Padding,
	Range,
	RadioAdvanced,
	Selector,
	Select,
	Styles,
	Shape,
	Separator,
	Tabs,
	Tab,
	Templates,
	Toggle,
	Typography,
	Wrapper,
	Url,
	Pagination,
	QubelyButtonEdit,
	QubelyButtonSave,
	QubelyIconListEdit,
	QubelyIconListSave,
	QubelyFreeIcons: icons,
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
};
