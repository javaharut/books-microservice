require 'httparty'
require 'json'

class BookService
  BOOK_MICROSERVICE_URL = ENV['BOOK_MICROSERVICE_URL']

  def self.list(author_id:, token:)
    response = HTTParty.get(
      "#{BOOK_MICROSERVICE_URL}/books/",
      query: { author_id: author_id, per_page: 10_000 },
      headers: { 'Authorization' => "Bearer #{token}" }
    )
    return JSON.parse(response.body) if response.success?
  rescue Error => e
    Rails.logger.error "Error verifying token: #{e.message}"
    nil
  end

  def self.delete(book_id:, token:)
    HTTParty.delete(
      "#{BOOK_MICROSERVICE_URL}/books/#{book_id}",
      headers: { 'Authorization' => "Bearer #{token}" }
    )
  rescue Error => e
    puts e.inspect
    Rails.logger.error "Error verifying token: #{e.message}"
    nil
  end
end
