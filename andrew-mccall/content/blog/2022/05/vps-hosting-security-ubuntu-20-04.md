---
title: VPS Hosting Security: A Crash Course On VPS Configuration
date: 2022-05-14
image: /images/blog/2022/vps-hosting-security-1200x600.webp
tags:
- Server
- Hosting
- Security
description: Using a virtual private server can be a great way to host web applications.  VPS hosting security is one important part of self hosting your application
draft: false
---

 ## VPS Hosting Security: What Do I Need To Know

 Self-hosting websites and web applications give you the ultimate control over your hosting but require a bit of knowledge to implement __VPS Hosting Security__.  Have you ever tried to ssh into a shared server at hostinger only to find that they have bricked almost all essential functionality?  The downfall of doing it yourself and having ultimate control is that your server will not be security-hardened out of the box.  

 This is a great opportunity to learn about some great linux tools and the basics to __vps hosting security__.  

 To get started with __VPS hosting security__ go to [https://linode.com](https://linode.com "linode.com") and sign up for an account. This is not an affiliate link but they give you $100 free when you sign up and they have real humans for customer support.

## Setting Up And Preparing Your Virtual Private Server

After you create a new account you will want to create your first linode.  For this example, pick a cheap shared cpu vps with 1gb of ram.  It will only cost you $5 dollars if you leave it running all month.  You will need to set up a password for the root account.  Make it really secure.  I personally like to generate 64 character long strings with a random string generator and save it to a password locker.  

Next, we will want to log into the ssh.  All operating systems have some sort of ssh ready to go.  To log into your ssh you will need to open up an available terminal

## Ubuntu Enable UFW: How to enable Ubuntu's out of the box firewall

The first thing we need to do is enable the firewall. ssh into your server and type ufw allow OpenSSH.  Then type "ufw enable" then "ufw status"  you should see your firewall rule.  We need to do this right away.   The reason you want to activate the firewall in this manner is because typically what happens is bots are standing by to attempt to brute force your vps even before you do anything.  Enabling the firewall right away gives us an extra layer of security right away while we are setting up the virtual private server.  

So far this is what we need to do on the virtual private server:

```
ssh root@your-ip-address

ufw allow OpenSSH
ufw enable
ufw status

```

The next step we want to create a new user with sudo privileges.  Doing everything as the root user is generally poor practice. To accomplish this we just need a few more handy terminal commands (must be performed by root account):

```
adduser yourusername
usermod -aG sudo yourusername

``` 

Once you create the user, Ubuntu will ask you to add some additional information.  The most important thing to do here is just make sure the password is complex and matching.  Once you are done it is a good idea to logout and log back in as the new user.  

You should now be logged back into your vps with your new account.  The last thing I would check before anything else: execute a sudo command with your new account.   For example: 

```
sudo ls -la
```
It should ask you for your new users password and if you enter it and it returns without error then you know that your account has sudo privileges.  

The last thing we are going to want to do for the first steps to setting up our vps is update the system.  To double check that you are logged into the system as the non-root user you can type the command `whoami` then, if everything looks good, you can update the system with the following line:

```
sudo apt-get update && sudo apt-get upgrade -y

```

**Note:**  if you want to list directories in the terminal in a more readable way this is the way to do it: `ls -l | more`

**command aside:** if you want to create a simple text file on Ubuntu you can type: `echo hello > hello.txt`.  Similarly, you can type `cat hello.txt` to read the file and print it to the standard out.  

### Switch users in Ubuntu

```
su - username
```
This will also inherit all of their permissions and settings.  

When you type exit after using the su command, you will be logged out back to the user you were when you executed the su command.  

Want to delete a user?  sudo userdel username and buh-bye!

### Chmod: what is it?

chmod stands for change mode. it takes 3 arguments:

```
chmod xxx file.ext
```

It can accept 0, 4, 5, 6, 7.  The first digit corresponds to the owner, the second the group, and the third is everyone else.  

**chown** stands for change ownership.  must be sudo to change ownership of a file or directory.  It takes the following arguments: `chow user:group file.ext`  

## Lockdown SSH | Make Your VPS Secure

To start the process of locking down ssh we need to generate a public/private keys.  To get started with this we need to run `ssh-keygen -t rsa` and it is recommended to enter a passphrase to make it more secure.  
The result of this will be a public key as well as a private key.  The public key can be shared freely but the private key should never be shared.  

The next process is uploading your public key to your vps server.  This is accomplished with another ssh command: `ssh-copy-id username@serverip`  If this is successful, it is going to ask you to enter your user password.  If all is successful, you will be able to connect using your public key.  Next we are going to want to make sure that people cannot log in with a password or root.  

An additional note:  if you need to add a key later you will have to re-enable password authentication at `/etc/ssh/sshd_conifg`

The next step is to disable the ability to login via password and logging in as root.  We need to get into the ssh folder in etc, make a copy of the default ssh_config as sshd_config.dist then edit the ssh_config file:

```
cd /etc/ssh
sudo cp sshd_config sshd_config.dist
sudo vi sshd_config
```

Once you get into vi, you can type `:/PasswordAuth` to search the config file.  We want to change the PasswordAuthoraization to 'no' and also make sure it is also un-commented.  Also, we will want to search for **PermitRootLogin** and make sure it is set to no.  Once you have made the changes there are two things that are very important:

- run `sudo systemctl restart sshd`
- make sure this actually worked before you logout of the ssh connect.  

I recommend opening up a new terminal tab and trying to log in; first, login to your created user and make sure that is still working as expected.  Next, try to log in as root with ssh and make sure that root has been locked down.  

Next, back in the sshd_config file, we are going to want to do a few things.  Later on we will install fail2ban, but we want to add in an additional redundancy to ensure that if fail2ban fails, we have a backup plan to prevent the effectiveness of brute force attacks.  

To accomplish this we want to un-comment the line called **MaxAuthTries** and limit it to 3.  Next, we also want to check the line for **PermitEmptyPasswords** and make sure it is set to "no."

This is also a good time to ensure that the following methods of login are disabled: **KerberosAuthentication** and **GSSAPI Authentication**.

FInally, once again we will want to save our work and run: `sudo systemctl restart ssh`

## Install Fail2Ban - A Necessary Precaution

```
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install fail2ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

## next step is to navigate to /etc/fail2ban and create a new file

sudo vi jail.local

[sshd]
enable = true
port = 22
filter = ssh
logpath = /var/log/auth.log
maxretry = 3


``` 

at this point, save the file and your fail2ban should be configured.  Make sure you run `sudo systemctl restart fail2ban` to make sure the changes take effect.  

## How To FTP Into Your Virtual Private Server

FTP is typically a bit more difficult to manage on a vps server because it is inherently more challenging to lockdown.  Nevertheless, there is often a case to use FTP.  I personally use FileZilla.  If you are hardcore and want to sftp via the terminal it is really simple to get in at this point: `sftp username@ipaddress` and you will be able to login to an sftp session via the command line.  

I am a bit more gentle.  I like to use a GUI like Filezilla.  The way you log into sftp via Filezilla is pretty simple.  You will want to use the **SFTP protocol** and ensure you select **port 22**.  Enter your vps ip address as the host.  For the login type you will want to select key file.  Enter your username that you created on your vps that is not the default root username.  Then you will need to type the path to your private ssh key.  I am on linux on my localhost machine.  The path is something like `/home/username/.ssh/id_rsa`

Now we can use SFTP with a GUI interface which is nice.  

## Uncomplicated Firewall - How To Configure For Virtual Private Server 

Uncomplicated Firewall (UFW) is a very good free firewall software package.   To secure your VPS, we will need to do further configuration to the firewall.  

You are most likely setting up your vps to handle web traffic.  To accomplish this, the first thing we need to do is allow internet traffic.  This can be achieved through `sudo ufw allow www` to begin.  

Eventually, we will want to redirect port 80 to port 443.  To get this setup in ufw all we need to do is provide `sudo ufw allow https`

In the event that you want to deny traffic to anywhere from an IP address you can go with something like: `sudo ufw deny xxx.xxx.xxx.xxx` where x is replaced by the ip address you want to deny access to your server for.  

## How To Scan Ports From Your Localhost

You will need a tool like nmap.  On my system you install nmap like this: `sudo pacman -S nmap`

Other environments will be different.  

sudo nmap -sS xxx.xxx.xxx.xxx will scan your ports on your vps and let you know which ports are currently available.  



## Basic Server Setup For Virtual Private Server

**Set Hostname: ** Start out with `sudo hostnamectl` to verify your host name.  Next, we can change the hostname by running : `sudo hostnamectl set-hostname yourprovidedhostname` and then we can re-check that it worked by re-running the hostnamectl command.  

## Point DNS To Server

This can be accomplished by logging into your dns record and creating an A record that points to your server ip address.  It is usually a key-value pair.  host:value.  A fully qualified top level domain name would be set up such as:

```
@ xxx.xxx.xxx.xxx
```

Want to point an ipv6 address?   instead of an A record you will want to select AAAA record and paste your servers ipv6 address with @ as the host.  

Now we can connect to our server with our top level domain name such as:

```
ssh username@subdomain.topleveldomain.com
```
Next, it is always a good idea to check the server time.  To do that you need to run the following command: `sudo dpkg-reconfigure tzdata` and type in your user password.  


## Useful Operating System Tools

- who
- w
- nethogs (need to install)
- iptraf-ng

## Resize Server

If you need to resize your server for any reason the first thing to do is power it off then resize it in the vps provider's user interface.  

## Setting Up And Installing Apache

`sudo apt update`

`sudo apt install apache2`

check to see if apache is installed and running `sudo systemctl status apache2` 

if it returns active, you can now open up a browser and navigate to your dns top level domain that you provided earlier.   this would look like: `http://topleveldomain.com`

Installation is straight forward but there is still more to accomplish. 

### Set Up Virtual Hosts

`cd /var/www`

next let us create a couple of directories to serve websites out of:

```
sudo mkdir example1
sudo mkdir example 2
```

These are currently owned by root.  It is considered a best practice to change ownership of the directories.  

to accomplish this we can write the following bit of code:

```
sudo chown -R username:username example1
sudo chown -R username:username example 2

sudo chmod -R 755 example1
sudo chmod -R 755 example 2

```

This will change the ownership of the directory to your create username.  It will also give the file permissions such that you own them but other folks can read them.  

To make this example work, we will need to cd into each directory and create an index.html file.

To do so we can do `vi index.html` in each respective folder.  

Enter in a short html document so we have an example.

Next, we need to tell Apache about these directories to serve them.

`cd /etc/apache2`

At this point we are looking at `sites-enabled` and `sites-available`

Sites-available contains all of the files you might be serving, configuration, the descriptions for the virtual hosts exist in sites-available.  All the sites that are actually being served exists in sites-enabled.

Sites enabled will contain a symbolic links /alias.  This means there will be a symbolic link from the sites-enabled directory to the configuration file in the sites-available directory.  

Aliases need to exist in sites-enabled to sites-available.

1. `sudo vi example1.conf`

```
<VirtualHost *:80>
        ServerAdmin youremail@domain.com
        ServerName example1.com
        ServerAlias www.example1.com
        DocumentRoot /var/www/example1
        ErrorLog ${APACHE_LOG_DIR}/example1-error-log
        CustomLog ${APACHE_LOG_DIR}/example1-access.log combined
</VirtualHost>

```
2. `sudo vi example2.conf`

```
<VirtualHost *:80>
        ServerAdmin youremail@domain.com
        ServerName example2.com
        ServerAlias www.example2.com
        DocumentRoot /var/www/example2
        ErrorLog ${APACHE_LOG_DIR}/example2-error-log
        CustomLog ${APACHE_LOG_DIR}/example2-access.log combined
</VirtualHost>

```
### The hard way to make symbolic links

sudo ln -s /etc/apache2/sites-available/example1.conf .

Better way:
```
sudo a2ensite example1.conf

sudo a2ensite example2.conf

sudo a2dissite 000-default.conf

```

## Certbot and Apache

`sudo apt install certbot python3-certbot-apache`

`sudo certbot --apache`

`sudo systemctl restart apache2`

`sudo systemctl status certbot.timer`



The error logs are located at `var/logs/apache2` you must be logged in as root to view them.  

This can be achieved by typing `su -` and entering the root password.  


## Nginx configuration

`sudo apt update`
`sudo apt install nginx`
`sudo systemctl status nginx`

### Adding a virtual host to nginx

This file will need to located in `/etc/nginx/sites-available` and will need to have a .conf extension.  

```
server {

        root /var/www/www;
        index index.html index.htm index.php;

        server_name example.com www.example.com;

        location / {
                try_files $uri $uri/ = 404;
        }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/www.restauranttraversecity.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/www.restauranttraversecity.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.restauranttraversecity.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = restauranttraversecity.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80;

```

Nginx doesn't have a fancy utility to automatically create the symlinks.  I like to navigate into `/etc/nginx/sites-enabled` and then to enable the site I will usually run a command like this: `sudo ln -s /etc/nginx/sites-available/example.conf .` The goal here is to create a symlink in the sites-enabled site to the conf file to activate the site.  

## Nginx SSL CERT

This is very similar to the apache process.  We want to make sure that we install the nginx specific package however.  

`sudo apt install certbot python3-certbot-nginx`

Again, you need to check to make sure you have your DNS pointed correctly.  

To initiate the ssl process, the command is slightly different from apache.  

`sudo certbot --nginx -d example.com -d www.example.com`

Other than that, it is mostly the same.  Once again, you are just going to follow the simple prompts to enable ssl on your sites.  

A brief aside here: if you ever need to stop apache, nginx, or certbot you will need to make sure you use the follow commands for their respective services:

```
//      Apache
sudo systemctl stop apache2
sudo systemctl disable apache2

//     Nginx

sudo systemctl stop nginx
sudo systemctl disable nginx

// Certbot - just timer

sudo systemctl stop certbot.timer
sudo systemctl disable certbot.timer
```

## Cady 

To install cady you will need to visit their website, select `documentation`, then `install` and copy and paste the following (make sure you choose debian/ubuntu):

```
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo tee /etc/apt/trusted.gpg.d/caddy-stable.asc
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.xt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

Navigate to `/etc/caddy` and edit the default `Caddyfile` with the default configuration. good idea to copy a backup of default Caddyfile initially.  cp Caddyfile ./Caddyfile.dist Create a new directory named `conf.d` and create a new conf file named example.conf

Caddy does all of it's SSL certificate itself.  

## What the Default CaddyFile Can Look Like

```
{
    email   youremail@yourdomain.com
}

(static) {
        @static {
                file
                path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.svg *.woff *.json
        }
        header @static Cache-Control max-age=5184000
}

(security) {
        header {
                # enable HSTS
                Strict-Transport-Security max-age=31536000;
                # disable clients from sniffing the media type
                X-Content-Type-Options nosniff
                # keep referrer data off of HTTP connections
                Referrer-Policy no-referrer-when-downgrade
        }
}

import conf.d/*.conf

```

- The email address is where SSL information will be sent
- (static) is the static module that is basically a default configuration.  This can be extended based on applications need.  
- (security) is the default security module that can be extended depending on the applications need
- `import conf.d/*.conf` looks into a directory named __conf.d__ and imports any caddy files that exist.

To put it another way: 

The default Caddyfile will have some basic configuration.  For example, it will have the email address for SSL configuration.  It will also have a static section which will define some of the caching options.  Finally. there will be a default header section that defines some of the basic headers that will be a part of the request and response headers.  

`sudo mkdir conf.d`

Navigate to conf.d directory and you will create a file for each host that you want to serve with your caddy configuruation.  

The directive files must end in `.conf` to be valid.  For example we could do something like: `sudo vi mydomain.conf` to create a new configuration file. 

A Caddy host configuration file might look something like this:

```
mydomain.com {

    encode zstd gzip
    import static
    import security

    root * /var/www/mydomain

    file_server

    log {
        output file /var/log/caddy/mydomain-access.log
        format json
    }
}

```

Save the caddy file and create any other host.conf files you may need. 

Don't forget to reload caddy: `sudo systemctl reload caddy`.

Now we should be able to get to our new domain name. 

## Caddy Logging

A few things need to be done to set up logging with caddy

Refer to the above code to see how to set up the log directive.  

we need to check which username caddy runs under because the log directory needs to be owned by the same user.


`ps aux | grep caddy`

In many instances, caddy will be owned by caddy/

`cd /var/log`
`sudo mkdir caddy`
`sudo chown caddy:caddy caddy` 
`ls -la caddy`

Confirm that caddy owns the caddy folder.

use `ls -l` to confirm that caddy is owned by caddy and then reload caddy `sudo systemctl reload caddy`

Caddy should make the necessary directories and access log now after reloading it.  

lastly `sudo systemctl enable caddy` to make sure caddy starts on system start.  


## VPS Hosting Security: Final Thoughts.

If you aren't convinced why you need to secure your vps server I urge you to log in and run the following command `sudo journalctl -le` and see how many hackers are trying to brute force your vps everyday.  

If you made it to the end congratulations!  I know it was a lot to look at but I know a lot of people will just be looking for small snippets.  I wish you luck on your self hosting journey!  







