# Alignment

Alignment fields let user align contents (text/image/block) inside whole block.

## Usage:
Alignment field supports both  common `non-responsive` and `responsive` values.

### Non-Responsive

```javascript
const {useState} = wp.element;
const {Alignment} = wp.qubelyComponents;

const MyAlignmentComponent = () => {
    const [alignment, setAlignment] = useState('left');
    return (
        <Alignment 
            label='Alignment'
            value={alignment}
            onChange={alignment => setAlignment({alignment})}
        />
    )   
}

```

### Responsive

```javascript
const {useState} = wp.element;
const {Alignment} = wp.qubelyComponents;

const MyAlignmentComponent = () => {
    const [alignment, setAlignment] = useState({md: 'left',sm:'left',xs:'center'});
    const [device, setDevice] = useState('md');
    return (
        <Alignment 
            responsive
            device={device}
            label='Alignment'
            value={alignment}
            onChange={alignment => setAlignment({alignment})}
            onDeviceChange={device => setDevice({ device })} 
        />
    );
}

```

### Props
The set of props accepted by the component will be specified below.


|Prop |Type|Required |
|:---|:---|:---|
|`label`|String|No|
|`value`|String/Object|Yes|
|`onChange`|Function|Yes|
|`responsive`|Boolean|No|
|`device`|String|No|
|`onDeviceChange`|Function|No|
|`flex`|Boolean|No|
|`alignmentType`|String|No|
|`disableJustify`|String|No|
|`disableCenter`|String|No|

#### label
Label of the alignment field

- Type: `String`
- Required: No
  
#### value
The current value of the alignment field

- Type: `String | Object`
- Required: Yes
  
If `responsive` is true, value should be an `Object` .

#### onChange
A function that receives the value of the field

- Type: `function`
- Required: Yes
  
#### responsive
Defines whether the field's value will be responsive or not

- Type: `Boolean`
- Required: No
  
#### device
Applicable when `responsive` is true and will set the value of selected viewport

- Type: `Object`
- Required: No
  
#### onDeviceChange
A function that receives the value of the selected device, will be applicable when `responsive` is true

- Type: `function`
- Required: No

#### alignmentType
Depends on the content type which will be controlled by the Alignment field

- Type: `String`
- Required: No
- Allowed value : `content`
  
#### disableCenter
Disables `center` alignment

- Type: `Boolean`
- Required: No
  
#### disableJustify
Disables `justify` alignment

- Type: `Boolean`
- Required: No


  
#### flex
When the content which will be controlled by the Alignment field is flex

- Type: `Boolean`
- Required: No

