import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from '../../api';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${api}/notifications`);
                setNotifications(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching notifications:".error);
                setLoading(false);
            }
        };
        fetchNotifications();
    },[]);

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
                    </li>
                ))}
            </ul>)}
        </div>
    );
};

export default Notification;