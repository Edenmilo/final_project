import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function DemaoCalendar() {

    const events = [
        { title: 'Meeting', start: new Date() }]
  return (
    <>
     <div>
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
    </>
  )
}

export default DemaoCalendar
