require 'httparty'
require 'json'

class AuthorService
  AUTHOR_MICROSERVICE_URL = ENV['AUTHOR_MICROSERVICE_URL']
  def self.get(author_id, token)
    response = HTTParty.get(
      "#{AUTHOR_MICROSERVICE_URL}/authors/#{author_id}",
      headers: { 'Authorization' => "Bearer #{token}" }
    )

    return JSON.parse(response.body) if response.success?
  rescue Error => e
    Rails.logger.error "Error verifying token: #{e.message}"
    nil
  end
end
