---
title: Rails Basic Template
date: 2021-01-13
published: true 
tags: ['rails', 'ruby', 'tutorial','webdev']
series: Streamlined Workflow
cover_image: ./images/rails.jpg
canonical_rul: false 
description: There is no need for developers to walking the same path, performing the same tasks at the beginning of any project, over and over again. That is what this series of articles has been about, streamlining our workflow.
---
There is no need for developers to walking the same path, performing the same tasks at the beginning of any project, over and over again. That is what this series of articles has been about, streamlining our workflow. 

I have writing about create templates for Rails before, but quite frankly, I have learned so much about Rails over the last six months, as I sharpen my skills while searching for a position, it bears touching this topic again. 

This is a default/basic template:
- RSpec
- Code Quality with Rubocop
- Code Coverage
- Configure Rails generators
- Static routes 
- No styling (this varies per project)
- No user accounts

**TLTR**: The Rails template is hosted in this [Repository](https://github.com/eclectic-coding/rails_default_template.git)

The template design uses a modular design, so it is easy to maintain and turn off features if I desire. I am going to step through a few of the methods to explain my set up:

## Setup Additional Gems
The first method adds new gem requirements to the 'Gemfile'. This does not install them, it only prepares for the installation. Most of these gems are to set up my testing, code quality, and code coverage norms I prefer. 

```ruby
def add_gems
  # Rexml is required for Ruby 3
  gem "rexml" 

  gem_group :development, :test do
    gem "capybara", ">= 2.15"
    gem "database_cleaner"
    gem "factory_bot_rails", git: "http://github.com/thoughtbot/factory_bot_rails"
    gem "rspec-rails"
  end

  gem_group :development do
    gem "fuubar"
    gem "guard"
    gem "guard-rspec"
    gem "rubocop"
    gem "rubocop-rails", require: false
    gem "rubocop-rspec"
  end

  gem_group :test do
    gem "simplecov", require: false
  end

end
```

I have written on this topic before, and you can read more in my previous article: [Rails testing Setup](/rails-testing-setup)

## Static Routes
This method sets up a static route controller with a view for a home route. This is a mounting point for any static routes the project may have:
```ruby 
def add_static
  generate "controller static home"

  route "root to: 'static#home'"
end
```

## Copy Additional Files
We can stop here with one configuration file. However, we can also setup some files to copy for a more complete configuration:

```ruby
def copy_templates
  remove_dir "spec"

  copy_file "Guardfile"
  copy_file ".rspec", force: true
  copy_file ".rubocop.yml"
  copy_file ".simplecov"

  directory "config", force: true
  directory "lib", force: true
  directory "spec", force: true
end
```
We are copying four files which are specifically for testing, code quality, and code coverage. 

Whenever I use rails generators, I prefer to not create a lot of extra files I am not going to use, like stylesheets, helpers, and spec files. If I choose to use any of these resources, I would rather manually create them. So, I configure the generators in `config/application.rb`, and copy the `config` directory:
```ruby
config.generators do |g|
  g.stylesheets false
  g.helper nil
  g.test_framework nil
end
```
Lastly, I remove the generated `spec` directory and copy a new one that includes the configuration I need, and one `feature` spec to test the static route. 

## Config File
To use the new `template`, you need to set up a `.railsrc` dotfile, in the users' path, in your `$HOME` directory. When you use the `rails new` command will inject commands to the command line silently. So my simple `.railsrc` file:
```
--database=postgresql --database=postgresql -T -m /path/to/template.rb
```
I can start a new project: `rails new cool_app` and silently the postgresql flag is added, no default testing framework is installed, and the custom setup installation process begins.

Remember to check out the complete Rail's template hosted in the [Repository](https://github.com/eclectic-coding/rails_default_template.git)

## Footnote
This has been fun. Leave a comment or send me a DM on [Twitter](http://twitter.com/EclecticCoding).

Shameless Plug: If you work at a great company, and you are in the market for a Software Developer with a varied skill set and life experiences, send me a message on [Twitter](http://twitter.com/EclecticCoding) and check out my [LinkedIn](http://www.linkedin.com/in/dev-chuck-smith).
