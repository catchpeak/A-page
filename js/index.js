(function(){
	//获取导航项目元素
	//var navItems = document.querySelectorAll('.nav-item');
	var navItems = document.querySelectorAll(".nav-item"); 
	var arrow = document.querySelector('.arrow');
	var header = document.querySelector('#header');
	var main = document.querySelector('#main');
	var contentHeight = window.innerHeight - header.offsetHeight;//计算主体内容高度
	var contentItems = document.querySelectorAll('.content-item');
	var contentListNode = document.querySelector('.content-list');
    var menuItems = document.querySelectorAll(".menu-item"); //获取侧边导航


	var index = 0;       //导航nav索引值
	var preIndex = 0;  //标记上一次显示的索引
	var timeId = null;  //防抖



	//定义数组 定义每一屏的出入场动画
	var animationList = [
		{   //第一屏
			inAnimation: function(){  //入场动画
					var iconList = document.querySelector('.icon-list');
                    var playList = document.querySelector('.play-list');

                    playList.style.transform = 'translateY(0)';
                    iconList.style.transform = 'translateY(0)';
			},
			outAnimation: function(){  //退场动画
                    var iconList = document.querySelector('.icon-list');
                    var playList = document.querySelector('.play-list');

                    playList.style.transform = 'translateY(-200px)';
                    iconList.style.transform = 'translateY(200px)';
			}
		},
		{ //第二屏
			inAnimation: function(){  //入场动画
				var plane1 = document.querySelector('.plane1');
				var plane2 = document.querySelector('.plane2');
				var plane3 = document.querySelector('.plane3');

				plane1.style.transform = 'translate(0,0)';
				plane2.style.transform = 'translate(0,0)';
				plane3.style.transform = 'translate(0,0)';

			},
			outAnimation: function(){  //退场动画
				var plane1 = document.querySelector('.plane1');
				var plane2 = document.querySelector('.plane2');
				var plane3 = document.querySelector('.plane3');

				plane1.style.transform = 'translate(-200px,-200px)';
				plane2.style.transform = 'translate(-200px,200px)';
				plane3.style.transform = 'translate(200px,-200px)';


			}
		},
		{  //第三屏
			inAnimation: function(){  //入场动画
				var pencel1 = document.querySelector('.pencel1');
				var pencel2 = document.querySelector('.pencel2');
				var pencel3 = document.querySelector('.pencel3');

				pencel1.style.transform = 'translate(0,0)';
				pencel2.style.transform = 'translate(0,0)';
				pencel3.style.transform = 'translate(0,0)';

			},
			outAnimation: function(){  //退场动画
				var pencel1 = document.querySelector('.pencel1');
				var pencel2 = document.querySelector('.pencel2');
				var pencel3 = document.querySelector('.pencel3');

				pencel1.style.transform = 'translate(-200px,-200px)';
				pencel2.style.transform = 'translate(-200px,200px)';
				pencel3.style.transform = 'translate(200px,-200px)';

			}
		},
		{  //第四屏
			inAnimation: function(){  //入场动画
				var about3item = document.querySelectorAll('.about3-item');
				about3item[0].style.transform = 'rotate(0)';
				about3item[1].style.transform = 'rotate(0)';

			},
			outAnimation: function(){  //退场动画
				var about3item = document.querySelectorAll('.about3-item');
				about3item[0].style.transform = 'rotate(45deg)';
				about3item[1].style.transform = 'rotate(-45deg)';

			}
		},
		{ //第五屏
			inAnimation: function(){  //入场动画
				var team1 = document.querySelector('.team1');
				var team2 = document.querySelector('.team2');
				team1.style.transform = 'translate(0,0)';
				team2.style.transform = 'translate(0,0)';

			},
			outAnimation: function(){  //退场动画
				var team1 = document.querySelector('.team1');
				var team2 = document.querySelector('.team2');
				team1.style.transform = 'translate(-200px,0)';
				team2.style.transform = 'translate(200px,0)';

			}
		}
	];
	//设置每一屏处于退场状态
	for(var i = 0;i< animationList.length; i++){
		animationList[i].outAnimation();

	}
	//设置主体和每个content-item的高度
	setPageHeight();
	//设置初始导航位置
	setCurrent(index);
	


	//给导航项目绑定单击事件
	for(var i=0 ;i<navItems.length; i++){
		navItems[i].index = i;
		navItems[i].addEventListener('click',function(){
		setCurrent(this.index);	
		});
		//侧边导航绑定事件
		menuItems[i].index = i;
		menuItems[i].addEventListener('click',function(){
		setCurrent(this.index);	
		});
		
	}
	// for(var i=0 ;i<menuItems.length; i++){
	// 	menuItems[i].index = i;
	// 	menuItems[i].addEventListener('click',function(){
	// 	setCurrent(this.index);	
	// 	});
	// 	//侧边导航绑定事件
		
	// }




	//绑定滚轮事件
	//chrom/ ie
	document.addEventListener('mousewheel',mouseScrollFn);
	//firfox
	document.addEventListener('DOMMouseScroll',mouseScrollFn);

    //监听可视窗口大小改变 resize
    //
    window.addEventListener('resize',function(){
    	//重新计算主体高度
    	contentHeight = window.innerHeight - header.offsetHeight;
    	//重新设置 主体高度和每个content-item的高度
    	setPageHeight();
    	//设置导航
    	setCurrent(index);
    })



    /*
	*设置主体和每个content-item的高度
	*@param 
	 */
	function setPageHeight(){
		//设置主体内容的高度
		main.style.height = contentHeight +'px';

		//设置每个页面content-item 设置高度
		contentItems.forEach(function(contentItem){
			contentItem.style.height = contentHeight +'px';

		});

	}
    
	/*
	*滚轮事件触发函数
	*@param 
	 */
	function mouseScrollFn(event){
		if(timeId !== null){
			clearTimeout(timeId); //清除定时
		}


		//开启个定时
		timeId = setTimeout(function(){
				var tag = '';	
			if(event.wheelDelta){  //ie chrom
	             if(event.wheelDelta > 0){
	             	 tag = 'up';
	             } else{
	             	tag = 'down';

	             }
			}
			else if(event.detail){  //firfox
				if(event.detail < 0){
					tag = 'up';
				} else {
					tag = 'down';
				}
			}
			//做出上下的操作
			if (tag ==='up') {
				//上滚 上一页
				if(index > 0){
					index --;
				}
				//设置页面 导航 三角
				setCurrent(index);
				

			} else if(tag ==='down'){
				//下滚 下一页
				if(index < contentItems.length-1){
					index ++;
				}
				//设置页面 导航 三角
				setCurrent(index);
			}

			},200);
	    
	}

	/*
	*激活导航和三角位置
	*@param index 为要激活的索引值
	 */
	function setCurrent(index){
		navItems.forEach(function(navItem,index){
			//其他失活运用foreach 函数，移除active类
				navItem.classList.remove('active');
				menuItems[index].classList.remove('active');

			});

			//当前导航激活
			navItems[index].classList.add('active');
			menuItems[index].classList.add('active');
			//设置三角位置 设置位置为中间，计算位置
			arrow.style.left = navItems[index].offsetLeft + (navItems[index].offsetWidth - arrow.offsetWidth)/2 +'px';
		
       //设置主题内容滚动的距离
       contentListNode.style.top = -contentHeight*index + 'px';
       //上一个离场动画
       animationList[preIndex].outAnimation();
		//入场动画
	    animationList[index].inAnimation();
	    //设置preIndex
	    preIndex = index;
		}

})();
/*第一屏轮播图*/
(function(){
	//获取元素
	var iconItems = document.querySelectorAll('.icon-list .icon-item');//按钮
	var playItems = document.querySelectorAll('.play-list .play-item');//大图
    var index = 0; //正处在激活状态索引
    var isAnimated = false; //是否正在执行切换动画


    //设置自动轮播
    setInterval(function(){
    	var nextIndex = index < playItems.length - 1 ? index + 1 : 0;
    	setPlay(nextIndex,true);

    },5000);
	//每个按钮绑定单击事件
	iconItems.forEach(function(iconItem,iconIndex){
		iconItem.addEventListener('click',function(){

            setPlay(iconIndex);
		}); 

	});

    /**
    *实现轮播图切换
    *@param iconIndex 即将要显示的轮播项目索引
    *@param isAuto 是否自动播放，默认false
     */
    function setPlay(iconIndex,isAuto=false){
    	//判断是否正在执行动画
            if(isAnimated){
            	return ;
            }
            //设置正在执行动画
            isAnimated = true;
            //动画执行结束后
            setTimeout(function(){
            	isAnimated = false;
            },2000);


			//所有按钮失活
			iconItems.forEach(function (iconItem){
				iconItem.classList.remove('active');
			});
			iconItems[iconIndex].classList.add('active');//当前按钮激活
	       

	        if(iconIndex > index||isAuto){    //按钮索引大于当前索引，右边显示，左边隐藏
	             playItems[iconIndex].className = 'play-item right-show';
	             playItems[index].className = 'play-item left-hide';
	        }else if(iconIndex < index) {   //按钮索引小于当前索引，左边显示，右边隐藏
	        	playItems[iconIndex].className = 'play-item left-show';
	             playItems[index].className = 'play-item right-hide';
	        } 
	        index = iconIndex;  //重置索引值

    }
    
})();


// 第五屏气泡运动
(function(){
	var teamItems = document.querySelectorAll('.team3-item');
	var canvas = createCanvas();
	//绑定鼠标事件
	teamItems.forEach(function(teamItem){
		teamItem.addEventListener('mouseenter',function(){
			
			this.appendChild(canvas);
		});
		teamItem.addEventListener('mouseleave',function(){
			this.removeChild(canvas);
		});

	});



	//创建canvas
	function createCanvas(){
		var canvasnode = document.createElement('canvas');

		canvasnode.width = 236;
		canvasnode.height = 448;
		var ctx = canvasnode.getContext('2d');

		//存放绘制好的圆
		var circleArr = [];
		//生成圆数据
		setInterval(function(){
			var circle = {};			
			circle.r = 2 + Math.floor(Math.random()*8);
			var m = canvasnode.width - 2*circle.r;
			circle.x = circle.r + Math.floor(Math.random()*m);
			circle.y = canvasnode.height- circle.r;
		
			circle.red = Math.floor(Math.random()*256);
			circle.green = Math.floor(Math.random()*256);
			circle.blue = Math.floor(Math.random()*256);
			circle.opacity = 1;
			circle.deg = 0;//y变化增量
			circle.scale = 5 + Math.floor(Math.random()*6);//x扰动
			circle.rturn = 0.1;
			circleArr.push(circle);
		},70);

        //console.log(circleArr);
		//绘制气泡
		setInterval(function(){
			//清楚画布
			ctx.clearRect(0, 0,canvasnode.width,canvasnode.height);
			//遍历数组
			for(var i = 0; i < circleArr.length; i ++){
				//气泡位置变化
				circleArr[i].deg ++;
				circleArr[i].y -= circleArr[i].deg;
				circleArr[i].x += Math.sin(circleArr[i].deg)*circleArr[i].scale;
				circleArr[i].r += circleArr[i].rturn;
				circleArr[i].opacity -=0.01;
				if(circleArr[i].y < circleArr[i].r){
					circleArr.splice(i,1);
					continue;
				}
				//绘制
				ctx.beginPath();
				ctx.arc(circleArr[i].x,circleArr[i].y,circleArr[i].r,0 ,Math.PI*2);
				ctx.fillStyle = 'rgba('+circleArr[i].red+','+circleArr[i].green+','+circleArr[i].blue+','+circleArr[i].opacity+')';
				ctx.fill();
			}

		},100);
		//
		return canvasnode;

	}
})();


//背景音乐
(function(){
	var musicnode = document.querySelector('.music');
	var audionode = document.querySelector('#audio');

	//绑定时间
	musicnode.addEventListener('click',function(){
		if(audionode.paused){
			audionode.play();
			musicnode.classList.add('played');
		}else{
			audionode.pause();
			musicnode.classList.remove('played');
		}
	});

})();