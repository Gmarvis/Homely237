'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AppointmentsTable from './_components/AppointmentsTable';

const page = () => {
  return (
    <div className="py-4 ">
      <AppointmentsTable />
    </div>
  );
};

export default page;
