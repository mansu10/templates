

	var calculator = {


		view : function(el){

			//var clear = false;
			var self = this;
			this.depends = {
				keys : [
					'1','2','3','+',
					'4','5','6','-',
					'7','8','9','x',
					'0','.','=','/'
					],
				styles : ".cal-wrapper{width: 348px; background: #8cc540; border-radius: 10px; margin:0 auto; margin-top:50px; padding: 5px 0 5px 5px; overflow: hidden;}.cal-c{width:80px; height:30px; margin:-32px 5px 0 0; cursor:pointer; float:right; text-align:center; line-height:30px; border-radius:5px; background: #cd7bdd; border:1px solid #ddd;}.cal-c:hover{background:#887ddd;transition:all .5s;color:#fff;}.cal-result{text-align: right; height: 75px; width: atuo; position: relative; display: block; border: 1px solid #ddd; border-radius:5px; margin:0 5px 40px 0; line-height: 75px; background: #ccc;}	.cal-key li{float: left; width:80px; height: 75px; line-height: 75px; text-align: center; border: 1px solid #ddd;  margin: 5px 5px 0 0; border-radius: 5px; background: #eee; cursor: pointer;}	.cal-key li:hover{background: #009f5d; color: #fff; transform:scale(0.9, 0.9); transition:all .5s;}"
			
			}
			this.init = function(id){
				//创建样式
				var style = document.createElement('style');
				style.type = 'text/css';
				var sData = document.createTextNode(this.depends.styles);
				style.appendChild(sData);
				var head = document.getElementsByTagName('head')[0];
				head.appendChild(style);

				//创建节点
				oParent = document.getElementById(id);

				var oDiv = document.createElement('div');
				oDiv.className = 'cal-wrapper';

				var oSpan = document.createElement('span');
				oSpan.className = 'cal-result';

				var oClear = document.createElement('div');
				oClear.className = 'cal-c';
				oClear.appendChild(document.createTextNode('C'));
				
				var oUl = document.createElement('ul');
				oUl.className = 'cal-key';

				for(var i = 0; i < this.depends.keys.length; i++){
					var oLi = document.createElement('li');
					oLi.appendChild(document.createTextNode(this.depends.keys[i]));
					oUl.appendChild(oLi);
				}

				// oSpan.appendChild(document.createTextNode('0'));
				oDiv.appendChild(oSpan);
				oDiv.appendChild(oClear);
				oDiv.appendChild(oUl);
				oParent.appendChild(oDiv);
				

			}


			this.init(el);
			
			// var oText = document.querySelector('#'+el+' .cal-result');document.getElementById(el).getElementsByTagName('span')[0];

			this.showText = function(val){
				var oth = document.querySelector('#'+el+' .cal-result');

				oth.innerHTML = val;
			}

			this.getInput = function(){
				var oLi = document.querySelectorAll('#'+el+' .cal-key li');
				var oController = new calculator.controller(self);
				for(var i = 0; i < oLi.length; i++){
					oLi[i].onmousedown = function(){
						var val = this.innerHTML;
						oController.oInput(val);

					}
				}
				var oClear = document.querySelector('#'+el+' .cal-c');
				oClear.onmousedown = function(){
					oController.oInput(oClear.innerHTML);
				}
				
			}();

		},


		model : function(){
			var result = 0;

			this.setVal = function(val){
				result = val;
			}

			this.getVal = function(){
				return result;
			}

		},

		controller : function(view){
			var t = {};
			t.result = 0;
			t.snum = '';
			t.tnum = '';
			t.oper = '';
			t.bclear = false;

			//从model中获取值，计算框初始化
			var model = new calculator.model();
			view.showText(model.getVal());

			//执行计算
			this.operate = function(num1,num2,oper){
				var result = 0;
				switch(oper){
					case '+':
						result = num1 + num2; 
						break;
					case '-':
						result = num1 - num2; 
						break;
					case 'x':
						result = num1 * num2; 
						break;
					case '/':
						result = num1 / num2; 
						break;
					default:
						result = num2; 
						break;


				}
				return result;
			}


			//获取输入值
			this.oInput = function(val){
				switch(val){
					case '=':
						t.result = this.operate(Number(t.snum,10),Number(t.tnum,10),t.oper); 
						model.setVal(t.result);
						t.tnum = t.result;
						t.snum = '';
						t.bclear = true;
						break;
					case '+':
					case '-':
					case 'x':
					case '/':

						 
						if (t.snum.length != 0 ) {
							t.snum = this.operate(Number(t.snum,10),Number(t.tnum,10),t.oper);
							model.setVal(t.snum);
							console.log(t.snum);
						}else{

							t.snum = Number(t.tnum,10);
							console.log(t.snum);
						};
						t.tnum = '';
						t.oper = val;
						break;
					case 'C':
						t.tnum = '';
						t.snum = '';
						t.oper = '';
						t.result = 0;
						model.setVal(0);
						break;	
					default:
						if (t.bclear == true) {
							t.tnum = '';
							t.bclear = false;
						};
						t.tnum += val;
						console.log(t.tnum);
						//将改变的值存入model
						model.setVal(t.tnum);
						break;

				}

				
				//通知view改变值
				view.showText(model.getVal());
			}
		}
	};






