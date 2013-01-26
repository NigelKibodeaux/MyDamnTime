<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <title>My Damn Time</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
	<link rel="icon" href="/favicon.png" sizes="16x16" type="image/png">
	<link rel="icon" href="/favicon32.png" sizes="32x32" type="image/png">
	<link rel="icon" href="/favicon48.png" sizes="48x48" type="image/png">
    <link rel="stylesheet" href="TimeTracker/main.css">
    <style>
        body { background-color:black; }
        #main { 
            width: 600px; 
            margin: 0px auto; 
            text-align: left; 
            background-color: white; 
            padding: 1px 20px;
            -moz-border-radius: 5px; 
            -webkit-border-radius: 5px;
            border-radius: 5px;
        }
        h1 { 
            text-align:center; 
            color: white;
            font-size: 50px;
        }
        h3 {    
            background-color: #333;
            padding: 4px;
            margin: 10px 100px;
            -moz-border-radius: 5px; 
            -webkit-border-radius: 5px;
            border-radius: 5px;
            text-align: center;
        }
        a h3 { 
			color: white; 
			text-decoration: none;
		}
        li {
            margin: 10px 0px;
        }
        #contact, #contact a {
            text-align: center;
            color: white;
            margin-top: 30px;
        }
    </style>

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
    <h1>Damn Simple Timekeeping</h1>

    <div id="main">
        <h2><a href="TimeTracker">Track the time</a> you spend on various projects during your day.</h2>
        <p><b>Useful</b> for people who need to bill by the hour (lawyers, freelancers, consultants, etc.).</p>
        <p><b>Don't sign up!</b> Just start using it.  It's free!</p>
    
        <a href="TimeTracker"><h3>Use it now</h3></a>
    
        <h2>Usage</h2>
        <ol>
            <li>Type the name of a project in the Project box.  The current time is automatically filled in.  If you need to edit that time, go for it.</li>
            <li>Type a description of how you spent your time, if you need to keep track of that.</li>
            <li>Do your work. Close the browser tab/window if you want - no save necessary. The next time you open the page, you'll be right back where you left off.</li>
            <li>When you switch from that project, enter the project you are switching to on the next line.  The elapsed time is calculated.  If you're done for the day or taking a break, just leave the Project box blank.  Lines with blank projects aren't counted against the total.</li>
            <li>Repeat as necessary</li>
            <li>When it comes time to take stock of what you've done and record it permanently, shift your gaze downward to the Summary section.  There are a few levels of detail available here.  You can copy and paste from this section if you'd like.  Data exporting options will be made available according to user demand.</li>
        </ol>
    
        <a href="TimeTracker"><h3>Use it now</h3></a>
    
        <h2>Random Info</h2>
        <p><b>Fast</b> because all data is stored on your computer.</p>
        <p>You can use it on your computer or <b>iPhone</b>.</p>
    </div>
    
    <div id="contact"><a href="http://plaidweb.com">contact</a></div>
    
</body>
</html>