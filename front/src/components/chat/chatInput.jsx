import React,{useState} from 'react'
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/io'

 function ChatInput({handleSendMsg}) {
    const [msg, setMsg] = useState("");
    
    const sendChat = (e)=>{
        e.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }
  return (
    <Container>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type="text" placeholder='Type your message here!' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
            <button className="submit">
                <IoMdSend />
            </button>
        </form>
    </Container>
  )
}

const Container = styled.div`
align-items: center;
background-color: #080420;
padding-bottom: 0.3rem;
@media screen and (min-width: 720px) and (max-width: 1080px){
    padding: 0 1rem;
    gap: 1rem;
}
.input-container{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input{
        width: 100%;
        height: 60%;
        background-color: #60626200;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        &::selection{
            background-color: #9186f3;
        }
        &:focus{
            outline: none;
        }
    }
    button{
        padding: 0.3rem 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1e6c6c;
        border: none;
        cursor: pointer;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            padding: 0.3rem 1rem;
            svg{
            font-size: 1rem;
            color: white;
        }
        }
        svg{
            font-size: 2rem;
            color: white;
        }
    }
}
`;
export default ChatInput;