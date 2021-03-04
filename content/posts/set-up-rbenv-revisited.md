---
title: Set Up Rbenv Revisited
date: 2021-03-03
published: true
tags: ['rails', 'ruby', 'webdev']
series: false
cover_image: ./images/rubys.jpg
canonical_rul: false
description: I have been working on a n
---
I have been working on setting up a new operating system distribution. I took some time to test out a different package manager, but ended up going back to my familiar toolset. Thia article will talk about package manager to manage Ruby version. 

## Package Managers
So what is a package manager? 

> A package manager or package-management system is a collection of software tools that automates the process of installing, upgrading, configuring, and removing computer programs for a computer's operating system consistently.

They give you the ability to manage multiple versions of the same packages (i.e. Node.js, Ruby, etc.). 

When it comes to **Ruby**, there are three major package managers to consider.

[RVM](https://rvm.io/) - When I first started learning Ruby almost two years ago, and set up my MacBook Pro, I started with RVM. It worked fine, and I had no real issues. However, it *seemed* heavy, computer resource wise.

[ASDF](https://github.com/asdf-vm/asdf) - this is a different package manager as it is language agnostic. You can install a plugin for the respect language (i.e. Ruby, nodejs, etc.).

[RBENV](https://github.com/rbenv/rbenv) - this is my preference, and the focus of this article. A major pull of `rbenv` for me is that it's *lighter*, and by that I mean that it doesn't have to throw as many hooks into your computer system as `rvm`, although there is some load to the terminal. This is the exact same reason I prefer [N](https://github.com/tj/n) to manage Node versus [NVM](https://github.com/nvm-sh/nvm), because there is ZERO terminal load. This may be the source of another article.

## Enter the Clones
So, Homebrew offers a `rbenv` package install, and Ubuntu does as well. I have used both, but I prefer to have more control, so I just clone the repositories. 
To set up **RBENV** there is the default way: 
- Clone rbenv to `.rbenv`
- Clone rbenv-build to `.rbenv/plugins`
- Set up `.rbenv/bin` in your `$PATH`
- Set up `.rbenv/bin/rbenv init` in your shell
- Restart shell
- Run [rbenv-doctor](https://github.com/rbenv/rbenv-installer/blob/master/bin/rbenv-doctor) script to verify installation

There is thankfully an easier install [script](https://github.com/rbenv/rbenv-installer). This script installs or updates `rbenv` on your system. If Homebrew is detected, installation will proceed using `brew install/upgrade`. Otherwise, rbenv is installed under `~/.rbenv`. Additionally, ruby-build is also installed if rbenv install is not already available. After the installation, a separate `rbenv-doctor` script is run to verify the success of the installation and to detect common issues.

```shell
# with curl
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash

# alternatively, with wget
wget -q https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer -O- | bash
```

## Default Gems
There in one `rbenv` plugin which I prefer to set up and that is `rbenv-default-gems`. This plugin will manage installing a select set of gems whenever you update your version of `ruby`. Install the plugin: 

```shell
git clone https://github.com/rbenv/rbenv-default-gems.git $(rbenv root)/plugins/rbenv-default-gems
```
Create a simple text file: `touch ~/.rbenv/default-gems`. In this file create your link of preferred gems to install/update:
```shell 
bundler
rails
```
Now install your ruby version: `rbenv install 3.0.0`

## Updating 
When new versions of Ruby are releases it is important to update rbenv. There are two ways to do this. Since, you have literally cloned the repository, you can `git pull`, but there are two directories to do that in:
```shell
cd ~/.rbenv
git pull
```
And for `ruby-build`
```shell
cd ~/.rbenv/plugins/ruby-build
git pull
```
Check on Ruby versions to install:
```shell
# list latest stable versions:
$ rbenv install -l

# list all local versions:
$ rbenv install -L

# install a Ruby version:
$ rbenv install 2.7.2
```

## Footnote
This has been fun. Leave a comment or send me a DM on [Twitter](http://twitter.com/EclecticCoding).

Shameless Plug: If you work at a great company, and you are in the market for a Software Developer with a varied skill set and life experiences, send me a message on [Twitter](http://twitter.com/EclecticCoding) and check out my [LinkedIn](http://www.linkedin.com/in/dev-chuck-smith).
