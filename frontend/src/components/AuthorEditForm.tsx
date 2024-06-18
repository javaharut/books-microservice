import styled from "styled-components";
import React, { useState } from "react";

type Props = {
  author: any;
  onAuthorSave: (author: any) => void;
  onAuthorDelete: (id: number) => void;
};

const ShowFormButton = styled.button`
  margin-right: 10px;
`;

const FormContainer = styled.div`
  padding-top: 30px;
  display: flex;
  gap: 1rem;
`;

const AuthorEditForm: React.FC<Props> = ({ author, onAuthorSave, onAuthorDelete }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editAuthor, seteditAuthor] = useState({
    id: author.id,
    name: author.name,
    bio: author.bio,
  });

  const handleAuthorSave = async () => {
    onAuthorSave(editAuthor);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <>
        <ShowFormButton onClick={() => setShowForm(true)}>Edit</ShowFormButton>
        <button onClick={() => onAuthorDelete(author.id)}>Delete</button>
      </>
    );
  }

  return (
    <FormContainer>
      <input
        type="text"
        placeholder="Author Name"
        value={editAuthor.name}
        onChange={(e) =>
          seteditAuthor({ ...editAuthor, name: e.currentTarget.value })
        }
      />
      <input
        type="text"
        placeholder="Author Bio"
        value={editAuthor.bio}
        onChange={(e) =>
          seteditAuthor({ ...editAuthor, bio: e.currentTarget.value })
        }
      />
      <button onClick={handleAuthorSave}>Update</button>
    </FormContainer>
  );
};

export default AuthorEditForm;
