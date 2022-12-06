class LogSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :habit_id, :amount, :date, :description, :own_habit
  # belongs_to :user
  belongs_to :habit

  def own_habit
    ActiveModel::SerializableResource.new(object.habit)
  end

end
