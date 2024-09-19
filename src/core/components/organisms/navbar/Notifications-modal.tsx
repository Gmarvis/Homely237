'use client';
import { motion } from 'framer-motion';
import DropDown from '../../molecules/DropDown';

import * as Queries from '@/core/utils/queries';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store';
import { CardContainer } from '../../ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../../ui/button';
import { Trash } from 'lucide-react';
import NotificationCard from './notificationCard';
import { ActionBtn } from '../../atoms/buttons/ActionBtn';
import { useRouter } from 'next/navigation';

type PropTypes = {
  onBlur: () => void;
};

export default function NotificationModal({ ...props }: PropTypes) {
  const [notifications, setNotifications] = useState<NotificationType[] | null>();
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();
  const router = useRouter();

  const getNotifications = async () => {
    const notifications = await Queries.getNotifications(user.id);
    console.log('notifications', notifications);
    setNotifications(notifications);
  };

  const handleDeleteNotification = (notification_id: string) => {
    Queries.deleteNotification(notification_id).then((res) => {
      if (res)
        setNotifications(
          notifications?.filter((notification) => notification.id !== notification_id)
        );
    });
  };

  const handleDeleteAllNotification = async () => {
    setLoading(true);
    await Queries.deleteAllNotification(user.id).then((res) => {
      if (res) setNotifications([]);
      setLoading(false);
    });
    setLoading(false);
  };

  const handleReadNotification = async (notification: NotificationType) => {
    await Queries.readNotification(notification.id);
    if (notification.appointment_id)
      router.push(`/dashboard/appointments/${notification.appointment_id}`);
  };

  console.log('notifications', notifications);
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: 1, translateX: 0.3 }}
      transition={{ duration: 0.3 }}
      className="absolute top-[77px] mobile:max-sm:top-[70px] right-1 h-screen z-40 "
    >
      <DropDown
        title={'Notifications'}
        onBlur={props.onBlur}
        className="w-[400px] mobile:max-sm:w-[85vw]"
      >
        <div className=" h-[calc(100vh-130px)]">
          <div className="flex flex-col space-y-2 animate-pulse">
            {!notifications &&
              new Array(12)
                .fill(1)
                .map((_, index) => (
                  <div key={index} className="w-full h-[60px] bg-slate-300 rounded-md"></div>
                ))}
          </div>
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0.3 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col space-y-2 overscroll-y-scroll"
          >
            {notifications?.map((notification, index) => (
              <NotificationCard
                key={index}
                onClickOpen={() => handleReadNotification(notification)}
                notification={notification}
                onClickDelete={handleDeleteNotification}
              />
            ))}
          </motion.div>
          {!notifications?.length && (
            <div className="h-full flex justify-center items-center">
              <h3>no new notification</h3>
            </div>
          )}
          {notifications && notifications.length > 0 && (
            <div className="absolute bottom-2 right-4">
              <ActionBtn onClick={handleDeleteAllNotification} loading={loading}>
                clear all
              </ActionBtn>
            </div>
          )}
        </div>
      </DropDown>
    </motion.div>
  );
}
