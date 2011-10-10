---
author: Vladimir
date: '2011-05-11 14:16:36'
layout: post
slug: apache-like-nginx-vhost-layout
status: publish
title: Apache-like Nginx vhost layout
categories: nginx
comments: true
---

I love how apache vhost files are organized under Debian. We have
two directories, one with all available sites (sites-available) and
one with enabled sites (sites-enabled), enabled sites are just a
symlink to conf file in sites-available directory. So if we want to
enable one site just symlink it to sites-enabled directory and
reload nginx, also when we need to disable a site we only delete
the symlink for that vhost from sites-enabled. Because we only
deleted symlink conf file remains if we want to enable that site
again. All commands below are executed with root privileges! First
thing first, we need to create directories for our config files, go
into nginx conf directory (for me /opt/nginx/conf) and execute:
    mkdir sites-available sites-enabled

Now open nginx.conf in your favourite editor. You will get
something like this:
    user nginx www;
    worker_processes  3;
    events {
        worker_connections  1024;
    }

    http {
        passenger_max_pool_size 4;
        passenger_pool_idle_time 3000;
        passenger_max_instances_per_app 2;
        include       mime.types;
        default_type  application/octet-stream;

        sendfile        on;
        keepalive_timeout  65;
        server_tokens off;
        gzip  on;
        client_max_body_size 200M;

        server {
            listen       80;
            server_name  localhost;
            location / {
                root   html;
                index  index.html index.htm;
            }
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
        }
    }

See the server section? Thats one virtual host and we want to
extract it into separate vhost file. Cut and paste that section to
a new file inside sites-available and name it localhost. Contents
of a localhost file should be:
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

In nginx.conf file instead of server section that we cutted we have
to include out sites-enabled directory. We can do that with
"include sites-enabled/\*;" line, and at the end nginx.cong should
look like:
    user nginx www;
    worker_processes  3;
    events {
        worker_connections  1024;
    }

    http {
        passenger_max_pool_size 4;
        passenger_pool_idle_time 3000;
        passenger_max_instances_per_app 2;
        include       mime.types;
        default_type  application/octet-stream;

        sendfile        on;
        keepalive_timeout  65;
        server_tokens off;
        gzip  on;
        client_max_body_size 200M;

        include sites-enabled/*;
    }

We just need to do two things, symlink localhost file from
sites-available to sites-enabled and reload nginx conf.
    ln -s sites-available/localhost sites-enabled/localhost
    /etc/init.d/nginx reload

We are done with the setup, when you have the need to add another
site you just add another file to sites-available directory, I for
example have www.vladimirm.com file witch contains:
    server {
        listen   80;
        server_name www.vladimirm.com vladimirm.com;
        gzip on;
        gzip_http_version 1.1;
        gzip_comp_level 2;
        gzip_types    text/plain text/css
                      application/x-javascript text/xml
                      application/xml application/xml+rss
                      text/javascript;

        location / {
            index  index.html index.htm index.php;
        }
    }

And I just symlink it and reload nginx:

    ln -s sites-available/www.vladimirm.com sites-enabled/www.vladimirm.com
    /etc/init.d/nginx reload

If I need to disable www.vladimirm.com i just delete symlink to it
from sites-enabled and reload nginx.

    rm sites-enabled/www.vladimirm.com
    /etc/init.d/nginx reload

That way we don't loose the config file if we have to re enable the
site.



