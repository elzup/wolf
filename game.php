<?php

require_once './functions.php';

setupEncodeing();

$POSTS = $_POST;

$player = array();

if ($_SERVER['REQUEST_METHOD'] != 'POST'){
    echo "error: method";
}
else
{
    $token = checkToken();
    $text_kind = $_POST['kind'] or die('no kind');
    $num_r = $_POST['rest-card-num'] or die('no rest-num');

    $all_kind = str_split($text_kind);
    $rand_kind = $all_kind;
    shuffle($rand_kind);

    $num_p = count($rand_kind) - $num_r;
    //    echo "<" . $num_r . "," . $num_p . ">";

    $rest_cards = array();
    $player = array();

    for ($i = 0; $i < count($rand_kind); $i++) {
        if ($i < $num_p ) {
            $name = $_POST['name_member_'.($i + 1)]or die("no member");
            $player[$name] = $rand_kind[$i];
            setcookie('pn_'.$i, $name);
        } else {
            $rest_cards[] = $rand_kind[$i];
        }
    }
}


?>




<?=htmlHeader("Game")?>
<script type="text/javascript">

<?php

echo "var player_kind = [";
foreach ($player as $name => $kind)
    echo "'$kind',";
echo "];";

echo "var player_kind_aft = player_kind.concat();";

echo "var player_name = [";
foreach ($player as $name => $kind)
    echo "'$name',";
echo "];";

echo "var rest = [";
foreach ($rest_cards as $value)
    echo "'$value',";
echo "];";

echo "var allKind = [";
foreach ($all_kind as $value)
    echo "'$value',";
echo "];";

echo "var vote_res = [";
foreach ($all_kind as $value)
    echo "0,";
echo "];";

echo <<<EOF

console.log(player_kind);
console.log(player_name);
console.log(rest);
console.log(allKind);

EOF;

?>

</script>
<script type="text/javascript" src="./script_game.js"></script>
</head>

<body>

  <?=htmlNavbar()?>

  <div class="container">

    <div class="bs-docs-section">
      <div class="row">
        <div class="col-lg-12">
          <p id="text-player"></p>
        </div>
        <div id="player-list" class="col-lg-12 card-box">

          <?php
          $i = 0;
          foreach ($player as $name => $kind) {
        $i++;
        echo $e =<<<EOF

<button turn="$i" type="button" kind="{$kind}" class="btn btn-default btn-remove">
    <div id="card-div-$i" class="card card-{$kind} card-h"></div>
    <span class="card-name">{$name}</span>
</button>

<div id="mdl-{$i}" class="modal modal-check-first fade modal-fix" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: none;">
	<div class="modal-header">
		<h3 id="myModalLabel" class="mdl-head-text">夜のターンです</h3>
	</div>

	<div class="modal-body">
		<p>{$name}さんに変わって下さい</p>
	</div>

	<div class="modal-footer">
		<button index="$i" class="btn btn-check-ok">はい</button>
	</div>
</div>


<div id="mdl-check-{$i}" class="modal modal-check-second fade modal-fix" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: none;">
	<div class="modal-header">
		<h3 id="myModalLabel">本人確認</h3>
	</div>
	<div class="modal-body">
		<p>あなたは本当に{$name}さんですか？</p>
	</div>

	<div class="modal-footer">
		<button index="$i" class="btn btn-check-yes" data-dismiss="modal" aria-hidden="true">はい</button>
		<button class="btn btn-check-no"  data-dismiss="modal" aria-hidden="true">いいえ</button>
	</div>
</div>

EOF;
}

?>

        </div>

        <div id="player-list" class="col-lg-12 card-box">
          あまり
          <?php
          foreach ($rest_cards as $key => $kind) {
$ks = kindtostr($kind);
echo $e =<<<EOF

<button turn="none" type="button" kind="{$kind}" class="btn btn-default btn-remove">
    <div id="card-div-rest-$key" class="card card-{$kind} card-h"></div>
    <span class="card-name">{$ks}</span>
</button>
EOF;





        }


        echo $e =<<<EOF

<div id="mdl-vote" class="modal modal-vote fade modal-fix" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: none;">
	<div class="modal-header">
		<h3 id="myModalLabel"><span id="vote-owner"></span></h3>
	</div>
	<div class="modal-body">
		<p>怪しい人物に投票して下さい</p>
EOF;

        $i = 0;
        foreach ($player as $name => $kind) {
        $i++;
        echo $e =<<<EOF
<button index="$i" class="btn btn-vote" data-dismiss="modal" aria-hidden="true">$name</button>
EOF;
        }

        echo $e =<<<EOF
</div>

	<div class="modal-footer">
</div>

EOF;

        ?>
        </div>

      </div>



      <div class="col-lg-12">
        <p id="text-player-sub"></p>
      </div>

      <p>
        <span class="txt-first">恐ろしい夜がやってきました。<br />
        </span> 配役は[ <span id="txt-kinds"></span> ]です<br /> 山札は[ <span id="txt-rest-num"></span> ]枚です<br />
      </p>
      <button id="btn-start" type="button" class="btn btn-primary">夜の行動を開始する</button>
      <button id="btn-next" type="button" class="btn btn-primary">完了</button>
      <button id="btn-night-end" type="button" class="btn btn-primary">完了</button>
      <div id="hide-box">

        <?php
        $i = 0;
        foreach ($player as $name => $kind) {
        $i++;
        echo $e =<<<EOF

<input type="hidden" class="after-data" name="name_member_{$i}_k" value="$kind" />
<input type="hidden" class="after-data" name="name_member_{$i}_n" value="$name" />

EOF;
}
?>
      </div>
      <div id="win-w" class="alert alert-dismissable alert-danger">
        <!-- button type="button" class="close" data-dismiss="alert">×</button-->
        <strong>人狼側の勝利です</strong>
      </div>

      <div id="win-v" class="alert alert-dismissable alert-success">
        <!-- button type="button" class="close" data-dismiss="alert">×</button-->
        <strong>村人側の勝利です</strong>
      </div>

      <div id="discussion-timer" class="col-lg-12">
        <div id="timer" class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">議論時間</h3>
          </div>
          <div class="panel-body">
            <span id="timer-m"></span> 分 <span id="timer-s"></span> 秒<br>
            <input class="btn" type="button" value="＋１分" onclick="cntAdd()">
            <input class="btn" type="button" value="－１分" onclick="cntRemove()">
          </div>
        </div>
        <button id="btn-start-vote" type="button" class="btn btn-primary">投票を始める</button>
      </div>
    </div>
  </div>

  <form id="hidden-box" action="./game.php" method="POST">
    <?php
    foreach ($_POST as $k => $v) {
if ($k == 'token') $v = $token;
echo '<input type="hidden" class="" name="'.$k.'" value="'.$v.'" />';
}
?>
    <input id="retry" type="submit" class="btn btn-primary" value="同じ設定で遊ぶ" />
  </form>

</body>
</html>

