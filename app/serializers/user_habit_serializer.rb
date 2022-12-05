class UserHabitSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :habit_id, :option, :amount, :frequency, :own_habit
  # belongs_to :habit
  # belongs_to :user
  
  def own_habit
    ActiveModel::SerializableResource.new(object.habit)
  end

end