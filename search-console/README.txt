Google Search Console URL lists for pre-deploy checks
======================================================

Export each GSC issue from Pages → Why pages aren't indexed → Export,
then save ONE URL PER LINE as .txt files in this folder:

  Server_error_(5xx).txt
  Page_with_redirect.txt
  Soft_404.txt
  Not_found_(404).txt
  Duplicate_without_user_selected_canonical.txt
  Crawled_currently_not_indexed.txt

Lines starting with # are ignored. Legacy .csv exports also work.

Run all checks (canonical, hreflang, every GSC category):

  npm run build && npm run start
  npm run check:pre-deploy

Local dev server:

  npm run check:pre-deploy -- http://localhost:3000

Before production (includes nginx 4xx check):

  npm run check:pre-deploy:prod

Staging without nginx check:

  npm run check:pre-deploy -- http://localhost:3000 --skip-prod-only

GSC issue mapping
-----------------
  Alternate page with proper canonical  →  section 1 (sitemap canonical)
  Server error (5xx)                    →  section 3
  Crawled - currently not indexed       →  section 8
  Page with redirect                    →  section 4
  Soft 404                              →  section 5
  Not found (404)                       →  section 6
  Duplicate without user-selected canon →  section 7
  Blocked due to other 4xx              →  section 9 (production nginx only)
  Hreflang / locale alternates          →  section 2

After deploy: GSC → each issue → Validate fix.
