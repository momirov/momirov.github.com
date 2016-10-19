---
author: Vladimir
categories: postgresql
comments: true
date: 2013-11-23T00:00:00Z
published: true
title: Basic postgresql benchmarking in 10 minutes with pgbench
url: /2013/11/basic-postgresql-benchmarking-in-10-minutes-with-pgbench/
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

    pgbench -i -s 1000

     schemaname |     relname      | n_live_tup
    ------------+------------------+------------
     public     | pgbench_accounts |  100000000
     public     | pgbench_tellers  |      10000
     public     | pgbench_branches |       1000
     public     | pgbench_history  |          0


Default configuration results:


```pgbench -c 10 -T 60```

{{% chart id="before" width="950" height="300" js="/js/beforeChart.js" %}}

Shown on Y axis is number of successful connections in 60 seconds, on the X axis client number. Chart shows us that we hit a limit of 100 concurent connections and
also sweet spot for current configuration is around 50 concurrent connections. For the sake of benchmark we raised Postgresql connection limit to 1000. We didn't do any other tweaks.


{{% chart id="after" width="950" height="300" js="/js/afterChart.js" %}}

## Conclusion

Benchmarking Postgresql is vital before deploying your app. It can uncover obvious problems. Please do this, it doesn't take much time.
