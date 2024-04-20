$(function() {
    'use strict';

var ansList = ['　','／','×','＋','※','公','止','忌','●','★','消',''];
var td = ['#td1','#td2','#td3','#td4','#td5','#td6'];
var a;
var b;

var i 
var sum
var randoms
var string



/////日欄を計算する関数
var ans 
var ansWord
function answer(){
    var count0 = (string.match(/　/g) || []).length;
    var count1 = (string.match(/／/g) || []).length;
    var count2 = (string.match(/×/g) || []).length;
    var count3 = (string.match(/＋/g) || []).length;
    var count4 = (string.match(/※/g) || []).length;
    var count5 = (string.match(/公/g) || []).length;
    var count6 = (string.match(/止/g) || []).length;
    var count7 = (string.match(/忌/g) || []).length;
    var count11 = 6-(count0+count1+count2+count3+count4+count5+count6+count7);
    if((count6 > 0 && count7 > 0) || (count6 > 0 || count7 > 0)&&(count0 + count1 + count2 + count3 + count4 +count5 > 0)){
        ans = '？'
        ansWord = '授業の出欠入力が正しくありません';
    }else if(count11 === 6){
        ans = '消';
        ansWord = '「消」：取消です';
    }else if(count5+count11 === 6){
        ans = '公';
        ansWord = '「公」：公欠です';
    }else if(count6+count11 === 6){
        ans = '止';
        ansWord = '「止」：出席停止です';
    }else if(count7+count11 === 6){
        ans = '忌';
        ansWord = '「忌」：忌引きです';
    }else if(count0+count5+count11 === 6){
        ans = '　';
        ansWord = '「　」：出席です';
    }else if(count1+count11 === 6){
        ans = '／';
        ansWord = '「／」：欠席です';
    }else if((string.substr(0,1) === '／' || string.substr(0,1) === '×' || string.substr(0,1) === '※') && (string.substr(-1,1) === '／' || string.substr(-1,1) === '＋' || string.substr(-1,1) === '※') ){
        ans = '※';
        ansWord = '「※」遅早です';
    }else if(string.substr(0,1) === '×' || string.substr(0,1) === '／' || string.substr(0,1) === '※'){
        ans = '×'
        ansWord = '「×」：遅刻です';
    }else if(string.substr(-1,1) === '＋' || string.substr(-1,1) === '／' || string.substr(-1,1) === '※'){
        ans = '＋'
        ansWord = '「＋」：早退です';
    }else if((string.substr(0,1) === '　' || string.substr(0,1) === '＋' || string.substr(0,1) === '公') && (string.substr(-1,1) === '　' || string.substr(-1,1) === '×' || string.substr(-1,1) === '公') && count1 > 0){
        ans = '●';
        ansWord = '「●」：一部欠席ありです';
    }else{
        ans='★'
        ansWord = '「★」：一部キズありです';
    }
};


var mode
////////練習モード
$('#mode-game').click(function(){
    mode = 'game';
    $('#mode').addClass(mode);
    $('.unit-modal-wrapper').addClass('hide');
    $('#answer').addClass('hide');
    $('#title').text($(this).text());
    setRandom()

    /////乱数で出欠作成
    function getRandom(){
        var num = Math.random()
        switch(true){
            case num<0.5:
                a=0;
                break;    
            case num<0.65:
                a=1;
                break;
            case num<0.75:
                a=2;  
                break;  
            case num<0.85:
                a=3;  
                break;  
            case num<0.90:
                a=4;  
                break;  
            case num<0.95:
                a=5;  
                break;  
            case num<1:
                a=11; 
                break;   
        }
    }

    /////作成した出欠を１限〜６限に入力
    function setRandom(){
        sum = 0;
        randoms=[]
        string=""

        /////１０％の確率で、公止忌消のチャンスを与える
        if(Math.random() > 0.1){
            for(i = 0 ; i < 6 ; i++){
                getRandom();
                sum = sum + a;
                randoms.push(a);
                string = string + ansList[a]
                $(td[i]).text(ansList[a]);
                switch(a){
                    case a = 0:
                    case a = 1:
                    case a = 2:
                    case a = 3:
                    case a = 4:
                    case a = 5:
                        $(td[i]).removeClass('shadow');
                        break;
                    case a = 11:
                        $(td[i]).addClass('shadow');
                        break;
                }
            }
        }else{
            b = Math.random()
            switch(true){
                case b < 0.25:
                    a = 5;
                    break;  
                case b < 0.5:
                    a = 6;
                    break;  
                case b < 0.75:
                    a = 7;
                    break;  
                case b < 1:
                    a = 11;
                    break;  
            }
            b = a;
            for(i = 0 ; i < 6 ; i++){
                if(Math.random()<0.2){
                    a = 11;
                }else{
                    a = b;
                }
                sum = sum + a;
                randoms.push(a);
                string = string + ansList[a]
                $(td[i]).text(ansList[a]);
                if(a === 11){
                    $(td[i]).addClass('shadow');
                }else{
                    $(td[i]).removeClass('shadow');
                }
            }       
        }
        /////日欄を計算
        answer();
        $('#answer').text(ans);
    }

    /////答え合わせ
    var thisAns 
    var setCheck =''
    $('.ans').click(function(){
        if(setCheck === '' ){
            thisAns = $(this).text();
            if(thisAns === ans ){
                $(this).addClass('correct');
                setCheck='answered'
                $('#answer').removeClass('hide');
                $('#blank').addClass('hide');
                $('#seikai').removeClass('hide');
                $('#sound-file1').get(0).play() ;
            }else{
                $(this).addClass('miss');
                setCheck='answered'
                $('#answer').removeClass('hide');
                $('#blank').addClass('hide');
                $('#batsu').removeClass('hide');
                $('#batsu').text('不正解！' + ansWord);
                $('#sound-file2').get(0).play() ;
                switch(true){
                    case ans === '　':
                        $('#ans1').addClass('correct');
                        break;
                    case ans === '／':
                        $('#ans2').addClass('correct');
                        break;
                    case ans === '×':
                        $('#ans3').addClass('correct');
                        break;
                    case ans === '＋':
                        $('#ans4').addClass('correct');
                        break;
                    case ans === '※':
                        $('#ans5').addClass('correct');
                        break;
                    case ans === '公':
                        $('#ans6').addClass('correct');
                        break;
                    case ans === '止':
                        $('#ans7').addClass('correct');
                        break;
                    case ans === '忌':
                        $('#ans8').addClass('correct');
                        break;
                    case ans === '●':
                        $('#ans9').addClass('correct');
                        break;
                    case ans === '★':
                        $('#ans10').addClass('correct');
                        break;
                    case ans === '消':
                        $('#ans11').addClass('correct');
                        break;
                }
            }
        }
    })
    ///////次の単語
    $('#btn').click(function(){
        setRandom();
        $('.ans').removeClass('correct');
        $('.ans').removeClass('miss');
        $('#answer').addClass('hide');
        $('#seikai').addClass('hide');
        $('#batsu').addClass('hide');
        $('#blank').removeClass('hide');
        setCheck = '';
    })
})

/////確認モード
$('#mode-check').click(function(){
    mode = 'check';
    $('#mode').addClass(mode)
    $('.unit-modal-wrapper').addClass('hide');
    $('#title').text($(this).text());
    $('#comment').removeClass('hide');

    /////ボタンのテキストを変更
    $('#btn').text('日欄表示');

    /////いらない選択肢を消す
    $('#ans9').addClass('hide');
    $('#ans10').addClass('hide');
    $('#ans11').addClass('hide');

    /////授業無しの選択肢を追加
    $('#ans12').removeClass('hide');


    /////時限を選択
    $('.tds').click(function(){
        $('#answer').text('　');
        $('#comment').text('↑授業の出欠を入力');
        if($(this).hasClass('selection')){
            $(this).removeClass('selection');
        }else{
            $('.tds').removeClass('selection');
            $(this).addClass('selection');
        }
    })

var st
    /////選択した時限に出欠を入力
    $('.ans').click(function(){
        if($(this).text() === '授業無し'){
            st = '';
            $('.selection').addClass('shadow');
        }else{
            st = $(this).text();
            if($('.selection').hasClass('shadow')){
                $('.selection').removeClass('shadow');
            }
        }
        $('.selection').text(st);
        $('.selection').removeClass('selection');
    })

    /////日欄を計算
    $('#btn').click(function(){
        string='';
        for(i = 0 ; i < 6 ; i++){
            string = string + $(td[i]).text();
        }       
        answer();
        $('#answer').text(ans);
        $('#answer').removeClass('hide');
        $('#blank').addClass('hide');
        $('.selection').removeClass('selection');

        /////文章で表示
        $('#comment').text(ansWord);

    })
})

/////モードの切り替え
$('#mode-change').click(function(){
    location.reload();
})
});
