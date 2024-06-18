import styled from "styled-components";
import React, { useState } from "react";

type Props = {
  book: any;
  onBookSave: (book: any) => void;
  onBookDelete: (id: number) => void;
};

const ShowFormButton = styled.button`
  margin-right: 10px;
`;

const FormContainer = styled.div`
  padding-top: 30px;
  display: flex;
  gap: 1rem;
`;

const BookEditForm: React.FC<Props> = ({ book, onBookSave, onBookDelete }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editBook, seteditBook] = useState({
    id: book.id,
    title: book.title,
    description: book.description,
  });

  const handleBookSave = async () => {
    onBookSave(editBook);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <>
        <ShowFormButton onClick={() => setShowForm(true)}>Edit</ShowFormButton>
        <button onClick={() => onBookDelete(book.id)}>Delete</button>
      </>
    );
  }

  return (
    <FormContainer>
      <input
        type="text"
        placeholder="Book Name"
        value={editBook.title}
        onChange={(e) =>
          seteditBook({ ...editBook, title: e.currentTarget.value })
        }
      />
      <input
        type="text"
        placeholder="Book Description"
        value={editBook.description}
        onChange={(e) =>
          seteditBook({ ...editBook, description: e.currentTarget.value })
        }
      />
      <button onClick={handleBookSave}>Update</button>
    </FormContainer>
  );
};

export default BookEditForm;
