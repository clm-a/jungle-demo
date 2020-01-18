class ApplicationController < ActionController::Base
  def jungle_react
    render inline: '', layout: 'jungle_react'
  end
end
