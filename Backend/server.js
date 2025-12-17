import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../components/Navbar'; // Import the Navbar
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  XMarkIcon,
  PlusIcon,
  DocumentTextIcon,
  UserGroupIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

const localizer = momentLocalizer(moment);

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [filter, setFilter] = useState({
    judge: '',
    caseType: '',
    priority: '',
    status: '',
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    caseId: '',
    start: new Date(),
    end: new Date(Date.now() + 2 * 60 * 60 * 1000),
    judge: '',
    parties: [],
    caseType: '',
    priority: 'Medium',
    status: 'Scheduled',
    courtroom: '',
    description: '',
  });

  const judges = [
    'Justice Sharma',
    'Justice Verma',
    'Justice Patel',
    'Justice Singh',
  ];

  const caseTypes = [
    'Civil',
    'Criminal',
    'Commercial',
    'Family',
    'Constitutional',
  ];

  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['Scheduled', 'Hearing', 'Arguments', 'Mediation', 'Completed', 'Adjourned'];

  const mockEvents = [
    {
      id: 1,
      title: 'State vs. Kumar - Final Hearing',
      start: new Date(2025, 11, 17, 10, 0),
      end: new Date(2025, 11, 17, 12, 0),
      caseId: 'CR/2025/123',
      judge: 'Justice Sharma',
      parties: ['State of UP', 'Rajesh Kumar'],
      caseType: 'Criminal',
      priority: 'High',
      status: 'Hearing',
      courtroom: 'Courtroom 3',
      description: 'Final arguments in murder case',
    },
    {
      id: 2,
      title: 'M/s ABC Ltd vs. XYZ Corp',
      start: new Date(2025, 11, 18, 14, 0),
      end: new Date(2025, 11, 18, 16, 0),
      caseId: 'COM/2025/456',
      judge: 'Justice Patel',
      parties: ['ABC Limited', 'XYZ Corporation'],
      caseType: 'Commercial',
      priority: 'Medium',
      status: 'Arguments',
      courtroom: 'Courtroom 1',
      description: 'Commercial dispute - contract breach',
    },
    {
      id: 3,
      title: 'Matrimonial Petition - Sharma',
      start: new Date(2025, 11, 19, 11, 0),
      end: new Date(2025, 11, 19, 13, 0),
      caseId: 'FA/2025/789',
      judge: 'Justice Verma',
      parties: ['Ramesh Sharma', 'Priya Sharma'],
      caseType: 'Family',
      priority: 'Medium',
      status: 'Mediation',
      courtroom: 'Chamber 2',
      description: 'Divorce proceedings - settlement discussion',
    },
  ];

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    setTimeout(() => {
      setEvents(mockEvents);
    }, 500);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#4299e1';
    let borderColor = '#3182ce';

    if (event.priority === 'High') {
      backgroundColor = '#f56565';
      borderColor = '#c53030';
    } else if (event.priority === 'Medium') {
      backgroundColor = '#ed8936';
      borderColor = '#c05621';
    } else if (event.priority === 'Low') {
      backgroundColor = '#48bb78';
      borderColor = '#38a169';
    }

    if (event.status === 'Completed') {
      backgroundColor = '#a0aec0';
      borderColor = '#718096';
    }

    return {
      style: {
        backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '4px',
        color: 'white',
        padding: '2px 5px',
      },
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = (slotInfo) => {
    setNewEvent({
      ...newEvent,
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setIsNewEventModalOpen(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilter({
      judge: '',
      caseType: '',
      priority: '',
      status: '',
    });
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleNewHearing = () => {
    const eventToAdd = {
      id: events.length + 1,
      ...newEvent,
      parties: newEvent.parties.split(',').map(party => party.trim()),
    };

    setEvents(prev => [...prev, eventToAdd]);
    setIsNewEventModalOpen(false);
    
    // Reset form
    setNewEvent({
      title: '',
      caseId: '',
      start: new Date(),
      end: new Date(Date.now() + 2 * 60 * 60 * 1000),
      judge: '',
      parties: [],
      caseType: '',
      priority: 'Medium',
      status: 'Scheduled',
      courtroom: '',
      description: '',
    });
  };

  // Event Details Modal Component
  const EventDetailsModal = () => {
    if (!selectedEvent) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Case Details</h3>
            <button
              onClick={() => setSelectedEvent(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-blue-700">{selectedEvent.title}</h4>
              <p className="text-sm text-gray-600">{selectedEvent.caseId}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-gray-500" />
                <span>
                  {moment(selectedEvent.start).format('DD MMM YYYY, hh:mm A')} -{' '}
                  {moment(selectedEvent.end).format('hh:mm A')}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <span>{selectedEvent.judge || 'Not Assigned'}</span>
              </div>

              <div className="flex items-center space-x-2">
                <BuildingLibraryIcon className="h-5 w-5 text-gray-500" />
                <span>{selectedEvent.courtroom || 'To be assigned'}</span>
              </div>

              <div className="flex items-center space-x-2">
                {selectedEvent.status === 'Completed' ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                )}
                <span className="capitalize">{selectedEvent.status}</span>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-700 mb-2">Parties Involved</h5>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.parties?.map((party, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                  >
                    {party}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-700 mb-2">Case Details</h5>
              <p className="text-gray-600">{selectedEvent.description || 'No description provided'}</p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                View Full Case Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // New Event Modal Component
  const NewEventModal = () => {
    if (!isNewEventModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Schedule New Hearing</h3>
            <button
              onClick={() => setIsNewEventModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleNewEventChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter case title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case ID</label>
                <input
                  type="text"
                  name="caseId"
                  value={newEvent.caseId}
                  onChange={handleNewEventChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., CR/2025/123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judge</label>
                <select
                  name="judge"
                  value={newEvent.judge}
                  onChange={handleNewEventChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Judge</option>
                  {judges.map(judge => (
                    <option key={judge} value={judge}>{judge}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
                <select
                  name="caseType"
                  value={newEvent.caseType}
                  onChange={handleNewEventChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Type</option>
                  {caseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={newEvent.priority}
                  onChange={handleNewEventChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={newEvent.status}
                  onChange={handleNewEventChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Courtroom</label>
                <input
                  type="text"
                  name="courtroom"
                  value={newEvent.courtroom}
                  onChange={handleNewEventChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Courtroom 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({...newEvent, start: new Date(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="datetime-local"
                  value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({...newEvent, end: new Date(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parties (comma separated)
              </label>
              <input
                type="text"
                name="parties"
                value={newEvent.parties}
                onChange={(e) => setNewEvent({...newEvent, parties: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Party A, Party B, Party C"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleNewEventChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
                placeholder="Enter case description"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsNewEventModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleNewHearing}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Schedule Hearing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Case Schedule & Calendar</h1>
          <p className="text-gray-600 mt-2">
            Manage court hearings, track case timelines, and optimize judicial workflow
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <h3 className="font-semibold text-gray-700">Filters</h3>
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judge</label>
              <select
                name="judge"
                value={filter.judge}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Judges</option>
                {judges.map((judge) => (
                  <option key={judge} value={judge}>{judge}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
              <select
                name="caseType"
                value={filter.caseType}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Types</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={filter.priority}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Hearing">Hearing</option>
                <option value="Arguments">Arguments</option>
                <option value="Completed">Completed</option>
                <option value="Adjourned">Adjourned</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Today's Hearings</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Urgent Cases</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BuildingLibraryIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Courtrooms</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-md ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-md ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-4 py-2 rounded-md ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                Day
              </button>
              <button
                onClick={() => setView('agenda')}
                className={`px-4 py-2 rounded-md ${view === 'agenda' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                Agenda
              </button>
            </div>
            {/* Working "Schedule New Hearing" Button */}
            <button 
              onClick={() => setIsNewEventModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Schedule New Hearing</span>
            </button>
          </div>

          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              view={view}
              onView={setView}
              date={date}
              onNavigate={setDate}
              eventPropGetter={eventStyleGetter}
              messages={{
                next: 'Next',
                previous: 'Prev',
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day',
              }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h4 className="font-semibold text-gray-700 mb-3">Priority Legend</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span>Low Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal />
      
      {/* New Event Modal */}
      <NewEventModal />
    </div>
  );
};

export default SchedulePage;