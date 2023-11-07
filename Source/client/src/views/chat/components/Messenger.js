import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RiGalleryLine } from 'react-icons/all';
import InputEmoji from 'react-input-emoji';

export default function Messenger() {
  const { currentUser } = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState([]);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  let senderNames = [];

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch(`http://localhost:5002/conversations/${currentUser._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resData = await res.json();
      setConversations(resData);
      console.log(resData);
    };
    fetchConversations();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:5002/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resData = await res.json();
      setUser(resData);
      console.log(resData);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (_id) => {
    const res = await fetch(`http://localhost:5002/messages/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resData = await res.json();
    setMessages(resData);
  };

  const fetchSenderUser = async (senderId) => {
    const res = await fetch(`http://localhost:5002/users/${senderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resData = await res.json();

    senderNames = resData;
    console.log('senderName:', senderNames);
    return senderNames;
  };

  // eslint-disable-next-line
  function onChange() {
    // eslint-disable-next-line
    alert('here');
  }
  // eslint-disable-next-line
  const handleOnEnter = (text) => {
    console.log('enter', text);
  };
  return (
    <div className="grid-container-element bg-background">
      <div className="grid-child-element-contacts bg-foreground rounded">
        <div className="justify-center items-center ">
          <div className="border border-foreground rounded-full ms-card">
            <img className="mt-card" src={currentUser.thumb} alt="" width={75} height={75} />
          </div>
          <div>
            <h3 className="text-alternate text-large ms-card mt-card">{currentUser?.name}</h3>
            <p className="text-alternate text-small font-light ms-card">My Account</p>
          </div>
        </div>
        <div>
          <div className="text-primary text-medium ms-card">Messages</div>
          <div className="ms-card pb-card pt-card">
            {conversations.length > 0 ? (
              conversations.map(({ _id, senderId }) => {
                fetchSenderUser(senderId);
                return (
                  <div key={conversations._id} className="grid-container-element cursor-pointer text-alternate pt-card" onClick={() => fetchMessages(_id)}>
                    <div>
                      <img src={user.thumb} width={60} height={60} alt="" />{' '}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">{senderId}</h3>
                      <p className="text-sm font-light text-gray-600">status</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24"> No Conversations </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid-child-element-chat bg-foreground rounded">
        <div className="bg-background p-card m-card rounded">
          <div className="grid-container-element">
            <img src={currentUser.thumb} alt="" width={60} height={60} />
            <div>
              <h3 className="text-lg font-semibold text-alternate">CURRENT USER CHAT</h3>
              <p className="text-sm font-light text-alternate">Online</p>
            </div>
          </div>
        </div>

        <div className="bg-background max-h-50 p-card m-card rounded overflow-auto">
          <div className="max-h-50 px-10 py-14">
            {messages.length > 0 ? (
              messages.map(({ message, senderId }) => {
                return (
                  <div
                    key={messages.senderId}
                    className={`w-50 rounded p-4 m-4 ${senderId === currentUser._id ? 'bg-secondary text-black ms-auto' : 'bg-foreground text-alternate'}`}
                  >
                    {message}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">No Messages</div>
            )}
          </div>
        </div>

        <div className="w-100 grid-container-element ms-5 me-5">
          <div className="w-90 grid-container-element">
            <InputEmoji value={text} onChange={setText} cleanOnEnter onEnter={handleOnEnter} placeholder="Type a message" />
            <div className="msgSendSection flex">
              <div className="fileHoverImage">
                <div className="addImage">Add Image</div>
                <button type="button" className="btn-icon btn-icon-only  rounded-xl btn btn-primary">
                  <input type="file" id="pic" className="formControl" />
                  <label htmlFor="pic">
                    <RiGalleryLine />
                  </label>
                </button>
              </div>
              <button type="button" className="btn-icon btn-icon-only rounded-xl ms-3 btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cs-icon chevron-right "
                >
                  <path d="M7 4L12.6464 9.64645C12.8417 9.84171 12.8417 10.1583 12.6464 10.3536L7 16"> </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
