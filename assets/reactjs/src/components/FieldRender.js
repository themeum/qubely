//fields
import Alignment from "./fields/Alignment"
import Border from "./fields/Border"
import BorderRadius from "./fields/BorderRadius"
import BoxShadow from "./fields/BoxShadow"
import ButtonGroup from './fields/ButtonGroup'
import Color from "./fields/Color"
import Device from './fields/Device'
import Dimension from "./fields/Dimension"
import Gradient from "./fields/Gradient"
import IconList from "./fields/IconList"
import IconSelector from "./fields/IconSelector"
import Styles from "./fields/Styles"
import Separator from "./fields/Separator"
import Headings from "./fields/Headings"
import Wrapper from "./fields/Wrapper"
import Shape from "./fields/Shape"
import Media from "./fields/Media"
import Typography from "./fields/Typography"
import Url from "./fields/Url"
import Selector from "./fields/Selector"
import Background from './fields/Background'
import Tabs from './fields/Tabs'
import Tab from './fields/Tab'
import InnerPanel from './fields/InnerPanel'
import Select from './fields/Select'
import Range from './fields/Range'
import Toggle from './fields/Toggle'
import ColorAdvanced from './fields/ColorAdvanced'
import RadioAdvanced from './fields/RadioAdvanced'
import DragDimension from './fields/DragDimension'
import Counter from './fields/Counter'
import Animation from './fields/Animation'
import Dropdown from './fields/DropDown'
import Padding from './fields/Padding'
import Margin from './fields/Margin'
import Carousel from './fields/Carousel'
import { QubelyButtonEdit, QubelyButtonSave } from './fields/QubelyButton'
import { QubelyIconListEdit, QubelyIconListSave } from './fields/QubelyIconList'

//functions
import {
    CssGenerator,
    objectReplace,
    objectAppend,
    singleField
} from './CssGenerator'
import {
    animationAttr,
    selectValue,
    isObject,
    isArray,
    setValue,
    videoBackground,
    _equal
} from './HelperFunction'

wp.qubelyComponents = {
    Alignment,
    Animation,
    Background,
    Border,
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
        singleField
    },
    Dimension,
    Device,
    Dropdown,
    DragDimension,
    Gradient,
    Headings,
    HelperFunction: {
        animationAttr,
        selectValue,
        isObject,
        isArray,
        setValue,
        videoBackground,
        _equal
    },
    IconList,
    IconSelector,
    InnerPanel,
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
    Toggle,
    Typography,
    Wrapper,
    Url,
    QubelyButtonEdit,
    QubelyButtonSave,
    QubelyIconListEdit,
    QubelyIconListSave
}