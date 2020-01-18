Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'application#hello'
  namespace :api do
    resources :pipelines, only: [:show, :update]
  end
end
