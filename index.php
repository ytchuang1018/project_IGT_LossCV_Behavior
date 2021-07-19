<!--Editor: Ya-Ting Chuang-->
<!--http://ppt.cc/auZYq -->
<?php session_start();?>
<!doctype html>
<meta charset="UTF-8">
<html>
	<head>
		<link href="http://s3.amazonaws.com/codecademy-content/courses/ltp2/css/bootstrap.min.css" rel="stylesheet">
		<link href="./css/style.css" rel="stylesheet">
		<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="./js/app.js"></script>
	</head>
	
	<body>
		<center><div> 
			
			<p id="text1" style="text-align:center; font-weight:bold; color:#cc0000;"></br></p>
			<p id="text" style="text-align:center;">人生有時就像一場賭局，賭桌人人能上，</br>但怎麼漂亮的下賭桌轉身離開就是門藝術了。</br></p>
			</div> </center>
			<p id="input_name_section">請輸入您的英文名字:&nbsp;&nbsp;&nbsp; <input style="color: rgb(0,0,0);" id="input_name" value="<?php echo $_SESSION['name']; ?>" readonly></br></p>
			<p id="input_age_section">真實年齡(單位:年): &nbsp;&nbsp;&nbsp;  <input style="color: rgb(0,0,0);" id="input_age"></br></p>
			<p id="input_exp_section">幾歲開始接觸紙牌遊戲(單位:年, 無經驗可填0):&nbsp;&nbsp;&nbsp;<input style="color: rgb(0,0,0);" id="input_exp"></br></p>
			<p id="input_freq_section">遊戲頻率: </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.高(一週內超過一次, 每次超過3小時) </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.中(三週以上玩一次,  每次超過3小時) </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.低(六個月以上玩一次) </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.幾乎不玩</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input style="color: rgb(0,0,0);" id="input_freq"></br></p>
			<p id="input_sex_section">性別(男生填1, 女生填2):  &nbsp;&nbsp;&nbsp; <input style="color: rgb(0,0,0);" id="input_sex"></br></br></p>
			<center><button id="button">賭徒請進!!</button></center>
			
		
		
		<center><div> 
		
		<button id="button_start">遊戲開始!</button>
		</div> </center>
		
		<center><table id="table" style=" width:1000px; text-align:center; border:0px; "  >
			<tr>
				<td><button id="button1" onClick="button_click(1);"><div id="feedback1"></div><img src="./Stimuli/deck_A.JPG" alt="" border=2 height=233 width=153></img></button></td>
				<td><button id="button2" onClick="button_click(2);"><div id="feedback2"></div><img src="./Stimuli/deck_B.JPG" alt="" border=2 height=233 width=153></img></button></td>
				<td><button id="button3" onClick="button_click(3);"><div id="feedback3"></div><img src="./Stimuli/deck_C.JPG" alt="" border=2 height=233 width=153></img></button></td>
				<td><button id="button4" onClick="button_click(4);"><div id="feedback4"></div><img src="./Stimuli/deck_D.JPG" alt="" border=2 height=233 width=153></img></button></td>
			</tr>
		</table></center>
			
		<center><div id="final_section" style="font-size:30px;visibility:hidden;">
			<input  type="radio" name="like_porker" value="1" style="width:30px;height:30px;"
			checked >A
			<input  type="radio" name="like_porker" value="2" style="width:30px;height:30px;">B
			<input  type="radio" name="like_porker" value="3" style="width:30px;height:30px;">C
			<input  type="radio" name="like_porker" value="4" style="width:30px;height:30px;">D
			<br>
			<br>
			<p>為什麼呢?請寫下原因</p>
			<textarea style="color: rgb(0,0,0);font-size:20px;" rows="5" cols="50" ></textarea>
			<br>
			<br>
			<button id="button_final" onClick="button_final_click();">送出!</button>
		</div></center>
		
	</body>
</html>
 