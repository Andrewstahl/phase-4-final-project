class NestedHabitSerializer < ActiveModel::Serializer
  attributes :id, :name
  # has_many :user_habits
  # has_many :users
end
