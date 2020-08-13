# Active Theme Preset

Using following hook active theme preset of Qubely Global Settings after activating theme 

## Code

```php

add_action('after_switch_theme', 'active_theme_preset');

function active_theme_preset () {
    do_action('qubely_active_theme_preset');
}

```
