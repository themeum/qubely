<?php

class Fields{

    /**
     * Get Field Type
     * @param $type
     * @param $info
     */
    public static function get($type, $info) {

        if(
                'text' === $type ||
                'number' === $type ||
                'date' === $type ||
                'email' === $type ||
                'month' === $type ||
                'search' === $type ||
                'url' === $type ||
                'time' === $type ||
                'tel' === $type ||
                'week' === $type ||
                'color' === $type
        ) {
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
                <?php self::label($info['label']); ?>
                <td>
                    <input
                        name="qubely_options[<?php echo esc_attr($info['key']) ?>]"
                        value="<?php echo esc_html($info['value']) ?>"
                        type="<?php echo esc_attr($info['type'])?>"
                        class="<?php echo esc_attr($info['size'] === 'regular' ? 'regular-text' : '' ) ?>"
                    >
                    <?php echo isset($info['suffix']) ? esc_html($info['suffix']) : '' ?>
                    <?php self::description($info['desc']); ?>
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
        $info['options'] = isset($info['options']) ? $info['options'] : array();
        ?>
        <tr>
            <?php self::label($info['label']); ?>
            <td>
                <select name="qubely_options[<?php echo esc_attr($info['key']) ?>]" id="<?php echo esc_attr($info['key']) ?>">
                    <?php
                        foreach ($info['options'] as $key => $label) {
                            ?>
                                <option <?php selected($info['value'], $key, true) ?> value="<?php echo esc_attr($key) ?>"><?php echo esc_html($label); ?></option>
                            <?php
                        }
                    ?>
                </select>
                <?php self::description($info['desc']); ?>
            </td>
        </tr>
        <?php
    }

    private static function label($label) {
        if(isset($label)){
            echo "<th class='row'>". esc_html($label) ."</th>";
        }
    }

    private static function description($description) {
        if(isset($description)){
            echo "<p class='description'>{$description}</p>";
        }
    }

}