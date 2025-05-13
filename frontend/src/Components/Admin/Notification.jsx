import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from '../../api';

// Function to get the token from local storage
const getToken = () => localStorage.getItem('token');

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${api}/notifications`, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                setNotifications(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setLoading(false);
            }
        };
        fetchNotifications();
    },[]);

    const deleteNotification = async (notificationId) => {
        try {
            await axios.delete(`${api}/notifications/${notificationId}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    if(loading){
        return <div>Loading Notifications...</div>;
    }

    return(
        <div>
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ):(<ul>
                {notifications.map((notification) => (
                    <li key={notifications._id}>
                        {notification.message} -{""}
                        <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                        <button onClick={() => deleteNotification(notification._id)}>Delete</button>
                    </li>
                ))}
            </ul>)}
        </div>
    );
};

export default Notification;