'use client';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Trash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type PropTypes = {
  notification: NotificationType;
  onClickDelete: (notification_id: string) => void;
  onClickOpen: () => void;
};

export default function NotificationCard({ notification, onClickDelete, onClickOpen }: PropTypes) {
  const [loading, setIsLoading] = useState(false);
  return (
    <div
      onClick={onClickOpen}
      className={`w-full ${notification.read_status ? 'bg-slate-100' : 'bg-slate-300'} shadow duration-300 p-2 rounded-md relative hover:cursor-pointer hover:bg-slate-300/80`}
    >
      <div className="flex items-center justify-between text-gray-800">
        <h3 className="font-semibold text-sm text-teal-800">{notification.title}</h3>
        <p className="text-xs">
          {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
        </p>
      </div>

      <div className="flex justify-between items-center ">
        <p className="text-sm">{notification?.body?.slice(0, 40)}...</p>

        {loading ? (
          <div className=" w-6 my-2 h-6 border-r-2 animate-spin border-t-2 border-slate-900 rounded-full"></div>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsLoading(true);
              onClickDelete(notification.id);
            }}
            size={'sm'}
            className="hover:text-red-600"
            variant={'ghost'}
          >
            <Trash size={12} />
          </Button>
        )}
      </div>
    </div>
  );
}
