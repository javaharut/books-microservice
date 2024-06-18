import styled from "styled-components";
import React, { useState } from "react";

import BookEditForm from "./BookEditForm";

type Props = {
  token: string;
  authors: any[];
};

const Container = styled.div`
  /* background-color: #f5f5f5; */
`;

const SearchWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const BooksList = styled.div``;

const BooksListRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`;

const LoadWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 30px;
`;

const Books_ROOT_URL = "http://localhost:3001";

const Books: React.FC<Props> = ({ token, authors }) => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    author_id: -1,
  });
  const [books, setBooks] = useState<any[]>([]);
  const [bookPaging, setBookPaging] = useState({
    page: 1,
    total: 1,
    per_page: 3,
  });

  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    author_id: authors[0]?.id,
  });

  const handleGetBooks = async (page: number = 1) => {
    const queryParams = new URLSearchParams();
    if (searchParams.title) {
      queryParams.append("title", searchParams.title);
    }
    if (searchParams.author_id) {
      queryParams.append("author_id", searchParams.author_id.toString());
    }
    queryParams.append("page", page.toString());
    queryParams.append("per_page", bookPaging.per_page.toString());
    console.log(page);
    const response = await fetch(
      `${Books_ROOT_URL}/books?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setBooks(page == 1 ? data.books : [...books, ...data.books]);
    setBookPaging({
      page: data.page,
      total: data.total,
      per_page: data.per_page,
    });
  };

  const handleCreateBook = async () => {
    if (!newBook.title) {
      return;
    }

    const response = await fetch(`${Books_ROOT_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ book: newBook }),
    });
    const data = await response.json();
    handleGetBooks();
    console.log(data);
  };

  const handleBookUpdate = async (book) => {
    const response = await fetch(`${Books_ROOT_URL}/books/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ book }),
    });
    const data = await response.json();
    handleGetBooks();
    console.log(data);
  };

  const handleBookDelere = async (id: number) => {
    await fetch(`${Books_ROOT_URL}/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    handleGetBooks();
  };

  console.log(bookPaging);

  return (
    <Container>
      <h1>Books</h1>
      <SearchWrapper>
        <input
          type="text"
          placeholder="Book Name"
          value={searchParams.title}
          onChange={(e) =>
            setSearchParams({ ...searchParams, title: e.currentTarget.value })
          }
        />
        <select
          onChange={(e) =>
            setSearchParams({
              ...searchParams,
              author_id: parseInt(e.currentTarget.value),
            })
          }
        >
          <option value={-1}>All Authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <button onClick={() => handleGetBooks()}>Search Books</button>
      </SearchWrapper>
      <BooksList>
        {books.map((book) => (
          <BooksListRow key={book.id}>
            <div>
              <div>
                <strong>Book:</strong> {book.title}
              </div>
              <div>
                <strong>description:</strong> {book.description}
              </div>
              <div>
                <strong>Author:</strong>{" "}
                {authors.find((a) => a.id == book.author_id)?.name}
              </div>
            </div>
            <div style={{ flex: "0 0 200px" }}>
              <BookEditForm
                book={book}
                onBookSave={handleBookUpdate}
                onBookDelete={handleBookDelere}
              />
            </div>
          </BooksListRow>
        ))}
      </BooksList>
      {bookPaging.page * bookPaging.per_page < bookPaging.total && (
        <LoadWrapper>
          <button onClick={() => handleGetBooks(bookPaging.page + 1)}>
            load more
          </button>
        </LoadWrapper>
      )}

      {authors.length > 0 && (
        <FormContainer>
          <input
            type="text"
            placeholder="Book Name"
            onChange={(e) =>
              setNewBook({ ...newBook, title: e.currentTarget.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setNewBook({ ...newBook, description: e.currentTarget.value })
            }
          />
          <select
            onChange={(e) =>
              setNewBook({ ...newBook, author_id: e.currentTarget.value })
            }
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          <button onClick={handleCreateBook}>Create Book</button>
        </FormContainer>
      )}
    </Container>
  );
};

export default Books;
