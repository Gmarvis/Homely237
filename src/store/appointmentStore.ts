import { create } from 'zustand';

type StoreType = {
  Receivedappointments: Appointment[];
  setReceivedAppointments: (appointments: Appointment[]) => void;
};

const useAppointmentStore = create<StoreType>((set) => ({
  Receivedappointments: [],
  setReceivedAppointments: (appointments) => set(() => ({ Receivedappointments: appointments }))
}));

export default useAppointmentStore;
