import { useContext } from 'react';
import './Sidebar.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import EditProfileModal from '../EditProfileModal/EditProfileModal';


export default function Sidebar({
    isLoggedIn,
    showUpdateProfile,
    setShowUpdateProfile,
    isSubmitEnabled,
    setIsSubmitEnabled,
    setCurrentUser,
}) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);
    const currentUser = useContext(CurrentUserContext);


    return (
        <div className='sidebar'>
            <div className="sidebar__profile">
                <img
                    alt="Profile avatar"
                    className="sidebar__avatar"
                    src={currentUser.avatar}
                    width="32"
                    height="32"
                    draggable="false"
                />
                <span>{currentUser.name}</span>
            </div>
            <div className="sidebar__menu">
                <ul>
                    <li>
                        <button onClick={() => setShowUpdateProfile(true)} >Change profile data</button>
                    </li>
                    <li>
                        <button>Logout</button>
                    </li>
                </ul>
            </div>
            <EditProfileModal
                showModal={showUpdateProfile}
                setShowModal={setShowUpdateProfile}
                isSubmitEnabled={isSubmitEnabled}
                setIsSubmitEnabled={setIsSubmitEnabled}
                setCurrentUser={setCurrentUser}
            />
        </div>
    )
}