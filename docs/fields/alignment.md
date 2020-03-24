# Alignment field

Alignment fields let user align contents (text/image) inside whole block.

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
|`flex`|String|No|
|`alignmentType`|String|No|
|`disableJustify`|String|No|
|`disableCenter`|String|No|

#### value
The current value of the alignment.

- Type: `String | Object`
- Required: Yes
  
If `responsive` is true, value should be an `Object` .

#### alignmentType
Depends on the content type which will be controlled by the Alignment field

- Type: `String`
- Required: No
- Allowed value : `content`


  