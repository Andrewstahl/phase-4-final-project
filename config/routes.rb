Rails.application.routes.draw do
  resources :users, only: [:create, :show, :update, :delete]
  post '/signup', to: 'users#create'
  post '/me', to: 'users#show'
  post '/login' to: 'sessions#create'
  post '/logout' to: 'sessions#delete'

  get '/hello', to: 'application#hello_world'

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
