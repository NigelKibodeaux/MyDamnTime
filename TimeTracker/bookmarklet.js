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

currentData = localStorage.getItem(getCurrentDate());
alert(currentData);