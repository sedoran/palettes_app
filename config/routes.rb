Rails.application.routes.draw do

  root 'palettes#index'  

  get 'palettes' => 'palettes#index'

  
end
