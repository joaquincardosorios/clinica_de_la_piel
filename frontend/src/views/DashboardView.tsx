// import { Button } from "@material-tailwind/react";
import { Calendar, dayjsLocalizer  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'

const localizer = dayjsLocalizer(dayjs)
const events = [
  {
    title: 'Cita médica',
    start: new Date(2025, 1, 15, 10, 0), // 15 de febrero 2025 a las 10:00
    end: new Date(2025, 1, 15, 11, 0),
  },
]

const messages = {
  week: 'Semana',
  work_week: 'Semana laboral',
  day: 'Día',
  month: 'Mes',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  agenda: 'Agenda',
}


export default function DashboardView() {
  return (
    <></>
    // <div className='overflow-y-auto max-h-96 '>
    //   {/* <Button>Button</Button> */}
    //   <Calendar
    //     localizer={localizer}
    //     culture='es-ES'
    //     events={events}
    //     messages={messages}
    //     startAccessor="start"
    //     endAccessor="end"
    //     style={{ height: '100%' }}
    //   />
    // </div>
  )
}

