    function paintIt(breadth, floor, node, innerNode, upQuotient, rq, gq, bq) {
        
        function genRGB(x, y, z, propColorful, breadth) {
            
            color1 = Math.floor((Math.random() * breadth) * x) + floor
            color2 = Math.floor((Math.random() * breadth) * y) + floor
            color3 = Math.floor((Math.random() * breadth) * z) + floor
            rando = Math.floor(Math.random() * propColorful)
            if (rando == 0) {
                return 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')'
            } else {
                if (color1 > 200 || color1 < 80) {
                    return 'rgb(' + color1 + ',' + color1 + ',' + color1 + ')'
                } else {
                    color1 = Math.floor((Math.random() * breadth) * x) + floor
                    return 'rgb(' + color1 + ',' + color1 + ',' + color1 + ')'
                }
            }
        }


        pixHeight = Math.floor($(window).height() / 70)
        if (pixHeight < 8) {
            pixHeight = 8
        }



        wh = Math.floor(node.height() / pixHeight)+1
        
        ww = Math.floor(node.width() / pixHeight)
        upQuotient = (wh * ww) / 10;
        colors = {};
        //create pixels w/ random colors
        
        
        for (x = 1; x <= wh; x++) {
            node.append("<div height='" + pixHeight + "'  class='row' id='row" + x + "'></div>")
            for (y = 1; y <= ww; y++) {
                $('#row' + x).append("<div height='" + pixHeight + "' width='" + pixHeight + "' class='pixel' id='w" + x + "h" + y + "'></div>")
                colorInstance = genRGB(rq, gq, bq, 4, breadth)
                $("#w" + x + "h" + y).css('background-color', colorInstance)
            }
        }
        
        $('.pixel').css({'height': pixHeight,'width': pixHeight,'float': 'left'})
        
        
        lastScroll = 0
        
        function changeRandomBlock() { // change the color of a random block
            randomY = Math.floor(Math.random() * (ww+1) + 1)
            randomX = Math.floor(Math.random() * wh + 1)
            $("#w" + randomX + "h" + randomY).css('background-color', genRGB(rq, gq, bq, 4, breadth))
        }
        
        datHeight = node.height()
        
        scrollVar = 0
        
        $(window).scroll(function() {
            
            
            if (scrollVar == 0) {
                scrollVar = 1
                scrollDif = lastScroll - $(window).scrollTop() //will be positive when scrolling up
                
                function bleedRandomBlock() {
                    rrandomY = Math.floor(Math.random() * (ww+1))
                    ry = Math.floor(Math.random() * ww)
                    rrandomX = Math.floor(Math.random() * wh)
                    rx = Math.floor(Math.random() * wh)
                    a = Math.floor(Math.random() * 30)
                    if (scrollDif > 0) {
                        //a = Math.floor(Math.random() * 30)
                        if (a < 22) {
                            newColor = $("#w" + (rrandomX-1) + "h" + (rrandomY+1)).css('background-color')
                        } else if (a >= 22 && a < 29) {
                            newColor = $("#w" + (rrandomX-1) + "h" + (rrandomY)).css('background-color')
                        } else {
                            $("#w" + (rrandomX - 1) + "h" + (rrandomY + 1)).css('background-color', genRGB(1, 1, 1, 4))
                        }
                    } else if (scrollDif <= 0) {
                        newColor = $("#w" + (rrandomX + 1) + "h" + (rrandomY)).css('background-color')
                    
                    } else {
                    }
                    $("#w" + (rrandomX) + "h" + (rrandomY)).css('background-color', newColor)
                	if (a == 17) {
                		b = Math.floor(Math.random() * 500)
	                		if (b==17) {
	                			$('.accent').css('color', genRGB(1,1,1,1, 150))
	                			 
	                	}
                	}
                }
                
                for (x = 0; x < upQuotient; x++) {
                    bleedRandomBlock()
                }
                
                
                
                lastScroll = $(window).scrollTop();
            
            } else {
            }
            scrollVar = 0
        
        
        })

    function reshapeContainer (pHeight,leftMargin) {
    	var width = (ww- (leftMargin*2))*pixHeight
    	innerNode.css('margin-left', pHeight*leftMargin)
    	innerNode.css('width', width)


    }

    var winWidth = $(window).width()
    var $container = $('#container')

    $container.css('margin-top', pixHeight*3)
     $container.css('margin-bottom', pixHeight*3)


    var breakpoint1 = 1200
    var breakpoint2 = 900
    var breakpoint3 = 700
    var breakpoint4 = 400

    if (winWidth  > breakpoint1) {
    	reshapeContainer(pixHeight, 40)
    } else if (winWidth < breakpoint1 && winWidth > breakpoint2) {
        $container.css('font-size', '0.9em')
    	reshapeContainer(pixHeight, 27)
    } else if (winWidth < breakpoint2 && winWidth > breakpoint3) {
        $container.css('font-size', '0.8em')
    	reshapeContainer(pixHeight, 20)
    } else if (winWidth < breakpoint3 && winWidth > breakpoint4) {
        $container.css('font-size', '0.7em')
    	reshapeContainer(pixHeight, 10)
    } else if (winWidth < breakpoint4) {
        $container.css('font-size', '0.6em')
    	reshapeContainer(pixHeight, 3)
    }
  

    }

$(document).ready(function() {
	paintIt(255, 0, $('#backBody'), $('#container'), 600, 1, 1, 1)

	var doit;
	function resizedw(){
		location.reload()

		//$('#backBody').remove()
		//$('body').append('<div id=backBody></div>')
	   // paintIt(260, 0, $('#backBody'), $('#container'), 600, 1, 1, 1)
	}
	window.onresize = function() {
	    clearTimeout(doit);
	    doit = setTimeout(function() {
	        resizedw();
	    }, 100);
	};

});