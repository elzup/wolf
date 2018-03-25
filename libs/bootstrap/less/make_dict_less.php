<?php


//抽出したい文字列の正規表現
define('regix_filter', '/^\.((:?\w|[-])+)/');
define('output_filename', 'bootstrap_less.dict');

$res_dir = opendir( '.' );
$self_name = basename($_SERVER['PHP_SELF']);
echo  $self_name

while( $file_name = readdir( $res_dir ) ){
//    if (preg_match('/(^\.)/', $file_name) || $self_name == $file_name) continue;
    if (!preg_match('/\.less$/', $file_name) || $self_name == $file_name) continue;
	$file_names[] = $file_name;
}


echo "<pre>";
print_r($file_names);


$dict = array();
foreach ($file_names as $file_name) {
    $file = file_get_contents($file_name);
    $file = preg_replace("/\r\n|\r|\n/", PHP_EOL, $file);
    $lines = preg_split('/'.PHP_EOL.'/', $file);
    foreach ($lines as $line) {
        if (preg_match(regix_filter, $line, $match)) {
            $dict[] = $match[1];
        }
    }
}
array_unique($dict);
print_r($dict);
$text = "";
foreach ($dict as $d)$text.= $d.PHP_EOL;

file_put_contents(output_filename, $text);

closedir( $res_dir);

?>

