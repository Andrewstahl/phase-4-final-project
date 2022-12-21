class UserHabitsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  before_action :get_user, only: [ :create, :update, :destroy ]
  before_action :get_user_habit, only: [ :show, :update, :destroy ]

  # GET /user_habits
  def index
    render json: UserHabit.all
  end

  # GET /user_habits/:user_id
  def show
    render json: @user_habit
  end
  
  # POST /user_habits
  def create
    if @user
      @user_habit = UserHabit.create!({
        user_id: @user.id,
        habit: Habit.find_or_create_by(name: user_habits_params[:habit]),
        option: user_habits_params[:option],
        amount: user_habits_params[:amount],
        frequency: user_habits_params[:frequency]
      })
      render json: @user_habit, status: :created
    else
      @user_habit = UserHabit.create!(user_habits_params)
      render json: @user_habit, status: :created
    end
  end
  
  # PATCH/PUT /user_habits/:id
  def update
    if @user_habit.user_id == @user.id
      @user_habit.update!(user_habits_no_habit_params)
      render json: @user_habit
    else
      render_not_authorized_response
  end

  # DELETE /user_habits/:id
  def destroy
    if @user_habit.user_id == @user.id
      user_habit.destroy
      head :no_content
    else
      render_not_authorized_response
    end
  end

  private

  def get_user
    @user = User.find(session[:user_id])
  end
  
  def get_user_habit
    @user_habit = UserHabit.find(params[:id])
  end

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

  def render_not_authorized_response
    render json: { error: "Not Authorized" }
  end

end
