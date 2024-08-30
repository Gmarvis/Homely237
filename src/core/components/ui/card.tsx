'use client';

import { cn } from '@/core/lib/utils';
import { LucideIcon } from 'lucide-react';

export type CardProps = {
  label: string;
  icon: LucideIcon;
  text: string;
  description: string;
};

export default function Card(props: CardProps) {
  return (
    <CardContainer className="flex-col hover:cursor-pointer hover:bg-slate-100 duration-300">
      <section className="flex justify-between gap-2">
        <p className="text-sm">{props.label}</p>
        <props.icon className="w-4 h-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl text-wrap font-semibold">{props.text}</h2>
        <p className="text-xs text-gray-500">{props.description}</p>
      </section>
    </CardContainer>
  );
}

export function CardContainer(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('flex w-full  gap-3 rounded-xl border p-5 shadow', props.className)}
    />
  );
}
