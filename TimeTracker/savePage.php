<?php
require('passwords.php');

$link = mysql_connect($server, $user, $pass);
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db($db, $link);

mysql_close($link);
?>