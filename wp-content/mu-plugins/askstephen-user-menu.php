<?php
/**
 * Plugin Name: AskStephen User Menu
 * Description: Adds user account icon with login/logout dropdown to header
 * Version: 1.0
 */

// Add user menu to header (using wp_footer since it's position:fixed)
add_action('wp_footer', 'askstephen_user_menu_icon');

function askstephen_user_menu_icon() {
    $is_logged_in = is_user_logged_in();
    $current_user = wp_get_current_user();
    ?>
    <div id="askstephen-user-menu" class="askstephen-user-menu">
        <button class="user-menu-toggle" onclick="toggleUserMenu()" aria-label="User Menu">
            <svg class="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <span class="user-label"><?php echo $is_logged_in ? 'Account' : 'Login'; ?></span>
        </button>
        <div class="user-dropdown" id="user-dropdown">
            <?php if ($is_logged_in) : ?>
                <div class="dropdown-header">
                    <span class="user-greeting">Hello, <?php echo esc_html($current_user->display_name); ?></span>
                </div>
                <ul class="dropdown-menu">
                    <li><a href="<?php echo esc_url(get_permalink(get_option('woocommerce_myaccount_page_id'))); ?>">My Account</a></li>
                    <li><a href="<?php echo esc_url(wc_get_account_endpoint_url('orders')); ?>">Orders</a></li>
                    <li><a href="<?php echo esc_url(wc_get_account_endpoint_url('edit-account')); ?>">Account Details</a></li>
                    <li><a href="https://app.askstephen.ai">Go to App</a></li>
                    <li class="logout"><a href="<?php echo esc_url(wp_logout_url(home_url())); ?>">Logout</a></li>
                </ul>
            <?php else : ?>
                <ul class="dropdown-menu">
                    <li><a href="<?php echo esc_url(get_permalink(get_option('woocommerce_myaccount_page_id'))); ?>">Login</a></li>
                    <li><a href="<?php echo esc_url(get_permalink(get_option('woocommerce_myaccount_page_id'))); ?>">Register</a></li>
                    <li><a href="https://app.askstephen.ai">Go to App</a></li>
                </ul>
            <?php endif; ?>
        </div>
    </div>
    <?php
}

// Add styles and scripts
add_action('wp_head', 'askstephen_user_menu_styles');

function askstephen_user_menu_styles() {
    ?>
    <style>
        .askstephen-user-menu {
            position: fixed;
            top: 10px;
            right: 20px;
            z-index: 10000;
        }
        .user-menu-toggle {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 8px 12px;
            color: var(--color-gold, #b8860b);
            transition: opacity 0.2s;
        }
        .user-menu-toggle:hover {
            opacity: 0.8;
        }
        .user-icon {
            color: var(--color-gold, #b8860b);
        }
        .user-label {
            font-size: 11px;
            font-weight: 600;
            margin-top: 2px;
            color: #374151;
        }
        .user-dropdown {
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            min-width: 200px;
            overflow: hidden;
        }
        .user-dropdown.active {
            display: block;
        }
        .dropdown-header {
            padding: 12px 16px;
            background: #f9fafb;
            border-bottom: 1px solid #e5e7eb;
        }
        .user-greeting {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
        }
        .dropdown-menu {
            list-style: none;
            margin: 0;
            padding: 8px 0;
        }
        .dropdown-menu li {
            margin: 0;
        }
        .dropdown-menu a {
            display: block;
            padding: 10px 16px;
            color: #374151;
            text-decoration: none;
            font-size: 14px;
            transition: background 0.2s;
        }
        .dropdown-menu a:hover {
            background: #f3f4f6;
            color: var(--color-gold, #b8860b);
        }
        .dropdown-menu li.logout a {
            color: #dc2626;
            border-top: 1px solid #e5e7eb;
            margin-top: 8px;
            padding-top: 12px;
        }
        .dropdown-menu li.logout a:hover {
            background: #fef2f2;
        }
        @media (max-width: 768px) {
            .askstephen-user-menu {
                top: 8px;
                right: 60px;
            }
            .user-label {
                font-size: 10px;
            }
        }
    </style>
    <script>
        function toggleUserMenu() {
            var dropdown = document.getElementById('user-dropdown');
            dropdown.classList.toggle('active');
        }
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            var menu = document.getElementById('askstephen-user-menu');
            var dropdown = document.getElementById('user-dropdown');
            if (menu && dropdown && !menu.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    </script>
    <?php
}
