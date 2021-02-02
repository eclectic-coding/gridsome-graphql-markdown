---
title: Dev Environment with Localhost SSL
date: 2021-02-02
published: true 
tags: ['rails', 'security', 'tutorial']
series: false 
cover_image: ./images/security-ssl.jpg 
canonical_rul: false 
description: Have you ever wanted to set up SSL for localhost development on your computer? No? Honestly, as hard as this can be at times, me neither. What changed? Recently, I have been working on a Rails contract project, and the project was set up using SSL. I needed to set up SSL on my Linux computer, so I could collaborate on the project.
---
Have you ever wanted to set up SSL for localhost development on your computer? No? Honestly, as hard as this can be at times, me neither. What changed? Recently, I have been working on a Rails contract project, and the project was set up using SSL. I needed to set up SSL on my Linux computer, so I could collaborate on the project. 

Why you may need SSL in development? Check this [tweet](https://twitter.com/getify/status/1023202051902373888) to find the answer.

So there is one solution [Puma-dev](https://github.com/puma/puma-dev#linux-support), however, even though there is Linux support, the solution and set up never worked for me. 

## Solution

```
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt
```
You will be provided with some information fields to fill in about country key, email, etc. However, you can skip this step. This command will create two new files localhost.key and localhost.crt in the current directory. You can move these files anywhere.

Open in your browser: `https://localhost:3000?key=/path/to/localhost.key&cert=/path/to/localhost.crt`. Make sure the certificate and key location is correct in the URL string.

FYI: you will have to accept the certificate in your browser the first time you open the URL.

### Rails Server and Webpack
You cannot use the standard `rails server` as this defaults to `http://localhost:3000`. Instead, use the following command:
``` 
rails s -b 'ssl://localhost:3000?key=/path/to/localhost.key&cert=/path/to/localhost.crt'
```
I have included in a ZSH alias, which is much easier to remember:
``` 
alias rss="rails s -b 'ssl://localhost:3000?key=/path/to/localhost.key&cert=/path/to/localhost.crt'"
```
What about Webpack, which I like to start in a separate terminal window? It is actually not that hard and is documented on the repository for webpack: [Webpack SSL](https://github.com/rails/webpacker/blob/9bbc51f333137f51cdd676e2cf4abc3583fa5462/docs/webpack-dev-server.md#webpack-dev-server). Basiclly, we have to enable `https` in `config/webpacker.yml`, start webpacker like normal and accept the certificate. 

## Footnote

This has been fun. Leave a comment or send me a DM on [Twitter](http://twitter.com/EclecticCoding).

Shameless Plug: If you work at a great company, and you are in the market for a Software Developer with a varied skill set and life experiences, and strives to be *better tomorrow than I am today*, send me a message on [Twitter](http://twitter.com/EclecticCoding) and check out my [LinkedIn](http://www.linkedin.com/in/dev-chuck-smith).

Credit: [Localhost SSL](https://github.com/codica2/rails-puma-ssl)
