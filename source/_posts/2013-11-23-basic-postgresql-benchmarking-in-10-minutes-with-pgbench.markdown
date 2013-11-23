---
author: Vladimir
layout: post
title: "Basic postgresql benchmarking in 10 minutes with pgbench"
date: 2013-11-23 12:16
comments: true
categories: postgresql 
published: true
---

## Why benchmark?

Benchmark can be used beforehand to uncover hidden problems. Maybe I forgot to increase
connection limit of 100 for a server that is expecting high load, maybe there is not
enough resources to handle that many clients, etc, you get the picture.

## Why pgbench?

For me there are two things: it is fast to setup, it is simple to use. You can checkout
[pgbench page](http://www.postgresql.org/docs/9.1/static/pgbench.html) on
postgresql.org for all options and how it exactly works.

## The benchmark

For this benchmark I used 2 droplets on
[Digital Ocean (refferal link)](https://www.digitalocean.com/?refcode=92eab3d251a3),
8gb for the server and 2gb for a client. Both droplets are running Ubuntu 13.04 and
postgresql 9.1 is installed from repos. Pgbench tables where initialized with scale
factor 1000 because we will run the benchmark with max 1000 simultaneous connections.
{% codeblock %}
pgbench -i -s 1000

 schemaname |     relname      | n_live_tup 
------------+------------------+------------
 public     | pgbench_accounts |  100000000
 public     | pgbench_tellers  |      10000
 public     | pgbench_branches |       1000
 public     | pgbench_history  |          0
{% endcodeblock %}

Default configuration results:


pgbench -c 10 -T 60

<script src="{{ root_url }}/javascripts/libs/chart.js"></script>

<canvas id="before" width="950" height="300"></canvas>

<script>

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
	animation : true,
	animationSteps : 60,
	animationEasing : "easeOutQuart",
	onAnimationComplete : null
}

var data = {
	labels : ["10","50","100","200","500","1000"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [64672,98314,95413,0,0,0]
		}
	]
}
var ctx = document.getElementById("before").getContext("2d");
var before = new Chart(ctx).Line(data,options);
</script>

Shown on Y axis is number of successful connections in 60 seconds, on the X axis client number. Chart shows us that we hit a limit of 100 concurent connections and
also sweet spot for current configuration is around 50 concurrent connections. For the sake of benchmark we raised Postgresql connection limit to 1000. We didn't do any other tweaks.

<canvas id="after" width="950" height="300"></canvas>

<script>

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
	animation : true,
	animationSteps : 60,
	animationEasing : "easeOutQuart",
	onAnimationComplete : null
}

var data = {
	labels : ["10","50","100","200","500","1000"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [55057,90097,94281,87864,71330,50572]
		}
	]
}
var ctx = document.getElementById("after").getContext("2d");
var after = new Chart(ctx).Line(data,options);
</script>

## Conclusion

Benchmarking Postgresql is vital before deploying your app. It can uncover obvious problems. Please do this, it doesn't take much time.
