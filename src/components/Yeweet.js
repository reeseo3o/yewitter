import { dbService } from "fbase";
import { useState, storageService } from "react";

const Yeweet = ({ yeweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newYeweet, setNewYeweet] = useState(yeweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`yeweets/${yeweetObj.id}`).delete();
      if (yeweetObj.attachmentUrl !== "")
        await storageService.refFromURL(yeweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewYeweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`yeweets/${yeweetObj.id}`).update({ text: newYeweet });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newYeweet} required />
            <input type='submit' value='Update Yeweet' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{yeweetObj.text}</h4>
          {yeweetObj.attachmentUrl && (
            <img src={yeweetObj.attachmentUrl} width='50px' height='50px' />
          )}

          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Yeweet</button>
              <button onClick={toggleEditing}>Edit Yeweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Yeweet;
