window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
    var courtWidth=15000,courtHeight=7100;
    if ((width/height)>(15000/7100)){
        var ratio=height/courtHeight;
        
    }else{
        var ratio=width/courtWidth;
        
    }
    courtWidth*=ratio;
    courtHeight*=ratio;
    var startX = 0,	startY = 0;
    var court=[[[800,500],[800+13400,500]],[[800,500],[800,500+6100]],[[800+13400,500],[800+13400,500+6100]],[[800,500+6100],[800+13400,500+6100]],
[[800+760,500],[800+760,500+6100]],[[800+760+3920,500],[800+760+3920,500+6100]],[[800+760+3920+4000,500],[800+760+3920+4000,500+6100]],[[800+760+3920+4000+3920,500],[800+760+3920+4000+3920,500+6100]],
[[800,500+460],[800+13400,500+460]],[[800,500+460+2570+2570],[800+13400,500+460+2570+2570]],
[[800,500+460+2570],[800+760+3920,500+460+2570]],[[800+760+3920+4000,500+460+2570],[800+760+3920+4000+3920+760,500+460+2570]],[[800+760+3920+2000,500],[800+760+3920+2000,500+460+2570+2570+460]]];
    var paddingleft=(width-courtWidth)/2;
    var paddingtop=(height-courtHeight)/2;
    var court_new=[]
    for (var i =0;i<court.length;i++){
        var line=[]
        var start=[court[i][0][0]*ratio+paddingleft,court[i][0][1]*ratio+paddingtop];
        var end=[court[i][1][0]*ratio+paddingleft,court[i][1][1]*ratio+paddingtop];
        line.push(start);
        line.push(end);
        court_new.push(line);
    }
    console.log(court_new);
	update();

	function update() {
		context.clearRect(0, 0, width, height);

        drawBadmintonCourt(context,court_new)
		
		//requestAnimationFrame(update);
	}
    function drawBadmintonCourt(context,court_new){
        
        context.save();
        context.strokeStyle = '#ff0000';
        context.lineWidth = 40 * ratio;
        
        for (var i =0;i<court_new.length;i++){
            var start=court_new[i][0];
            var end=court_new[i][1];
            draw_line(context,start,end);   
        }
        context.restore();
    }
    function draw_line(context,start,end){
        context.beginPath();
        context.moveTo(start[0],start[1]);
        context.lineTo(end[0],end[1]);
        context.closePath();
        context.stroke();
    }
};