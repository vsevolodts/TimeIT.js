TimeIT.js
=========

JavaScript utility to display content on / before / after / during certain date/time

When to use
===========
Use if you need to display content on a static page after or before a date.

Update: 7/24/2015
-----------------
- User input veryfication is added to the full version. 
- The.error class is added if date/time is entered incorrect. 

Update: 12/07/2016
-----------------
- code refactored: less functions, more comments
- the script will loop through all the timestamps and define if a page refresh will be needed during the display. The minimal time frame for refresh is 1 minute.
Example: A user opens a page 5 minutes before a content should become unavaialbe. The page will be refreshed (without full reloading) on the exact time.

Update: 13 Aug 2017
-----------------
Bug fixed for Internet Explorer unable to create a date from a YYYY-MM-DD string.

Update: 18 Mar 2026
-----------------
- Removed dependency on jQuery; plugin now works with plain vanilla JavaScript.
- ReUpdated `timeit.js` to use native DOM APIs (`querySelectorAll`, `classList`, `getAttribute`, etc.).
- Refactored `timeit.js` to modern ES6+ standards (arrow functions, `const`/`let`, modular helpers).
- Rewrote date parsing logic for improved reliability and consistent handling of time-only, date-only, and datetime inputs.
- Simplified and clarified visibility logic (including support for overnight time ranges).
- Replaced `.hidden` CSS class with native HTML `hidden` attribute for better semantics and accessibility.
- Removed manual `aria-hidden` handling (now implicitly managed by `hidden` attribute).
- Eliminated global mutable state; improved scheduling logic using functional patterns.
- Improved error handling with clearer validation and separation of concerns.
- Enhanced maintainability by splitting logic into pure utility functions (`parseDate`, `shouldHide`, etc.).
- Added more predictable and efficient re-run scheduling for future state updates.