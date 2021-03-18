import {React,useState} from 'react'

//import css
import './chatBox.css'

const ChatBox = () => {
    const [msg, setMsg] = useState("")
    const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
    const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
   

    const appendMessage=(img, side, text)=>{
        const msgHTML = 
            `<div class="msg ${side}-msg">
                    <div class="msg-img" style="background-image: url(${img})"></div>
                    <div class="msg-bubble">
                        <div class="msg-text">${text}</div>
                    </div>
            </div>`;

         document.getElementById("msger-chat").insertAdjacentHTML("beforeend", msgHTML);
    }

    const botResponse=()=>{
           try{
                fetch('http://localhost:5000/bot/sendMsg',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        msg:msg
                    })
                })
                .then(res=>res.json())
                .then(response=>{
                    setTimeout(() => {
                        appendMessage(BOT_IMG, "left", response.data);
                    }, 1000);
                })
            }
            catch(err){
                console.log(err)
            }
      }


    const submitHandler =event =>{
       event.preventDefault();
       const msgText=document.getElementById("msger-input").value

       appendMessage(PERSON_IMG,"right", msgText);
       document.getElementById("msger-input").value = "";
       botResponse();
 
    }
   
    const inputChangeHandler =event =>{
        setMsg(event.target.value)
    }
    
    return (
        <div className="msger">
            <header className="msger-header">
                <div className="msger-header-title">
                   SimpleChat
                </div>
            </header>
            <main className="msger-chat" id="msger-chat">
               
            </main>
            <form className="msger-inputarea" id="myForm" onSubmit={submitHandler}>
                <input type="text" className="msger-input" id="msger-input" placeholder="Enter your message..." onChange={inputChangeHandler} value={msg}/>
                    <button type="submit" className="msger-send-btn">Send</button>
            </form>
        </div>
    )
}

export default ChatBox