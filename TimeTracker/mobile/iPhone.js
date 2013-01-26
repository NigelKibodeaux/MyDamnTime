var thisIsAnIphone = true;

function iPhoneInit()
{    
    if (!window.navigator.standalone)
    {
        $('#iphone_warning').show();
    }
    else
    {
        $('#iphone_warning').hide();
        $('#iphone_footer').show();
        $('#navigation').show();
        //$('#info').show();
        window.onorientationchange = setupScreen;
        setupScreen();
    }
}

function setupScreen()
{
    if(window.orientation != 0)
    {
        $('table#entries').show();
        $('table#results').hide();  
        $('#iphone_footer').text('Rotate phone for summary');
    }
    else
    {
        $('table#entries').hide();
        $('table#results').show();   
        $('#iphone_footer').text('Rotate phone to enter time');     
    }
}