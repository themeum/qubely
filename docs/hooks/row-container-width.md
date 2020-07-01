# Row Container width

Row Container width specifies the max-width of `qubely-container` class. 

### default values
|Device |Width (px)|
|:---|:---|
|`mobile`|540|
|`tablet`|720|
|`medium`|960|
|`desktop`|1140|


## Update
Using following filter hooks default values of `qubely-container` can be updated.

## Update container widths for all devices

```php

add_filter('qubely_container_width', 'update_qubely_container_width');

function update_qubely_container_width() {
  return array(
    'xs' => 300,
    'sm' => 700,
    'md' => 900,
    'lg' => 1100
  );
}
```
### Use following filter hooks to update width for specific device
* Mobile - `qubely_container_xs` 
* Tablet - `qubely_container_sm`
* Medium - `qubely_container_md`
* Desktop - `qubely_container_lg`

#### example
```php

add_filter('qubely_container_xs', 'update_qubely_container_xs');

function update_qubely_container_xs() {
  return 320;
}

```
	