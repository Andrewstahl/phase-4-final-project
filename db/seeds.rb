# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

good_habits = Habit.create([
  {
    name: "Exercise",
    option: "Build"
  },
  {
    name: "Reading",
    option: "Build"
  },
  {
    name: "Writing",
    option: "Build"
  },
  {
    name: "Meditating",
    option: "Build"
  },
  {
    name: "Journaling",
    option: "Build"
  },
  {
    name: "Eating Fruit",
    option: "Build"
  }
])
  
bad_habits = Habit.create([
  {
    name: "Junk Food",
    option: "Break"
  },
  {
    name: "Smoking",
    option: "Break"
  }, 
  {
    name: "Biting Nails",
    option: "Break"
  },
  {
    name: "Sweet Treats",
    option: "Break"
  },
  {
    name: "Late Night TV",
    option: "Break"
  },
  {
    name: "Social Media",
    option: "Break"
  }
])