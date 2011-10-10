---
author: Vladimir
date: '2010-09-16 16:32:57'
layout: post
slug: better-sprintf-cakephp-stringinsert
status: publish
title: 'Better sprintf: CakePHP String::insert'
categories: CakePHP
comments: true
---

Today I was re-factoring my code a bit and in some places decided
that string concatenation needs to go. Simple example:
{% codeblock lang:php %}
<?php echo $html->link(__('Download', true), '/'.$material['dir'].'/'.$material['filename']); ?>
{% endcodeblock %}
Easy answer is sprintf:
{% codeblock lang:php %}
<?php echo $html->link(__('Download', true), sprintf('/%s/%s', $material['dir'], $material['filename'])); ?>
{% endcodeblock %}
But this isn't very descriptive.
[String::insert](http://api.cakephp.org/class/string#method-Stringinsert)
does it the proper way:
{% codeblock lang:php %}
<?php echo $html->link(__('Download', true), String::insert('/:dir/:name', array('dir'=>$material['dir'], 'name' => $material['filename']))); ?>
{% endcodeblock %}
Now that's elegance.


