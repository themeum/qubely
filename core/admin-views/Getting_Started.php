<?php

// Exit if accessed directly
if (!defined('ABSPATH')) exit;

class Getting_Started {

    /**
     * Fetch changelog
     * @return mixed
     */
    public function get_changelog() {
        require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        $plugin_info = plugins_api('plugin_information', array(
            'slug' => 'qubely'
        ));
        return $plugin_info->sections['changelog'];
    }

    /**
     * Markup
     */
    public function markup() {
        $logo = QUBELY_DIR_URL. 'assets/img/admin/qubely-option-logo.jpg';
        ?>
        <div class="wrap">
            <h1 style="display: none">&nbsp;</h1>

            <div class="qubely-getting-started">
                <div class="qubely-gs-card qubely-gs-header" style="background-image: url(<?php echo $logo ?>)">
                    <h2>
                        <?php echo 'Qubely - ' . QUBELY_VERSION ?>
                    </h2>
                    <h3><?php esc_html_e('Full-Fledged Gutenburg Toolkit', 'qubely') ?></h3>
                    <div class="qubely-gs-button-group">
                        <a class="qubey-gs-button primary" href="#"><?php esc_html_e('Start creating page', 'qubely'); ?></a>
                        <a class="qubey-gs-button link" href="#"><?php esc_html_e('Documentation', 'qubely'); ?> <span class="fa fa-long-arrow-alt-right"></span></a>
                    </div>
                </div>
                <div class="qubely-gs-container">
                    <div class="qubely-gs-content">
                        <div class="qubely-gs-card">
                            <?php echo $this->get_changelog(); ?>
                        </div>
                    </div>
                    <div class="qubely-gs-sidebar">
                        <div class="qubely-gs-card">
                            <h1>Hello card</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <?php
    }
}
