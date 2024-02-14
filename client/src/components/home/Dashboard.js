import React from 'react';
import '../../App.css'; // Make sure this path is correct

function Dashboard() {
    // Mock data for all sections
    const appointmentHistory = [
        { date: '2024-01-25', time: '10:00 AM', therapist: 'Dr. Smith', status: 'Completed' },
        { date: '2024-01-11', time: '09:00 AM', therapist: 'Dr. Johnson', status: 'Completed' },
    ];

    const physicalTherapyTips = [
        'Maintain regular physical activity to improve recovery.',
        'Practice proper posture to prevent injury.',
        'Use ice packs for acute injuries to reduce swelling.',
    ];

    const recommendedActivities = [
        { activity: 'Swimming', frequency: 'Twice a week' },
        { activity: 'Gentle Yoga', frequency: 'Three times a week' },
    ];

    const contactInformation = {
        therapist: 'Dr. Johnson',
        phone: '555-123-4567',
        email: 'dr.johnson@therapyportal.com',
    };

    const upcomingEvents = [
        { date: '2024-02-15', title: 'Group Therapy Session' },
        { date: '2024-02-20', title: 'Workshop: Managing Chronic Pain' },
    ];

    const educationalResources = [
        { title: 'Understanding Physical Therapy', link: '#' },
        { title: 'Exercises for Back Pain', link: '#' },
    ];

    const personalGoals = [
        { goal: 'Increase knee flexibility', progress: '75%' },
        { goal: 'Strengthen back muscles', progress: '50%' },
    ];

    const feedbackReports = [
        { date: '2024-02-01', report: 'Significant improvement in mobility' },
        { date: '2024-01-25', report: 'Good progress, but more consistent effort needed' },
    ];

    return (
        <div className="dashboard">
            {/* Dynamically render cards for each section */}
            <div className="card large">
                <h2>Appointment History</h2>
                <ul>{appointmentHistory.map((appointment, index) => (
                    <li key={index}>{appointment.date} at {appointment.time} with {appointment.therapist} - {appointment.status}</li>
                ))}</ul>
            </div>
            <div className="card tall">
                <h2>Physical Therapy Tips</h2>
                <ul>{physicalTherapyTips.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
            </div>
            <div className="card tall">
                <h2>Recommended Activities</h2>
                <ul>{recommendedActivities.map((activity, index) => (
                    <li key={index}>{activity.activity} - {activity.frequency}</li>
                ))}</ul>
            </div>
            <div className="card contact-info">
                <h2>Contact Information</h2>
                <p><strong>Therapist:</strong> {contactInformation.therapist}</p>
                <p><strong>Phone:</strong> {contactInformation.phone}</p>
                <p><strong>Email:</strong> {contactInformation.email}</p>
            </div>
            {/* Additional sections */}
            <div className="card large">
                <h2>Upcoming Events</h2>
                <ul>{upcomingEvents.map((event, index) => (
                    <li key={index}>{event.date} - {event.title}</li>
                ))}</ul>
            </div>
            <div className="card educational">
                <h2>Educational Resources</h2>
                <ul>{educationalResources.map((resource, index) => (
                    <li key={index}><a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.title}</a></li>
                ))}</ul>
            </div>
            <div className="card">
                <h2>Personal Goals</h2>
                <ul>{personalGoals.map((goal, index) => (
                    <li key={index}>{goal.goal} - Progress: {goal.progress}</li>
                ))}</ul>
            </div>
            <div className="card">
                <h2>Feedback Reports</h2>
                <ul>{feedbackReports.map((report, index) => (
                    <li key={index}>{report.date} - {report.report}</li>
                ))}</ul>
            </div>
        </div>
    );
}

export default Dashboard;
