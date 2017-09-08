TimeIT.js
=========

jQuery plugin to display content on / before / after / during certain date/time

When to use
===========
Use if you need to display content on a static page after or before a date.

Update: 7/24/2015
-----------------
- User input veryfication is added to the full version. 
- The.error class is added if date/time is entered incorrect. 
- Time/date builder is added on the plugin page: http://codegen.in/timeit/#build

Update: 12/07/2016
-----------------
- code refactored: less functions, more comments
- the script will loop through all the timestamps and define if a page refresh will be needed during the display. The minimal time frame for refresh is 1 minute.
Example: A user opens a page 5 minutes before a content should become unavaialbe. The page will be refreshed (without full reloading) on the exact time.

Update: 13 Aug 2017
-----------------
Bug fixed for Internet Explorer unable to create a date from a YYYY-MM-DD string.