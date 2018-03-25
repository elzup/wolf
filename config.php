<?php

//define('db_url','my01.bfit.jp');
//define('db_user','elzzup');
//define('db_pass','a4dhn6s92hxxxjk8qanck2u85oglhdzo');
//define('db_name','elzzup');
//define('db_dsn', 'mysql:dbname='.db_name.";host=".db_url);


define('tw_consumer_key', 'jtMGAZnVxnPDfsgRJfdYhg');
define('tw_consumer_select', 'fNdMXD1Npdvb5SA6V3K3PBgtc2nImaFy0spI5Jx4');

define('tw_hashtag', '#');

define('site_url','https://wolf.elzup.com/');
define('site_name', 'ワンナイト');
define('site_title_end', '- ワンナイト');
define('pass_key','ei5!!aca');




if (isset($_GET['erp'])) {
    ini_set('display_errors', "1");
    error_reporting(E_ALL);
} else {
    error_reporting(0);
}

?>
