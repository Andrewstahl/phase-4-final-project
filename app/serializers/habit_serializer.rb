class HabitSerializer < ActiveModel::Serializer
  attributes :id, :name, :option
  has_many :users
end
