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
    var x_slot=[];
    var y_slot=[];
    
    for(i=0;i<7;i++){
        x_slot.push((13400*i/6+800)*ratio+paddingleft);
    }
    for(i=0;i<3;i++){
        y_slot.push((6100*i/2+500)*ratio+paddingtop);
    }
    var click_area=[];
    var current_area=-1;
    var current_time;
    var key_map=Array.apply(null, Array(200)).map(Number.prototype.valueOf,0);
    var counter=0;
    var initial=1;
    current_area=counter;
    window.addEventListener("keydown",function(e){
        if(counter<12&&initial==1){
            
            key_map[e.keyCode]=counter;
            counter+=1;
            current_area=counter;
        }else{
            initial=0;
            current_area=key_map[e.keyCode];
        }
    });
    window.addEventListener("keyup",function(e){
        if(initial!=1){
            current_area=-1;
        }
        
        
    });
	update();
    
    
    
	function update() {
        
		context.clearRect(0, 0, width, height);
        var t =Math.floor(new Date());
        if (current_area>=0){
            context.save();
            context.fillStyle="rgba(255,255,0,1)";
            var a=current_area%6,b=Math.floor(current_area/6);
            
            context.fillRect(x_slot[a],y_slot[b],x_slot[a+1]-x_slot[a],y_slot[b+1]-y_slot[b]);
            context.restore();
        }
        
        
        drawBadmintonCourt(context,court_new);
        //draw_area(context,click_area);
		requestAnimationFrame(update);
        
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