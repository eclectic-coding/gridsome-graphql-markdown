---
title: Git Alias Workflow
date: 2020-08-01
published: true
tags: ['webdev', 'git']
series: Streamlined Workflow
cover_image: ./images/git-shortcut.jpg
canonical_rul: false
description: Variety redeye roast decaffeinated instant grinder blue mountain. Brewed wings macchiato, eu, milk cup beans saucer fair trade robusta. Turkish robust galão plunger pot aroma mug fair trade. Robust coffee redeye acerbic saucer con panna sweet instant cortado. And affogato arabica ut organic decaffeinated irish.
---
Instant seasonal grinder to go brewed iced milk qui single shot. Kopi-luwak, at froth dripper robust carajillo organic filter kopi-luwak froth. Eu skinny body, cultivar, cream cup ristretto dark sugar caffeine affogato. Brewed rich blue mountain coffee cortado crema single origin foam whipped. Sit cinnamon blue mountain so crema black, white id eu aroma cultivar.

instant mazagran lungo and chicory cortado variety.

TLTR: Want to just straight to the code? The complete alias file I use is available in this [GIST](https://gist.github.com/eclectic-coding/7510cf0771cae53f021f938549f027dc).

## Alias possibilities
bash/zsh dotfiles

git config file

## My configuration
I am not going to go over every aliased command in my configuration, just the ones I use most frequently.

**Branches** I have several commands that help with branches.Each command is prefixed with `git`.

- So, to checkout an existing branch: `git co name-of-branch`
- Create a new branch: `git cob name-of-new-branch`
- Create a new branch: `git br name-of-new-branch`. This alias I have stopped using in favor of `cob` because at creation, `cob` changes to the branch.
- Delete a branch: `git brd name-of-new-branch`

**Commits**
So, to check the status: `git st`, which uses the `-sb` switch to trim the CLI to a cleaner output:
```shell script
## master...origin/master
 M content/posts/git-alias-workflow.md
```
- Add all changed files: `git aa` instead of `git add -A`
- Commit:
aa = add -A .
	cm = commit
	aacm = !git add -A . && git commit
	acp = !git add -A . && git commit && git push

**logs**
