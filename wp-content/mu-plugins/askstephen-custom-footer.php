<?php
/**
 * Plugin Name: AskStephen Custom Footer
 * Description: Custom footer for AskStephen.ai
 * Version: 1.1
 */

// Disable default Neve footer
add_filter('neve_filter_toggle_content_parts', function($status, $context) {
    if ($context === 'footer') {
        return false;
    }
    return $status;
}, 10, 2);

// Add custom footer after main content
add_action('neve_after_primary', 'askstephen_custom_footer');

// Add secondary header bar after main header
add_action('neve_after_header_wrapper_hook', 'askstephen_secondary_header');

function askstephen_secondary_header() {
    $is_logged_in = is_user_logged_in();
    $current_user = wp_get_current_user();
    $cart_count = WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
    $cart_url = wc_get_cart_url();
    ?>
    <div class="askstephen-secondary-header">
        <div class="secondary-header-inner">
            <!-- Mastermind Link -->
            <a href="https://www.facebook.com/groups/askstephenmastermind" target="_blank" class="header-icon-link mastermind-link" title="Join Mastermind">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                <span>Mastermind</span>
            </a>

            <!-- Social Media Profiles -->
            <div class="social-profiles">
                <span class="social-label">AskStephen Profiles</span>
                <div class="social-icons">
                    <a href="https://facebook.com/askstephenai" target="_blank" title="Facebook" class="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/company/askstephenai" target="_blank" title="LinkedIn" class="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com/askstephenai" target="_blank" title="Instagram" class="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                    </a>
                    <a href="https://youtube.com/@askstephenai" target="_blank" title="YouTube" class="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                    <a href="https://x.com/askstephenai" target="_blank" title="X (Twitter)" class="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Subscribe Link -->
            <a href="/newsletter/" class="header-icon-link subscribe-link" title="Subscribe & Get Free Ebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>Subscribe</span>
            </a>

            <!-- Right side: Cart and User -->
            <div class="header-right-icons">
                <!-- Shopping Cart -->
                <a href="<?php echo esc_url($cart_url); ?>" class="header-icon-link cart-link" title="Shopping Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    <?php if ($cart_count > 0) : ?>
                        <span class="cart-count"><?php echo esc_html($cart_count); ?></span>
                    <?php endif; ?>
                    <span>Cart</span>
                </a>

                <!-- User Account -->
                <div class="user-menu-wrapper">
                    <button class="header-icon-link user-toggle" onclick="toggleUserMenu()" title="Account">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        <span><?php echo $is_logged_in ? 'Account' : 'Login'; ?></span>
                    </button>
                    <div class="user-dropdown" id="user-dropdown">
                        <?php if ($is_logged_in) : ?>
                            <div class="dropdown-header">
                                <span class="user-greeting">Hello, <?php echo esc_html($current_user->display_name); ?></span>
                            </div>
                            <ul class="dropdown-menu-list">
                                <li><a href="<?php echo esc_url(get_permalink(get_option('woocommerce_myaccount_page_id'))); ?>">My Account</a></li>
                                <li><a href="<?php echo esc_url(wc_get_account_endpoint_url('orders')); ?>">Orders</a></li>
                                <li><a href="<?php echo esc_url(wc_get_account_endpoint_url('edit-account')); ?>">Account Details</a></li>
                                <li><a href="https://app.askstephen.ai">Go to App</a></li>
                                <li><a href="/newsletter/">Subscribe & Get Free Ebook</a></li>
                                <li class="logout-item"><a href="<?php echo esc_url(wp_logout_url(home_url())); ?>">Logout</a></li>
                            </ul>
                        <?php else : ?>
                            <ul class="dropdown-menu-list">
                                <li><a href="<?php echo esc_url(wp_login_url()); ?>">Login</a></li>
                                <li><a href="<?php echo esc_url(wp_registration_url()); ?>">Register</a></li>
                                <li><a href="https://app.askstephen.ai">Go to App</a></li>
                                <li><a href="/newsletter/">Subscribe & Get Free Ebook</a></li>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <style>
        /* Secondary Header Bar */
        .askstephen-secondary-header {
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            padding: 8px 0;
            border-bottom: 2px solid var(--color-gold, #b8860b);
        }
        .secondary-header-inner {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 15px;
        }

        /* Icon Links */
        .header-icon-link {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #fff;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.2s;
            background: transparent;
            border: none;
            cursor: pointer;
        }
        .header-icon-link:hover {
            background: var(--color-gold, #b8860b);
            color: #fff;
        }
        .header-icon-link svg {
            fill: currentColor;
        }

        /* Mastermind Link */
        .mastermind-link {
            background: rgba(184, 134, 11, 0.2);
            border: 1px solid var(--color-gold, #b8860b);
            transition: all 0.3s ease;
        }
        .mastermind-link:hover {
            background: var(--color-gold, #b8860b);
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(184, 134, 11, 0.4);
            color: #fff !important;
            font-weight: 700;
        }

        /* Subscribe Link */
        .subscribe-link {
            background: transparent;
            border: 2px solid var(--color-gold, #b8860b);
            transition: all 0.3s ease;
        }
        .subscribe-link:hover {
            background: var(--color-gold, #b8860b);
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(184, 134, 11, 0.4);
            color: #fff !important;
            font-weight: 700;
        }

        /* Social Profiles Section */
        .social-profiles {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .social-label {
            color: #fff;
            font-size: 12px;
            font-weight: 700;
        }
        .social-icons {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            color: #fff;
            transition: all 0.2s;
        }
        .social-icon:hover {
            background: var(--color-gold, #b8860b);
            transform: scale(1.1);
        }
        .social-icon svg {
            fill: currentColor;
        }

        /* Right Icons */
        .header-right-icons {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        /* Cart Link */
        .cart-link {
            position: relative;
        }
        .cart-count {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #dc2626;
            color: #fff;
            font-size: 10px;
            font-weight: 700;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* User Menu */
        .user-menu-wrapper {
            position: relative;
        }
        .user-dropdown {
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 8px;
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15);
            min-width: 200px;
            overflow: hidden;
            z-index: 10000;
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
        .dropdown-menu-list {
            list-style: none;
            margin: 0;
            padding: 8px 0;
        }
        .dropdown-menu-list li {
            margin: 0;
        }
        .dropdown-menu-list a {
            display: block;
            padding: 10px 16px;
            color: #374151;
            text-decoration: none;
            font-size: 14px;
            transition: background 0.2s;
        }
        .dropdown-menu-list a:hover {
            background: #f3f4f6;
            color: var(--color-gold, #b8860b);
        }
        .dropdown-menu-list li.logout-item a {
            color: #dc2626;
            border-top: 1px solid #e5e7eb;
            margin-top: 8px;
            padding-top: 12px;
        }
        .dropdown-menu-list li.logout-item a:hover {
            background: #fef2f2;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .secondary-header-inner {
                justify-content: center;
            }
            .social-label {
                display: none;
            }
            .header-icon-link span {
                display: none;
            }
            .header-icon-link {
                padding: 8px;
            }
            .mastermind-link span {
                display: inline;
            }
        }
    </style>

    <script>
        function toggleUserMenu() {
            var dropdown = document.getElementById('user-dropdown');
            dropdown.classList.toggle('active');
        }
        document.addEventListener('click', function(e) {
            var wrapper = document.querySelector('.user-menu-wrapper');
            var dropdown = document.getElementById('user-dropdown');
            if (wrapper && dropdown && !wrapper.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    </script>
    <?php
}

function askstephen_custom_footer() {
    ?>
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
            <div>
                <h3 class="text-xl font-semibold text-yellow-500 mb-3" style="color: var(--color-gold);">Contact</h3>
                <p class="text-sm">
                    4780 Ashford Dunwoody Road, Suite A 540 PMB #296<br>
                    Atlanta, GA 30338-5504<br>
                    <a href="mailto:info@askstephen.ai" class="hover:underline" style="color: var(--color-gold);">info@askstephen.ai</a><br>
                    (404) 434-0179
                </p>
            </div>
            <div>
                <h3 class="text-xl font-semibold mb-3" style="color: var(--color-gold);">Quick Links</h3>
                <ul class="space-y-2">
                    <li><a href="/about/" class="hover:text-yellow-400">About</a></li>
                    <li><a href="/mastermind/" class="hover:text-yellow-400">Mastermind</a></li>
                    <li><a href="/books/" class="hover:text-yellow-400">Books</a></li>
                    <li><a href="/privacy/" class="hover:text-yellow-400">Privacy Policy</a></li>
                    <li><a href="/terms/" class="hover:text-yellow-400">Terms</a></li>
                </ul>
            </div>
            <div>
                <h3 class="text-xl font-semibold mb-3" style="color: var(--color-gold);">Services</h3>
                <ul class="space-y-2">
                    <li><a href="/checkout/?add-to-cart=1861" class="hover:text-yellow-400">Initial Session - Stephen</a></li>
                    <li><a href="/checkout/?add-to-cart=1862" class="hover:text-yellow-400">Initial Session - Dr. Van</a></li>
                    <li><a href="/checkout/?add-to-cart=1861" class="hover:text-yellow-400">Consulting Hours</a></li>
                    <li><a href="/checkout/?add-to-cart=1863" class="hover:text-yellow-400">AI Automation Development</a></li>
                </ul>
            </div>
            <div>
                <h3 class="text-xl font-semibold mb-3" style="color: var(--color-gold);">Connect</h3>
                <div class="flex space-x-4 text-2xl mb-4" style="color: var(--color-gold);">
                    <a href="https://facebook.com/groups/askstephenai" target="_blank" class="hover:opacity-80"><i class="fab fa-facebook"></i></a>
                    <a href="https://linkedin.com/company/askstephenai" target="_blank" class="hover:opacity-80"><i class="fab fa-linkedin"></i></a>
                    <a href="https://youtube.com/@askstephenai" target="_blank" class="hover:opacity-80"><i class="fab fa-youtube"></i></a>
                    <a href="https://instagram.com/askstephenai" target="_blank" class="hover:opacity-80"><i class="fab fa-instagram"></i></a>
                    <a href="https://x.com/askstephenai" target="_blank" class="hover:opacity-80"><i class="fab fa-x-twitter"></i></a>
                </div>
            </div>
        </div>
        <div class="mt-12 text-center text-sm text-gray-500">
            &copy; <?php echo date('Y'); ?> AskStephen.ai — New View Innovation Financial &amp; 3A Automation Authority.
        </div>
    </footer>
    <?php
}

// Enqueue Font Awesome for social icons
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script('font-awesome', 'https://kit.fontawesome.com/a076d05399.js', [], null, true);
});
