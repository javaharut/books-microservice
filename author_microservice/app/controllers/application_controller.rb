# frozen_string_literal: true

# The ApplicationController is the base controller for all controllers in the application.
# It provides authentication functionality and sets the current user based on the JWT token.
class ApplicationController < ActionController::API
  before_action :authenticate_request

  private

  def authenticate_request
    @token = request.headers['Authorization']&.split(' ')&.last

    if @token
      user_info = UserService.verify_token(@token)

      render json: { error: 'Unauthorized' }, status: :unauthorized unless user_info
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
