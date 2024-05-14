# frozen_string_literal: true

require 'fileutils'
require 'shellwords'

def add_template_repository_to_source_path
  if __FILE__ =~ %r{\Ahttps?://}
    require 'tmpdir'
    source_paths.unshift(tempdir = Dir.mktmpdir('rails-'))
    at_exit { FileUtils.remove_entry(tempdir) }
    git clone: [
      '--quiet',
      'https://github.com/IsraelDCastro/rails-api-template.git',
      tempdir
    ].map(&:shellescape).join(' ')

    if (branch = __FILE__[%r{https://github.com/IsraelDCastro/rails-api-template/(.+)/template.rb}, 1])
      Dir.chdir(tempdir) { git checkout: branch }
    end
  else
    source_paths.unshift(File.dirname(__FILE__))
  end
end

def add_gems
  gem 'ruby-vips', '~> 2.1', '>= 2.1.4'
  gem "rack-cors"
  gem 'jwt'
  gem 'bcrypt', '~> 3.1.18'
  gem 'annotate', group: :development
  gem 'solargraph', group: :development
end

def set_application_name
  # Add Application Name to Config
  environment 'config.application_name = Rails.application.class.module_parent_name'

  # Announce the user where they can change the application name in the future.
  puts 'You can change application name inside: ./config/application.rb'
end

def add_vue
  directory 'vue-front', force: true
end

def add_react
    directory 'react-front', force: true
end

def copy_templates
  directory 'app', force: true
  directory 'config', force: true
  directory 'lib', force: true

  # run 'for file in lib/templates/**/**/*.txt; do mv "$file" "${file%.txt}.tt"; done'
  say '  Custom scaffold templates copied', :green
end

def run_command_flags
  ARGV.each do |flag|
    add_react if flag == '--react'

    add_vue if flag == '--vue'
  end
end

# Main setup
add_gems

after_bundle do
  add_template_repository_to_source_path
  set_application_name

  copy_templates

  run_command_flags

  rails_command 'db:create'

  rails_command 'generate model User first_name last_name email:uniq password_digest reset_password_token username:uniq'

  rails_command 'active_storage:install'
  rails_command 'g annotate:install'

  inject_into_file('app/controllers/application_controller.rb', "\n\n" '  def set_current_user
    # finds user with session data and stores it if present
    Current.user = User.find_by(id: session[:user_id]) if session[:user_id]
  end' "\n", after: 'class ApplicationController < ActionController::API')

  inject_into_file('config/application.rb', "\n\n" '    config.active_storage.variant_processor = :vips', after: 'config.load_defaults 7.0')
  inject_into_file('config/application.rb', "\n\n" '    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore', after: 'config.api_only = true')

  inject_into_file('app/models/user.rb', "\n\n" '  has_secure_password
        validates :username, uniqueness: true
        validates :email, presence: true, uniqueness: true', after: 'class User < ApplicationRecord')

  rails_command 'db:migrate'

  begin
    git add: '.'
    git commit: %( -m 'Initial commit' )
  rescue StandardError => e
    puts e.message
  end

  say

  ARGV.each do |flag|
    say 'Rails API + VueJS 3 + ViteJS + Tailwindcss + PrimeVue created!', :green if flag == '--vue'
    say 'Rails API + ReactJS 18 + ViteJS + Tailwindcss + NextUI created!', :green if flag == '--react'
  end

  say
  say '  To get started with your new app:', :yellow
  say "  cd #{original_app_name}"
  say "  cd #{original_app_name}/modules/vue-front"  if flag == '--vue'
  say "  cd #{original_app_name}/modules/react-front"  if flag == '--react'
  say
  say '  # Please update config/database.yml with your database credentials'
  say
  say '  rails s'
end
