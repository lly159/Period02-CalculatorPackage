function caculation(comein)
{
	var container=document.getElementById(comein)
	var value=new Array("%","√","x²","1/x","CE","C","←","÷","7","8","9","×","4","5","6","-","1","2","3","+","±","0",".","=");
	var INPUT=document.createElement('input');//创建input标签
	INPUT.style.width=236+"px";
	INPUT.style.height=70+"px";
	INPUT.value="0";
	container.appendChild(INPUT);//将input放入container中
	var x = new Array();
	for(a=0;a<6;a++)//用div占行
	{
		x[a]=document.createElement('div');
		x[a].width=320+"px";
		x[a].height=480+"px";
		container.appendChild(x[a]);//将div放入container中
	}
	for(a=0,b=0;a<24;a++)//创建计算器按钮（button）
	{
		BUTTON=document.createElement('button');
		BUTTON.innerHTML=value[a];
		BUTTON.style.width=60+"px";
		BUTTON.style.height=60+"px";
		BUTTON.style.background="rgb(250,248,148)";
			switch(a)
			{ //绑定事件，待执行
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				BUTTON.onclick=orderInOver(this);

				break;
				case 7:
				BUTTON.onclick=function()
				{
					operatorIn(this);
				};
				break;
				case 8:
				case 9:
				case 10:
				BUTTON.onclick=function()
				{
					numIn(this);
				};
				break;
				case 11:
				BUTTON.onclick=function()
				{
					operatorIn(this);
				};
				break;
				case 12:
				case 13:
				case 14:
				BUTTON.onclick=function()
				{
					numIn(this);
				};
				break;
				case 15:
				BUTTON.onclick=function()
				{
					operatorIn(this);
				};
				break;
				case 16:
				case 17:
				case 18:
				BUTTON.onclick=function()
				{
					numIn(this);
				};
				break;
				case 19:
				BUTTON.onclick=function()
				{
					operatorIn(this);
				};
				break;
				case 20:
				BUTTON.onclick=function()
				{
					orderInOver(this);
				};
				break;
				case 21:
				case 22:
				BUTTON.onclick=function()
				{
					numIn(this);
				};
				break;
				case 23:
				BUTTON.onclick=function()
				{
					orderIn(this);
				};
				break;				
			}			
		x[b].appendChild(BUTTON);//将button放入div中
		if((a+1)%4==0)//模拟换行
			{
				b++;
			}
	}
	var i=true;//是否得出了不能退格的运算结果
	var flag=true;//是否计算器被"ERROR"锁死
	var INPUT;//input标签里的临时数据
	var first=0;//第一操作数
	var second=0;//第二操作数
	var pointer=1;//记录正在对第几操作数进行访问的指针
	var operator;//双目运算符
	var operatorOver;//单目运算符
	var afterCaculation=false;//是否进行过计算
	function numIn(obj)
	{//每敲击一下数字后进行的操作
		if(flag==true)
		{
			if( afterCaculation == false && operator && first && (!second))// 将要输入第二个数
			{					
				pointer = 2;
				INPUT.value = 0;
				i=true;
			}
			if(afterCaculation == true && pointer == 1)//进行完一次运算后将要输入第一个数
			{
				INPUT.value = 0;
				afterCaculation = false;
				i=true;
			}
			if( INPUT.value == "0" )//如果是开始要输入第一个数或第二个数
			{ 
				if(obj.innerHTML!=".")
					INPUT.value = obj.innerHTML;
				else 
				{
					INPUT.value ="0"+ obj.innerHTML;
				}
			}
			else
			{//输入第一或第二个数的过程中，即已经点击了一次数字后

				if(INPUT.value .indexOf(".")<0)
				{
					INPUT.value = INPUT.value + obj.innerHTML;//字符串相加
				}	
				if(INPUT.value .indexOf(".") > 0 )
				{
					if(obj.innerHTML==".")
					{
						INPUT.value = INPUT.value;
					}
					if(obj.innerHTML!=".")
					{
						INPUT.value = INPUT.value + obj.innerHTML;
					}
				}
			}
			if(pointer == 1)//输入完成将临时变量赋给真正要操作的数1
			{
				first = INPUT.value;			
			} 
			else if(pointer == 2)//输入完成将临时变量赋给真正要操作的数2
			{
				second = INPUT.value;			
			}        
		}			
	}//函数执行后完成了对first second的赋值             
	 function operatorIn(obj)//运算符的计入
	 {
	 	if(flag==true)
	 	{
	 		INPUT.value=INPUT.value-0;
	 		if(second&&pointer==2)//如果不点“=”继续点击运算符
		 	{
		 		orderIn(obj);
		 	}
		 	operator = obj.innerHTML;		 	
		 	if(pointer == 1)//如果上一步正在对第一操作数访问
		 	{
		 		pointer=2;

		 	}
		 	second =0;
		 	afterCaculation = false;
	 	}	
	 }
	 function orderIn(obj)//按下等于后进行的双目运算
	 {
	 	if(flag==true)
	 	{
	 		if(operator=="+")
	 		{
	 			if(!second)//如果不输入第二操作数
	 			{	 				
	 				second = first;
	 			}
	 			var r1,r2,m;
				try{r1=first.toString().split(".")[1].length}catch(e){r1=0}
				try{r2=second.toString().split(".")[1].length}catch(e){r2=0}
				m=Math.pow(10,Math.max(r1,r2));
				first = (first*m+second*m)/m;//进行大致精确的运算		 			
	 		}
	 		else if(operator=="-")
	 		{
	 			if(!second)
	 			{
	 				second = first;
	 			}
	 			var r1,r2,m,n;
			    try{r1=first.toString().split(".")[1].length}catch(e){r1=0}
			    try{r2=second.toString().split(".")[1].length}catch(e){r2=0}
			    m=Math.pow(10,Math.max(r1,r2));
			    n=(r1>=r2)?r1:r2;
 				first =((first*m-second*m)/m).toFixed(n);	 			
	 		}
	 		else if(operator=="×")
	 		{
	 			if(!second)
	 			{	
	 				second = first;
	 			}
	 			var m=0,s1=first.toString(),s2=second.toString();
				 	try{m+=s1.split(".")[1].length}catch(e){}
				try{m+=s2.split(".")[1].length}catch(e){}
				first= Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	 		}
	 		else if(operator=="÷")
	 		{
	 			if(!second)
	 			{
	 				second = first;
	 			}
	  			if(second!=0)
	 			{
	 				var t1=0,t2=0,r1,r2;
					try{t1=first.toString().split(".")[1].length}catch(e){}
					try{t2=second.toString().split(".")[1].length}catch(e){}
						with(Math)
						{
        				r1=Number(first.toString().replace(".",""));
        				r2=Number(second.toString().replace(".",""));
        				first =(r1/r2)*pow(10,t2-t1);
	 				}
	 			}
	 			else//除数为0显示"Error"锁死计算器
	 			{
	 				first ="Error";
	 				flag=false;
	 			}
	 		}
	 		if((first - 0)==0)
	 			INPUT.value=first="0";//防止小数点后有多个无意义的0存在
 			INPUT.value = (first-0);//字符型转化为数字
 			pointer = 1;
			afterCaculation = true;//视为已经经过一次计算
			i=false;//计算结果不能退格
	 	}
	 	if(INPUT.value=="NaN"||INPUT.value=="Infinity"||INPUT.value=="null"||INPUT.value=="undefined")
	 		{
	 			INPUT.value="Error";
	 			flag=false;
	 		}//如果计算结果出现以上的错误字符，无条件置为“Error”		 		
	 }
	 function orderInOver(obj)//按下单目运算符进行的操作
	 {
	 	operatorOver = obj.innerHTML;		 	
	 	if(flag==true)
	 	{
		 	if(operatorOver=="1/x")
	 		{
	 			if(pointer==1)
	 			{
	 				if(first==0)//取倒数对象不能为0
			 		{
			 			INPUT.value="Error";
			 			flag=false;
			 		}
			 		else
			 		{
			 			INPUT.value=1/parseFloat(INPUT.value); 
	 					first=INPUT.value;
			 		}						
	 			}
	 			if(pointer==2)
	 			{
	 				if(!second)
	 				{
	 					second=1/parseFloat(INPUT.value); 
	 					INPUT.value=1/parseFloat(INPUT.value); 
	 				}
	 				else if(second)
	 				{
				 		INPUT.value=1/parseFloat(INPUT.value); 
		 				second=INPUT.value;
	 				}		 				
	 			}
	 			afterCaculation=true;
	 			i=false;
		 	}
		 	else if(operatorOver=="√")
		 	{
	 				if(pointer==1)
			 		{
			 			first=Math.sqrt(first);
			 			INPUT.value = first;
			 		}
			 		else if(operator&&!second)
			 		{
			 			second=Math.sqrt(first);
			 			INPUT.value = second;
			 		}
			 		else if (pointer==2) 
			 		{
			 			second=Math.sqrt(second);
			 			INPUT.value = second;
	 				}
		 		afterCaculation=true;
		 		i=false;
		 	}
		 	else if(operatorOver=="x²")
	 		{
	 			if (pointer==1)
	 			{
		 			var m=0,s1=first.toString(),s2=first.toString();
				 	try{m+=s1.split(".")[1].length}catch(e){}
					try{m+=s2.split(".")[1].length}catch(e){}
					first= Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	 				INPUT.value = first;
	 			}
	 			else if(operator&&!second)
	 			{
	 				second=first;
	 				var m=0,s1=second.toString(),s2=second.toString();
				 	try{m+=s1.split(".")[1].length}catch(e){}
					try{m+=s2.split(".")[1].length}catch(e){}
					second= Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	 				INPUT.value = second;
	 			}
 				else if(pointer==2)
 				{
 					var m=0,s1=second.toString(),s2=second.toString();
				 	try{m+=s1.split(".")[1].length}catch(e){}
					try{m+=s2.split(".")[1].length}catch(e){}
					second= Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	 				INPUT.value = second;
 				}
 				afterCaculation=true;
 				i=false;
	 		}
		 	else if(operatorOver=="±"&&INPUT.value!="0")//不为0取反
	 		{
	 			if(pointer==1)
	 			{
	 				if(first[0]!="-")
					{
	 					first="-"+first;
	 					INPUT.value = first;
 					}
 					else if(first[0]=="-")
 					{
	 					first=first.substring(1);//如果第一个为"-"则去掉第一个符号 
	 					INPUT.value = first;
	 				}
		 		}
		 		else if(operator&&!second)
		 		{
		 			if(first[0]!="-")
 					{
	 					second="-"+first;
	 					INPUT.value =second;
	 					pointer=2;
 					}
 					else if(first[0]=="-")
 					{
	 					second=first.substring(1);
	 					INPUT.value =second;
	 					pointer=2;
	 				}
		 		}
	 			else if(pointer==2)
 				{
 					if(second[0]!="-")
 					{
	 					second="-"+second;
	 					INPUT.value = second;
 					}
 					else if(second[0]=="-")
 					{
	 					second=second.substring(1);
	 					INPUT.value = second;
 					}
				}
	 		}
		 	else if(operatorOver=="←")
	 		{
	 			if(pointer==1&&i==true)
	 			{
		 			INPUT.value =INPUT.value.substring(0,INPUT.value.length-1);//字符串删除最后一个字符
		 			first=INPUT.value;
		 			if(INPUT.value.length==0||first==0)//字符串中只剩最后一个字符或操作数是值为0的字符串，无条件置为0
		 			{
		 				INPUT.value=0;
		 				first="0";
		 			}
		 			if(INPUT.value.length==1&&first[0]=="-")//如果字符串还有两个字符且字符串代表一个负数时
		 			{
		 				INPUT.value=0;
		 				first="0";
		 			}
	 			}
	 			else if(pointer==2&&second&&i==true)
	 			{
		 			INPUT.value =INPUT.value.substring(0,INPUT.value.length-1);
		 			second=INPUT.value;
		 			if(INPUT.value.length==0)
		 			{
		 				INPUT.value=0;
		 				second="0";	
		 			}
	 			}
	 		}
	 	}
		if(operatorOver=="C")//按下'C'时全部初始化
	 		{
 				first="0";
 				second="0";
 				INPUT.value =0;	
 				pointer = 1;
 				afterCaculation=false;
 				flag=true;
 				i=true;
 				operator="0";
 				operatorOver="0";
 			}
 		else if(operatorOver=="CE")
	 		{
	 			if(pointer==1)
	 			{
	 				first = "0";
	 				INPUT.value =0;	
	 			}
	 			else if(pointer==2)
	 			{
	 				INPUT.value =0;
	 				second="0";	
	 			}
 				if(flag==false)//如果计算器处在报错后被锁住的状态，初始化
	 			{
	 				first="0";
 					second="0";
 					INPUT.value =0;	
 					pointer = 1;
 					afterCaculation=false;
 					flag=true;
 					i=true;
 					operator="0";
 					operatorOver="0";
	 			}
	 		}
 		if(INPUT.value=="NaN"||INPUT.value=="Infinity"||INPUT.value=="null"||INPUT.value=="undefined")
 		{
 			INPUT.value="Error";
 			flag=false;
 		}		 	
	 }
}