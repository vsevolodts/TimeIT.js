function timeit() {
  var next_run_array = []; //array of dates/time on a page used to rerun function if a change should happen during the session
  var curDate = new Date();
  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    return [this.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
  };
  var curDateYMD = curDate.yyyymmdd();

  $('.timeit').each(function() {
    var end = $(this).data('end'),
      start = $(this).data('start');
    //check if date or time value has valid format and push it to the list of refresh anchors
    var startDate = checkdate(start, this);
    var endDate = checkdate(end, this);
    nextrun(startDate);
    nextrun(endDate);
    
	//add a datetime when the page needs to be refreshed (now+24 hrs time span only)
    function nextrun(date) {
      var nextruntimeout = date - curDate;
      if (nextruntimeout < 1000 * 60 * 60 * 24 && nextruntimeout > 1000) {
        next_run_array.push(nextruntimeout);    
      }
    }

    // Main Function 
    //check if the evend outside of a desired time span
    if (((startDate < endDate) && (startDate > curDate || endDate < curDate)) ||
      ((startDate > endDate) && (startDate >= curDate) && (endDate <= curDate))
    ) {
      $(this).addClass('hidden');
    } else {
      $(this).removeClass('hidden');
    }

	//Support Functions
    function checkdate(date, obj) {
      if (date) {
        //check if only time is set; if so, add today's date to unify dates format
        if (String(date).length < 6 && String(date).indexOf(":") > -1) {
          date = curDateYMD + ' ' + String(date);
        }
        //check if only date is set; if so add 00:00 to the end of date
        if (String(date).indexOf(":") == -1) {
          date = date + ' 00:00';
        }
        //check if date is valid (avoid valid time)
        var res = date.split(":"),
          h = String(res.slice(0, 1)),
          hours = h.substr(h.length - 2),
          minutes = res.slice(1);
        var timetest = (hours < 24 && minutes < 60) ? true : false;

        if (new Date(date) == 'Invalid Date' || !timetest) {
          //highlight the element if the is an error. use own \.error class if needed
          $(obj).addClass("error").attr('title', '"' + date + '" date is incorrect; please use YYYY-MM-DD HH:MM format');
        }
        return new Date(date).getTime();
      } else {
        //if datetime is not set, just return current date-time
        return curDate.getTime();
      }
    }
  });

  /* Schedule next runs */
  if (next_run_array.length > 0) {  
    var nextruntime = Math.min.apply(null, next_run_array);
    console.log("next run of timeit function is in " +  nextruntime / 1000 + "seconds");
    setTimeout(function() {
      timeit();
    }, nextruntime);
  }
}
timeit();