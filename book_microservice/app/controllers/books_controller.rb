class BooksController < ApplicationController
  before_action :set_book, only: %i[show update destroy]

  # GET /books
  def index
    books = Book.paginate(page: params[:page], per_page: params[:per_page] || 3)

    # This part can be moved to a separate service later when get time
    books = books.where(author_id: params[:author_id]) if params[:author_id].to_i.positive?
    books = books.where('title ILIKE ?', "%#{params[:title]}%") if params[:title]
    books = books.order(id: :asc)

    render json: { books: books, total: books.total_entries, per_page: books.per_page, page: books.current_page }
  end

  # GET /books/:id
  def show
    render json: @book
  end

  # POST /books
  def create
    book = Book.new(book_params)

    # Check if the author exists in authors microservice
    author = AuthorService.get(book_params[:author_id], @token)

    if !author.empty? && book.save
      render json: book, status: :created
    else
      render json: book.errors, status: :unprocessable_entity
    end
  end

  # PUT /books/:id
  def update
    # Check if the author exists in authors microservice
    author = AuthorService.get(book_params[:author_id], @token)

    if !author.empty? && @book.update(book_params)
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/:id
  def destroy
    @book.destroy
    head :no_content
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :author_id, :description)
  end
end
