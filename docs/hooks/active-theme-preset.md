# Active Theme Preset

Use following hook to active `Theme preset` of Qubely Global Settings from themes. 


## Code

```php

add_action('after_switch_theme', 'active_theme_preset');

function active_theme_preset () {
    do_action('qubely_active_theme_preset');
}

```
