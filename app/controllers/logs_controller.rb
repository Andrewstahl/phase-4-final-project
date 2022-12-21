class LogsController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  before_action :get_user, only: [ :create, :update, :destroy ]
  before_action :get_log, only: [ :show, :update, :destroy ]

  # GET /logs
  def index
    render json: Log.all
  end
  
  # GET /logs/:id
  def show
    render json: @log
  end

  # POST /logs
  def create
    if @user
      @log = Log.create!({
        user_id: @user.id,
        habit: Habit.find_by(name: log_params[:habit]),
        amount: log_params[:amount],
        date: log_params[:date],
        description: log_params[:description]
      })
      render json: @log, status: :created
    else
      @log = Log.create!(log_params)
      render json: @log, status: :created
    end
  end

  # PATCH/PUT /logs/:id
  def update
    if @log.user_id == @user.id
      @log.update!(log_no_habit_params)
      render json: @log
    else
      render_not_authorized_response
    end
  end
  
  # DELETE /logs/:id
  def destroy
    if @log.user_id == @user.id
      @log = Log.find(params[:id])
      @log.destroy
      head :no_content
    else
      render_not_authorized_response
    end
  end

  private

  def get_user
    @user = User.find(session[:user_id])
  end

  def get_log
    @log = Log.find(params[:id])
  end

  def log_params
    params.permit(:user_id, :habit_id, :amount, :date, :description, :habit)
  end

  def log_no_habit_params
    params.permit(:user_id, :amount, :date, :description)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: ["User log not found"] }, status: :not_found
  end

  def render_not_authorized_response
    render json: { error: "Not Authorized" }
  end

end
