import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function ResourceCalendar() {
  const handleDateClick = (arg:any) => {
    alert(arg.dateStr);
  };

  const renderEventContent = (eventInfo:any) => {
    return (
      <div className='flex flex-col justify-between py-3    px-4 h-full'>
        <div>
          <h1 className=' font-bold text-xl'>{eventInfo.event.title}</h1>
          <p>{eventInfo.event.extendedProps.description}</p>
        </div>
        <b>{eventInfo.timeText}</b>
      </div>
    );
  };

  return (
    <div className='max-h-[80%]'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, resourceTimeGridPlugin]}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        resources={[
          { id: 'a', title: 'Resource A' },
        ]}
        events={[
          { 
            id: '1', 
            resourceId: 'a', 
            title: 'Event 1', 
            start: '2024-06-22T10:00:00', 
            end: '2024-06-22T16:00:00',
            extendedProps: {
              description: 'Description for Event 1'
            }
          },
          { 
            id: '2', 
            resourceId: 'b', 
            title: 'Event 2', 
            start: '2023-06-23T13:00:00', 
            end: '2023-06-23T14:00:00',
            extendedProps: {
              description: 'Description for Event 2'
            }
          },
          { 
            id: '3', 
            resourceId: 'a', 
            title: 'Event 3', 
            start: '2023-06-24T09:00:00', 
            end: '2023-06-24T10:30:00',
            extendedProps: {
              description: 'Description for Event 3'
            }
          },
        ]}
        resourceAreaWidth='200px'
        resourceAreaHeaderContent='Resources'
      />
    </div>
  );
}
