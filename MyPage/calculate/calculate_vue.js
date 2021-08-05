var vm=new Vue({
	  el:"#app",
	  data:{
	    equation:"0",
	    isDecimalAdded:false,//判断是否输入小数点
	    isOperatorAdded:false,//判断是否点击加减乘除
	    isStarted:false,//判断计算器是否已经开始输入数字
	  },
	  methods:{
	    isOperator(character){
	      return['+','-','×','÷'].indexOf(character)>-1
	    },
	    append(character){
			//计算机开始输入之前，保证数字是0
		  if(this.isStarted==false && !this.isOperator(character)&&character!=="."){
			  this.equation="0";
		  }
		  if(this.isStarted==false && this.isOperator(character)){
			  this.isStarted=true;
		  }
		  //第一个输入
	      if(this.isStarted===false && !this.isOperator(character)){
			  if(character==="."){
				  this.equation+=''+ character;
				  this.isDecimalAdded=true;
			  }else{
				  this.equation =''+ character;
			  }
			  this.isStarted=true;
			  return
		  }
		  //输入加减乘除以外的输入
		  if(!this.isOperator(character)){
			  if(character==="." && this.isDecimalAdded){
			  	return
			  }
			  if(character==="."){
				  this.isDecimalAdded=true;
				  this.isOperatorAdded=true;
			  }else{
				  this.isOperatorAdded=false;
			  }
			  this.equation+=''+ character;
		  }
		  //点击加减乘除
		  if(this.isOperator(character) && !this.isOperatorAdded){
			  this.equation+=''+character
			  this.isDecimalAdded=false
			  this.isOperatorAdded=true

		  }
	    },
		// When pressed '='
	    calculate(){
			let result = this.equation
				.replace(new RegExp("×", "g"), "*")
				.replace(new RegExp("÷", "g"), "/")
			let ans = eval(result)
			this.equation = (ans < 1.0e9 ? parseFloat(ans.toFixed(9)):ans.toExponential(3)).toString()
			this.isDecimalAdded = false
			this.isOperatorAdded = false
		    this.isStarted=false
	    },
		// When pressed '+/-'
	    calculateToggle(){
	      if(this.isOperatorAdded||!this.isStarted){
			  return
		  }
		  this.equation=this.equation+'* -1'
		  this.calculate()
	    },
		// When pressed '%'
	    calculatePercentage(){
	      if(this.isOperatorAdded||!this.isStarted){
			  return
	      }
	      this.equation=this.equation+'* 0.01'
	      this.calculate()
	    },
		// When pressed 'AC'
	    clear(){
	      this.equation="0"
	      this.isDecimalAdded=false
	      this.isOperatorAdded=false
	      this.isStarted=false
	    }
	  }
	})