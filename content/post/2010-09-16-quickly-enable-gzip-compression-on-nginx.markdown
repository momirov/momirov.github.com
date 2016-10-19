---
author: Vladimir
categories: nginx
comments: true
date: 2010-09-16T17:58:59Z
slug: quickly-enable-gzip-compression-on-nginx
status: publish
title: Quickly enable gzip compression on Nginx
url: /2010/09/quickly-enable-gzip-compression-on-nginx/
---

I've noticed today that css and javascript files are not getting
gziped on my Nginx server. Gzip was turned on and it was working
for html files but we have to tell nginx what additional content we
need gziped
{{< highlight nginx >}}
gzip on;
gzip_http_version 1.1;
gzip_comp_level 5; # compression level, from 1-9, 9 = max
gzip_types
    text/plain
    text/css
    application/x-javascript
    text/xml
    application/xml
    application/xml+rss
    text/javascript;
{{< /highlight >}}

Just paste this code in http section of the nginx.conf file and
you're done.
