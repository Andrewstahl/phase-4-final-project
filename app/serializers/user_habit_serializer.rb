class UserHabitSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :habit_id, :option, :amount, :frequency, :habit
  belongs_to :habit
  belongs_to :user
  
  def habit
    ActiveModel::SerializableResource.new(object.habit,  each_serializer: NestedHabitSerializer)
  end

end