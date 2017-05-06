## How to: Allow Node to bind to port 80 without sudo

### TL;DR

*Only do this if you understand the consequences: all node programs will be able to bind on ports < 1024*

    sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
    
Important: your node location may vary. Use `which node` to find it, or use it directly in the command:

    sudo setcap 'cap_net_bind_service=+ep' `which node`

### Explanation

In UNIX-like systems, non-root users are unable to bind to ports lower than 1024.

This is a nuisance when proxying adresses on port 80. Tipically, you end up `sudo`ing all apps that must bind to such ports.

However, since kernel 2.6.24, you can use the `setcap` command to set specific capabilities to a program.

To enable **all node programs to bind on any port lower than 1024**, issue the following command:

    sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

*Voilà*! You can now bind to port 80 without `sudo`ing. 

If your `node` binary isn't on this path, find it with `whereis node` and substitute `/usr/local/bin/node` for wherever it is.

### Important Caveat

`setcap` functions *per-program*. Therefore, if you update your node version you will probably need to run this command again.

----------------

source: http://stackoverflow.com/a/414258