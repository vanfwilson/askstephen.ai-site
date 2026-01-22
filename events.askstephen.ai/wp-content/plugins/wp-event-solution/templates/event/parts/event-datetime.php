<div class="<?php echo esc_attr($container_class); ?>">
    <div class="eventin-block-container">
        <div class="etn-event-meta-info etn-widget">
            <ul class="etn-ul">
                <li class="etn-li">
                    <?php printf(__('<span class="etn-span">Date:</span> %s - %s', 'eventin'), $start_date, $end_date)?>
                </li>
                <li class="etn-li">
                    <?php printf(__('<span class="etn-span">Time:</span> %s - %s (%s)', 'eventin'), $start_time, $end_time, $timezone)?>
                </li>
            </ul>
        </div>
    </div>
</div>
