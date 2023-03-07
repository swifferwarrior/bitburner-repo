```wget [options] [url]```

# OPTIONS
Iterates through a list of urls for multiple files
```wget -i urlList.txt```

# Downloading a File to a Specific Directory
By default, wget will save the downloaded file in the current working directory. To save the file to a specific location, use the -P option:

```wget -P /mnt/iso http://mirrors.mit.edu/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-1804.iso```

# Downloading via FTP
To download a file from a password-protected FTP server, specify the username and password as shown below:

```wget --ftp-user=FTP_USERNAME --ftp-password=FTP_PASSWORD ftp://ftp.example.com```

# Mirroring website
```wget -m https://example.com```