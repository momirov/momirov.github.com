---
author: Vladimir
categories: mongodb
comments: true
date: 2011-06-04T08:18:40Z
slug: export-files-from-mongodb-gridfs-with-directory-paths
status: publish
title: Export files from MongoDB GridFS with directory paths
url: /2011/06/export-files-from-mongodb-gridfs-with-directory-paths/
---

MongoDB and GridFS are awesome, but I had to migrate some data to
MySQL database. The biggest problem is that I used GridFS to store
uploaded files. After unsuccessfully  searching online I decided to
write my own bash export script. How to export all the files out of
mongodb gridfs? Here's the script:

{{< highlight bash >}}
#! /bin/bash
_host="${1:?Usage: gridfs host db}"
_db="${2:?Usage: gridfs host db}"
while read -r line; do
    file=$(echo "$line" | awk -F'\t' '{ print $1 }')
    [[ $file == 'connected to'* ]] && continue
    directory=${file%/*}
    mkdir -p $directory
    mongofiles -h $_host -db $_db get $file
done < <(mongofiles -h $_host -db $_db list)
{{< /highlight >}}

Script takes two parameters, first one is the hostname of the
mongodb instance and the second is database.

For example: ``./gridfs localhost scen`` will export all files
from scen database on localhost to current directory, if you have
directory structure in GridFS, it will create that directories too.
