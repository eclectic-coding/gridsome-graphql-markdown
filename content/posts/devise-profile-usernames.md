---
title: Devise Profile Usernames  
date: 2021-02-02 
published: true 
tags: ['rails']
series: false 
cover_image: ./images/users.jpg
canonical_rul: false 
description: I have worked on several projects recently with user accounts managed by Devise, and I have been working at changing the way user profile URL's are set up and presented to the user. In this article I will address this task and use a few of my recent favorite gems.
---
I have worked on several projects recently with user accounts managed by Devise, and I have been working at changing the way user profile URL's are set up and presented to the user. In this article I will address this task and use a few of my recent favorite gems. 

**TLTR**: If you just want the [code](https://github.com/eclectic-coding/article_devise_usernames) go grab it, and post questions or responses if you like.

## Goals
Here are the project parameters:
- Set up user accounts with [Devise](https://github.com/heartcombo/devise)
- Set up an URL for a User's profile page as: `/users/:username`
- Generate a unique `username` which is not requested on the sign-up form

**name_of_person** - We will use the [name_of_person](https://github.com/basecamp/name_of_person) gem by Basecamp. This gem creates a pseudo-field for full name (requires `first_name` and `last_name` in the `User` table). It has many other abstractions, but this is the only feature we will use.

**friendly_id** - We will use the [friendly_id](https://github.com/norman/friendly_id) gem, which created slugs that we can map to a predetermined route. This is a method you can use throughout an application, not just with the User models.  

## Basic set up
We will start by setting up a basic Rails app: `rails new awesome_app`, and set up a static controller for a home route: `rails g controller static home`.

Configure the routes to load the basic `home.html.erb`, in `config/routes.rb`:

```ruby
Rails.application.routes.draw do
   
  root "static#home"

end
```

Add to follow to the `application.html.erb`, to add a rudimentary navbar we can use later:
```html
<!DOCTYPE html>
<html>
<head>
  <title>ArticleDeviseUsernames</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <%= csrf_meta_tags %>
  <%= csp_meta_tag %>

  <%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
  <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
</head>

<body>
<div style="margin-top: 20px">
  <% if user_signed_in? %>
    <%= link_to "User Profile", user_path(current_user.slug) %>
    <%= link_to "Logout", destroy_user_session_path(current_user.slug), method: :delete %>
  <% else %>
    <%= link_to "Log in", new_user_session_path %>
  <% end %>
  <%= yield %>

</div>
</body>
</html>

```
## Set up Devise
Add the Devise gem to the `Gemfile` and `bundle install`, then install Devise: `rails generate devise:install`. You will need to add to `config/environments/development.rb` the following line:
```
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```
We are going to generate a devise `User` model: `rails generate devise User`.

To use `name_of_person` gem, we need to add two columns to the created Devise migration. Add `first_name` and `last_name` somewhere within the database migration, then migrate with `rails db:migrate`:
```ruby
class DeviseCreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ...

      t.string :first_name
      t.string :last_name

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
```
Devise will automatically add the appropriate routes, but it always a good idea to check, so make sure that in `config/routes.rb` the route is found: `devise_for: users`. 

Add to the `User` model to use the `name_of_person` gem, by adding `has_person_name`:
```ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_person_name
end
```
This is the basic configure for the gem, but we are going to have to tell Devise to allow the new `name` field. So, in `app/controllers/application_controller.rb` add the following:
```ruby
class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end
```
We will need to add the `name` field to the sign-in and sign-up forms, so we need to generate the views: `rails generate devise:views`. In `app/views/devise/registrations/new.html.erb`, `.../registrations/edit.html.erb`, and `.../sessions/new.html.erb` add the following for the name field:
```html 
<h2>Sign up</h2>

<%= form_for(resource, as: resource_name, url: registration_path(resource_name)) do |f| %>
  <%= render "devise/shared/error_messages", resource: resource %>

  <div class="field">
    <%= f.label :name %><br />
    <%= f.text_field :name, autofocus: true %>
  </div>

  <div class="field">
    <%= f.label :email %><br />
    <%= f.email_field :email, autofocus: false, autocomplete: "email" %>
  </div>
  
  ... 
```
Almost there ... We need to create a page to contain the User Profile, so we need to create a `User` controller:
``` 
rails g controller User show
```
Edit controller:
```ruby 
class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end
  
end
```
Lastly, update the routes, so for the route to the profile page:
```ruby
Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:show]
  
  root "static#home"

end
```
All done with Devise. You can restart your `rails server`, open the development site, and create a User Account. When you are redirected to the `root_path`, click the "User Profile" link in the navbar. You will be redirected to a path, something like `http://localhost:3000/users/1`. This is not the goal, so lets move on.

## Friendly ID
Add the `friendly_id` gem to the `Gemfile` and `bundle install`, then create a migration: 
```
rails g migration AddSlugToUsers slug:uniq
```
This will create a unique slug. In our case we are going to use the first and last name fields, and it will create a unique username. So in my case `/users/chuck-smith`. If this is not unique, maybe there is another "Chuck Smith" in the user table, it will make it unique: `/users/chuck-s`. 

Next we need to generate friendly_id: `rails generate friendly_id`, and migrate the database: `rails db:migrate`. 

We use Friendly_Id by extending the User model, and define the `:name` column, from `name_of_person` as the slug field:
```ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_person_name

  extend FriendlyId
  friendly_id :name, use: :slugged
end

```
Now, edit the show action in the UsersController to use the `:slug` param from Friendly:
```ruby
class UsersController < ApplicationController

  def show
    @user = User.friendly.find(params[:slug])
  end

end
```
Lastly, update the routes, for the new `param`:
```ruby
Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:show], param: :slug
  
  root "static#home"

end
```
If you already have `Users` created, from the `rails console` execute: `User.find_each(&:save)`, which will update the new slug column. 

Now, where you log in and browse to your User Profile the URL is friendlier (forgive the pun): `/users/chuck-smith`.

One additional optional configuration. If you want to change the user profile path you can edit the routes file:
```ruby
Rails.application.routes.draw do
  devise_for :users

  resources :users, only: [:show], param: :slug, path: ""
  
  root "static#home"

end
```
Notice I have added a path key to the `:users` resource which is empty. So, now if you browse to the user profile page the path will be (in this example): `/chuck-smith`.

## Footnote
This has been fun. Leave a comment or send me a DM on [Twitter](http://twitter.com/EclecticCoding).

Shameless Plug: If you work at a great company, and you are in the market for a Software Developer with a varied skill set and life experiences, send me a message on [Twitter](http://twitter.com/EclecticCoding) and check out my [LinkedIn](http://www.linkedin.com/in/dev-chuck-smith).

