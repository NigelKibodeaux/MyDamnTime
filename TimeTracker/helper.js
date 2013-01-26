// HELPER FUNCTIONS HERE ///////////////////////////////////////////////
// these are all deterministic /////////////////////////////////////////
function elapsedTime(t1, t2)
{
  ph1 = parseTime(t1)[0];
  ph2 = parseTime(t2)[0];
  pm1 = parseTime(t1)[1];
  pm2 = parseTime(t2)[1];
  
  if(ph1 > ph2) ph2 = ph2 + 12;
  if(pm2 < pm1){
    pm2 = pm2 + 60;
    ph2 = ph2 - 1;
  }
  mdiff = pm2 - pm1;
  hdiff = (ph2 - ph1);
  
  // format the time  
  if(mdiff < 10)
    mdiff = '0' + mdiff;

  return hdiff + ':' + mdiff
}

function parseTime(input)
{
    h = 0;
    m = 0;

    if(input)
    {
        x = input.split(':');
        if(x[0])
            h = x[0];
        if(x[1])
            m = x[1];
    }
    
    return [parseInt(h,10),parseInt(m,10)];
}

function addTime(t1, t2)
{
  totalMinutes = 0;
  totalMinutes += parseTime(t1)[0] * 60;
  totalMinutes += parseTime(t1)[1];
  totalMinutes += parseTime(t2)[0] * 60;
  totalMinutes += parseTime(t2)[1];
    
  h = Math.floor(totalMinutes/60); 
  m = totalMinutes % 60;
  
  // format the time  
  if(m < 10)
    m = '0' + m;
  
  return h + ':' + m;
}

function getCurrentDate()
{
    d = new Date();
    
    month = parseInt(parseInt(d.getMonth())+parseInt(1));
    if(month < 10)
        month = '0' + month;
        
    day = d.getDate();
    if(day < 10)
        day = '0' + day;    
    
    return d.getFullYear()+'-'+ month +'-'+ day;    
}

function getCurrentTime()
{
    d = new Date();
        
    h = d.getHours();
    if(h > 12)
        h = h-12;
            
    m = d.getMinutes()
    if(m < 10)
        m = '0' + m
        
    return h + ':' + m;
}

function getDayOfWeek(date)
{
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return days[date.getDay()];
}

function parseDate(input) 
{
	var parts = input.match(/(\d+)/g);
	return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}