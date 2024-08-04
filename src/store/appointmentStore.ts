import { create } from 'zustand';

type StoreType = {
  receivedappointments: Appointment[];
  setReceivedAppointments: (appointments: Appointment[]) => void;
};

const useAppointmentStore = create<StoreType>((set) => ({
  receivedappointments: [],
  setReceivedAppointments: (appointments) => set(() => ({ receivedappointments: appointments }))
}));

export default useAppointmentStore;
