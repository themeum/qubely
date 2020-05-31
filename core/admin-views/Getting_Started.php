<?php

// Exit if accessed directly
if (!defined('ABSPATH')) exit;

class Getting_Started {
    public function markup() {
        $logo = QUBELY_DIR_URL. 'assets/img/admin/qubely-option-logo.jpg'
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
                        <a class="qubey-gs-button link" href="#"><?php esc_html_e('Documentation', 'qubely'); ?></a>
                    </div>
                </div>
            </div>
        </div>

        <?php
    }
}
