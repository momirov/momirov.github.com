(function () {
  var options = {
  	scaleOverlay : false,
  	scaleOverride : false,
  	scaleSteps : null,
  	scaleStepWidth : null,
  	scaleStartValue : null,
  	scaleLineColor : "rgba(0,0,0,.1)",
  	scaleLineWidth : 1,
  	scaleShowLabels : true,
  	scaleLabel : "<%=value%>",
  	scaleFontFamily : "'Arial'",
  	scaleFontSize : 12,
  	scaleFontStyle : "normal",
  	scaleFontColor : "#666",
  	scaleShowGridLines : true,
  	scaleGridLineColor : "rgba(0,0,0,.05)",
  	scaleGridLineWidth : 1,
  	bezierCurve : false,
  	pointDot : true,
  	pointDotRadius : 3,
  	pointDotStrokeWidth : 1,
  	datasetStroke : true,
  	datasetStrokeWidth : 2,
  	datasetFill : true,
  	animation : false,
  	animationSteps : 60,
  	animationEasing : "easeOutQuart",
  	onAnimationComplete : null
  }

  var data = {
  	labels : ["10","50","100","200","500","1000"],
  	datasets : [
  		{
        label: 'Queries',
  			fillColor : "rgba(220,220,220,0)",
  			strokeColor : "rgba(220,220,220,1)",
  			pointColor : "rgba(220,220,220,1)",
  			pointStrokeColor : "#fff",
  			data : [64672,98314,95413,0,0,0]
  		}
  	]
  };

  var ctx = document.getElementById("before").getContext("2d");
  var before = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options,
  });

}());
