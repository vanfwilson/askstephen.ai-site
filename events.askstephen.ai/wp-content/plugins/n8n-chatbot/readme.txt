=== n8n chatbot - Chatics ===
Contributors: aethonic
Tags: chatbot, n8n, automation, ai, floating chat
Requires at least: 5.5
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add a customizable AI chatbot widget to your WordPress site that connects to your n8n workflow via webhook. Fully configurable and flexible.

== Description ==

**Chatics for WP** allows you to embed a beautiful and customizable chat widget on your WordPress website. This chat widget connects directly to your **n8n workflows** through public webhooks, enabling AI chat agents, automation bots, or any conversational logic you build in n8n.

Perfect for:
- AI-powered customer support chat
- Automation-driven assistants
- Chat widgets powered by OpenAI/GPT agents via n8n
- Lead capture & CRM integration (e.g., FluentCRM, Pabbly)
- Email automation
- Trigger external APIs
- Booking assistance via AI
- Workflow orchestration

✨ **Key Features**
- Embed any **public n8n webhook** into your site
- Upload custom **SVG or PNG** icon
- Customize **button position** (left or right)
- Set your own **chat title** and **widget color**
- Adjust **zoom level** of the chat iframe
- Use **WordPress media uploader** for icon selection
- Default fallback icon included
- Show chatbot only during selected days & working hours
- Clean, customizable, and easy to use
- Translation-ready (with .pot support)


== How to Get Your n8n Chat URL ==

1. Set up a workflow in n8n using the **Chat Trigger** node.
2. Connect it to an AI agent or OpenAI/GPT node.
3. Enable **"Make Chat Publicly Available"** in the trigger node.
4. Set mode to **"Hosted Chat"** (recommended).
5. Copy the Webhook URL and paste into plugin settings.


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/chatics` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Go to **Settings > Chatics**, configure your chat options.
4. Make sure your n8n webhook is set to "Public" or uses "Hosted Chat" mode.
5. Save your settings and your chatbot will appear on your site!


== Screenshots ==

1. Admin settings panel with full options.
2. Chat widget shown on the frontend (closed state).
3. Chat widget opened with full iframe interface.

== Frequently Asked Questions ==

= Does this plugin support n8n self-hosted? =
Yes. Just use your publicly accessible webhook URL.

= Can I use this without n8n? =
No. n8n is required to run the chatbot workflows.

= Is it translatable? =
Yes, we've included a `.pot` file. You can translate using Loco Translate or WPML.

= Can I trigger other actions? =
Absolutely. You can trigger email, webhook, APIs, CRM, Google Sheets, and more using n8n.


== Changelog ==
= 1.0.1 =
New: Full-Screen Mode added on the chatboat header
New: Chat Header show/hide option added
Fixed: Global Color Issue




= 1.0.0 =
* Initial release with full settings panel
* Widget color, title, icon, zoom, and position support
* SVG/PNG upload with WordPress media uploader
* Default icon fallback
* Clean and minimal frontend display

== Upgrade Notice ==

= 1.0.0 =
Initial stable release.
