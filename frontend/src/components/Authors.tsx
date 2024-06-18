import styled from "styled-components";
import React, { useState } from "react";

import AuthorEditForm from "./AuthorEditForm";

type Props = {
  token: string;
  authors: any[];
  onSetAuthors: (authors: any[]) => void;
};

const Container = styled.div`
  /* background-color: #f5f5f5; */
`;

const AuthorsList = styled.div``;

const AuthorsListRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 30px;
`;

const AUTHORS_ROOT_URL = "http://localhost:3002";

const Authors: React.FC<Props> = ({ token, authors, onSetAuthors }) => {
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    bio: "",
  });

  const handleGetAuthors = async () => {
    const response = await fetch(`${AUTHORS_ROOT_URL}/authors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    onSetAuthors(await response.json());
  };

  const handleCreateAuthor = async () => {
    if (!newAuthor.name) {
      return;
    }

    const response = await fetch(`${AUTHORS_ROOT_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ author: newAuthor }),
    });
    const data = await response.json();
    handleGetAuthors();
    console.log(data);
  };

  const handleAuthorUpdate = async (author) => {
    const response = await fetch(`${AUTHORS_ROOT_URL}/authors/${author.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ author }),
    });
    const data = await response.json();
    handleGetAuthors();
    console.log(data);
  };

  const handleAuthorDelere = async (id: number) => {
    await fetch(`${AUTHORS_ROOT_URL}/authors/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    handleGetAuthors();
  };

  return (
    <Container>
      <h1>Authors</h1>
      <p>
        Authors is a simple app that allows users to create, read, update, and
        delete authors.
      </p>
      <button onClick={handleGetAuthors}>Get Authors</button>
      <AuthorsList>
        {authors.map((author) => (
          <AuthorsListRow key={author.id}>
            <div>
              <div>
                <strong>Id:</strong> {author.id}
              </div>
              <div>
                <strong>Author:</strong> {author.name}
              </div>
              <div>
                <strong>bio:</strong> {author.bio}
              </div>
            </div>
            <div style={{ flex: "0 0 200px" }}>
              <AuthorEditForm
                author={author}
                onAuthorSave={handleAuthorUpdate}
                onAuthorDelete={handleAuthorDelere}
              />
            </div>
          </AuthorsListRow>
        ))}
      </AuthorsList>

      <FormContainer>
        <input
          type="text"
          placeholder="Author Name"
          onChange={(e) =>
            setNewAuthor({ ...newAuthor, name: e.currentTarget.value })
          }
        />
        <input
          type="text"
          placeholder="Author Bio"
          onChange={(e) =>
            setNewAuthor({ ...newAuthor, bio: e.currentTarget.value })
          }
        />
        <button onClick={handleCreateAuthor}>Create Author</button>
      </FormContainer>
    </Container>
  );
};

export default Authors;
