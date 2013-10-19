<?php
/**
 * User: pwanwu
 * Date: 26/09/2013
 * Time: 15:13
 */

   $json = $_POST['json'];
   $info = json_encode($json);

   $file = fopen('//assets/js/questions.json','w+');
   fwrite($file, $info);
   fclose($file);
?>

<?php

$user = "bross";
$first = "Bob";
$last = "Ross";

$file = "list.txt";

$json = json_decode(file_get_contents($file), true);

$json[$user] = array("first" => $first, "last" => $last);

file_put_contents($file, json_encode($json));

?>