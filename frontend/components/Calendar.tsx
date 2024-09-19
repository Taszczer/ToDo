import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '@/lib/types';
import { useState } from 'react';
import SeeMoreDialog from './SeeMoreDialog';
import { deletePost } from '@/lib/api';

export default function ResourceCalendar() {

  let [isOpen, setIsOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const response = await axios.get<Post[]>('http://localhost:5000/posts', {withCredentials:true});
      return response.data;
    }
  });

  const events = (data || []).map((post: Post) => {
    const startTime = new Date(post.start_time).getTime();
    const endTime = new Date(post.end_time).getTime();
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);
    
    return {
      id: post._id.toString(),
      resourceId: 'a',
      title: post.title,
      start: post.start_time,
      end: post.end_time,
      extendedProps: {
        description: post.description,
        durationInHours
      }
    };
  });

  const renderEventContent = (eventInfo: any) => {
    const durationInHours = eventInfo.event.extendedProps.durationInHours;

    return (
      <div className='h-full'>
        {durationInHours <= 2 ? (
          <div className="flex flex-col h-full items-center justify-center px-4 py-2">
            <button
              name='Zobacz więcej'
              className='text-white font-bold text-xl hover:underline'
              onClick={() => { setIsOpen(true); }}
            >
              Zobacz więcej
            </button>
            <SeeMoreDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              id={eventInfo.event.id}
              title={eventInfo.event.title}
              description={eventInfo.event.extendedProps.description}
              time={eventInfo.timeText}
            />
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between px-4 py-2">
            <div>
              <p className="font-bold text-lg">{eventInfo.event.title}</p>
              <p className="font-medium text-md">{eventInfo.event.extendedProps.description}</p>
            </div>

            <div className="flex justify-between">
              <b className="flex items-center font-medium text-lg">{eventInfo.timeText}</b>
              <button
                className="font-bold text-lg"
                onClick={() => {
                  deletePost(eventInfo.event.id);
                  window.location.reload();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='max-h-screen w-full'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        initialView='resourceTimeGridWeek'
        eventContent={renderEventContent}
        resources={[{ id: 'a', title: 'Resource A' }]}
        events={events}
        resourceAreaWidth='300px'
        resourceAreaHeaderContent='Resources'
        height="auto"
        contentHeight="auto" 
      />
    </div>
  );
}
