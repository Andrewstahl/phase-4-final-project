class HabitSerializer < ActiveModel::Serializer
  attributes :id, :name, :option
  # has_many :user_habits
  has_many :users
end
