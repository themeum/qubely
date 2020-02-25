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

#### label
If this property is added, a label will be generated using label property as the content.

* Type: String
* Required: `No`

#### value
* Type: String | Object
* Required: `Yes`

#### onChange
* Type: Function
* Required: `Yes`

#### responsive
* Type: Boolean
* Required: `No`

#### device
* Type: String
* Required: `No`

#### onDeviceChange
* Type: Function
* Required: `No`