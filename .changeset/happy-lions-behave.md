---
"next-navigation-utils": minor
---

This release has many breaking change.
- Renamed hooks and utilites to match features they do better
- Rethink and rewrite from scrach the way links are being built to simplify their usage.
- Rewrite from scratch some function to have much better performence and reduce unnecessary calculations
- Make the separation between the passed URL and "route pathname + query string" to avoid the consfuse while building the links in the web application. Prepare for the strictly typed next.js routes
- Add memoization of the hooks and objects