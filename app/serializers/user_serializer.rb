class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  # has_many :user_habits
  # has_many :habits, through: :user_habits
  has_many :habits
end
