
$(function() {
    setupText();
    setupModal();
    setupTrigger();

    TimerLoop();
});

function TimerLoop() {

    console.log('t');

    if (c && $('#mdl-check-' + turn).size() > 0) {
        $('#mdl-check-' + turn).modal();
        c = false;
    }
    if (vc && $('#mdl-vote').size() > 0) {
        var name = $('#card-div-'+(turn)).next().html();
        $('#vote-owner').html(name + "さんの投票");
        var mv = $('#mdl-vote');
        mv.modal();
//[index= turn ---> false;
        vc = false;
    }
    if (c2 && $('#mdl-' + turn).size() > 0) {
        $('#mdl-' + turn).modal();
        c2 = false;
    }

    if (mode == 'end') {
        loop = false;
        console.log(vote_res);
        showResult();
    }

    if (mode == 't') {
        turn ++;
        mode = 'n';
        if (turn > player_kind.length) {
            loop = false;
            $('#btn-night-end').show();
        } else {
            $('#btn-next').show();
        }
    }
    if (mode == 'vt') {
        turn ++;
        mode = 'n';
        if (turn > player_kind.length) {
            loop = false;
            $('#btn-night-end').show();
        } else {
            $('#btn-next').show();
        }
    }
    if(loop) window.setTimeout("TimerLoop()", 1000);
}

var loop = true;


var turn = 1;
var c = false;
var c2 = false;
var vc = false;

var mode = 'n';

function c_reverse() {
    var id = $(this).children('.card').attr('id');
    if (id.indexOf('rest', 0) != -1) {
        var p = $('[id*=card-div-rest]').parent();
        p.children('.card').removeClass('card-h');
        p.children('span').show();
    } else {
        var c = $(this).children('.card');
        c.removeClass('card-h');
        var name = $(this).children('span').html();
        var kind = $(this).attr('kind');
        console.log("showed: " + name + "," + kindtostr(kind));

        $('#text-player-sub').html('<span class="detection">' + createPlayerShow(name, kind) + "</span>");
    };

    $('.card').parent().unbind('click', c_reverse);
    mode = 't';
}



function c_change() {
    ccc = $(this).children('.card');
    var name = $(this).children('span').html();
    var kind = $(this).attr('kind');
    var num = $(this).attr('turn');

    ccc.removeClass('card-h card-' + kind);
    ccc.addClass('card-p');

    var pp = $('button[turn=' + turn + ']');
    console.log(pp);
    pp.children('.card').removeClass('card-p');
    pp.children('.card').addClass("card-" + kind);


//    $('.after-data[name=name_member_' + turn +'_k]').val(kind);
//    $('.after-data[name=name_member_' + num  +'_k]').val('p');
    player_kind_aft[turn - 1] = kind;
    player_kind_aft[num  - 1] = 'p';

    $('#text-player-sub').html('<span class="detection">' + createPlayerShow(name, kind) + 
             name + "と入れ替わりました" +
             "</span>");

    $('.card').parent().unbind('click', c_change);
    mode = 't';
}


function setupTrigger() {

    $('#btn-next').hide();
    $('#btn-night-end').hide();
    $('#btn-start-vote').hide();
    $('#discussion-timer').hide();
    $('#win-v').hide();
    $('#win-w').hide();
    $('#retry').hide();
    
    $('[id*="card-div-rest"]').parent().children('span').hide();

    $('.btn-check-no').click(function() {
        $(this).parent().parent().modal('hide');
        c2 = true;
    });
    $('.btn-check-ok').click(function() {
        $(this).parent().parent().modal('hide');
//        $(this).parent().children('.modal-check-second').modal();
        if (mode=="v") 
        vc = true;
        else
        c = true;
    });
    $('.btn-vote').click(function() {
        var i = $(this).attr('index') - 1;
        vote_res[i] = vote_res[i] + 1;
        turn++;
        if (turn > player_kind.length) 
            mode = 'end';
        else 
            c2 = true;
    });
    $('.btn-check-yes').click(function() {
        var i = $(this).attr('index');
        var k = player_kind[i-1];
        $('#text-player').html(createPlayerText(player_name[i-1], k));
        $('#card-div-' + i).removeClass('card-h');


        if (k == 'u') {
            console.log("trun - u : binded");
            $('.card').parent().click(c_reverse);
            $('#card-div-'+i).parent().unbind('click', c_reverse);
        } else if (k == 'p') {
            $('.card').parent().click(c_change);
            $('#card-div-'+i).parent().unbind('click', c_change);
            $('[id*=card-div-rest]').parent().unbind('click', c_change);
            mode = 'p';
        } else if(k == 'w') {
            $('.card-w').removeClass('card-h');
            mode = 't';
        } else {
            mode = 't';
        }
    });


    $('#btn-start').click(function() {
        $(this).remove();
        $('#mdl-1').modal();
        $('.txt-first').hide();
    });

    $('#btn-next').click(function() {
        $('#text-player').html('');
        $('#text-player-sub').html('');
        $('.card').removeClass();
        for (var i = 0; i < player_kind.length; i++)
            $('#card-div-'+(i + 1)).addClass('card card-h card-'+player_kind[i]);
        for (var i = 0; i < rest.length; i++)
            $('#card-div-rest-'+ i).addClass('card card-h card-'+rest[i]);
        $('[id^=card-div-rest]').parent().children('span').hide();
        $(this).hide();
        $('#mdl-' + turn).modal();

    });

    $('#btn-night-end').click(function() {
        console.log(player_kind);
        console.log(player_kind_aft);
        $('#text-player-sub').html('全員の夜の行動が完了しました。<br>' + 
            '昼のターンです。話し合いをして、吊る人間を決めて下さい。');

        $('#discussion-timer').show();
        $('#text-player').html('');
        $('#text-player-sub').html('');
        $('.card').removeClass();
        for (var i = 0; i < player_kind.length; i++)
            $('#card-div-'+(i + 1)).addClass('card card-h card-'+player_kind_aft[i]);
        for (var i = 0; i < rest.length; i++)
            $('#card-div-rest-'+ i).addClass('card card-h card-'+rest[i]);
        $('[id^=card-div-rest]').parent().children('span').hide();
        $(this).hide();
        $('#btn-start-vote').show();
        cntStart();
    });

    $('#btn-start-vote').click(function() {
        $("#discussion-timer").hide();
        tmStop();

        $('#mdl-1').modal();
        loop = true;
        TimerLoop();
        turn = 1;
        mode = 'v';
        $('.mdl-head-text').html("投票のターンです");
    });
    console.log(rest);
}


function setupModal() {
    $('.modal').modal({
        backdrop: 'static',
        keyboard: false,
        show: false
    });
}

function setupText() {
    var tk = "";
    for (k in allKind) {
        tk += kindtostr(allKind[k]) + ",";
    }
    $('#txt-kinds').html(tk);
    $('#txt-rest-num').html(rest.length);
}

function showResult() {
    var c = $('.card');
    c.removeClass('card-h');
    var max = Math.max.apply(null, vote_res);
    var win_village = false;
    for (var i = 0; i < player_kind.length; i++) {
        var hang = vote_res[i] == max;
        var span = '<span class="vote-num ' + ( hang ? "vote-num-sp":"") + '">(' + vote_res[i] + '表)</span>';
        
        console.log(span);
        var d = $('#card-div-'+(i + 1));
        d.parent().append(span);
        if (hang) {
            d.css('border', 'solid orange 1px');
            if (d.parent().attr('kind') == 'w') 
                win_village = true;
        }
    }
    if (win_village) {
        $('#win-v').show();
        $('.card-v').parent().css('border', 'solid 1px green');
        $('.card-u').parent().css('border', 'solid 1px green');
        $('.card-p').parent().css('border', 'solid 1px green');
    }
    else {
        $('#win-w').show();
        $('.card-w').parent().css('border', 'solid 1px red');
        $('.card-i').parent().css('border', 'solid 1px red');
    }
    $('#retry').show();
}


/* --------------------------------------------------------- *
 *     sub functions
 * --------------------------------------------------------- */



function loopWait( timeWait )
{
    var timeStart = new Date().getTime();
    var timeNow = new Date().getTime();
    while( timeNow < (timeStart + timeWait ) )
    {
        timeNow = new Date().getTime();
    }
    return;
}





