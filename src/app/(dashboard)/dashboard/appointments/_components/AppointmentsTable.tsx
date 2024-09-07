'use client';
import * as QUERIES from '@/core/utils/queries';
import useUserStore from '@/store/userStore';
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/core/components/ui/table';
import HelperFunctions from '@/core/utils/service/helperFunctions';
import { Button } from '@/core/components/ui/button';
import { DropdownMenuItem } from '@/core/components/ui/dropdown-menu';

import { DropDownMenu } from '@/core/components/organisms/modals/';
import { useRouter } from 'next/navigation';

import { formatDistanceToNow } from 'date-fns';

import { dateFormatter } from '@/core/utils/date';

const AppointmentsTable = () => {
  enum StatusType {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    DECLINED = 'declined'
  }

  enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    PROVIDER = 'provider'
  }

  const statusColumnStyles = (status: StatusType) => {
    switch (status) {
      case StatusType.PENDING:
        return 'text-orange-300';
      case StatusType.DECLINED:
        return 'text-red-600';
      case StatusType.ACCEPTED:
        return 'text-green-600';
      default:
        '';
    }
  };

  const tableHeaders = ['name', 'message', 'sent date', 'due date', 'status'];

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();
  const [filter, setFilter] = useState<'sent' | 'received'>('received');
  const [upDating, setUpdating] = useState(false);

  const router = useRouter();

  const getReceivedAppointments = () => {
    setLoading(true);
    QUERIES.getReceivedAnointments(user.id).then((res) => {
      setAppointments(res);
      setFilter('received');
      setLoading(false);
    });
  };

  const getSentAppointments = () => {
    setLoading(true);
    QUERIES.getSentAnointments(user.id).then((res) => {
      console.log(res);
      setAppointments(res);
      setFilter('sent');
      setLoading(false);
    });
  };

  useEffect(() => {
    if (user.role === UserRole.USER) {
      getSentAppointments();
    } else {
      getReceivedAppointments();
    }
  }, []);

  const handleReadAppointment = (id: string) => {
    router.push(`/dashboard/appointments/${id}`);
  };

  // todo approve and decline appointments
  const handleRespToAppointment = (id: string, status: string) => {
    setUpdating(true);
    QUERIES.updateAppointment(id, { status: status }).then((res) => {
      if (res.id) {
        const filteredApt = appointments?.filter((appointment) => appointment.id !== id);
        filteredApt && setAppointments([res, ...filteredApt]);
        setUpdating(false);
      }
    });
  };

  console.log(appointments);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 mobile:max-lg:p-0 md:px-8 relative">
      <div className=" justify-between md:flex flex items-center mobile:max-md:pt-5 gap-5">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Appointments </h3>
          <p className="text-gray-600 mt-2 text-xs">
            {user.role !== 'user'
              ? 'Approve, decline and reschedule appointments here!'
              : 'manage all you appointments here'}
          </p>
        </div>

        {user.role !== UserRole.USER && (
          <div className="space-x-4 justify-between flex">
            <Button
              size={'sm'}
              onClick={getSentAppointments}
              className={`${filter === 'sent' ? 'bg-slate-800/20' : ''} duration-300`}
              variant={'secondary'}
            >
              Sent
            </Button>
            <Button
              size={'sm'}
              onClick={getReceivedAppointments}
              className={`${filter === 'received' ? 'bg-slate-800/20' : ''} duration-300`}
              variant={'secondary'}
            >
              {' '}
              Received
            </Button>
          </div>
        )}
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto py-4 px-2">
        {loading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            {new Array(10).fill(1).map((_, index) => (
              <div key={index} className="w-full p-8 bg-slate-300 rounded"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Table on big screens */}
            <div className="max-h-[72vh]">
              <Table className="mobile:max-md:hidden h-[20vh]">
                <TableCaption>
                  {appointments?.length > 0
                    ? 'A list of your recent Appointments.'
                    : 'No new appointments'}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    {tableHeaders.map((header, index) => (
                      <TableHead className={`font-semibold text-gray-950 capitalize`} key={index}>
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-yellow-300:">
                  {appointments &&
                    appointments?.map((appointment, index) => (
                      <TableRow
                        onClick={() => handleReadAppointment(appointment.id)}
                        key={index}
                        accessKey="user"
                        className="hover:shadow-md rounded-md duration-300 hover:cursor-pointer"
                      >
                        <TableCell className="font-medium">
                          {appointment.sender_id === user.id ? 'Me' : appointment.user?.name}
                        </TableCell>
                        <TableCell>
                          {HelperFunctions.capitalizeText(appointment.description).slice(0, 60)}...
                        </TableCell>
                        <TableCell>
                          {' '}
                          {formatDistanceToNow(appointment.createdAt, { addSuffix: true })}
                        </TableCell>
                        <TableCell> {dateFormatter.formatDate(appointment.date)} </TableCell>
                        <TableCell
                          className={`${statusColumnStyles(appointment.status)} font-semibold`}
                        >
                          {appointment.status.toUpperCase()}{' '}
                        </TableCell>
                        <TableCell>
                          {upDating ? (
                            <div className="w-8 h-8 rounded-full  border-t-2 border-r-2 animate-spin"></div>
                          ) : (
                            <DropDownMenu>
                              <DropdownMenuItem onClick={() => {}}>Open</DropdownMenuItem>
                              {user.id !== appointment.sender_id && (
                                <>
                                  <DropdownMenuItem
                                    className={`${appointment.status !== 'pending' ? 'hidden' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRespToAppointment(appointment.id, 'accepted');
                                    }}
                                  >
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className={`${appointment.status !== 'pending' ? 'hidden' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRespToAppointment(appointment.id, 'declined');
                                    }}
                                  >
                                    Decline
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropDownMenu>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              {/* Table on mobile screens */}

              <Table className="md:hidden">
                <TableCaption>
                  {appointments?.length
                    ? 'A list of your recent Appointments.'
                    : 'No new appointments'}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    {tableHeaders
                      .filter((item) => ['name', 'sent date', 'status'].includes(item))
                      .map((header, index) => (
                        <TableHead
                          className={`font-semibold text-gray-950 capitalize ${index === tableHeaders.length - 1 ? 'text-end' : ''}`}
                          key={index}
                        >
                          {header}
                        </TableHead>
                      ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs">
                  {appointments?.map((appointment, index) => (
                    <TableRow
                      onClick={() => handleReadAppointment(appointment.id)}
                      key={index}
                      accessKey="user"
                      className="hover:shadow-md rounded-md duration-300 hover:cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        {appointment.sender_id === user.id ? 'Me' : appointment.user.name}
                      </TableCell>
                      <TableCell>
                        {' '}
                        {formatDistanceToNow(appointment.createdAt, { addSuffix: true })}
                      </TableCell>

                      <TableCell
                        className={`${statusColumnStyles(appointment.status)} font-semibold`}
                      >
                        {appointment.status.toUpperCase()}{' '}
                      </TableCell>
                      <TableCell>
                        {upDating ? (
                          <div className="w-8 h-8 rounded-full  border-t-2 border-r-2 animate-spin"></div>
                        ) : (
                          <DropDownMenu>
                            <DropdownMenuItem onClick={() => {}}>Open</DropdownMenuItem>
                            {user.id !== appointment.sender_id && (
                              <>
                                <DropdownMenuItem
                                  className={`${appointment.status !== 'pending' ? 'hidden' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRespToAppointment(appointment.id, 'accepted');
                                  }}
                                >
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className={`${appointment.status !== 'pending' ? 'hidden' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRespToAppointment(appointment.id, 'declined');
                                  }}
                                >
                                  Decline
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropDownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentsTable;
