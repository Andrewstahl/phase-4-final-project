class CreateUserHabits < ActiveRecord::Migration[7.0]
  def change
    create_table :user_habits do |t|
      t.integer :user_id
      t.integer :habit_id
      t.integer :amount
      t.string :frequency

      t.timestamps
    end
  end
end
