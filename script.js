var clock;
var speed;

//initialize game
function init(){
	//start button：disabled
	$('button').disabled = true;
	clock = null;
	speed = 4;
	for(var i = 0; i < 4; i++){
		createrow();
	}
	//onclick event
	$('main').onclick = function(ev){
		judge(ev);
	}
	//set timer
	clock = window.setInterval('move()', 50);
}

//get the DOM element based on ID
function $(id){
	return document.getElementById(id);
}

function creatediv(className){
	var div = document.createElement('div');
	div.className = className;
	return div;
}

function createrow(){
	var con = $('con');
	var row = creatediv('row');
	var arr = createcell();
	con.appendChild(row);
	for(var i = 0; i < 4; i++){
		row.appendChild(creatediv(arr[i]));
	}
	if(con.firstChild == null){
		con.appenChild(row);
	}else{
		con.insertBefore(row,con.firstChild);
	}
}

//create 4 cells
function createcell(){
	var temp = ['cell','cell','cell','cell',];
	var i = Math.floor(Math.random() * 4);
	temp[i] = 'cell black';
	return temp;
}

//move the rows and change top element
function move(){
	var con = $('con');
	var top = parseInt(window.getComputedStyle(con, null)['top']);
	if(speed + top > 0){
		top = 0;
	}else{
		top += speed;
	}
	con.style.top = top + 'px';
	
	if(top == 0){
		createrow();
		con.style.top = '-100px';
		delrow();
	}else if(top == (-100 + speed)){
		var rows = con.childNodes;
		if((rows.length == 5) && (rows[rows.length - 1].pass !== 1)){
			con.style.top = '-100px';
			fail();
		}
	}
}

//game over
function fail(){
	clearInterval(clock);
	confirm('你的最终得分为 ' + parseInt($('score').innerHTML));
	//reload web page
	window.location.reload();
}

//decide whether to click the black cell
function judge(ev){
	if(ev.target.className.indexOf('black') != -1){
		ev.target.className = 'cell';
		ev.target.parentNode.pass = 1;
		score();
	}else{
		//click the white cell: fail()
		ev.target.parentNode.pass = 0;
		fail();
	}
}

//speed up
function speedup(){
	speed += 2;
	if(speed == 10){
		$('good').hidden = false;
		//hidden after 3 seconds
		setTimeout(function(){$('good').hidden = true;}, 3000);
	}
}

//delete the last row
function delrow(){
	var con = $('con');
	if(con.childNodes.length == 6){
		con.removeChild(con.lastChild);
	}
}

//scoring
function score(){
	var newscore = parseInt($('score').innerHTML) + 1;
	$('score').innerHTML = newscore;
	if(newscore % 10 == 0){
		speedup();
	}
}