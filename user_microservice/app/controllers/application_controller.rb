# frozen_string_literal: true

# The ApplicationController is the base controller for all controllers in the application.
# It provides authentication functionality and sets the current user based on the JWT token.
class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    payload = decode_jwt(token)
    @current_user = User.find_by(id: payload['sub']) if payload
  rescue JWT::DecodeError
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  # Decodes the JWT token using the secret key base defined in the Rails application.
  def decode_jwt(token)
    JWT.decode(token, Rails.application.secrets.secret_key_base).first
  end
end
