+++
description = ""
date = "2016-10-19T12:52:06+02:00"
title = "Fix kswapd0 using 100% CPU on Amazon EC2"

+++

This problem affects me frequently since Ubuntu has released version 16.04.
It has a bug with low memory systems. This is especially bad on instances with
CPU credits, since this bug will eat them all. Adding swap file doesn't help and one
way to fix this issue on Amazon is to override udev rules from
``/lib/udev/rules.d/40-vm-hotadd.rules.`` and reboot the system after. Reboot is
required.

    touch /etc/udev/rules.d/40-vm-hotadd.rules
    reboot

When you login you can also drop caches to make the machine more responsive,
this temporary reduces CPU usage, but it will go up again after some time.

    echo 1 > /proc/sys/vm/drop_caches
