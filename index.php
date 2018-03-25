<?php

require_once './functions.php';

setupEncodeing();
$token = setToken();


?>




<?=htmlHeader("Top")?>

<script type="text/javascript" src="script_index.js"></script>

</head>

<body>

  <?=htmlNavbar()?>
  <div class="container">

    <div class="bs-docs-section">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-header">
            <h1 id="type">一夜人狼</h1>
          </div>
        </div>
      </div>

      <!-- Headings -->

      <div class="row">
        <div class="col-lg-12">
          <div class="bs-example">
            <p class="lead">
              端末一台で遊べるワンナイト人狼です。<br /> ゲームの拡張性の特化を意識してみました。<br /> よく考えないとゲームバランスが崩れてしまいますがオリジナルなルールの人狼で楽しんで下さい。<br />
              <!--             オリジナルのカードも用意しております。<br />-->
            </p>
          </div>
        </div>
      </div>
    </div>



    <div class="bs-docs-section">
      <div class="row">
        <div class="col-lg-6">
          <div class="well">
            <form class="bs-example form-horizontal" method="POST" action="./game.php?erp">
              <fieldset>
                <legend>ゲーム作成</legend>
                <div class="form-group">
                  <label for="inputName" class="col-lg-2 control-label">村名</label>
                  <div class="col-lg-10">
                    <input type="text" class="form-control" id="name" name="name_village" placeholder="Name">
                  </div>
                </div>

                <div class="form-group form-player">
                  <label for="inputMembername" class="col-lg-2 control-label">メンバー</label>
                  <div class="col-lg-8">
                    <input type="text" class="form-control" name="name_member_1" placeholder="Member1">
                  </div>
                </div>
                <div class="form-group form-player">
                  <div class="col-lg-8 col-lg-offset-2">
                    <input type="text" class="form-control" name="name_member_2" placeholder="Member2">
                  </div>
                </div>
                <div class="form-group form-player">
                  <div class="col-lg-8 col-lg-offset-2">
                    <input type="text" class="form-control" name="name_member_3" placeholder="Member3">
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-lg-8 col-lg-offset-2">
                    <button type="button" id="btn-del-player" class="btn btn-default">消去</button>
                    <button type="button" id="btn-inc-player" class="btn btn-default">追加</button>
                  </div>
                </div>

                <div class="form-group form-rest">
                  <label for="inputRestCardNum" class="col-lg-2 control-label">あまりの数</label>
                  <div class="col-lg-8">
                    <input id="input-rest-card" type="number" class="form-control" name="rest-card-num" value="2" min="0" max="5">
                  </div>
                </div>


                <div class="form-group">
                  <label for="inputMembername" class="col-lg-5 control-label">配役(<span id="num_palyer">3</span>人+<span id="num_rest">2</span>枚でのゲーム)
                  </label>
                  <div class="col-lg-8">
                    <button type="button" id="btn-reposit" class="btn btn-default">デフォルト</button>
                  </div>
                  <div class="col-lg-12 card-box card-box-use"></div>


                  <div class="well">
                    <div class="col-lg-12 card-box">
                      <button type="button" kind="v" class="btn btn-primary col-lg-2 btn-add">
                        <span class="card-name">村人</span>
                      </button>
                      <button type="button" kind="u" class="btn btn-primary col-lg-2 btn-add">
                        <span class="card-name">占師</span>
                      </button>
                      <button type="button" kind="p" class="btn btn-primary col-lg-2 btn-add">
                        <span class="card-name">怪盗</span>
                      </button>
                      <button type="button" kind="w" class="btn btn-primary col-lg-2 btn-add">
                        <span class="card-name">人狼</span>
                      </button>
                      <button type="button" kind="i" class="btn btn-primary col-lg-2 btn-add">
                        <span class="card-name">狂人</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div id="input-kinds-div" class="form-group">
                  <label for="inputKinds" class="col-lg-2 control-label">テキスト指定</label>
                  <div class="col-lg-8">
                    <input type="text" class="form-control" name="kind" id="kind-box" />
                    <p>
                      文字列で配役を指定することも出来ます.<br /> 村人(v),占師(u),人狼(w),怪盗(p)
                    </p>
                  </div>
                </div>
                <input type="hidden" name="token" value="<?=$token?>" />

                <div class="form-group">
                  <div class="col-lg-8 col-lg-offset-2">
                    <button type="submit" class="btn btn-primary btn-block">スタート</button>
                  </div>
                </div>

              </fieldset>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</body>
