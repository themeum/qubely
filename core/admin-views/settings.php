<div class="wrap">
    <h1>Qubely Settings</h1>
    <div id="qubely-settings-tabs" class="nav-tab-wrapper">
        <a href="#general" class="nav-tab nav-tab-active">General</a>
        <a href="#style" class="nav-tab">Style</a>
        <a href="#advanced" class="nav-tab">Advanced</a>
    </div>

    <form id="qubely-settings-tabs-content">

        <?php
            $option_data    = get_option('qubely_options');
        ?>

        <div class="qubely-settings-inner" id="general">
            <table class="form-table">
                <tbody>
                    <tr>
                        <th class="row"> Google map API key </th>
                        <td>
                            <input name="qubely_options[gmap_api]" type="text" class="regular-text">
                            <p class="description">Enter your google map api key</p>
                        </td>
                    </tr>
                    <tr>
                        <th class="row"> ReCaptcha site key </th>
                        <td>
                            <input name="qubely_options[recaptcha_site_key]" type="text" class="regular-text">
                            <p class="description">Enter your reCaptcha secret key</p>
                        </td>
                    </tr>
                    <tr>
                        <th class="row"> ReCaptch secret key </th>
                        <td>
                            <input name="qubely_options[recaptcha_secret_key]" type="text" class="regular-text">
                            <p class="description">Enter your reCaptcha secret key</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="qubely-settings-inner" id="style" style="display: none">
            Style Settings
        </div>
        <div class="qubely-settings-inner" id="advanced" style="display: none">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('CSS Save Method', 'qubely'); ?></th>
                    <td>
                        <?php $value = isset($option_data['css_save_as']) ? $option_data['css_save_as'] : 'wp_head' ; ?>
                        <select name="qubely_options[css_save_as]">
                            <?php
                            $options = array(
                                'wp_head'   => __('Header', 'qubely'),
                                'filesystem' => __('File System', 'qubely'),
                            );
                            foreach ($options as $id => $label) { ?>
                                <option value="<?php echo esc_attr($id); ?>" <?php selected($value, $id, true); ?>>
                                    <?php echo strip_tags($label); ?>
                                </option>
                            <?php }
                            ?>
                        </select>
                        <p class="description"> <?php _e('Select where you want to save CSS.', 'qubely'); ?></p>
                    </td>
                </tr>
            </table>
        </div>
        <?php submit_button('Save Changes');?>
    </form>

</div>