import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/core'
import esLocale from '@fullcalendar/core/locales/es'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {  useState } from 'react'
import { createEventId, INITIAL_EVENTS } from '@/utils/event'
import { useMediaQuery } from 'react-responsive'

export default function DashboardView() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])

  function handleDateSelect(selectInfo: DateSelectArg) {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  function handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  function handleEvents(events: EventApi[]) {
    setCurrentEvents(events)
  }

  return (
    <div className='w-full h-full p-5 text-sm'>

        <FullCalendar
          height={'100%'}
          timeZone='local'
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: isMobile ? 'dayGridMonth,timeGridDay' : 'dayGridMonth,timeGridWeek,timeGridDay',
            right: 'title',
          }}
          slotMinTime={'08:00:00'}
          slotMaxTime={'21:00:00'}
          slotDuration={'00:20:00'}
          slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, meridiem: 'short' }}
          titleFormat={{ year: 'numeric', month: 'short' }}
          dayHeaderFormat={{ weekday: 'long', day: 'numeric' }}
          initialView={useMediaQuery({ query: '(max-width: 768px)' }) ? 'timeGridDay' : 'timeGridWeek'}
          initialDate={new Date().toISOString().split('T')[0]}
          allDaySlot={false}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={false}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          
          locale={esLocale}
          navLinks={true}
          nowIndicator={true}
        />

    </div>
  )
}


function renderEventContent(eventInfo : EventContentArg) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
