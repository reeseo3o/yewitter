import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className='yeweet'>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className='container yeweetEdit'>
            <input
              onChange={onChange}
              value={newYeweet}
              required
              placeholder='Edit your yeweet'
              autoFocus
              className='formInput'
            />
            <input type='submit' value='Update Yeweet' className='formBtn' />
          </form>
          <button onClick={toggleEditing} className='formBtn cancelBtn'>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{yeweetObj.text}</h4>
          {yeweetObj.attachmentUrl && (
            <img src={yeweetObj.attachmentUrl} width='50px' height='50px' />
          )}

          {isOwner && (
            <div className='yeweet__actions'>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Yeweet;
