"use client";

import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";
import Link from 'next/link'
import Modal from "./modal";

import { User } from "./types/user";

export type GalleryProps = {
  users: User[];
};

type LocationType = {
    lat: String,
    lng: String
}

const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUser = async () => {
        const datas = await fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()).then(res => res)
        setUsersList([...datas])
    }

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if(user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUser()
  },[])

  const gotoMap = (location: LocationType) => {
    window.open(`http://maps.google.com/?ie=UTF8&hq=&ll=${location.lng},${location.lat}&z=13`, '_blank')
  }
  

  return (
    <div className="user-gallery">
      <h1 className="heading">Users</h1>
      <div className="items">
        { usersList && usersList.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="post-btn-container">
                    <Link className={'post-btn'} href={`/posts/${selectedUser.id}`}>See posts</Link>
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data location_map" onClick={() => gotoMap(selectedUser.address.geo)}>{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
