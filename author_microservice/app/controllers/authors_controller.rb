class AuthorsController < ApplicationController
  before_action :set_author, only: [:show, :update, :destroy]

  # GET /authors
  def index
    @authors = Author.all

    render json: @authors.order(id: :asc)
  end

  # GET /authors/:id
  def show
    render json: @author
  end

  # POST /authors
  def create
    @author = Author.new(author_params)
    if @author.save
      render json: @author, status: :created
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  # PUT /authors/:id
  def update
    if @author.update(author_params)
      render json: @author
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  # DELETE /authors/:id
  def destroy
    # Check if the author has any books and delete them first
    # Book microservice can provide batch delete endpoint to delete all books of an author or delete by author id in further iterations
    # Here questions arise like what if the book microservice is down, how to handle such scenarios?
    data = BookService.list(author_id: @author.id, token: @token)
    data['books'].each do |book|
      BookService.delete(book_id: book['id'], token: @token)
    end

    # Author can safely be removed now
    @author.destroy
    head :no_content
  end

  private

  def set_author
    @author = Author.find(params[:id])
  end

  def author_params
    params.require(:author).permit(:name, :bio)
  end
end
