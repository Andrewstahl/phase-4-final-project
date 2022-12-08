class UserHabitsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  # GET /user_habits
  def index
    render json: UserHabit.all
  end

  # GET /user_habits/:user_id
  def show
    user_habit = UserHabit.find(params[:id])
    render json: user_habit
  end
  
  # POST /user_habits
  def create
    user = User.find(session[:user_id])
    if user
      user_habit = UserHabit.create!({
        user_id: user.id,
        habit: Habit.find_or_create_by(name: user_habits_params[:habit]),
        option: user_habits_params[:option],
        amount: user_habits_params[:amount],
        frequency: user_habits_params[:frequency]
      })
      render json: user_habit, status: :created
    else
      user_habit = UserHabit.create!(user_habits_params)
      render json: user_habit, status: :created
    end
  end
  
  # PATCH/PUT /user_habits/:id
  def update
    user_habit = UserHabit.find(params[:id])
    user_habit.update!(user_habits_no_habit_params)
    render json: user_habit
  end

  # DELETE /user_habits/:id
  def destroy
    user_habit = UserHabit.find(params[:id])
    user_habit.destroy
    head :no_content
  end

  private

  def user_habits_params
    params.permit(:user_id, :habit_id, :option, :amount, :frequency, :habit)
  end
  
  def user_habits_no_habit_params
    params.permit(:user_id, :option, :amount, :frequency)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: ["User habit not found"] }, status: :not_found
  end

end
