import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../components/Navbar';
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

  // Initialize newEvent properly
  const [newEvent, setNewEvent] = useState({
    title: '',
    caseId: '',
    start: new Date(),
    end: new Date(Date.now() + 2 * 60 * 60 * 1000),
    judge: '',
    parties: '',
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
    'Justice Reddy',
    'Justice Mehta',
  ];

  const caseTypes = [
    'Civil',
    'Criminal',
    'Commercial',
    'Family',
    'Constitutional',
    'Arbitration',
    'Tax',
    'Labour',
  ];

  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['Scheduled', 'Hearing', 'Arguments', 'Mediation', 'Completed', 'Adjourned'];

  // Mock events data
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
    {
      id: 4,
      title: 'Property Dispute - Singhania',
      start: new Date(2025, 11, 20, 9, 30),
      end: new Date(2025, 11, 20, 11, 0),
      caseId: 'CIV/2025/234',
      judge: 'Justice Singh',
      parties: ['Ravi Singhania', 'Sunita Gupta'],
      caseType: 'Civil',
      priority: 'Low',
      status: 'Scheduled',
      courtroom: 'Courtroom 2',
      description: 'Property partition dispute',
    },
  ];

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setEvents(mockEvents);
      }, 500);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#4299e1'; // Default blue
    let borderColor = '#3182ce';

    switch (event.priority) {
      case 'High':
        backgroundColor = '#f56565';
        borderColor = '#c53030';
        break;
      case 'Medium':
        backgroundColor = '#ed8936';
        borderColor = '#c05621';
        break;
      case 'Low':
        backgroundColor = '#48bb78';
        borderColor = '#38a169';
        break;
      default:
        backgroundColor = '#4299e1';
        borderColor = '#3182ce';
    }

    if (event.status === 'Completed') {
      backgroundColor = '#a0aec0';
      borderColor = '#718096';
    }

    return {
      style: {
        backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '6px',
        color: 'white',
        padding: '4px 8px',
        opacity: 0.9,
        fontWeight: '500',
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
    setFilter((prev) => ({
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
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleNewHearing = () => {
    if (!newEvent.title || !newEvent.caseId) {
      alert('Please fill in required fields: Title and Case ID');
      return;
    }

    const eventToAdd = {
      id: events.length + 1,
      ...newEvent,
      parties: newEvent.parties.split(',').map(party => party.trim()).filter(party => party !== ''),
      createdAt: new Date().toISOString(),
    };

    setEvents((prev) => [...prev, eventToAdd]);
    setIsNewEventModalOpen(false);
    
    // Reset form
    setNewEvent({
      title: '',
      caseId: '',
      start: new Date(),
      end: new Date(Date.now() + 2 * 60 * 60 * 1000),
      judge: '',
      parties: '',
      caseType: '',
      priority: 'Medium',
      status: 'Scheduled',
      courtroom: '',
      description: '',
    });

    // Show success message
    alert('New hearing scheduled successfully!');
  };

  // Event Details Modal
  const EventDetailsModal = () => {
    if (!selectedEvent) return null;

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl">
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Case Details</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedEvent.caseId}</p>
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h4 className="font-semibold text-xl text-blue-700 mb-2">{selectedEvent.title}</h4>
              <p className="text-gray-600">{selectedEvent.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <ClockIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {moment(selectedEvent.start).format('DD MMM YYYY, hh:mm A')} -{' '}
                    {moment(selectedEvent.end).format('hh:mm A')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <UserIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Assigned Judge</p>
                  <p className="font-medium">{selectedEvent.judge}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <BuildingLibraryIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Courtroom</p>
                  <p className="font-medium">{selectedEvent.courtroom}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <TagIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedEvent.priority === 'High' ? 'bg-red-100 text-red-800' :
                    selectedEvent.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedEvent.priority}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-700 mb-3 flex items-center">
                <UserGroupIcon className="h-5 w-5 mr-2" />
                Parties Involved
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.parties?.map((party, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {party}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Close
              </button>
              <button className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                View Full Case Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // New Event Modal
  const NewEventModal = () => {
    if (!isNewEventModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Schedule New Hearing</h3>
              <p className="text-sm text-gray-600 mt-1">Fill in the details to schedule a new case hearing</p>
            </div>
            <button
              onClick={() => setIsNewEventModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter case title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case ID *
                </label>
                <input
                  type="text"
                  name="caseId"
                  value={newEvent.caseId}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., CR/2025/123"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judge
                </label>
                <select
                  name="judge"
                  value={newEvent.judge}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Judge</option>
                  {judges.map((judge) => (
                    <option key={judge} value={judge}>{judge}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Type
                </label>
                <select
                  name="caseType"
                  value={newEvent.caseType}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Case Type</option>
                  {caseTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newEvent.priority}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={newEvent.status}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({...newEvent, start: new Date(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) => setNewEvent({...newEvent, end: new Date(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parties Involved (comma separated)
                </label>
                <input
                  type="text"
                  name="parties"
                  value={newEvent.parties}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Plaintiff Name, Defendant Name, Third Party"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Courtroom
                </label>
                <input
                  type="text"
                  name="courtroom"
                  value={newEvent.courtroom}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Courtroom 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Duration
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>Half day</option>
                  <option>Full day</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description / Notes
                </label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleNewEventChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Enter case description, important notes, or special instructions..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                onClick={() => setIsNewEventModalOpen(false)}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleNewHearing}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Schedule Hearing</span>
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
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Case Schedule & Calendar</h1>
          <p className="text-gray-600 mt-2">
            Manage court hearings, track case timelines, and optimize judicial workflow
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg">
                <CalendarIcon className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-90">Today's Hearings</p>
                <p className="text-3xl font-bold mt-1">12</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg">
                <ExclamationTriangleIcon className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-90">Urgent Cases</p>
                <p className="text-3xl font-bold mt-1">5</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-90">Completed Today</p>
                <p className="text-3xl font-bold mt-1">8</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-white/20 rounded-lg">
                <BuildingLibraryIcon className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-90">Active Courtrooms</p>
                <p className="text-3xl font-bold mt-1">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <FunnelIcon className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Schedule Filters</h3>
                <p className="text-sm text-gray-600">Filter cases by specific criteria</p>
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
            >
              Clear All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judge</label>
              <select
                name="judge"
                value={filter.judge}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Judges</option>
                {judges.map((judge) => (
                  <option key={judge} value={judge}>{judge}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Case Type</label>
              <select
                name="caseType"
                value={filter.caseType}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                name="priority"
                value={filter.priority}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Hearing">Hearing</option>
                <option value="Arguments">Arguments</option>
                <option value="Mediation">Mediation</option>
                <option value="Completed">Completed</option>
                <option value="Adjourned">Adjourned</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Container */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex space-x-2 mb-4 md:mb-0">
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-lg transition ${view === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-lg transition ${view === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-4 py-2 rounded-lg transition ${view === 'day' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Day
              </button>
              <button
                onClick={() => setView('agenda')}
                className={`px-4 py-2 rounded-lg transition ${view === 'agenda' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Agenda
              </button>
            </div>
            
            {/* WORKING BUTTON */}
            <button 
              onClick={() => setIsNewEventModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 font-medium"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Schedule New Hearing</span>
            </button>
          </div>

          <div className="h-[600px] border border-gray-200 rounded-lg overflow-hidden">
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
                previous: 'Previous',
                today: 'Today',
                month: 'Month',
                week: 'Week',
                day: 'Day',
                agenda: 'Agenda',
                date: 'Date',
                time: 'Time',
                event: 'Event',
              }}
              toolbar={true}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="font-semibold text-gray-900 text-lg mb-4">Priority Legend</h4>
          <div className="flex flex-wrap gap-6">
            {[
              { color: 'bg-red-500', label: 'High Priority' },
              { color: 'bg-orange-500', label: 'Medium Priority' },
              { color: 'bg-green-500', label: 'Low Priority' },
              { color: 'bg-blue-500', label: 'Normal Priority' },
              { color: 'bg-purple-500', label: 'Special Hearing' },
              { color: 'bg-gray-400', label: 'Completed' },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-5 h-5 ${item.color} rounded mr-3`}></div>
                <span className="text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EventDetailsModal />
      <NewEventModal />

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setIsNewEventModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-40"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default SchedulePage;