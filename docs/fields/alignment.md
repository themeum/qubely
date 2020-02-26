# Alignment field

Field desc here

## Usage:

```javascript
const {useState} = wp.element
const {Alignment} = wp.qubelyComponents

const MyAlignmentComponent = () => {
    const [alignment, setAlignment] = useState('left')
    return (
        <Alignment 
            label='Alignment'
            value={alignment}
            onChange={alignment => setAlignment({alignment})}
        />
    )   
}

```

### Responsive: 

```javascript
const {useState} = wp.element
const {Alignment} = wp.qubelyComponents

const MyAlignmentComponent = () => {
    const [alignment, setAlignment] = useState({md: 'left'})
    const [device, setDevice] = useState('md')
    return (
        <Alignment 
            label='Alignment'
            value={alignment}
            onChange={alignment => setAlignment({alignment})}
            responsive
            device={device}
            onDeviceChange={device => setDevice({ device })} 
        />
    )   
}

```

### Props
* The set of props accepted by the component will be specified below.
* One important prop to refer is `value`, if `responsive` is true, value should be an Object & Object key should be device name.
* Another important prop `responsive` requires `device` state, device value can be `md` (Desktop) | `sm` (Tablet)  | `xs` (Mobile), ex: `this.state = {device: 'md'}`

|Prop |Type|Required |
|:---|:---|:---|
|`label`|String|No|
|`value`|String/Object|Yes|
|`onChange`|Function|Yes|
|`responsive`|Boolean|No|
|`device`|String|No|
|`onDeviceChange`|Function|No|
|`flex`|String|No|
|`disableJustify`|String|No|
|`disableCenter`|String|No|
