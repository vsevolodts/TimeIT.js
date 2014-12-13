$('.timeit').each(function() { 
  
  var curDate = new Date();
  var startDate = oTime ($(this).data('start'));
  //$(this).after('start: '+new Date(startDate)+'<br>');
  
  var endDate = oTime ($(this).data('end'));
	//$(this).after('end: '+new Date(endDate)+'<br>');

  if( ( (startDate < endDate) && (startDate > curDate || endDate < curDate) )
    ||
    ( (startDate > endDate) &&  (startDate > curDate) && (endDate < curDate) )
    ) {  
      $(this).addClass('hidden');
    	    
  };
 $(this).append('<br>Start: '+new Date(startDate).toUTCString()+', End: '+new Date(endDate).toUTCString()+', NOW: '+ new Date(curDate).toUTCString());  
  /* Functions */  
  function oTime (t) {
    t = t || 'invalid date';

    
    if ( t == 'invalid date') {
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