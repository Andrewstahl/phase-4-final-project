class CreateLogs < ActiveRecord::Migration[7.0]
  def change
    create_table :logs do |t|
      t.integer :user_id
      t.integer :habit_id
      t.integer :amount
      t.datetime :date

      t.timestamps
    end
  end
end
