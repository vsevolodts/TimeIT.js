TimeIT.js
=========

jQuery plugin to display content on / before / after / during certain date/time

When to use
===========
Use if you need to display content on a static page after or before a date.

Update: 7/24/2015
-----------------
User input veryfication is added to the full version. The.error class is added if date/time is entered incorrect. 
Time/date builder is added on the plugin page: http://codegen.in/timeit/#build

Update: 12/07/2016
-----------------
- code refactored: less functions, more comments
- the will loop through all the timestamps and define if an update will be needed. If so, the update will be delayed. The minimal time frame is 1 minute.
Example: A user opens a page 5 minutes till a content will become (un)avaialbe. The page will be updated without reloading on the exact time.