import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../components/Navbar';
import { 
  XMarkIcon, 
  PlusIcon, 
  TrashIcon, 
  CalendarIcon, 
  ClockIcon, 
  UserIcon,
  ScaleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const localizer = momentLocalizer(moment);

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [availableCases, setAvailableCases] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const [newEvent, setNewEvent] = useState({
    title: '',
    caseId: '',
    start: new Date(),
    end: new Date(Date.now() + 60 * 60 * 1000),
    judge: '',
    priority: 'Medium',
    status: 'Scheduled',
    parties: '', 
    description: '',
  });

  const judges = ['Justice Sharma', 'Justice Verma', 'Justice Patel', 'Justice Singh'];

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const hRes = await fetch("http://localhost:5000/api/hearings");
      const hData = await hRes.json();
      const formattedEvents = hData.map(e => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end)
      }));
      setEvents(formattedEvents);

      const cRes = await fetch("http://localhost:5000/api/cases");
      const cData = await cRes.json();
      setAvailableCases(cData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCaseChange = (e) => {
    const selectedNum = e.target.value;
    const caseData = availableCases.find(c => c.caseNumber === selectedNum);
    if (caseData) {
      setNewEvent({
        ...newEvent,
        caseId: selectedNum,
        title: `Hearing: ${caseData.title}`,
        parties: `${caseData.plaintiff}, ${caseData.defendant}`
      });
    } else {
      setNewEvent({ ...newEvent, caseId: selectedNum });
    }
  };

  const handleScheduleNewHearing = async () => {
    if (!newEvent.title || !newEvent.caseId) {
      alert('Select a Case and Title');
      return;
    }

    const payload = {
      ...newEvent,
      parties: typeof newEvent.parties === 'string' ? newEvent.parties.split(',').map(p => p.trim()) : []
    };

    try {
      const response = await fetch("http://localhost:5000/api/hearings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const saved = await response.json();
        setEvents(prev => [...prev, { ...saved, start: new Date(saved.start), end: new Date(saved.end) }]);
        setIsNewEventModalOpen(false);
        alert('Hearing scheduled successfully!');
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleDeleteHearing = async (id) => {
    if (!window.confirm("Permanently cancel this hearing?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/hearings/${id}`, { method: "DELETE" });
      if (response.ok) {
        setEvents(events.filter(ev => ev._id !== id));
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#2563eb'; // Default Blue
    if (event.priority === 'High') backgroundColor = '#dc2626'; // Vivid Red
    if (event.priority === 'Medium') backgroundColor = '#d97706'; // Amber
    if (event.priority === 'Low') backgroundColor = '#059669'; // Emerald
    return { style: { backgroundColor, borderRadius: '10px', color: 'white', border: 'none', padding: '2px 5px' } };
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Navbar />
      
      <div className="pt-10 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Hearing Schedule</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              Manage and track judicial proceedings in real-time
            </p>
          </div>
          <button 
            onClick={() => setIsNewEventModalOpen(true)} 
            className="group flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-blue-200 transition-all active:scale-95"
          >
            <PlusIcon className="h-6 w-6 stroke-[3]" />
            Schedule Hearing
          </button>
        </div>

        {/* CALENDAR CONTAINER */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-8 overflow-hidden">
          <div className="h-[800px] schedule-calendar">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              date={date}
              onNavigate={(newDate) => setDate(newDate)}
              view={view}
              onView={(newView) => setView(newView)}
              onSelectEvent={(ev) => setSelectedEvent(ev)}
              eventPropGetter={eventStyleGetter}
              popup
              className="font-sans"
            />
          </div>
        </div>
      </div>

      {/* NEW HEARING MODAL (MODERN DESIGN) */}
      {isNewEventModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-black text-slate-900">New Schedule</h3>
              <button onClick={() => setIsNewEventModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition">
                <XMarkIcon className="h-7 w-7 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Case Link</label>
                <select 
                  className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700" 
                  value={newEvent.caseId} 
                  onChange={handleCaseChange}
                >
                  <option value="">-- Choose Registered Case --</option>
                  {availableCases.map(c => (
                    <option key={c._id} value={c.caseNumber}>{c.caseNumber} - {c.title}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Hearing Title</label>
                <input 
                  placeholder="e.g. Evidence Presentation" 
                  className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold" 
                  value={newEvent.title} 
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                  <select className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-bold outline-none" value={newEvent.priority} onChange={(e) => setNewEvent({...newEvent, priority: e.target.value})}>
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Assigned Judge</label>
                  <select className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-bold outline-none" value={newEvent.judge} onChange={(e) => setNewEvent({...newEvent, judge: e.target.value})}>
                      <option value="">Select Judge</option>
                      {judges.map(j => <option key={j} value={j}>{j}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Start Time</label>
                  <input type="datetime-local" className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-bold" value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setNewEvent({...newEvent, start: new Date(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">End Time</label>
                  <input type="datetime-local" className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 font-bold" value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setNewEvent({...newEvent, end: new Date(e.target.value)})} />
                </div>
              </div>
              
              <div className="flex gap-4 pt-6">
                <button onClick={() => setIsNewEventModalOpen(false)} className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-slate-400 font-black hover:bg-slate-50 transition-all uppercase tracking-widest text-sm">Cancel</button>
                <button onClick={handleScheduleNewHearing} className="flex-[2] py-4 bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all uppercase tracking-widest text-sm">Save Hearing</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAILS MODAL (MODERN DESIGN) */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in zoom-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl relative overflow-hidden border border-slate-100">
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">Hearing Entry</span>
                    <h3 className="font-black text-3xl text-slate-900 leading-tight">{selectedEvent.title}</h3>
                    <p className="text-blue-600 font-black text-sm uppercase tracking-tighter">Case Reference: {selectedEvent.caseId}</p>
                </div>
                <button onClick={() => handleDeleteHearing(selectedEvent._id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                    <TrashIcon className="h-6 w-6" />
                </button>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-white rounded-xl shadow-sm"><UserIcon className="h-6 w-6 text-blue-600"/></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Presiding Judge</p>
                  <p className="font-black text-slate-700">{selectedEvent.judge || "Unassigned"}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-white rounded-xl shadow-sm"><ClockIcon className="h-6 w-6 text-emerald-600"/></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Time</p>
                  <p className="font-black text-slate-700">{moment(selectedEvent.start).format('LLLL')}</p>
                </div>
              </div>

              <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <ScaleIcon className="h-4 w-4 text-indigo-600"/>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Parties Involved</p>
                  </div>
                  <p className="text-slate-700 font-bold leading-relaxed">{Array.isArray(selectedEvent.parties) ? selectedEvent.parties.join(' • ') : selectedEvent.parties}</p>
              </div>
            </div>

            <button onClick={() => setSelectedEvent(null)} className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200">Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;