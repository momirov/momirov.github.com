---
author: Vladimir
categories: CakePHP
comments: true
date: 2010-09-16T16:32:57Z
slug: better-sprintf-cakephp-stringinsert
status: publish
title: 'Better sprintf: CakePHP String::insert'
url: /2010/09/better-sprintf-cakephp-stringinsert/
---

Today I was re-factoring my code a bit and in some places decided
that string concatenation needs to go. Simple example:
{{< highlight php >}}
<?php
  echo $html->link(
    __('Download', true),
    '/'.$material['dir'].'/'.$material['filename']
  );
?>
{{< /highlight >}}
Easy answer is sprintf:
{{< highlight php >}}
<?php
  echo $html->link(
    __('Download', true),
    sprintf(
      '/%s/%s',
      $material['dir'],
      $material['filename']
    )
  );
?>
{{< /highlight >}}
But this isn't very descriptive.
[String::insert](http://api.cakephp.org/class/string#method-Stringinsert)
does it the proper way:
{{< highlight php >}}
<?php
  echo $html->link(
    __('Download', true),
    String::insert(
      '/:dir/:name',
      array(
        'dir' => $material['dir'],
        'name' => $material['filename']
      )
    )
  );
?>
{{< /highlight >}}
Now that's elegance.
