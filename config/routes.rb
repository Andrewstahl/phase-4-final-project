Rails.application.routes.draw do
  resources :logs
  resources :user_habits
  resources :habits
  resources :users
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/me', to: 'users#update'
  delete '/me', to: 'users#destroy'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }
end
