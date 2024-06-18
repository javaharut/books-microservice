require 'httparty'
require 'json'

class UserService
  USER_MICROSERVICE_URL = 'http://0.0.0.0:3000'.freeze

  def self.verify_token(token)
    uri = URI("#{USER_MICROSERVICE_URL}/users/verify_token")
    req = Net::HTTP::Get.new(uri)
    req['Authorization'] = "Bearer #{token}"

    res = Net::HTTP.start(uri.hostname, uri.port) { |http| http.request(req) }
    return JSON.parse(res.body) if res.is_a?(Net::HTTPSuccess)
  rescue Error => e
    puts 'error'
    puts e.inspect
    Rails.logger.error "Error verifying token: #{e.message}"
    nil
  end
end
