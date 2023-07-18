import styled from "styled-components"
import { useState, useEffect , useRef} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/apiRoutes";
import { io } from "socket.io-client";
import { ChatContainer, Contacts,Welcome } from "../components";

export default function Chats() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  
console.log({isLoaded,currentChat});
  useEffect( ()=>{
    const navigationTo = async () => {
      console.log({1111:localStorage.getItem('user')});
      if (!localStorage.getItem('user'))
      {
        navigate("/");
      }
      else {
        const t=await JSON.parse(localStorage.getItem('user'))
        console.log({tttt:t});
        setCurrentUser(await JSON.parse(localStorage.getItem('user')));
        setIsLoaded(true);
      }
    }
    navigationTo();
    console.log({currentUser});
   }, [navigate]);

   useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
   },[currentUser]);

  useEffect( () => {
    const getCurrentUser = async()=>{
      if( currentUser)  {
        console.log({currentUser});
        const data = await  axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log({getCurrentUser:data})
        setContacts(data.data);
    }
    }
      getCurrentUser();
  }, [currentUser,navigate]);

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser}  changeChat={handleChatChange}/>
        { isLoaded &&
          currentChat === undefined ?
           <Welcome currentUser={currentUser}/> 
           :
          <ChatContainer currentChat={currentChat} socket={socket} currentUser={currentUser} />
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0e1515;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
