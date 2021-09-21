/* LICENSE
MIT License

Copyright (c) 2021 thibaultDup

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

END LICENSE */

/* Disable copy/cut/paste for the main [ textArea ], so the player cannot copy/paste the code and ApFrequency */
$(window.document).ready(function() {
    $('#typingAreaId').bind('cut copy paste', function(event) {
        event.preventDefault();
    });
});

/* To get from the script - set to ADDER for testing purpuses*/
var carModel = "";

/* -------------- EVENTS LISTNER-------------- */

window.addEventListener('message', (event) => {
	
	// If the model of the car is sent by the script
	if(event.data.model)
	{
		let model = event.data.model;
		carModel = model.toLowerCase();
		initialisation()
	}

	//If the show status is send by the script
	if(event.data.showStatus)
	{
		//display the UI
		var htmlUI = window.document.getElementById("htmlAll");
		htmlUI.style.animation = "fadeIn ease 1s";
		htmlUI.style.display = "contents";
		
	}
	else if(!event.data.showStatus)
	{
		//hide the UI
		var htmlUI = window.document.getElementById("htmlAll");
		htmlUI.style.display = "none";
		
	}
	
	//console.log("MESSAGE RECEIVED");
	
});

/* -------------- End EVENTS LISTNER-------------- */


/* --------------Declare variables-------------- */

var APModelList = [

	{model:'ninef', AP:'ZU:KU:SJ:LU'},
	{model:'ninef2', AP:'ED:JU:SZ:ZL'},
	{model:'adder', AP:'IC:PG:PU:LT'},
	{model:'AKUMA', AP:'NB:SI:RW:TZ'},
	{model:'alpha', AP:'LO:DM:SR:LG'},
	{model:'ardent', AP:'WZ:TD:PV:SX'},
	{model:'asea', AP:'DO:CS:TL:RJ'},
	{model:'autarch', AP:'LR:PD:CW:WW'},
	{model:'avarus', AP:'RS:KI:PU:OZ'},
	{model:'bagger', AP:'CO:BQ:CU:DI'},
	{model:'baller2', AP:'OZ:JA:PG:RB'},
	{model:'baller3', AP:'VS:WN:EQ:HJ'},
	{model:'banshee', AP:'TQ:AS:QT:MZ'},
	{model:'banshee2', AP:'UY:BJ:FG:NX'},
	{model:'bati', AP:'LY:BA:QR:LU'},
	{model:'bati2', AP:'ZT:LD:GM:IA'},
	{model:'bestiagts', AP:'UY:CF:TP:AI'},
	{model:'bfinjection', AP:'QR:NN:RX:CV'},
	{model:'bf400', AP:'MB:MO:AU:FQ'},
	{model:'bifta', AP:'VG:PZ:OK:QD'},
	{model:'bison', AP:'PM:OC:ZA:ZG'},
	{model:'blade', AP:'GN:RD:LS:BU'},
	{model:'blazer', AP:'FI:GQ:LB:RE'},
	{model:'blazer4', AP:'MT:DA:ZO:CT'},
	{model:'blazer5', AP:'SV:EW:UP:YI'},
	{model:'blista', AP:'AX:YP:WB:ML'},
	{model:'bmx', AP:'XX:AJ:LK:DN'},
	{model:'bobcatxl', AP:'UD:WF:EW:RB'},
	{model:'brawler', AP:'EA:MY:AP:IO'},
	{model:'brioso', AP:'PQ:QZ:QE:UP'},
	{model:'btype', AP:'HF:JL:SG:RI'},
	{model:'btype2', AP:'NH:QA:RH:WQ'},
	{model:'btype3', AP:'JV:AL:IK:NJ'},
	{model:'dubsta3', AP:'WM:YI:OH:VC'},
	{model:'buccaneer', AP:'KB:AM:ST:WM'},
	{model:'buccaneer2', AP:'AE:SX:DH:ZB'},
	{model:'buffalo', AP:'OM:YS:AU:WC'},
	{model:'buffalo2', AP:'VK:XO:MD:QF'},
	{model:'bullet', AP:'ML:HN:OG:HT'},
	{model:'burrito3', AP:'HW:AH:BV:AM'},
	{model:'gburrito2', AP:'RD:ZJ:UC:PV'},
	{model:'camper', AP:'WQ:EW:DX:PK'},
	{model:'carbonrs', AP:'GW:BO:YI:GG'},
	{model:'carbonizzare', AP:'CI:CO:VF:IK'},
	{model:'casco', AP:'GI:AR:UC:XX'},
	{model:'cavalcade2', AP:'JZ:RO:QJ:VB'},
	{model:'cheetah', AP:'ZM:OQ:EP:AL'},
	{model:'chimera', AP:'YJ:OL:VB:VV'},
	{model:'chino', AP:'OF:YQ:AW:JU'},
	{model:'chino2', AP:'XH:NF:AA:NN'},
	{model:'cliffhanger', AP:'IL:II:TG:NV'},
	{model:'cognoscenti', AP:'VC:SO:CG:XC'},
	{model:'cogcabrio', AP:'MM:KF:PB:JT'},
	{model:'comet2', AP:'FO:XQ:CZ:KY'},
	{model:'comet5', AP:'AW:TK:SY:FC'},
	{model:'contender', AP:'PJ:QX:ZX:PR'},
	{model:'coquette', AP:'UJ:MZ:CS:OW'},
	{model:'coquette3', AP:'FQ:TQ:TH:ZS'},
	{model:'coquette2', AP:'DR:CJ:QK:VT'},
	{model:'cruiser', AP:'OX:DY:DC:AM'},
	{model:'cyclone', AP:'WX:RA:DN:BR'},
	{model:'daemon', AP:'XZ:ZI:DB:XU'},
	{model:'daemon2', AP:'NQ:HM:BM:UP'},
	{model:'defiler', AP:'WV:JO:BB:HQ'},
	{model:'deluxo', AP:'GX:VJ:ZM:AE'},
	{model:'dominator', AP:'OQ:HH:VK:SQ'},
	{model:'double', AP:'UW:PZ:HW:IB'},
	{model:'tampa2', AP:'MJ:KG:BW:ER'},
	{model:'dubsta', AP:'HD:GR:DV:AC'},
	{model:'dubsta2', AP:'LB:RY:NO:MB'},
	{model:'dukes', AP:'MD:JX:YO:FK'},
	{model:'dune', AP:'AJ:JC:ZT:AG'},
	{model:'elegy2', AP:'NI:HZ:VF:AO'},
	{model:'emperor', AP:'JR:EY:SI:IF'},
	{model:'enduro', AP:'XL:JE:VU:XJ'},
	{model:'entityxf', AP:'DJ:LP:OI:SB'},
	{model:'esskey', AP:'HE:PB:DT:EW'},
	{model:'sheava', AP:'GU:NK:ZU:KY'},
	{model:'exemplar', AP:'TT:SR:CH:YC'},
	{model:'f620', AP:'ZB:WE:GX:TS'},
	{model:'faction', AP:'JP:EH:QJ:EH'},
	{model:'faction2', AP:'DI:UB:YU:JA'},
	{model:'faction3', AP:'KW:SM:XE:KG'},
	{model:'faggio', AP:'LQ:ES:QR:KM'},
	{model:'felon', AP:'BT:AC:UD:HN'},
	{model:'felon2', AP:'XJ:RP:ZL:WU'},
	{model:'feltzer2', AP:'RY:SJ:RT:TY'},
	{model:'fq2', AP:'TZ:DJ:UE:YA'},
	{model:'fixter', AP:'ST:MI:KM:DX'},
	{model:'fmj', AP:'HN:EC:VZ:TS'},
	{model:'fugitive', AP:'PN:QZ:BB:TY'},
	{model:'furoregt', AP:'WF:MM:YL:JH'},
	{model:'fusilade', AP:'RS:EG:PP:XY'},
	{model:'gburrito', AP:'TF:GT:CH:KV'},
	{model:'gargoyle', AP:'TY:RZ:PC:NK'},
	{model:'gauntlet', AP:'KZ:FC:CA:OU'},
	{model:'glendale', AP:'AW:DI:XZ:SR'},
	{model:'granger', AP:'EE:EU:YI:HS'},
	{model:'gresley', AP:'BX:TX:UE:BN'},
	{model:'gt500', AP:'LG:LL:NC:VA'},
	{model:'guardian', AP:'AX:XU:DU:BY'},
	{model:'hakuchou', AP:'ZL:OC:QE:VW'},
	{model:'hakuchou2', AP:'HJ:YU:UE:FP'},
	{model:'hermes', AP:'QC:VD:SQ:PI'},
	{model:'hexer', AP:'JO:BJ:OJ:XK'},
	{model:'hotknife', AP:'RD:NG:PG:OT'},
	{model:'huntley', AP:'HK:MG:MT:CD'},
	{model:'hustler', AP:'WU:SG:HV:QY'},
	{model:'infernus', AP:'QW:LX:ZQ:XB'},
	{model:'innovation', AP:'FU:VV:VX:ST'},
	{model:'intruder', AP:'VH:FD:GT:HD'},
	{model:'issi2', AP:'JW:CF:TJ:QD'},
	{model:'jackal', AP:'TX:TR:PL:EJ'},
	{model:'jester', AP:'FZ:TC:NO:JW'},
	{model:'jester2', AP:'OC:OB:ZY:PI'},
	{model:'journey', AP:'QR:XC:AO:RN'},
	{model:'kamacho', AP:'UQ:HZ:WA:WS'},
	{model:'khamelion', AP:'GA:CW:TO:IQ'},
	{model:'kuruma', AP:'DO:XO:NC:IG'},
	{model:'landstalker', AP:'IC:LU:VE:XV'},
	{model:'lynx', AP:'MI:YH:QS:VX'},
	{model:'mamba', AP:'BL:TE:JS:DE'},
	{model:'manana', AP:'VK:WQ:MU:CV'},
	{model:'manchez', AP:'FF:DV:RY:RP'},
	{model:'massacro', AP:'MT:OB:SH:QV'},
	{model:'massacro2', AP:'PB:DS:BY:SS'},
	{model:'mesa', AP:'BW:WA:CP:JY'},
	{model:'mesa3', AP:'KY:IL:PJ:OU'},
	{model:'minivan', AP:'RQ:PR:HH:VT'},
	{model:'monroe', AP:'QC:ZL:UA:AF'},
	{model:'moonbeam', AP:'ZP:NK:BN:FY'},
	{model:'moonbeam2', AP:'HI:YG:AW:TV'},
	{model:'nemesis', AP:'FS:MQ:JC:TW'},
	{model:'neon', AP:'ZC:FP:NV:DJ'},
	{model:'nightblade', AP:'FD:MK:ME:ER'},
	{model:'nightshade', AP:'FW:EN:ZL:PV'},
	{model:'omnis', AP:'NE:VN:MP:OC'},
	{model:'oppressor', AP:'GL:KP:QR:AT'},
	{model:'oracle2', AP:'US:ME:XA:AV'},
	{model:'osiris', AP:'DN:EQ:DS:XH'},
	{model:'panto', AP:'BF:IG:UA:IX'},
	{model:'paradise', AP:'AQ:OG:MJ:RO'},
	{model:'pariah', AP:'FH:RZ:KX:CF'},
	{model:'patriot', AP:'PA:SY:DW:AA'},
	{model:'pcj', AP:'RJ:ZK:OH:OO'},
	{model:'penumbra', AP:'JU:KK:TJ:WT'},
	{model:'pfister811', AP:'AC:WU:ZD:SG'},
	{model:'phoenix', AP:'HY:HR:RS:AS'},
	{model:'picador', AP:'RS:GB:GU:CQ'},
	{model:'pigalle', AP:'KI:RL:NS:TE'},
	{model:'prairie', AP:'AP:FC:CD:EV'},
	{model:'premier', AP:'WF:KM:VI:UN'},
	{model:'primo2', AP:'SD:UO:NT:HR'},
	{model:'radi', AP:'VM:FE:FG:QV'},
	{model:'raiden', AP:'SW:EX:JJ:IF'},
	{model:'rapidgt', AP:'KU:CE:FB:UL'},
	{model:'rapidgt2', AP:'ZQ:BY:BK:VL'},
	{model:'rapidgt3', AP:'IG:PF:GY:WY'},
	{model:'le7b', AP:'PC:IA:YF:SN'},
	{model:'reaper', AP:'EO:KP:UE:NN'},
	{model:'rebel2', AP:'LN:DD:PE:FN'},
	{model:'regina', AP:'TB:EG:BX:UO'},
	{model:'retinue', AP:'DX:SC:MA:NL'},
	{model:'revolter', AP:'QA:NY:RQ:RH'},
	{model:'riata', AP:'KR:BU:MY:QQ'},
	{model:'rocoto', AP:'ZS:CK:DL:AT'},
	{model:'ruffian', AP:'XG:UA:EU:BX'},
	{model:'ruiner2', AP:'SI:VZ:FY:RV'},
	{model:'rumpo', AP:'IL:OM:QN:QI'},
	{model:'rumpo3', AP:'HY:MV:AA:HF'},
	{model:'sabregt2', AP:'JA:QZ:DU:OB'},
	{model:'sabregt', AP:'VZ:EO:BZ:ST'},
	{model:'sanchez', AP:'UH:DJ:XC:DM'},
	{model:'sanchez2', AP:'BB:XC:BM:OQ'},
	{model:'sanctus', AP:'UH:BC:CT:BT'},
	{model:'sandking', AP:'CU:KX:OP:ZR'},
	{model:'savestra', AP:'JR:XR:YL:XO'},
	{model:'sc1', AP:'DA:OI:JG:AL'},
	{model:'schafter2', AP:'BX:CX:SQ:KX'},
	{model:'schafter3', AP:'QO:NS:UF:ES'},
	{model:'scorcher', AP:'EF:OM:BB:MI'},
	{model:'seminole', AP:'BM:AB:LS:CW'},
	{model:'sentinel', AP:'LS:TS:NR:BE'},
	{model:'sentinel2', AP:'TO:BV:GS:HO'},
	{model:'sentinel3', AP:'NS:GR:IA:HB'},
	{model:'seven70', AP:'RS:MX:RY:XU'},
	{model:'shotaro', AP:'EU:UT:GQ:ST'},
	{model:'slamvan3', AP:'NP:AA:OY:PG'},
	{model:'sovereign', AP:'SH:QH:WG:PT'},
	{model:'stinger', AP:'VQ:PV:OZ:PK'},
	{model:'stingergt', AP:'PH:OP:YG:GA'},
	{model:'feltzer3', AP:'SZ:BG:DY:PG'},
	{model:'streiter', AP:'NU:AF:QU:UQ'},
	{model:'stretch', AP:'EV:VV:HJ:VJ'},
	{model:'stromberg', AP:'PJ:ZI:SD:HM'},
	{model:'sultan', AP:'HN:EN:HS:RZ'},
	{model:'sultanrs', AP:'MR:FG:JT:PI'},
	{model:'superd', AP:'WS:NC:EU:UC'},
	{model:'surano', AP:'QY:FP:LK:RK'},
	{model:'surfer', AP:'KU:TT:IC:DK'},
	{model:'t20', AP:'ZX:KT:UR:VI'},
	{model:'tailgater', AP:'FX:PV:QX:FN'},
	{model:'tampa', AP:'MZ:NP:MV:DC'},
	{model:'monster', AP:'ES:KJ:AL:UT'},
	{model:'thrust', AP:'SN:JL:HT:VO'},
	{model:'tribike3', AP:'WL:JP:FM:KT'},
	{model:'trophytruck', AP:'BM:WG:UI:EF'},
	{model:'trophytruck2', AP:'BR:PK:RE:DJ'},
	{model:'tropos', AP:'FU:BZ:NJ:DC'},
	{model:'turismor', AP:'AF:XE:LU:RE'},
	{model:'tyrus', AP:'OC:YE:IW:UH'},
	{model:'vacca', AP:'CO:AI:EI:OH'},
	{model:'vader', AP:'DE:GM:LT:HL'},
	{model:'verlierer2', AP:'VT:PA:FW:JZ'},
	{model:'faggio2', AP:'RC:SO:LQ:RT'},
	{model:'vigero', AP:'UH:AP:RL:DP'},
	{model:'virgo', AP:'TC:XD:NE:RQ'},
	{model:'viseris', AP:'MM:ZR:DW:XU'},
	{model:'visione', AP:'TJ:QI:ZJ:YV'},
	{model:'voltic', AP:'HY:SM:WC:PJ'},
	{model:'voltic2', AP:'QS:ZT:AN:NU'},
	{model:'voodoo', AP:'DH:OZ:LI:II'},
	{model:'vortex', AP:'FJ:ZG:DS:BE'},
	{model:'warrener', AP:'QS:MP:HZ:BE'},
	{model:'washington', AP:'UO:LX:EJ:LU'},
	{model:'windsor', AP:'CF:MR:GY:SE'},
	{model:'windsor2', AP:'DZ:VQ:EU:ZO'},
	{model:'wolfsbane', AP:'GD:RM:GS:XI'},
	{model:'prototipo', AP:'VK:MQ:KL:TE'},
	{model:'xls', AP:'WT:AZ:WC:PD'},
	{model:'yosemite', AP:'HY:XB:BZ:IA'},
	{model:'youga', AP:'XX:YD:HU:RE'},
	{model:'youga2', AP:'YZ:UT:HZ:GZ'},
	{model:'ztype', AP:'AF:XK:EC:JH'},
	{model:'z190', AP:'WZ:ZP:YP:WL'},
	{model:'zentorno', AP:'TY:LS:AY:SX'},
	{model:'zion', AP:'UE:XX:VW:YZ'},
	{model:'zion2', AP:'NE:QD:ZW:BH'},
	{model:'zombiea', AP:'IW:DP:LA:SK'},
	{model:'zombie', AP:'DK:VI:DK:AZ'}

];


var APFrequency = 0;
var randomGenCode = "";
var AP = "";
var numberOfFails = 0;
var intervalFrequency = null;

/* --------------End Declare variables-------------- */


/* -------------- FUNCTIONS -------------- */

/* Function triggered as soon as the htlm is loaded */
function OnLoad()
{
	/* hide all the content of the UI */
	var htmlUI = window.document.getElementById("htmlAll");
	htmlUI.style.display = "none";
	/* initialisation(); */
	
}


/* Function that runs when UI is loading */
function initialisation()
{
	

	/* --------------Initisalize variables & Initialize HTML elements-------------- */
	
	var selectElement = window.document.getElementById("selectingArea");
	
	
	/* Get the [ textArea ] Element so we can modify the content to match the car model and switch things around if necesary */
	var typingAreaElement = window.document.getElementById("typingAreaId");
		
	typingAreaElement.value = "#!/bin/Python3.9\r#Car hacking script\rimport * from socket\rimport * from carHack\r\rsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\r\rcar = carHack("+carModel+")\r## Car AP between the parentheses\rcar.setCarAP() \r## AP frequency\rcar.setAPFrequency()\r## Enter code between \"\"\rrandomGeneratedCode = \"\" \r\rcar.startHack()\r\r##When you are done with the code press HACK !!"
	
	
	/* Shuffle the APModelList */
	shuffleArray(APModelList)
	
	
	/* Adds all the models and their AP to our [ Select ] list */
	for(let i = 0; i < APModelList.length; i++)
	{
		
		selectElement.innerHTML += "<option value='"+APModelList[i].model+"'>"+APModelList[i].model+" - AP : "+APModelList[i].AP+"</option>";
		
		if(APModelList[i].model == carModel)
		{
			AP = APModelList[i].AP
		}
		
	}
	
	
	APFrequency = genRandomNumber(111111, 999999);


	
	randomGenCode = genRandomNumber(222, 888) + genRandomString();

	
	

/* 	alert("OK") */
}

/* Function called when the [ randomGenButton ] is pressed */
function buttonRandomGenPressed()
{
	
	let modelName = window.document.getElementById("randomGenArea").value;
	/* TEST */
	if(modelName == carModel)
	{
		/* Refresh the HTML only when the player get the good car model and press the button */
		window.document.getElementsByClassName("frequencyLabelValue")[0].innerHTML = APFrequency; 
		
		/* Refresh the HTML only when the player get the good car model and press the button */
		window.document.getElementsByClassName("codeLabelValue")[0].innerHTML = randomGenCode;
		
		/* Start the timer to repeate the changeFrenquency function wich will change the value of the frequency every 5 secs */
		intervalFrequency = window.setInterval(changeFrenquency , 8000);
	}
	else
	{
		window.document.getElementById("randomGenArea").value = "!! WRONG MODEL !!";
	}
	

	
}

/* Function called when the [ hackButton ] is pressed */
function buttonHackPressed()
{
	/* Get the [ textArea ] Element */
	var typingAreaElement = window.document.getElementById("typingAreaId");
	
	/* Parse the portion of the fake functions and variable that the player is suppose the fill  */
	
	/* Get the start index of the fake function 1 and her end index */
	startIndexF1 = typingAreaElement.value.indexOf("setCarAP(");
	endOfIndexF1 = typingAreaElement.value.indexOf(")", startIndexF1);
	/* Get the start and the end indexes of the Answer to the fake function 1 */ 
	startAnswerF1 = typingAreaElement.value.indexOf("(", startIndexF1) + 1;
	endAnswerF1 = endOfIndexF1;
	/* Slice the string between the start and end indexes of the answer to recover the players answer */
	answerF1 = typingAreaElement.value.slice(startAnswerF1, endAnswerF1);
	
	
	/* Get the start index of the fake function 2 and her end index */
	startIndexF2 = typingAreaElement.value.indexOf("setAPFrequency(");
	endOfIndexF2 = typingAreaElement.value.indexOf(")", startIndexF2);
	/* Get the start and the end indexes of the Answer to the fake function 2 */ 
	startAnswerF2 = typingAreaElement.value.indexOf("(", startIndexF2) + 1;
	endAnswerF2 = endOfIndexF2;
	/* Slice the string between the start and end indexes of the answer to recover the players answer */
	answerF2 = typingAreaElement.value.slice(startAnswerF2, endAnswerF2);
	
	
	
	/* Get the start index of the fake variable 1 and her end index */
	startIndexV1 = typingAreaElement.value.indexOf('randomGeneratedCode = "');
	endOfIndexV1 = typingAreaElement.value.indexOf('"', startIndexV1 + 23);
	/* Get the start and the end indexes of the Answer to the fake variable 1 */ 
	startAnswerV1 = typingAreaElement.value.indexOf('"', startIndexV1) + 1;
	endAnswerV1 = endOfIndexV1;
	/* Slice the string between the start and end indexes of the answer to recover the players answer */
	answerV1 = typingAreaElement.value.slice(startAnswerV1, endAnswerV1);
	
	
	/* alert(typingAreaElement.value[10]) */
	/* alert(answerF1+" "+answerF2+" "+" "+answerV1); */
  /*console.log(answerF1+" "+answerF2+" "+answerV1);
	console.log(AP+" "+APFrequency+" "+randomGenCode); */
	
	if( (answerF1 == AP) && (answerF2 == APFrequency) && (answerV1 == randomGenCode) ) 
	{
		unlockCar()
		console.log("CAR UNLOCKED !!!!");
	}
	else
	{
		if(numberOfFails == 0) /* First try */
		{
			window.document.getElementById("fail1").style.backgroundColor = "red"
			numberOfFails++;
		}
		else if(numberOfFails == 1) /* Second try  */
		{
			window.document.getElementById("fail2").style.backgroundColor = "red"
			numberOfFails++;
		}
		else if(numberOfFails == 2) /* Third and last try */
		{
			window.document.getElementById("fail3").style.backgroundColor = "red"
			numberOfFails++;
			console.log("FAILED, ALARM TRIGGERED RUN !!!");
			hackFailed()
		}
		
	}
	
}


/* Function that will issue a callback to unlock the car if the hack is a success */
function unlockCar()
{
	
	/* Invoking the NUI Callback */
	fetch(`https://${GetParentResourceName()}/multifunctionCallback`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({
			hackSuccess: 'true'
		})
	}).then(resp => resp.json()).then(resp => console.log(resp));	
	
}


/* Function called when the hack is failled (3 attempts failed)  */
function hackFailed()
{
	
	/* Invoking the NUI Callback */
	fetch(`https://${GetParentResourceName()}/multifunctionCallback`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({
			hackFailed: 'true'
		})
	}).then(resp => resp.json()).then(resp => console.log(resp));
	
	//reset the number of tries
	numberOfFails = 0;
	//reset the carModel to none
	carModel = ""
	
	//reset the fail dots color
	window.document.getElementById("fail1").style.backgroundColor = "#bbb";
	window.document.getElementById("fail2").style.backgroundColor = "#bbb";
	window.document.getElementById("fail3").style.backgroundColor = "#bbb";
	
	//Reset the UI components 
	window.document.getElementsByClassName("frequencyLabelValue")[0].innerHTML = "0";
	window.document.getElementsByClassName("codeLabelValue")[0].innerHTML = "0";
	window.document.getElementById("randomGenArea").value = "Enter car model";
	
	clearInterval(intervalFrequency);
	
}

/* Function called when [ ABORT ] button is clicked to stop the hack */
function buttonAbortPressed()
{
	
	/* Invoking the NUI Callback */
	fetch(`https://${GetParentResourceName()}/multifunctionCallback`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({
			abort: 'true'
		})
	}).then(resp => resp.json()).then(resp => console.log(resp));
	
	//reset the number of tries
	numberOfFails = 0;
	//reset the carModel to none
	carModel = "";
	
	//reset the fail dots color	
	window.document.getElementById("fail1").style.backgroundColor = "#bbb";
	window.document.getElementById("fail2").style.backgroundColor = "#bbb";
	window.document.getElementById("fail3").style.backgroundColor = "#bbb";
	
	//Reset the UI components 
	window.document.getElementsByClassName("frequencyLabelValue")[0].innerHTML = "0";
	window.document.getElementsByClassName("codeLabelValue")[0].innerHTML = "0";
	window.document.getElementById("randomGenArea").value = "Enter car model";
	
	clearInterval(intervalFrequency);

}



/* Function called but the Timeout to change the frequence every X seconds */
function changeFrenquency()
{
	APFrequency = genRandomNumber(111111, 999999);
	window.document.getElementsByClassName("frequencyLabelValue")[0].innerHTML = APFrequency;
}


/* Function that generate a random number between a min and a max */
function genRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min) ) + min;
}

/* Function that generate a random string of 2 characters */
function genRandomString(){
	
	var string = "";
	for(let i = 0; i < 2; i++)
	{
		string += String.fromCharCode(genRandomNumber(65,90));
	}
	return string;
}

/* Function to shuffle our APModelList list before initializing the Selector element, so the list is always in a different order */
function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}

/* -------------- End FUNCTIONS -------------- */




/* --------- TODO ---------------------------------------------------------- */

/* - [GOOD] Shuffle the list before initializing the Select Element */
/* - [GOOD] Deal with the input [ randomGenArea ] wich doesn't want to reset when abort of fail */