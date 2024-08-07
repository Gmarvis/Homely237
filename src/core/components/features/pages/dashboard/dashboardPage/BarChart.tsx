import { Bar, BarChart as BarGraph, ResponsiveContainer, XAxis, YAxis } from 'recharts';
export default function BarChart() {
  function random() {
    return Math.floor(Math.random() * 1000);
  }

  const statistics = [
    { month: 'January', total: random() },
    { month: 'February', total: random() },
    { month: 'March', total: random() },
    { month: 'April', total: random() },
    { month: 'May', total: random() },
    { month: 'June', total: random() },
    { month: 'July', total: random() },
    { month: 'August', total: random() },
    { month: 'September', total: random() },
    { month: 'October', total: random() },
    { month: 'November', total: random() },
    { month: 'December', total: random() }
  ];

  return (
    <ResponsiveContainer className='flex justify-start' width={'100%'} height={350}>
      <BarGraph data={statistics}>
        <XAxis dataKey={"month"}
        tickLine={false}
        axisLine={false}
        stroke='#88888'
        fontSize={12}
        />
        <YAxis  dataKey={"total"}
           tickLine={false}
           axisLine={false}
           stroke='#88888'
           fontSize={12}
        />
        <Bar dataKey={"total"} radius={[4,4,0,0]} clipPath='right' fill='#7a8c8a'/>
      </BarGraph>
    </ResponsiveContainer>
  );
}
