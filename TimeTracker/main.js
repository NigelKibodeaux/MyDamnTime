var displayedRecordsIndex;
var thisIsAnIphone = false;
var arDates = new Array();
var calculateTimer;
var prefs = new Object();

function init()
{
    if(!localStorage)
        alert('Sorry, your browser is not supported');
    
    if(thisIsAnIphone)
        iPhoneInit();
    //else
        $('td.project input').keyup(autocomplete);
   
    // Load prefs
    loadPrefs();
    
    // Check for other currently open tabs
    if(prefs.stillOpen)
    {
        st = "You either have another time tracking tab open or your "
             + "browser did not finish the page unload process correctly. "
             + "Be careful you don't enter time in two windows simultaneously";
        alert(st);
    }
    else // And set that there is a currently open tab
    {
        prefs.stillOpen = true;
        localStorage.setItem('prefs', JSON.stringify(prefs));
    }
    
    // set event handlers
    $('#entries input').keyup(calculateDelayed);
    
    $('td.time input').mouseup(function(){return false});
    $('td.time input').focus(handleTimeInputFocus);
    
    $('td.project input').focus(handleProjectOrDescriptionInputFocus);
    $('td.description input').focus(handleProjectOrDescriptionInputFocus);
    
    $('input:radio[name=comments]').change(function() {
        calculate();
        prefs.summary = $(this).val();
        localStorage.setItem('prefs', JSON.stringify(prefs));
    });
    

    // Save changes if the user leaves the page.
    window.onbeforeunload = function () 
    {
        prefs.stillOpen = false;
        localStorage.setItem('prefs', JSON.stringify(prefs));
        
        /*
        if(data = localStorage.getItem(getCurrentDate()))
        {
            $.ajax({
                url: "savePage.php", 
                data: {stuff: data}, 
                async: false,
                cache: false,
                type: "POST",
                dataType: "json",
                success: handleSuccess,
                error: handleFailure
                });
        }
        
        function handleSuccess(returnedData)
        {
            if(crc32(data) != returnedData.checksum)
            {
                alert("local:\n" + data + "\n" + crc32(data) + "\n\n" + "remote:\n" + returnedData.stuff + "\n" + returnedData.checksum);
            }
            else
                alert('match!');
        }
        
        function handleFailure(xhr, textStatus, errorThrown)
        {
            alert(xhr);
            alert(textStatus);
            alert(errorThrown);
        }
        */
    };
            
    // Create date navigation  
    for(i=0; i<localStorage.length; i++)
    {
        if(localStorage.key(i) != 'prefs')
            arDates.push(localStorage.key(i)) 
    }
    
    if($.inArray(getCurrentDate(), arDates) < 0)
        arDates.push(getCurrentDate());
        
    arDates.sort();
    
    $('#displayedRecordsDate').text(getCurrentDate());
    
    // restore today's records, if any
    displayedRecordsIndex = $.inArray(getCurrentDate(), arDates);
    loadData2(getCurrentDate());
    
    // some things that need to happen every 5 seconds
    setInterval(every5Seconds, 5000);
    
    // create date picker for inserting a missing day
    $('#datePicker').datepicker({
       onSelect: function(dateText, inst) { 
           toggleTools();
           insertMissingDate(dateText); 
       },
       dateFormat: 'yy-mm-dd'
    });
}
$(document).ready(init);

function loadPrefs()
{
    if(localStorage.getItem('prefs'))
    {
        prefs = JSON.parse(localStorage.getItem('prefs'));
    }
    else // load defaults
    {
        prefs.summary = 'grouped';
        prefs.stillOpen = false;
    }

    // Set summary style
    $('input#'+prefs.summary).attr('checked','checked');
}

function every5Seconds()
{
    // Check for new day
    if($.inArray(getCurrentDate(), arDates) < 0) 
    {
        arDates.push(getCurrentDate());
        $('#forward').show();
    } 
    
    // Record that this thing is open
    prefs.stillOpen = true;
    localStorage.setItem('prefs', JSON.stringify(prefs));
}

function back()
{
    //saveData2();
    loadData2(arDates[displayedRecordsIndex-1]);
}

function forward()
{
    //saveData2();
    loadData2(arDates[displayedRecordsIndex+1]);
}

function loadData2(date)
{   
    displayedRecordsIndex = $.inArray(date, arDates);
	var dateString = date.split('-')
	var dateText = getDayOfWeek(parseDate(date)) + '<br/>' + date
    $('#displayedRecordsDate').html(dateText);

    $('#entries tbody tr.entries:not(:last)').remove();
    
    if(localStorage.getItem(date))
    {
        arDate = null;
        
        try
        {
            arData = JSON.parse(localStorage.getItem(date));
        }
        catch(e)
        {
            try
            {
                arData = eval(localStorage.getItem(date));
            }
            catch(e)
            {
                alert('Sorry! Error loading this data:\n\n' + localStorage.getItem(date));
            }
        }
    
        for(i=0; i < arData.length; i++)
        {
            if(!$('#entries input')[i])
                addRow();
            
            $('#entries input')[i].value = arData[i];
        }
    }
        
    calculate();
    
    // show/hide navigation appropriately
    $('#back').hide();
    $('#forward').hide();
    
    if(arDates[displayedRecordsIndex - 1])
        $('#back').show();
        
    if(arDates[displayedRecordsIndex + 1])
        $('#forward').show();
}

function calculateDelayed()
{    
    if(calculateTimer)
        clearTimeout(calculateTimer);
        
    calculateTimer = setTimeout('calculate()', 250);
}

function calculate()
{
    $('td.elapsed').text('');
    arRows = $('td.time input');
  
    arRows.each(
        function(index, item){
            // calculate time elapsed
            if(arRows[index + 1] && arRows[index + 1].value && arRows[index].value) 
            {
                elapsed = elapsedTime(item.value, arRows[index + 1].value);

                $('td.elapsed:eq('+index+')').text(elapsed);
                $('td.elapsed:eq('+index+')').removeClass('break');
                $('td.project:eq('+index+') input').css('backgroundColor', '#FFF');
                $('td.description:eq('+index+') input').css('backgroundColor', '#FFF');
                
                if($('td.project input:eq('+index+')').val() == '')
                {
                    $('td.elapsed:eq('+index+')').addClass('break');
                    $('td.project:eq('+index+') input').css('backgroundColor', '#DDD');
                    $('td.description:eq('+index+') input').css('backgroundColor', '#DDD');
                }
            }
        }
    );
  
  
    // set the total time
    var total = 0;

    $('td.elapsed:not(.break)').each(
        function(i){
            if($(this).html())
                total = addTime(total, $(this).html());
        });
    
    $('#total').html(total);
    
    calculateProjectTotals();
    saveData2();
    
    // add row if necessary
    if($('td.time:last input').val() != '')
        addRow();
}

function calculateProjectTotals()
{
    arTotals = new Object();
    arDescriptions = new Object();
    detailType = $('input:radio[name=comments]:checked').val();

    $('td.project input').each(function(i){
        projectName = this.value
        if(projectName)
        {
            arTotals[projectName] = addTime(arTotals[projectName],$('td.elapsed:eq('+i+')').html());
            
            if(detailType == 'grouped' && $('td.description:eq('+i+') input').val())
            {
                arDescriptions[projectName] = (arDescriptions[projectName]?arDescriptions[projectName]+'\n':'') 
                        + '<li>' + $('td.description:eq('+i+') input').val() + '</li>';
            }
                
            if(detailType == 'detailed')
            {
                arDescriptions[projectName] = (arDescriptions[projectName]?arDescriptions[projectName]+'\n':'') 
                        + '<li>'
                        + ($('td.elapsed:eq('+i+')').html()=='' ? '0:00' : $('td.elapsed:eq('+i+')').html()) + ' - '
                        + $('td.description:eq('+i+') input').val()
                        + '</li>';
            }
        }
    });
  
    $('#results tbody').html('');

    for(i in arTotals)
    {
        $('#results tbody').append('<tr><td class="project">' + i + '</td><td class="totalTime">' + arTotals[i] + '</td></tr>');
        
        if(detailType != 'none')
            $('#results tbody').append('<tr><td colspan="2"><ul>' + (arDescriptions[i]?arDescriptions[i]:'') + '</ul></td></tr>');
    }
}

function addRow(placeholder)
{
    var blankRow = $('#entries tr.entries:last').clone(true);
    $('input', blankRow).val('');
    $('td.elapsed', blankRow).text('');
    
    if(placeholder != undefined)
        placeholder.replaceWith(blankRow);
    else
        $('#entries tr:last').before(blankRow);
    
    // show all delete buttons but the last
    $('table#entries a').show();
    $('table#entries a:last').hide();
}

function addInsertionPlaceholderRows()
{
    $('#entries tr').each(function(index, element){
        if( $('input',$(element)).length > 0 && $('td.time input', $(element)).val() != '' )
            $(this).before('<tr class="entries insert"><td colspan="5"><span onclick="insertRowHere(this)">insert row here</span></td></tr>');
    });
}

function insertRowHere(link)
{
    // replace this row with a normal one
    addRow($(link).closest('tr'));

    // delete all others
    $('#entries tr.insert').remove();
}

function deleteRow(link)
{
    if(confirm('Delete this row?'))
    {
        $(link).parent().parent().remove();
        calculate();
    }
}

function handleTimeInputFocus()
{   
    // insert current time if blank
    if(this.value == '')
    {
        this.value = getCurrentTime();
        this.select();
        calculate();
    }
}

function handleProjectOrDescriptionInputFocus()
{
    // fill in corresponding time if blank
    parentRow = $(this).parent().parent();
    correspondingTime = $('input:first', parentRow);
    
    if(correspondingTime.val() == '')
    {
        correspondingTime.val(getCurrentTime());
        calculate();
    }
}

function saveData2()
{
    var arInputs = new Array(); 
    $('#entries input').each(function(){arInputs.push(this.value)});
    
    // trim empties from the end
    var i=arInputs.length - 1;
    while(i>=0 && arInputs[i] == '')
    {
        arInputs.pop();
        i--;
    }
    
    if(arInputs.length > 0)
    {
        string = JSON.stringify(arInputs);
        localStorage.setItem(arDates[displayedRecordsIndex], string);
    }
    else
    {
        localStorage.removeItem(arDates[displayedRecordsIndex]);
    }
}

function autocomplete(e)
{
    element = this;
    if(element.value && e.which != 8 && e.which != 127) // 8 is backspace, 127 is iPhone backspace
    {
        $('td.project input').each(function(){
            if(this.value != element.value && this.value.indexOf(element.value) == 0)
            {
                start = element.value.length;
                end = this.value.length;
                
                element.value = this.value;
                element.selectionStart = start;
                element.selectionEnd = end;
                
                return false; // stop looping to not match on the replaced value
            }
        });
    }
}

function toggleDesc()
{
    $('div#tools, img.bottomButton').removeClass('toolsClicked');
    $('div#desc, img.bottomButton').toggleClass('infoClicked');
}
function toggleTools()
{
    $('div#desc, img.bottomButton').removeClass('infoClicked');
    $('div#tools, img.bottomButton').toggleClass('toolsClicked');
}

function insertMissingDate(stDate)
{
    if($.inArray(stDate, arDates) == -1)
    {
        arDates.push(stDate);
        arDates.sort();
    }
    
    loadData2(stDate);
}