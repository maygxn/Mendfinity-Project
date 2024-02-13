import React from 'react';

function Dashboard() {
    // Example static data
    const upcomingAppointments = [
        { date: '2024-02-12', time: '10:00 AM', therapist: 'Dr. Smith' },
        { date: '2024-02-19', time: '11:00 AM', therapist: 'Dr. Johnson' },
    ];

    const exercisePrograms = [
        { name: 'Knee Strengthening', duration: '4 weeks' },
        { name: 'Post-Op Hip Rehab', duration: '6 weeks' },
    ];

    const recentJournalEntries = [
        { date: '2024-02-10', entry: 'Felt good after exercises, slight pain in the evening.' },
        { date: '2024-02-08', entry: 'Rest day. Overall feeling better than last week.' },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <h2>Upcoming Appointments</h2>
                <ul>
                    {upcomingAppointments.map((appointment, index) => (
                        <li key={index}>{appointment.date} at {appointment.time} with {appointment.therapist}</li>
                    ))}
                </ul>

                <h2>Exercise Programs</h2>
                <ul>
                    {exercisePrograms.map((program, index) => (
                        <li key={index}>{program.name} - {program.duration}</li>
                    ))}
                </ul>

                <h2>Recent Health Journal Entries</h2>
                <ul>
                    {recentJournalEntries.map((entry, index) => (
                        <li key={index}>{entry.date} - {entry.entry}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
