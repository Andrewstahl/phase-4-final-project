class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password
  
  # has_many :user_habits
  # has_many :habits, through: :user_habits
  has_many :habits
end
