# AskStephen.ai Website

Business coaching and consulting website for Stephen E. Wright featuring the **Pick One Strategy** methodology.

## Overview

- **Main Site:** askstephen.ai
- **Platform:** WordPress + WooCommerce
- **Theme:** Neve (customized)

## Products

- Pick One Book (Digital) - $19
- Pick One Book + Workbook Package - $39
- Pick One Strategy Professional Course - $1,250
- Consulting Sessions - $250
- Mastermind Membership - $800/mo

## Directory Structure

```
/
├── wp-content/
│   ├── themes/neve/          # Customized Neve theme
│   ├── plugins/              # WordPress plugins
│   └── uploads/              # Media files and images
├── landingpage/              # Pick One landing page funnel
├── database_backups/         # SQL dumps
│   ├── askstephen_wp_data_dump.sql    # Full database dump (~41MB)
│   └── askstephen_wp_schema.sql       # Schema only (~272KB)
└── courses.askstephen.ai/    # Course subdomain (LearnDash)
```

## Landing Page Funnel

The Pick One landing page includes:
- Main landing page (lp-pick-one)
- Course upsell page (lp-course)
- Consulting page (lp-consulting)
- Mastermind page (lp-mastermind)
- Thank you pages with upsell flows

## Database

- **Database:** askstephen_wp
- **Table Prefix:** FzNj9tB_
- **Backups:** Located in `/database_backups/`

## Deployment

This is a cPanel-hosted WordPress site. Database credentials are in `wp-config.php` (not included in repo for security).

## Branch Info

- **vans-ai:** Full site backup as of January 2026
