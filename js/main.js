window.onload = function() {
    var gametime=Math.floor(new Date());
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
    console.log(paddingleft,paddingtop);
    var court_new=[]
    for (var i =0;i<court.length;i++){
        var line=[]
        var start=[court[i][0][0]*ratio+paddingleft,court[i][0][1]*ratio+paddingtop];
        var end=[court[i][1][0]*ratio+paddingleft,court[i][1][1]*ratio+paddingtop];
        line.push(start);
        line.push(end);
        court_new.push(line);
    }
    var drag_start_position=[],drag_end_position=[];
    var click_points=[];
    var current_point=[];
    var drag_plate=[];
    var current_time;
    var lock=0;
    var data=[];
	update();
    /*merge to mouse down
    window.addEventListener("click",function(e){
        var x=e.clientX,y=e.clientY;
        click_points.push([x,y,30]);
    });
    */
    window.addEventListener("mousedown",function(e){
        var x=e.clientX,y=e.clientY;
        current_time=Math.floor(new Date());
        drag_start_position.push(x);
        drag_start_position.push(y);
        drag_plate=[x,y,0];
        click_points.push([x,y,30]);
        current_point=[x,y];
    });
    window.addEventListener("mousemove",function(e){
        
        if (current_point.length!=0){
            
            var x=e.clientX,y=e.clientY;
            if (current_point[0]!=x&&current_point[1]!=y){
                drag_end_position=[];
                drag_end_position=[x,y];
            }
            var drag_start=vector.create(drag_start_position[0],drag_start_position[1]);
            var drag_end=vector.create(drag_end_position[0],drag_end_position[1]);
            var angle=drag_end.subtract(drag_start).getAngle();
            var label=Math.floor(((angle*180/Math.PI+360-30)%360)/60);
            drag_plate[2]=label;
            
        }
        
    });
    window.addEventListener("mouseup",function(e){
        if(lock==1){//last
            lock=0;
        }else{
            console.log([current_time,(drag_plate[0]-paddingleft)/ratio,(drag_plate[1]-paddingtop)/ratio,drag_plate[2]]);
            data.push([current_time,(drag_plate[0]-paddingleft)/ratio,(drag_plate[1]-paddingtop)/ratio,drag_plate[2]]);
        }
        
        drag_start_position=[];
        drag_end_position=[];
        drag_plate=[];
        current_point=[];
        
    });
    
    window.addEventListener("touchstart", getBallXY, false);
	window.addEventListener("touchmove", handleTouchMove, false);
	window.addEventListener("touchend", handleTouchEnd, false);
    
	function update() {
        
		context.clearRect(0, 0, width, height);
        var t =Math.floor(new Date());
        //console.log(drag_end_position+t.toString());
        if (current_point.length!=0&&drag_end_position.length==0){
            
            var t =Math.floor(new Date());
            var progress_sec=Math.min(1,(t-current_time)/1000/0.5);
            if (progress_sec==1&&lock==0){
                lock=1;
                console.log([current_time,(drag_plate[0]-paddingleft)/ratio,(drag_plate[1]-paddingtop)/ratio,drag_plate[2]]);
                data.push([current_time,(drag_plate[0]-paddingleft)/ratio,(drag_plate[1]-paddingtop)/ratio,drag_plate[2]]);
                send_data(gametime,data);
                data=[];
                
            }
            context.beginPath();
            context.arc(current_point[0],current_point[1],70,0,progress_sec*2*Math.PI);
            //context.closePath();
            context.stroke();
            
        }
        
        drawBadmintonCourt(context,court_new);
        draw_click_circle(context,click_points);
        
        draw_drag_line(context,drag_start_position,drag_end_position);
        draw_plate(context,drag_plate);
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
    function draw_click_circle(context,click_points){
        for(var i=0;i<click_points.length;i++){
            var point=click_points[i];
            context.save();
            context.fillStyle="rgba(0,0,255,"+(point[2]/30)+")";
            point[2]-=1;
            context.beginPath();
            context.arc(point[0],point[1],10,0,2*Math.PI);
            context.closePath();
            context.fill();
            context.restore()
        }
        for(var i=0;i<click_points.length;i++){
            var point=click_points[i];
            if (point[2]==0){
                click_points.splice(i, 1);
            }
        }
    }
    function draw_drag_line(context,drag_start_position,drag_end_position){
        if(drag_start_position.length*drag_end_position.length!=0){
            context.save();
            context.strokeStyle="rgba(128,128,0,1)";
            draw_line(context,drag_start_position,drag_end_position);
            context.restore();
        }
        
    }
    function draw_plate(context,drag_plate){
        if (drag_plate.length!=0&&drag_end_position.length!=0){
            context.save();
            var drag_start=vector.create(drag_start_position[0],drag_start_position[1]);
            var drag_end=vector.create(drag_end_position[0],drag_end_position[1]);
            var drag_length=(drag_start.subtract(drag_end)).getLength();
            context.strokeStyle="rgba(0,0,0,"+Math.min(1,drag_length/100)+")";
            context.fillStyle="rgba(255,255,0,"+Math.min(1,drag_length/100)+")";
            var v=vector.create(100,0);
            var ori=vector.create(drag_plate[0],drag_plate[1]);
            for(var i=0;i<6;i++){
                v.setAngle(Math.PI*i/3-Math.PI/6);
                var newv=ori.add(v);
                draw_line(context,[ori.getX(),ori.getY()],[newv.getX(),newv.getY()]);
            }
            context.beginPath();
            context.moveTo(ori.getX(),ori.getY());
            v.setAngle(Math.PI*drag_plate[2]/3+Math.PI/6);
            newv=ori.add(v);
            context.lineTo(newv.getX(),newv.getY());
            v.setAngle(Math.PI*(drag_plate[2]+1)/3+Math.PI/6);
            newv=ori.add(v);
            context.lineTo(newv.getX(),newv.getY());
            context.fill();
            
            context.restore();
        }
        
    }
    function getBallXY(event)
    {
        var touchobj = event.changedTouches[0];  // reference first touch point (ie: first finger)
        

        var x=touchobj.clientX,y=touchobj.clientY;
        current_time=Math.floor(new Date());
        drag_start_position.push(x);
        drag_start_position.push(y);
        drag_plate=[x,y,0];
        click_points.push([x,y,30]);
        current_point=[x,y];


        
        //event.preventDefault();
    }

    function handleTouchMove(event)
    {
        
        if (current_point.length!=0){
            var touchobj = event.changedTouches[0];		// reference first touch point for this event
            var x=touchobj.clientX,y=touchobj.clientY;
            
            if (current_point[0]!=x&&current_point[1]!=y){
                drag_end_position=[];
                drag_end_position=[x,y];
            }
            var drag_start=vector.create(drag_start_position[0],drag_start_position[1]);
            var drag_end=vector.create(drag_end_position[0],drag_end_position[1]);
            var angle=drag_end.subtract(drag_start).getAngle();
            var label=Math.floor(((angle*180/Math.PI+360-30)%360)/60);
            drag_plate[2]=label;
            
        }
       
        //event.preventDefault();
    }

    function handleTouchEnd(event)
    {
        if(lock==1){//last
            lock=0;
        }else{
            console.log([current_time,(drag_plate[0]-paddingleft)/ratio,(drag_plate[1]-paddingtop)/ratio,drag_plate[2]]);
            data.push([current_time,(drag_plate[0]-paddingleft)/ratio,(drag_plate[1]-paddingtop)/ratio,drag_plate[2]]);
        }
        drag_start_position=[];
        drag_end_position=[];
        drag_plate=[];
        current_point=[];
        
        //event.preventDefault();
    }
    function send_data(gametime,data){
        $.ajax({
            "url":"php/insert.php",
            "dataType":"json",
            "type":"POST",
            "data":JSON.stringify({"gametime":gametime,"data":data}),
            "success":function(data){
                if(data.error){
                    alert(data.error);
                    console.log(data.message);
                }else{
                    console.log(data.message);
                }
            },
            "error":function(data){
                alert(data);
                
            }
        });
    }
};