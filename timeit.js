$(function() {
  $('.timeit').each(function() {

    //check if date or time value has valid format
    if ($(this).data('end')) {
      checkdate('end', this);
    };
    if ($(this).data('start')) {
      checkdate('start', this);
    };

    //check if the evend outside of desired timespan
    var curDate = new Date();
    var startDate = roundDate(oTime($(this).data('start')));
    var endDate = roundDate(oTime($(this).data('end')));
    if (((startDate < endDate) && (startDate > curDate || endDate < curDate)) ||
      ((startDate > endDate) && (startDate >= curDate) && (endDate <= curDate))
    ) {
      $(this).addClass('hidden');
    };

    function checkdate(d, t) {
      //check if the value is valid time (not a date)
      var time = $(t).data(d);      
      var res = time.split(":");
      var h = res.slice(0, 1),
        m = res.slice(1),
        re = /\d:\d/g,
        tt = re.test(time);
      if (h < 25 && m < 61 && tt) {
        var timetest = true;
      }

      //check if date is valid (avoid valid time)
      var cd = new Date($(t).data(d));
      if (cd == 'Invalid Date' && !timetest) {
       //highlight the element if the is an error. use own .error class if needed
        $(t).addClass("error").attr("title", d + " date is incorrect; please use YYYY-MM-DD HH:MM format");
      };
    };

    //round time to avoid errors 
    function roundDate(t) {
      if (Math.abs(curDate.getTime() - t) < 10) {
        var t = curDate.getTime();
      };
      return t;
    };

    function oTime(t) {
      t = t || 'invalid date';
      if (t == 'invalid date') {
        var oDate = new Date();
      } else {
        var oDate = new Date(t);
        if (!Date.parse(oDate)) {
          var oDate = new Date();
        }
        oDate.setHours(
          parseInt(t.substr(0, 2), 10),
          parseInt(t.substr(3, 2), 10),
          0,
          0
        );
      };
      var callback = oDate.getTime();
      return callback;
    };
  });

});
