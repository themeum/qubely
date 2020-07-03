# Row Container width

Row Container width specifies the max-width of `qubely-container` class. 

### default values
|Device |Width (px)|
|:---|:---|
|`Landscape Mobile`|540|
|`Tablet`|720|
|`Desktop`|960|
|`Large Desktop`|1140|


## Update
Using following filter hooks default values of `qubely-container` can be updated.

## Update container widths for all devices

```php

add_filter('qubely_container_width', 'update_qubely_container_width');

function update_qubely_container_width() {
  return array(
    'sm' => 300,
    'md' => 700,
    'lg' => 900,
    'xl' => 1100
  );
}
```
### Use following filter hooks to update width for specific device
* Mobile - `qubely_container_sm` 
* Tablet - `qubely_container_md`
* Desktop - `qubely_container_lg`
* Large Desktop - `qubely_container_xl`

#### example
```php

add_filter('qubely_container_xs', 'update_qubely_container_xs');

function update_qubely_container_xs() {
  return 320;
}

```
	