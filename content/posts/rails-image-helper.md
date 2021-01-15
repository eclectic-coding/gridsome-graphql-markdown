---
title: Rails Image Helper   
date: 2021-01-11 
published: true 
tags: ['rails', 'ruby', 'tutorial']
series: false 
cover_image: ./images/rubys.jpg 
canonical_rul: false 
description: Often times when developing application, the developer may need to include logic to conditionally render UI elements. For instance, maybe an active CSS class in the navbar menu-item for the current page. Sometimes the required logic is more complex. In my case I needed to provide a fallback image when an image was not available from the API. In this article I will show the methodology I used to create a Rails Helper to meet this goal.
---
Often times when developing application, there are times that a developer may need to include logic to conditionally render UI elements. For instance, maybe an active CSS class in the navbar menu-item for the current page. Sometimes the required logic is more complex. In my case I needed to provide a fallback image when an image was not available from the API. In this article I will show the methodology I used to create a Rails Helper to meet this goal. 

## Structure 
On my side project [Your Congress](https://yourcongress.co/senators), I am using a free GitHub repository, [UnitedStates/Images](https://github.com/unitedstates/images/tree/gh-pages/congress) which stores all the photographs of serving Congress members. The images are accessible through an API served from GitHub pages, by images size and member ID. So, the image URL will be configured like so: `https://theunitedstates.io/images/congress/[size]/[member_id].jpg`. 

The image is rendered in the ERB partial:

```ruby
image_tag "https://theunitedstates.io/images/congress/225x275/#{senator.member_id}.jpg"
```

## Problem
The existing code works fine, but as new members have been added to the US Congress, the available images are not currently available for the new members. When the image is not available, the browser developer console logs a 404 status code, and the UI displays a broken image, thereby breaking the card layout. So, there needs to be a better way to access these images, and check for availability. 

**The goals**:
- Check for a success code when accessing the image, and render this image. 
- Check for unsuccessful access of an image and render a fallback image to preserve the UI layout. 

This is too much complexity for the ERB partial, so to DRY out this process we will create a Rails Helper. 

## Solution 
> What are helpers in Rails? A helper is a method that is (mostly) used in your Rails views to share reusable code. 
> [RubyGuides](https://www.rubyguides.com/2020/01/rails-helpers/)

We are creating a new helper in `app/helpers` called `bio_image_helper.rb`. The basic structure of the helper is to create a module and then within the module, a method we will call within our view. We are going to define the URI string in a variable and pass in the `member_id` in an argument called `member`. So the basic structure:

```ruby
module BioImageHelper

  def bioimage_helper(member)
    img_url = "https://theunitedstates.io/images/congress/225x275/#{member}.jpg"
    res = Net::HTTP.get_response(URI.parse(img_url.to_s))

    res.is_a?(Net::HTTPSuccess) ? img_url : 'backup.png'
  end

end
```
Remember the second goal was to validate the success of the image response, and offer a fallback image. We will use two libraries to meet these objectives: `net/http` and `uri`. With these, we will store to a variable (`res`) the response object and parse the `img_url` string. Then use a Ruby ternary to check the response object for an `HTTPSuccess`, and use the image, or our fallback image. 

```ruby
require 'net/http'
require 'uri'

module BioImageHelper

  def bioimage_helper(member)
    img_url = "https://theunitedstates.io/images/congress/225x275/#{member}.jpg"
    res = Net::HTTP.get_response(URI.parse(img_url.to_s))

    res.is_a?(Net::HTTPSuccess) ? img_url : 'backup.png'
  end

end
```

So, the `image_tag` in the partial now is abstracted to: 
```
image_tag bioimage_helper(senator.member_id)
```

## Thanks 
Special thanks to the users on the [Ruby on Rails Discord Server](https://discord.gg/uX2sCxxX) who pointed me in the right direction, with feedback, and code review. 

Also, the [Stack Overflow](https://stackoverflow.com/questions/7205950/how-to-check-if-an-image-was-found-on-a-web-site) discussion which helped the most.

## Footer
This has been fun. Leave a comment or send me a DM on [Twitter](http://twitter.com/EclecticCoding).

Shameless Plug: If you work at a great company and you are in the market for a Software Developer with a varied skill set and life experiences, send me a message on [Twitter](http://twitter.com/EclecticCoding) and check out my [LinkedIn](http://www.linkedin.com/in/dev-chuck-smith).
