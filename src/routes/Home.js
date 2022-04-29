import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Yeweet from "components/Yeweet";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
const Home = ({ userObj }) => {
  const [yeweet, setYeweet] = useState("");
  const [yeweets, setYeweets] = useState([]);

  /*   useEffect(() => {
    dbService
      .collection("yeweets")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setYeweets(newArray);
      });
  }, []); */

  useEffect(() => {
    const q = query(
      collection(dbService, "yeweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const yeweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setYeweets(yeweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("yeweets").add({
      text: yeweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setYeweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setYeweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={yeweet}
          onChange={onChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='submit' value='Yeweet' />
      </form>
      <div>
        {yeweets.map((yeweet) => (
          <Yeweet
            key={yeweet.id}
            yeweetObj={yeweet}
            isOwner={yeweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
