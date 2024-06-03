import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxHeight: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

const UserEditModal = ({ show, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    email: user?.email || '',
    personalInfo: user?.personalInfo || {
      lastName: '',
      firstName: '',
      middleName: '',
      dateOfBirth: '',
      age: '',
      ssn: '',
      dlOrIdNumber: '',
      stateIssued: '',
      revokedOrSuspendedDate: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      homePhone: '',
      workPhone: '',
      gender: '',
      race: '',
      nationality: '',
      maritalStatus: '',
      usCitizen: false,
      residencyNumber: '',
      primaryLanguageSpoken: '',
      referredBy: '',
      highestGradeCompleted: '',
      yearGraduated: '',
      collegeHoursCompleted: '',
      degree: '',
      employment: {
        isEmployed: false,
        employmentType: '',
        employer: '',
        occupation: '',
        hourlyIncome: '',
        payFrequency: '',
        specialSkills: [],
      },
      history: {
        substanceAbuseTreatment: false,
        substanceAbuseTreatmentDetails: '',
        mentalHealthTreatment: false,
        mentalHealthTreatmentDetails: '',
        previousHelpFromDSM: false,
        previousHelpDetails: '',
        suicidalThoughts: false,
        arrestHistory: false,
        criminalJusticeInvolvement: false,
        alcoholUse: false,
        drugUse: false,
        drugPreference: '',
        lastUse: '',
      },
      medicalConditions: [],
      medications: [],
      reasonForAdmission: [],
      goals: '',
      talentsAndGifts: [],
      emergencyContacts: {
        name: '',
        address: '',
        phone: '',
        alternatePhone: '',
        relationship: '',
      }
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePersonalInfoChange = (e) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleEmploymentChange = (e) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        employment: {
          ...formData.personalInfo.employment,
          [e.target.name]: e.target.value
        }
      }
    });
  };

  const handleHistoryChange = (e) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        history: {
          ...formData.personalInfo.history,
          [e.target.name]: e.target.value
        }
      }
    });
  };

  const handleEmergencyContactsChange = (e) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        emergencyContacts: {
          ...formData.personalInfo.emergencyContacts,
          [e.target.name]: e.target.value
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/users/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      onSave(data);
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <h3>Personal Info</h3>
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={formData.personalInfo.lastName}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            variant="outlined"
            name="firstName"
            value={formData.personalInfo.firstName}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Middle Name"
            variant="outlined"
            name="middleName"
            value={formData.personalInfo.middleName}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date of Birth"
            variant="outlined"
            name="dateOfBirth"
            value={formData.personalInfo.dateOfBirth}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            variant="outlined"
            name="age"
            value={formData.personalInfo.age}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="SSN"
            variant="outlined"
            name="ssn"
            value={formData.personalInfo.ssn}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="DL or ID Number"
            variant="outlined"
            name="dlOrIdNumber"
            value={formData.personalInfo.dlOrIdNumber}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="State Issued"
            variant="outlined"
            name="stateIssued"
            value={formData.personalInfo.stateIssued}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Revoked or Suspended Date"
            variant="outlined"
            name="revokedOrSuspendedDate"
            value={formData.personalInfo.revokedOrSuspendedDate}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            variant="outlined"
            name="address"
            value={formData.personalInfo.address}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="City"
            variant="outlined"
            name="city"
            value={formData.personalInfo.city}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="State"
            variant="outlined"
            name="state"
            value={formData.personalInfo.state}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Zip"
            variant="outlined"
            name="zip"
            value={formData.personalInfo.zip}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Home Phone"
            variant="outlined"
            name="homePhone"
            value={formData.personalInfo.homePhone}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Work Phone"
            variant="outlined"
            name="workPhone"
            value={formData.personalInfo.workPhone}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Gender"
            variant="outlined"
            name="gender"
            value={formData.personalInfo.gender}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Race"
            variant="outlined"
            name="race"
            value={formData.personalInfo.race}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nationality"
            variant="outlined"
            name="nationality"
            value={formData.personalInfo.nationality}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Marital Status"
            variant="outlined"
            name="maritalStatus"
            value={formData.personalInfo.maritalStatus}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="US Citizen"
            variant="outlined"
            name="usCitizen"
            value={formData.personalInfo.usCitizen}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Residency Number"
            variant="outlined"
            name="residencyNumber"
            value={formData.personalInfo.residencyNumber}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Primary Language Spoken"
            variant="outlined"
            name="primaryLanguageSpoken"
            value={formData.personalInfo.primaryLanguageSpoken}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Referred By"
            variant="outlined"
            name="referredBy"
            value={formData.personalInfo.referredBy}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Highest Grade Completed"
            variant="outlined"
            name="highestGradeCompleted"
            value={formData.personalInfo.highestGradeCompleted}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Year Graduated"
            variant="outlined"
            name="yearGraduated"
            value={formData.personalInfo.yearGraduated}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="College Hours Completed"
            variant="outlined"
            name="collegeHoursCompleted"
            value={formData.personalInfo.collegeHoursCompleted}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Degree"
            variant="outlined"
            name="degree"
            value={formData.personalInfo.degree}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Is Employed"
            variant="outlined"
            name="isEmployed"
            value={formData.personalInfo.employment.isEmployed}
            onChange={handleEmploymentChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Employment Type"
            variant="outlined"
            name="employmentType"
            value={formData.personalInfo.employment.employmentType}
            onChange={handleEmploymentChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Employer"
            variant="outlined"
            name="employer"
            value={formData.personalInfo.employment.employer}
            onChange={handleEmploymentChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Occupation"
            variant="outlined"
            name="occupation"
            value={formData.personalInfo.employment.occupation}
            onChange={handleEmploymentChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Hourly Income"
            variant="outlined"
            name="hourlyIncome"
            value={formData.personalInfo.employment.hourlyIncome}
            onChange={handleEmploymentChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Pay Frequency"
            variant="outlined"
            name="payFrequency"
            value={formData.personalInfo.employment.payFrequency}
            onChange={handleEmploymentChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Special Skills"
            variant="outlined"
            name="specialSkills"
            value={Array.isArray(formData.personalInfo.employment.specialSkills) ? formData.personalInfo.employment.specialSkills.join(', ') : formData.personalInfo.employment.specialSkills}
            onChange={handleEmploymentChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Substance Abuse Treatment"
            variant="outlined"
            name="substanceAbuseTreatment"
            value={formData.personalInfo.history.substanceAbuseTreatment}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Substance Abuse Treatment Details"
            variant="outlined"
            name="substanceAbuseTreatmentDetails"
            value={formData.personalInfo.history.substanceAbuseTreatmentDetails}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mental Health Treatment"
            variant="outlined"
            name="mentalHealthTreatment"
            value={formData.personalInfo.history.mentalHealthTreatment}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mental Health Treatment Details"
            variant="outlined"
            name="mentalHealthTreatmentDetails"
            value={formData.personalInfo.history.mentalHealthTreatmentDetails}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Previous Help From DSM"
            variant="outlined"
            name="previousHelpFromDSM"
            value={formData.personalInfo.history.previousHelpFromDSM}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Previous Help Details"
            variant="outlined"
            name="previousHelpDetails"
            value={formData.personalInfo.history.previousHelpDetails}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Suicidal Thoughts"
            variant="outlined"
            name="suicidalThoughts"
            value={formData.personalInfo.history.suicidalThoughts}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Arrest History"
            variant="outlined"
            name="arrestHistory"
            value={formData.personalInfo.history.arrestHistory}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Criminal Justice Involvement"
            variant="outlined"
            name="criminalJusticeInvolvement"
            value={formData.personalInfo.history.criminalJusticeInvolvement}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Alcohol Use"
            variant="outlined"
            name="alcoholUse"
            value={formData.personalInfo.history.alcoholUse}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Drug Use"
            variant="outlined"
            name="drugUse"
            value={formData.personalInfo.history.drugUse}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Drug Preference"
            variant="outlined"
            name="drugPreference"
            value={formData.personalInfo.history.drugPreference}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Use"
            variant="outlined"
            name="lastUse"
            value={formData.personalInfo.history.lastUse}
            onChange={handleHistoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Medical Conditions"
            variant="outlined"
            name="medicalConditions"
            value={Array.isArray(formData.personalInfo.medicalConditions) ? formData.personalInfo.medicalConditions.join(', ') : formData.personalInfo.medicalConditions}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Medications"
            variant="outlined"
            name="medications"
            value={Array.isArray(formData.personalInfo.medications) ? formData.personalInfo.medications.join(', ') : formData.personalInfo.medications}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Reason for Admission"
            variant="outlined"
            name="reasonForAdmission"
            value={Array.isArray(formData.personalInfo.reasonForAdmission) ? formData.personalInfo.reasonForAdmission.join(', ') : formData.personalInfo.reasonForAdmission}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Goals"
            variant="outlined"
            name="goals"
            value={formData.personalInfo.goals}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Talents and Gifts"
            variant="outlined"
            name="talentsAndGifts"
            value={Array.isArray(formData.personalInfo.talentsAndGifts) ? formData.personalInfo.talentsAndGifts.join(', ') : formData.personalInfo.talentsAndGifts}
            onChange={handlePersonalInfoChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Emergency Contact Name"
            variant="outlined"
            name="name"
            value={formData.personalInfo.emergencyContacts.name}
            onChange={handleEmergencyContactsChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Emergency Contact Address"
            variant="outlined"
            name="address"
            value={formData.personalInfo.emergencyContacts.address}
            onChange={handleEmergencyContactsChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Emergency Contact Phone"
            variant="outlined"
            name="phone"
            value={formData.personalInfo.emergencyContacts.phone}
            onChange={handleEmergencyContactsChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Emergency Contact Alternate Phone"
            variant="outlined"
            name="alternatePhone"
            value={formData.personalInfo.emergencyContacts.alternatePhone}
            onChange={handleEmergencyContactsChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Emergency Contact Relationship"
            variant="outlined"
            name="relationship"
            value={formData.personalInfo.emergencyContacts.relationship}
            onChange={handleEmergencyContactsChange}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UserEditModal;
