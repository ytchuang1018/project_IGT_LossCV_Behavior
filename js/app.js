//按下進行測驗按鍵後動作
function button_click(d){
	flip_porker('#button' + d);
	button_close();
	button_n='#button' + d;
	show_money(d);
	trial_n=trial_n+1;
	count_n=count_n+1;
	
	if (trial_n == 80){
		button_close();
		$('#table').hide();
		$('#text').html("請問你比較喜歡ABCD哪副牌呢?");
		$('#final_section').css({"visibility":"visible","font-size":"30px","top":"30px"});
		$('#button_final').css({"visibility":"visible"});
		
	} else if (trial_n!=80 && count_n % 10!=0){
		setTimeout("wait_response(button_n," + d + ");", 900);
		
	} else if (trial_n!=80 && count_n % 10==0){
		setTimeout("wait_response(button_n," + d + ");", 900);
		random_outcome_bad1=shuffle(outcome_bad1);
		random_outcome_bad2=shuffle(outcome_bad2);
		random_outcome_good1=shuffle(outcome_good1);
		random_outcome_good2=shuffle(outcome_good2);
		count_n=0;
	} 
}

//將四個按鍵的按鈕功能關掉
function button_close(){
	$('#button1').prop('disabled',true);
	$('#button2').prop('disabled',true);
	$('#button3').prop('disabled',true);
	$('#button4').prop('disabled',true);
}

//將四個按鍵的按鈕功能打開
function button_open(){
	$('#button1').prop('disabled',false);
	$('#button2').prop('disabled',false);
	$('#button3').prop('disabled',false);
	$('#button4').prop('disabled',false);
}

//將牌翻到背面
function flip_porker(d){
	var imgarray = new Array("stimuli/Back.JPG");
	$(d).each(function(){
		$(this).find("img").animate({ width: "0px",left: "126px"}, 40);
		$(this).find("img").attr("src", imgarray);
		$(this).find("img").animate({ width: "153px",left: "0px"}, 40);
	})
}

//將牌翻回正面
function flip_porker_back(button_n){
	d=button_n;
	if (d=="#button1"){
		var imgarray = new Array("stimuli/deck_A.JPG");
	}
	else if(d=="#button2"){
		var imgarray = new Array("stimuli/deck_B.JPG");
	} 
	else if(d=="#button3"){
		var imgarray = new Array("stimuli/deck_C.JPG");
	} 
	else {
		var imgarray = new Array("stimuli/deck_D.JPG");
	}
	$(d).find("img").animate({ width: "0px",left: "126px"}, 40);
	$(d).find("img").attr("src", imgarray);
	$(d).find("img").animate({ width: "153px",left: "0px"}, 40);
}

//重新reset
function wait_response(button_n,d){
	$('#button').hide();//css("visibility","hidden");
	$('#text1').hide();
	//$('#text').css({"visibility":"hidden","font-size":"40px"});
	$('#button_start').hide();
	$('#table').css('visibility','visible');
	flip_porker_back(button_n);
	button_open();
	
	$('#feedback'+ d).css({'visibility':'hidden'});
	//setTimeout("$('#text').css({'visibility':'hidden'});", 1300);
}

//show money and reward
function show_money(d){
	$('#text').css({"visibility":"visible","font-size":"40px"});
	$('#table').css('visibility','visible');
	$('#button_start').hide();
	p=eval( porker_outcome[d-1] + "[count_n]");
	//alert(p)
	if ( p!="NaN" ){
		if (porker_outcome[d-1]=="random_outcome_bad1" || porker_outcome[d-1]=="random_outcome_bad2"){
			t= '+ ' + 500 + "<br> " + p;
			exp_money = exp_money + 500 + parseInt(p);
			var gain=500;
			
		} else if (porker_outcome[d-1]=="random_outcome_good1" || porker_outcome[d-1]=="random_outcome_good2"){
			t= '+ ' + 100 + "<br> " + p;
			exp_money = exp_money + 100 + parseInt(p);
			var gain=100;
		} 
	} else if ( p=="NaN" ){
		if (porker_outcome[d-1]=="random_outcome_bad1" || porker_outcome[d-1]=="random_outcome_bad2"){
			t= '+ ' + 500 ;
			exp_money = exp_money + 500;
			var gain=500;
		} else if (porker_outcome[d-1]=="random_outcome_good1" || porker_outcome[d-1]=="random_outcome_good2") {
			t= '+ ' + 100 ;
			exp_money = exp_money + 100;
			var gain=100;
		} 
	} 
	setTimeout("$('#feedback'+" + d + ").css({'visibility':'visible','font-size':'30px'}).html(t);",80);
	setTimeout("$('#feedback'+" + d + ").css({'visibility':'visible','font-size':'40px'});",90);
	
	var n=trial_n+1;
	
	$('#text').html("累積金額 " +exp_money+ " 元<br> 第 " +n+" 次 / 總共 80 次");
	
	
	$.ajax({
		url: 'receive.php',
		data: "trial_n="+n+"&button_n="+d+"&gain="+gain+"&loss="+p+"&outcome="+porker_outcome[d-1]+"&user_name="+name+"&user_age="+age+"&user_exp="+exp+"&user_freq="+freq+"&user_sex="+sex,
		type:"POST",
		
		success: function(msg){
			//alert(msg);
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			alert(xhr.status); 
			alert(thrownError); 
		}
	});
}

function button_final_click(){
	$('#text').html("恭喜您完成遊戲了! 感謝您的參與!").css({"font-size":"30px","top":"30px"});
	$('#final_section').css({"visibility":"hidden"});
	$('#button_final').css({"visibility":"hidden"});
	like_porker=parseInt($('input[name=like_porker]').val())+1;
	var tt=$("textarea").val();
	
	$.ajax({
		url: 'receive.php',
		data: "trial_n="+trial_n+"&like_porker="+like_porker+"&like_porker_outcome="+porker_outcome[like_porker]+"&comment="+tt+"&user_name="+name+"&user_age="+age+"&user_exp="+exp+"&user_freq="+freq+"&user_sex="+sex,
		type:"POST",
		
		success: function(msg){
			//alert(msg);
		},
		error:function(xhr, ajaxOptions, thrownError){ 
			alert(xhr.status); 
			alert(thrownError); 
		}
	});
	
}

//打亂牌序
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//global variable
var outcome_bad1 = [ "NaN", "NaN", "NaN", "-1485", "NaN", "NaN", "-1265", "-1045", "-1705", "NaN"];
var outcome_bad2 = [ "-1815","-55","NaN","-2695","NaN","NaN","NaN","NaN","NaN","-935"];
var outcome_good1 = [ "NaN","-155","-115","NaN","NaN","NaN","-135","-95","NaN","NaN"];
var outcome_good2 = [ "NaN","NaN","-85","NaN","-245","NaN","-5","NaN","-165","NaN"];
random_outcome_bad1=shuffle(outcome_bad1);
random_outcome_bad2=shuffle(outcome_bad2);
random_outcome_good1=shuffle(outcome_good1);
random_outcome_good2=shuffle(outcome_good2);
porker_outcome=shuffle(["random_outcome_bad1","random_outcome_bad2","random_outcome_good1","random_outcome_good2"]);
var exp_money=2000;
var trial_n=0;
var count_n=0;
var like_porker=0;
var age="";
var exp="";
var sex="";
var freq="";

$(document).ready(function(){
	$('#button').click(function(){
		sex=$('#input_sex').val();
		age=$('#input_age').val();
		exp=$('#input_exp').val();
		freq=$('#input_freq').val();
		
		if (age != "" && age !="undefined" && !isNaN( age )){
			if (exp != "" && exp !="undefined" && !isNaN( exp )){
				if (freq != "" && freq !="undefined" && !isNaN( freq )){
					if (sex != "" && sex !="undefined" && !isNaN( sex )){
						$('#input_name_section').hide();
						$('#input_name').hide();
						$('#input_age_section').hide();
						$('#input_age').hide();
						$('#input_exp_section').hide();
						$('#input_exp').hide();
						$('#input_freq_section').hide();
						$('#input_freq').hide();
						$('#input_sex_section').hide();
						$('#input_sex').hide();
						$('#button').hide();//css("visibility","hidden");
						$('#text1').hide();
						$('#text').html( "您帶著2000元資金玩遊戲，</br>桌上有A ,B, C, D四副牌，您可根據回饋，掌握每副牌的各自規則(固定)，</br>希望您盡可能贏錢，或盡可能不要輸錢。</br>遊戲結束後電腦會結算您總共輸贏多少錢。</br></br>" );
						$('#button_start').css("visibility","visible");
					} else {
						alert('請輸入性別或輸入數字!');
					}
				} else {
					alert('請輸入頻率或輸入數字!');
				}
			} else {
				alert('請輸入牌齡或輸入數字!');
			}
		} else {
			alert('請輸入年齡或輸入數字!');
		}
	});
	
	$('#button_start').click(function(){
		$('#button_start').hide();
		$('#text').html("累積金額 " +2000+ " 元 <br>  第 0 次 / 總共 80 次");
		$('#text').css({"visibility":"visible","font-size":"40px"});
		$('#table').css('visibility','visible');
	});
	
	$('#button1').prop('disabled',false);
	$('#button2').prop('disabled',false);
	$('#button3').prop('disabled',false);
	$('#button4').prop('disabled',false);
});

//alert( "Handler for .click() called." );