import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Yeweet from "components/Yeweet";
import YeweetFactory from "components/YeweetFactory";

const Home = ({ userObj }) => {
  const [yeweets, setYeweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("yeweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setYeweets(newArray);
      });
  }, []);

  return (
    <div className='container'>
      <YeweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {yeweets.map((yeweet) => (
          <Yeweet
            key={yeweet.id}
            yeweetObj={yeweet}
            isOwner={yeweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
