
var Game = function(who, color, bid, contra, zal, result, hp){
	this.who = who;
	this.color = color;
	this.bid = bid;
	this.contra = contra;
	this.zal = zal;
	this.result = result;
	this.hp = hp;
	this.score = null;
	this.expected = null; 
	this.imp = null;	
	
	this.toString = function(){
		var rtn = 'Game ';
		rtn += this.who + '=';
		rtn += this.bid + this.color;
		rtn += this.zal;
		if( this.contra.toUpperCase() !== 'BEZ' ){
			rtn += this.contra;
		}
		rtn += '=' + this.result;
		rtn += ' hp=' + this.hp;
		rtn += ' score=' + this.score;
		rtn += ' expected=' + this.expected;
		rtn += ' imp=[' + this.imp + ']';
		return rtn;
	};	
};

var Calculator = function(){
	var games = [];
	var currentGame = null;
	//const arrays

	var expected = {
		before: [
			-1500, //0
			-1500, //1
			-1500, //2
			-1500, //3
			-1500, //4
			-1400, //5
			-1250, //6
			-990, //7
			-900, //8
			-700, //9
			-520, //10
			-490, //11
			-460, //12
			-430, //13
			-400, //14
			-300, //15
			-220, //16
			-130, //17
			-90, //18
			-50, //19
			0, //20
			50, //21
			90, //22
			130, //23
			220, //24
			300, //25
			400, //26
			430, //27
			460, //28
			490, //29
			520, //30
			700, //31
			900, //32
			990, //33
			1250, //34
			1400, //35
			1500, //36
			1500, //37
			1500, //38
			1500, //39
			1500, //40
		], 
		after: [
			-2200, //0
			-2200, //1
			-2200, //2
			-2200, //3
			-2200, //4
			-2100, //5
			-1800, //6
			-1440, //7
			-1350, //8
			-1000, //9
			-720, //10
			-690, //11
			-660, //12
			-630, //13
			-600, //14
			-400, //15
			-260, //16
			-130, //17
			-90, //18
			-50, //19
			0, //20
			50, //21
			90, //22
			130, //23
			260, //24
			400, //25
			600, //26
			630, //27
			660, //28
			690, //29
			720, //30
			1000, //31
			1350, //32
			1440, //33
			1800, //34
			2100, //35
			2200, //36
			2200, //37
			2200, //38
			2200, //39
			2200, //40
		]
	};		
	
	var impsUpperEdge = [
		10,
		40,
		80,
		120,
		160,
		210,
		260,
		310,
		360,
		420,
		490,
		590,
		740,
		890,
		1090,
		1220,
		1490,
		1740,
		1990,
		2240,
		2490,
		2990,
		3490,
		3990
	];

	var points = {
		before: {
			normal: {
				less: {
					first: 50,
					secondAndThird: 50,
					fourthAndFurther: 50
				},		
				youngSuit: { 
					score: [
						70,
						90,
						110,
						130,
						400,
						920,
						1440
					],
					more: 20
				},
				olderSuit: {
					score: [
						80,
						110,
						140,
						420,
						450,
						980,
						1510
					],
					more: 30
				},
				noTrumps: {
					score: [
						90,
						120,
						400,
						430,
						460,
						990,
						1520
					],
					more: 30				
				}
			},
			double: {
				less: {
					first: 100,
					secondAndThird: 200,
					fourthAndFurther: 300
				},		
				youngSuit: { 
					score: [
						140,
						180,
						470,
						510,
						550,
						1090,
						1630
					],
					more: 100
				},
				olderSuit: {
					score: [
						160,
						470,
						530,
						590,
						650,
						1210,
						1770
					],
					more: 100
				},
				noTrumps: {
					score: [
						180,
						490,
						550,
						610,
						670,
						1230,
						1790
					],
					more: 100
				}
			},
			redouble: {
				less: {
					first: 200,
					secondAndThird: 400,
					fourthAndFurther: 600
				},		
				youngSuit: { 
					score: [
						180,
						560,
						640,
						720,
						800,
						1380,
						1960
					],
					more: 200
				},
				olderSuit: {
					score: [
						520,
						640,
						760,
						880,
						1000,
						1620,
						2240
					],
					more: 200
				},
				noTrumps: {
					score: [
						560,
						680,
						800,
						920,
						1040,
						1660,
						2280
					],
					more: 200
				}
			}
		},
		after: {
			normal: {
				less: {
					first: 100,
					secondAndThird: 100,
					fourthAndFurther: 100
				},		
				youngSuit: { 
					score: [
						70,
						90,
						110,
						130,
						600,
						1370,
						2140
					],
					more: 20
				},
				olderSuit: {
					score: [
						80,
						110,
						140,
						620,
						650,
						1430,
						2210
					],
					more: 30
				},
				noTrumps: {
					score: [
						90,
						120,
						600,
						630,
						660,
						1440,
						2220
					],
					more: 30				
				}
			},
			double: {
				less: {
					first: 200,
					secondAndThird: 300,
					fourthAndFurther: 300
				},		
				youngSuit: { 
					score: [
						140,
						180,
						670,
						710,
						750,
						1540,
						2330
					],
					more: 200
				},
				olderSuit: {
					score: [
						160,
						670,
						730,
						790,
						850,
						1660,
						2470
					],
					more: 200
				},
				noTrumps: {
					score: [
						180,
						690,
						750,
						810,
						870,
						1680,
						2490
					],
					more: 200
				}
			},
			redouble: {
				less: {
					first: 400,
					secondAndThird: 600,
					fourthAndFurther: 600
				},		
				youngSuit: { 
					score: [
						180,
						760,
						840,
						920,
						1000,
						1830,
						2660
					],
					more: 400
				},
				olderSuit: {
					score: [
						720,
						840,
						960,
						1080,
						1200,
						2070,
						2940
					],
					more: 400
				},
				noTrumps: {
					score: [
						760,
						880,
						1000,
						1120,
						1240,
						2110,
						2980
					],
					more: 400
				}
			}
		}
	};
	
	//end const arrays
	
	var toInt = function(str){
		return parseInt( str );
	};
	
	var getScore = function(){
		var pointsByZal = getPointsByZal();
		var score = getScoreByZal( pointsByZal );
		currentGame.score = score;
	};
	
	var isBefore = function(){
		var zal = currentGame.zal;
		return zal === 'B';	
	};
	
	var getPointsByZal = function(){
		return isBefore()
			? points.before
			: points.after;
	};
	
	var getScoreByZal = function(pointsByZal){
		var contra = currentGame.contra;
		var pointsByContra = getPointsByContra( contra, pointsByZal );
		return getScoreByContra( pointsByContra );
	};
	
	var getPointsByContra = function(contra, pointsByZal){
		switch(contra){
			case 'BEZ':
				return pointsByZal.normal;
			case 'X':
				return pointsByZal.double;
			default:
				return pointsByZal.redouble;
		};
	};
	
	var getScoreByContra = function(pointsByContra){
		var result = toInt(currentGame.result);
		var isLess = result < 0;
		if(isLess){
			return getScoreByLess(result, pointsByContra.less );
		}
		var color = currentGame.color;
		var pointsBySuit = getPointsBySuit( color, pointsByContra );
		return getScoreBySuit( result, pointsBySuit ); 
	};
	
	var getScoreByLess = function(result, pointsByLess){
		var positiveResult = -result;
		var score = -pointsByLess.first;
		if(positiveResult > 1){
			score -= pointsByLess.secondAndThird;
		}
		if(positiveResult > 2){
			score -= pointsByLess.secondAndThird;
		}
		if(positiveResult > 3){
			var lessCount = positiveResult - 3;
			score -= lessCount * pointsByLess.fourthAndFurther;
		}
		return score;
	};
	
	var getPointsBySuit = function(color, pointsByContra){
		switch( color ){
			case 'C':
			case 'D':
				return pointsByContra.youngSuit;
			case 'NT':
				return pointsByContra.noTrumps;
			default:
				return pointsByContra.olderSuit;
		};
	};
	
	var getScoreBySuit = function(result, pointsBySuit){
		var bidLevel = toInt( currentGame.bid ) - 1;
		var bidScore = pointsBySuit.score[ bidLevel ];		
		var moreScore = result * pointsBySuit.more;
		return bidScore + moreScore;
	};	
	
	var getExpected = function(){
		var exps = isBefore()
			? expected.before
			: expected.after;
		var hp = toInt( currentGame.hp );
		currentGame.expected = exps[ hp ];
	}
	
	var getImp = function(){
		var diff = currentGame.score - currentGame.expected;
		var ratio = diff < 0 ? -1 : 1;
		diff = ratio * diff;
		for(var i = 0, c = impsUpperEdge.length; i < c; i++ ){
			var edge = impsUpperEdge[i];
			if(diff <= edge){
				break;
			}
		};
		currentGame.imp = ratio * i;
	}
	
	return {
		score: function(game){
			currentGame = game;
			getScore();
			getExpected();
			getImp();
			games.push(currentGame);
		},
		getLastGame: function(){
			var l = games.length;
			return l === 0
				? null
				: games[ l - 1 ];
		}
	};	
}();


var View = function(){

	var gi = function(id){
		return document.getElementById(id);
	};
	var gn = function(name){
		return document.getElementsByName(name);
	};
	
	var nl = '\n\r';
	var todayStr = null;
	
	var items = {
		dzis: gi('dzis'),
		btn:{
			savePlayers: gi('savePlayers'),
			saveScore: gi('saveScore'),
			score: gi('score')
		},
		players: {
			s: gi('gracz_s'),
			n: gi('gracz_n'),
			e: gi('gracz_e'),
			w: gi('gracz_w'),
		},
		rozgr: gn('rozgr'),
		kolor: gn('kolor'),
		wysokosc: gn('wys'),
		kontra: gn('kontra'),
		zal: gn('zalozenia'),
		lewy: gi('lewy'),
		hp: gi('hp'),
		wyniki: gi('wyniki')
	};
	
	var gracze = {};
	var strony = ['s', 'n', 'e', 'w'];

	
	var dateToString = function(date){
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var rtn = y + '-';
		if(m < 10){
			m = '0' + m;
		}
		rtn += m + '-';
		if(d < 10){
			d = '0' + d;
		}
		rtn += d;
		return rtn;
	};

	var setText = function(elem, text){
		if(elem === null){
			return;
		}
		if(elem.value !== undefined){
			elem.value = text;
		}
		else if (elem.innerHTML !== undefined){
			elem.innerHTML = text;
		}
	};

	var appendText = function(elem, txt){
		if(elem.value !== undefined){
			 elem.value += txt;
		}
		else if (elem.innerHTML !== undefined){
			elem.innerHTML += txt;
		}
	};

	var getValueFromRadio = function(buttons){
		for(var i = 0, c = buttons.length; i < c; i++){
			var button = buttons[i];
			if(button.checked){
				return button.value;
			}			
		}
		return null;
	};
	
	var getValueFromSelect = function(elem){
		var index = elem.selectedIndex;
		var opt = elem.options[index];
		return opt.value;
	};

	var getValueFromInput =	 function(elem){
		return elem.value;
	};
	
	var savePlayers = function(){		var rtn = todayStr + nl;
		for(var i = 0, c = strony.length; i < c; i++){
			var strona = strony[i];
			var ipt = items.players[ strona ];
			var gracz = getValueFromInput(  ipt );
			gracze[ strona ] = gracz;
			rtn += strona + ': ' + gracz + ' ';
		};
		appendText( items.wyniki, rtn + nl);
	};

	var score = function(){
		var who = getValueFromRadio( items.rozgr );
		var color = getValueFromRadio( items.kolor );
		color = color.toUpperCase();
		var bid = getValueFromRadio( items.wysokosc );
		var kontra = getValueFromRadio( items.kontra );
		kontra = kontra.toUpperCase();
		var zal = getValueFromRadio( items.zal );
		zal = zal.toUpperCase();
		var result = getValueFromSelect( items.lewy );
		var hp = getValueFromSelect( items.hp );
		var game = new Game(who, color, bid, kontra, zal, result, hp);
		Calculator.score( game );
	};
	
	var saveScore = function(){
		var game = Calculator.getLastGame();
		var rtn = (game === null)
			? 'Game is empty'
			: game.toString();
		appendText( items.wyniki, rtn + nl);
	};

	return {
		init: function(){
			var today = new Date();
			todayStr = dateToString( today );
			setText( items.dzis, todayStr );

			
			items.btn.score.onclick = score;
			items.btn.savePlayers.onclick = savePlayers;
			items.btn.saveScore.onclick = saveScore;	
		}
	};
}();

window.onload = View.init;
