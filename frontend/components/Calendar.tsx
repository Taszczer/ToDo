"use client"

import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '@/lib/types';

export default function ResourceCalendar() {

  const { isLoading, data, error } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const response = await axios.get<Post[]>('http://localhost:5000/posts')
      return response.data
    }
  })
  
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className='flex flex-col h-full justify-between px-4 py-2'>
        <div>
          <p className=' font-bold text-xl '>{eventInfo.event.title}</p>
          <p className=' font-medium text-md'>{eventInfo.event.extendedProps.description}</p>
        </div>
        <b>{eventInfo.timeText}</b>
      </div>
    );
  };

  const events = (data || []).map((post: Post) => ({
    id: post._id.toString(), 
    resourceId: 'a', 
    title: post.title.toString(), 
    start: post.start_time, 
    end: post.end_time,
    extendedProps: {
      description: post.description
    }
  }))

  return (
    <div className='max-h-[80%]'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        initialView='resourceTimeGridWeek'
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        resources={[
          { id: 'a', title: 'Resource A' },
        ]}
        events={events}
        resourceAreaWidth='300px'
        resourceAreaHeaderContent='Resources'
      />
    </div>
  );
}
