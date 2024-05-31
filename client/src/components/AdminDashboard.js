// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:3000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched users:', response.data);
        setUsers(response.data);
      } catch (error) {
        setMessage('Error fetching user data');
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Date Created',
      selector: row => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div>
      <h3>User Details</h3>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Date Created:</strong> {new Date(data.createdAt).toLocaleDateString()}</p>
      <h4>Personal Info:</h4>
      {data.personalInfo ? (
        <div>
          <p><strong>Last Name:</strong> {data.personalInfo.lastName}</p>
          <p><strong>First Name:</strong> {data.personalInfo.firstName}</p>
          <p><strong>Middle Name:</strong> {data.personalInfo.middleName}</p>
          <p><strong>Date of Birth:</strong> {data.personalInfo.dateOfBirth ? new Date(data.personalInfo.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Age:</strong> {data.personalInfo.age}</p>
          <p><strong>SSN:</strong> {data.personalInfo.ssn}</p>
          <p><strong>DL or ID Number:</strong> {data.personalInfo.dlOrIdNumber}</p>
          <p><strong>State Issued:</strong> {data.personalInfo.stateIssued}</p>
          <p><strong>Revoked or Suspended Date:</strong> {data.personalInfo.revokedOrSuspendedDate ? new Date(data.personalInfo.revokedOrSuspendedDate).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Address:</strong> {data.personalInfo.address}</p>
          <p><strong>City:</strong> {data.personalInfo.city}</p>
          <p><strong>State:</strong> {data.personalInfo.state}</p>
          <p><strong>Zip:</strong> {data.personalInfo.zip}</p>
          <p><strong>Home Phone:</strong> {data.personalInfo.homePhone}</p>
          <p><strong>Work Phone:</strong> {data.personalInfo.workPhone}</p>
          <p><strong>Gender:</strong> {data.personalInfo.gender}</p>
          <p><strong>Race:</strong> {data.personalInfo.race}</p>
          <p><strong>Nationality:</strong> {data.personalInfo.nationality}</p>
          <p><strong>Marital Status:</strong> {data.personalInfo.maritalStatus}</p>
          <p><strong>US Citizen:</strong> {data.personalInfo.usCitizen ? "Yes" : "No"}</p>
          <p><strong>Primary Language Spoken:</strong> {data.personalInfo.primaryLanguageSpoken}</p>
          <p><strong>Referred By:</strong> {data.personalInfo.referredBy}</p>
          <p><strong>Highest Grade Completed:</strong> {data.personalInfo.highestGradeCompleted}</p>
          <p><strong>Year Graduated:</strong> {data.personalInfo.yearGraduated}</p>
          <p><strong>College Hours Completed:</strong> {data.personalInfo.collegeHoursCompleted}</p>
          <p><strong>Degree:</strong> {data.personalInfo.degree}</p>
          <p><strong>Currently Employed:</strong> {data.personalInfo.employment ? data.personalInfo.employment.isEmployed ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Employment Type:</strong> {data.personalInfo.employment ? data.personalInfo.employment.employmentType : 'N/A'}</p>
          <p><strong>Employer:</strong> {data.personalInfo.employment ? data.personalInfo.employment.employer : 'N/A'}</p>
          <p><strong>Occupation:</strong> {data.personalInfo.employment ? data.personalInfo.employment.occupation : 'N/A'}</p>
          <p><strong>Hourly Income:</strong> {data.personalInfo.employment ? data.personalInfo.employment.hourlyIncome : 'N/A'}</p>
          <p><strong>Pay Frequency:</strong> {data.personalInfo.employment ? data.personalInfo.employment.payFrequency : 'N/A'}</p>
          <p><strong>Special Skills:</strong> {data.personalInfo.employment ? data.personalInfo.employment.specialSkills.join(', ') : 'N/A'}</p>
          <p><strong>Substance Abuse Treatment:</strong> {data.personalInfo.history ? data.personalInfo.history.substanceAbuseTreatment ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Mental Health Treatment:</strong> {data.personalInfo.history ? data.personalInfo.history.mentalHealthTreatment ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Previous Help From DSM:</strong> {data.personalInfo.history ? data.personalInfo.history.previousHelpFromDSM ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Suicidal Thoughts:</strong> {data.personalInfo.history ? data.personalInfo.history.suicidalThoughts ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Arrest History:</strong> {data.personalInfo.history ? data.personalInfo.history.arrestHistory ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Criminal Justice Involvement:</strong> {data.personalInfo.history ? data.personalInfo.history.criminalJusticeInvolvement ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Alcohol Use:</strong> {data.personalInfo.history ? data.personalInfo.history.alcoholUse ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Drug Use:</strong> {data.personalInfo.history ? data.personalInfo.history.drugUse ? "Yes" : "No" : 'N/A'}</p>
          <p><strong>Drug Preference:</strong> {data.personalInfo.history ? data.personalInfo.history.drugPreference : 'N/A'}</p>
          <p><strong>Last Use:</strong> {data.personalInfo.history ? data.personalInfo.history.lastUse ? new Date(data.personalInfo.history.lastUse).toLocaleDateString() : 'N/A' : 'N/A'}</p>
          <p><strong>Medical Conditions:</strong> {data.personalInfo.medicalConditions ? data.personalInfo.medicalConditions.join(', ') : 'N/A'}</p>
          <p><strong>Medications:</strong> {data.personalInfo.medications ? data.personalInfo.medications.join(', ') : 'N/A'}</p>
          <p><strong>Reason for Admission:</strong> {data.personalInfo.reasonForAdmission ? data.personalInfo.reasonForAdmission.join(', ') : 'N/A'}</p>
          <p><strong>Goals:</strong> {data.personalInfo.goals}</p>
          <p><strong>Talents and Gifts:</strong> {data.personalInfo.talentsAndGifts ? data.personalInfo.talentsAndGifts.join(', ') : 'N/A'}</p>
          <p><strong>Emergency Contacts:</strong></p>
          <ul>
            {data.personalInfo.emergencyContacts ? data.personalInfo.emergencyContacts.map((contact, index) => (
              <li key={index}>
                {contact.name} - {contact.relationship} - {contact.phone} - {contact.alternatePhone} - {contact.address}
              </li>
            )) : 'N/A'}
          </ul>
        </div>
      ) : (
        <p>No personal information available</p>
      )}
    </div>
  );

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {message && <div className="message">{message}</div>}
      <DataTable
        columns={columns}
        data={users}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
      />
    </div>
  );
};

export default AdminDashboard;
