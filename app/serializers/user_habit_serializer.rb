class UserHabitSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :habit_id, :amount, :frequency
  belongs_to :habit
  belongs_to :user
end