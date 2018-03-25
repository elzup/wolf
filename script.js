
/* --------------------------------------------------------- *
 *     startup
 * --------------------------------------------------------- */

var kinds = ['n'];
var num_c = 5;
var num_p = 3;

var num_r = 2;

var _num_p_min = 3;
var _num_p_max = 10;

var defaultKindsSet = ['','','','vvupw','vvupww','vvvupww','vvvupwwi','vvvuupwww','vvvvuupwwwi','vvvvuupwwwii','vvvvvuupwwwii'];
var defaultRestNum = [0,2,2,2,2,2,2,1,1,1,1];

//rmove card
var funcRC = function () {
    var i = $(this).index();
    kinds.splice(i, 1);
    $(this).remove();
    console.log('remove Card: ' + i);
    console.log('kinds: ' + kinds);
    updateKindBox();
}
//add card
var funcAC = function() {
    if(num_c == num_p + 2) return;
    var k = $(this).attr('kind');
    addCard(k);
    updateKindBox();
}


//add member
var funcAP = function() {
    if(num_p == _num_p_max) return;
    $('.form-player').last().after(createFormPlayer(++num_p));
    structFromStr(defaultKindsSet[num_p]);
}

//remove member
var funcRP = function() {
    if(num_p == _num_p_min) return;
    // ----------------- mi ----------------- //
    // ----------------- mi ----------------- //
    // ----------------- mi ----------------- //
    structFromStr(defaultKindsSet[num_p]);
}

//delete member
var funcDP = function() {
    if(num_p == _num_p_min) return;
    $('.form-player').last().remove();
    num_p--;
    $('span#num_player').html(num_p);
    structFromStr(defaultKindsSet[num_p]);
}

function addCard(k) {
    kinds.push(k);
    var text_kind = kinds.join('');

    structFromStr(text_kind);
//    $('.card-box-use').append(createPanelUse(k));
    console.log('add Card: ' + k + ":" + i);
    console.log('kinds: ' + kinds);

}


/* --------------------------------------------------------- *
 *     functions
 * --------------------------------------------------------- */


function structFromStr(str) {
    $('.card-box-use').children().remove();
    kinds.length = 0;
    kinds = str.split('');
    kinds.sort(function(a,b) {
        return kindtonum(a) > kindtonum(b);
    });
    console.log(kinds);
    for (var i = 0; i < kinds.length; i++) {
        $('.card-box-use').append(createPanelUse(kinds[i]));
    }
    $('.btn-remove').unbind('click');
    $('.btn-remove').click(funcRC);
    updateKindBox();
}

function updateKindBox() {
    var text_kind = kinds.join('');
    num_c = kinds.length;
    $('#kind-box').val(text_kind);
    console.log("updatedKindBox" + text_kind);
}

function setupButtonEvent() {
    $('.btn-add').click(funcAC);
    $('.btn-remove').click(funcRC);
    $('#btn-inc-player').click(funcAP);
    $('#btn-del-player').click(funcDP);
    $('#btn-reposit').click(function() {structFromStr(defaultKindsSet[num_p])});
}

function setupBoxEvent() {
    $('#kind-box').change(function() {
        var v = $(this).val();
        if (v.match(/^[vuwp]+$/)){
            structFromStr(v);
        } else {
            $("input-kinds-div").addClass("input-error");
        }
    });

    $('#input-rest-card').change(function() {
        num_r = $(this).val();
        $('span#num_rest').html(num_r);
    });
}

function createPanelUse(k) {
    var tag = '<button type="button" kind="' + k + '" class="btn btn-default col-lg-3 btn-remove">';
    tag += '<div class="card card-' + k + '"></div>';
    tag += '<span class="card-name">' + kindtostr(k) + '</span></button>';
    return tag;
}

function createFormPlayer(i) {
    var tag = '<div class="form-group form-player">';
    tag += '<div class="col-lg-8 col-lg-offset-2">';
    tag += '<input type="text" class="form-control" name="name_member_' + i + '" placeholder="Member' + i + '">';
    tag += '</div></div>';
    return tag;
}

function kindtostr(k) {
    switch(k) {
        case 'v': return '村人';
        case 'u': return '占師';
        case 'w': return '人狼';
        case 'p': return '怪盗';
        case 'i': return '狂人';
    }
}

function numtokind(n) {
    var lib = ['v', 'u', 'p', 'm', 'i'];
    if (n >= lib.length || n < 0) {
        console.log("error: numtokind");
    }
    return lib[n];
}

function kindtonum(n) {
    switch(n) {
        case 'v': return 0;
        case 'u': return 1;
        case 'p': return 2;
        case 'w': return 3;
        case 'i': return 4;
    }
}

function createPlayerText(name, kind) {
    var tx = createPlayerShow(name, kind);
    tx += createKindText(kind);
    return tx;
}


function createPlayerShow(name, kind) {
    return"<strong>" + name + "</strong> さんの役職は <strong>[" + kindtostr(kind) + "]</strong> です。<br>";
}

function createKindText(kind) {
    switch(kind) {
        case 'v': return "村人は特殊な能力はなし。推理で村を勝利に導きましょう。";
        case 'u': return "占いは誰か１人の役職、または余りの札を知ることが出来ます。<br />めくりたいカードをクリックしてください。<br />※怪盗の行動前の結果が出ます。";
        case 'p': return "怪盗は誰か１人のカードと入れ替わる事が出来ます。入れ替わりたいカードをクリックしてください。<br />※狼と入れ替わったら勝利条件も変わります。";
        case 'w': return "狼は仲間の狼が入ればお互いに知ることが出来ます。息を合わせて村人を欺きましょう。";
        case 'i': return "狂人は狼サイドの村人です。自分を犠牲にしてもご主人を守り勝利を掴みましょう。";
    }
}



/* --------------------------------------------------------- *
 *     time 
 * --------------------------------------------------------- */

var timer1; //タイマーを格納する変数（タイマーID）の宣言
var time_num;


//カウントダウン関数を1000ミリ秒毎に呼び出す関数
function cntStart()
{
    timer_num = 60 * 3;
  timer1=setInterval("countDown()",1000);
}
//カウント ＋　一分
function cntAdd()
{
    timer_num += 60;
}
//カウント ー　一分
function cntRemove()
{
    timer_num -= 60;
}

//タイマー停止関数
//function cntStop()
//{
//  document.timer.elements[2].disabled=false;
//  clearInterval(timer1);
//}

//カウントダウン関数
function countDown()
{
    tmWrite(timer_num--);
}


//残り時間を書き出す関数
function tmWrite(c)
{
  c=parseInt(c);
    $('#timer-m').html(Math.floor(c/60));
    //残り秒数はintを60で割った余り
    $('#timer-s').html(c % 60);
  
  if (c<=0)
  {
    alert("時間です！");
    tmStop();
  }
}

function tmStop() {
    clearInterval(timer1);
}

//フォームを初期状態に戻す（リセット）関数
//function reSet()
//{
//  document.timer.elements[0].value="0";
//  document.timer.elements[1].value="0";
//  document.timer.elements[2].disabled=false;
//  clearInterval(timer1);
//}  
