class UserHabitSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :habit_id, :amount, :frequency
end
