<?php

class Fields{

    /**
     * Get Field Type
     * @param $type
     * @param $info
     */
    public static function get($type, $info) {
        if('text' === $type) {
            return self::text($info);
        }
        if('select' === $type) {
            return self::select($info);
        }
    }

    /**
     * Get text field
     * @param $info
     */
    private static function text($info)
    {
        ?>
            <tr>
                <th class="row"><?php echo esc_html($info['label']); ?></th>
                <td>
                    <input name="qubely_options[<?php echo esc_attr($info['key']) ?>]" value="<?php echo esc_html($info['value']) ?>" type="text" class="regular-text">
                    <?php  echo !empty($info['desc']) ? "<p class=\"description\">{$info['desc']}</p>" : ""; ?>
                </td>
            </tr>
        <?php
    }

    /**
     * Get Select Field
     * @param $info
     */
    private static function select($info)
    {
        ?>
        <tr>
            <th class="row"><?php echo esc_html($info['label']); ?></th>
            <td>
                <select name="qubely_options[<?php echo esc_attr($info['key']) ?>]" id="<?php echo esc_attr($info['key']) ?>">
                    <?php
                        foreach ($info['options'] as $key => $value) {
                            ?>
                                <option value="<?php echo esc_attr($key) ?>"><?php echo esc_html($value); ?></option>
                            <?php
                        }
                    ?>
                </select>
                <?php  echo !empty($info['desc']) ? "<p class=\"description\">{$info['desc']}</p>" : ""; ?>
            </td>
        </tr>
        <?php
    }

}