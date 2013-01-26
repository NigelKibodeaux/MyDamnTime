<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html<? if(stristr($_SERVER['HTTP_USER_AGENT'],'iPhone')): ?> manifest="manifest.php"<? endif; ?>>
<head>
    <title><? if(stristr($_SERVER['HTTP_USER_AGENT'],'iPhone')): ?>MyDamnTime<? else: ?>My Damn Time<? endif; ?></title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
	<link rel="icon" href="/favicon.png" sizes="16x16" type="image/png">
	<link rel="icon" href="/favicon32.png" sizes="32x32" type="image/png">
	<link rel="icon" href="/favicon48.png" sizes="48x48" type="image/png">
    <link rel="stylesheet" href="main.css">
    <script>
      if(RegExp(" AppleWebKit/").test(navigator.userAgent) && RegExp(" Mobile/").test(navigator.userAgent))
          document.write('<link rel="stylesheet" href="mobile/iPhone.css">'); 
    </script>
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
    <meta name="apple-mobile-web-app-capable" content="YES">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="apple-touch-startup-image" href="mobile/Images/loading.png">
    <link rel="apple-touch-icon" href="mobile/Images/WebClipIcon.png"/>

<? if($_SERVER['HTTP_HOST'] == 'mydamntime.com'): ?>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-16975106-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
<? endif; ?>

</head>
<body>
    <table id="navigation">
        <tr>
            <td><a id="back" href="javascript:back()"><img src="Images/button-left.png" width="40" height="40" alt="Button Left" /></a></td>
            <td id="displayedRecordsDate"></td>
            <td><a id="forward" href="javascript:forward()"><img src="Images/button-right.png" width="40" height="40" alt="Button Right" /></a></td>
        </tr>
    </table>

    <table id="entries">
        <thead>
            <tr>
                <th></th>
                <th class="time">Start Time</th>
                <th class="project">Project</th>
                <th class="description">Description</th>
                <th class="elapsed">Elapsed Time</th>
            </tr>
        </thead>
        <tbody>
            <tr class="entries">
                <td><a onclick="deleteRow(this)"><img src="Images/delete.png"></a></td>
                <td class="time"><input type="text"></td>
                <td class="project"><input type="text"></td>
                <td class="description"><input type="text"></td>
                <td class="elapsed"></td>
            </tr>
            <tr class="total">
                <td id="total" colspan="5"></td>
            </tr>
        </tbody>
    </table>
    
<? if(FALSE && $_SERVER['HTTP_HOST'] == 'mydamntime.com'): ?>
    <script type="text/javascript"><!--
    branchr_client_id = '7iws3szrwzba78d4rg52l4z1cy';
    branchr_ad_width = 728;
    branchr_ad_height = 90;
    branchr_ad_format = 10;
    //--></script>
    <script type="text/javascript" src="http://static.branchr.com/serve.js?1248290004"></script>
<? endif; ?>

    <table id="results">
        <thead>
            <tr>
                <th colspan="2">Summary</th>
            </tr>
            <tr>
                <th id="options" colspan="2">
                  <b>Descriptions:</b>
                  <input id="none" type="radio" name="comments" value="none" checked="checked" /><label for="none">None</label>
                  <input id="grouped" type="radio" name="comments" value="grouped" /><label for="grouped">Grouped</label>
                  <input id="detailed" type="radio" name="comments" value="detailed" /><label for="detailed">Detailed</label>
                </th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    
    <div id="iphone_footer">
    </div>
    <img id="infoButton" class="bottomButton" src="Images/info.gif" onclick="toggleDesc();"/>
    <img id="toolsButton" class="bottomButton" src="Images/gear.png" onclick="toggleTools();"/>
    <div id="desc" class="slider">
        <ul>
            <li><p><b>How do I save?</b> There is no need to manually save.  Your data is saved with every keystroke.</p></li>
            <li><p><b>How do I end a task?</b> Enter a start time below it.  If it's the end of your day, leave the project and description blank.</p></li>
            <li><p><b>How do I enter a break?</b> Leave the project blank.  A start time with no project is not added to the total.</p></li>
            <li><p><b>Tip</b> There is an iPhone web application version of this.  Visit this page on your iPhone to use it.</p></li>
            <li><p><b>Tip</b> If you select the project field of a new row, the start time becomes the current time.</p></li>
            <li><p><b>Where is the data stored?</b>  The data is stored in your browser.  This makes the application very fast and eliminates the need to log in.</p></li>
        </ul>
    </div>
    <div id="tools" class="slider">
        <ul>
            <li id="insertRow">
                <b style="background-color: transparent;">&nbsp;</b>
                <b><a href="javascript:addInsertionPlaceholderRows();toggleTools();">Insert a missing row</a></b>
            </li>
            <li id="insertDay">
                <b>Insert a missing day</b> 
                <div id="datePicker"></div>
            </li>
        </ul>
    </div>
    <h2 id="iphone_warning">
      To use, tap the + below and add this application to your home screen.
    </h2>
<!--
    <div id="alert">
        Give me some fucking feedback
    </div>
-->
    <script type="text/javascript" src="jquery-1.4.2.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="main.js" charset="utf-8"></script>
    <script type="text/javascript" src="helper.js" charset="utf-8"></script>
    <script>
      if(RegExp(" AppleWebKit/").test(navigator.userAgent) && RegExp(" Mobile/").test(navigator.userAgent))
          document.write('<scr'+'ipt type="text/javascript" src="mobile/iPhone.js" charset="utf-8"></scr'+'ipt>');
    </script>
    <script type="text/javascript" src="jquery-ui-1.8.custom.min.js" charset="utf-8"></script>
    <link rel="stylesheet" href="jQueryUI_css/smoothness/jquery-ui-1.8.custom.css" type="text/css" media="screen" title="no title" charset="utf-8">
    
</body>
</html>