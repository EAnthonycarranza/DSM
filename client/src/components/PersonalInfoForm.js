// src/components/PersonalInfoForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.css';
import { useNavigate } from 'react-router-dom';

const PersonalInfoForm = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const surveyJson = {
    title: "DSM application",
    pages: [
      {
        name: "personalInfo",
        elements: [
          { type: "text", name: "lastName", title: "Last Name", isRequired: true },
          { type: "text", name: "firstName", title: "First Name", isRequired: true },
          { type: "text", name: "middleName", title: "Middle Name" },
          { type: "text", name: "dateOfBirth", title: "Date of Birth", inputType: "date", isRequired: true },
          { type: "text", name: "age", title: "Age", inputType: "number", isRequired: true },
          { type: "text", name: "ssn", title: "SSN" },
          { type: "text", name: "dlOrIdNumber", title: "DL or ID Number" },
          { type: "text", name: "stateIssued", title: "State Issued" },
          { type: "text", name: "revokedOrSuspendedDate", title: "Revoked or Suspended Date", inputType: "date" },
          { type: "text", name: "address", title: "Address", isRequired: true },
          { type: "text", name: "city", title: "City", isRequired: true },
          { type: "text", name: "state", title: "State", isRequired: true },
          { type: "text", name: "zip", title: "Zip", isRequired: true },
          { type: "text", name: "homePhone", title: "Home Phone" },
          { type: "text", name: "workPhone", title: "Work Phone" },
          {
            type: "radiogroup",
            name: "gender",
            title: "Gender",
            isRequired: true,
            choices: ["Male", "Female", "Other"]
          },
          {
            type: "radiogroup",
            name: "race",
            title: "Race",
            isRequired: true,
            choices: ["White", "Black", "Asian", "Native American", "Other"]
          },
          {
            type: "radiogroup",
            name: "nationality",
            title: "Nationality",
            isRequired: true,
            choices: ["Hispanic", "Non-Hispanic"]
          },
          {
            type: "radiogroup",
            name: "maritalStatus",
            title: "Marital Status",
            isRequired: true,
            choices: ["Single", "Married", "Divorced", "Separated", "Widowed"]
          },
          {
            type: "radiogroup",
            name: "usCitizen",
            title: "US Citizen",
            isRequired: true,
            choices: ["Yes", "No"]
          },
          { type: "text", name: "residencyNumber", title: "Residency Number" },
          { type: "text", name: "primaryLanguageSpoken", title: "Primary Language Spoken", isRequired: true },
          { type: "text", name: "referredBy", title: "Referred By" },
          {
            type: "dropdown",
            name: "highestGradeCompleted",
            title: "Highest Grade Completed",
            isRequired: true,
            choices: Array.from({ length: 12 }, (_, i) => ({ value: i + 1, text: (i + 1).toString() }))
          },
          { type: "text", name: "yearGraduated", title: "Year Graduated/Completed GED" },
          { type: "text", name: "collegeHoursCompleted", title: "College Hours Completed", inputType: "number" },
          { type: "text", name: "degree", title: "Degree" },
          {
            type: "radiogroup",
            name: "isEmployed",
            title: "Are you currently employed?",
            isRequired: true,
            choices: ["Yes", "No"]
          },
          {
            type: "radiogroup",
            name: "employmentType",
            title: "If yes, are you:",
            visibleIf: "{isEmployed} = 'Yes'",
            choices: ["Full Time", "Part Time", "Temporary", "Seasonal"]
          },
          { type: "text", name: "employer", title: "Employer", visibleIf: "{isEmployed} = 'Yes'" },
          { type: "text", name: "occupation", title: "Occupation", visibleIf: "{isEmployed} = 'Yes'" },
          { type: "text", name: "hourlyIncome", title: "Hourly Income", inputType: "number", visibleIf: "{isEmployed} = 'Yes'" },
          {
            type: "radiogroup",
            name: "payFrequency",
            title: "Paid:",
            visibleIf: "{isEmployed} = 'Yes'",
            choices: ["Weekly", "Bi-Weekly", "Monthly"]
          },
          { type: "comment", name: "specialSkills", title: "List any special skills, trades, or vocations" },
          {
            type: "panel",
            name: "history",
            title: "History",
            elements: [
              {
                type: "radiogroup",
                name: "substanceAbuseTreatment",
                title: "Have you ever been in treatment for substance abuse?",
                choices: ["Yes", "No"]
              },
              { type: "text", name: "substanceAbuseTreatmentDetails", title: "Where? When?", visibleIf: "{substanceAbuseTreatment} = 'Yes'" },
              {
                type: "radiogroup",
                name: "mentalHealthTreatment",
                title: "Have you ever been in treatment for mental health?",
                choices: ["Yes", "No"]
              },
              { type: "text", name: "mentalHealthTreatmentDetails", title: "Where? When?", visibleIf: "{mentalHealthTreatment} = 'Yes'" },
              {
                type: "radiogroup",
                name: "previousHelpFromDSM",
                title: "Have you ever received help from the DSM previously?",
                choices: ["Yes", "No"]
              },
              { type: "text", name: "previousHelpDetails", title: "When?", visibleIf: "{previousHelpFromDSM} = 'Yes'" },
              {
                type: "radiogroup",
                name: "suicidalThoughts",
                title: "Have you ever thought about committing suicide?",
                choices: ["Yes", "No"]
              },
              {
                type: "radiogroup",
                name: "arrestHistory",
                title: "Have you ever been arrested?",
                choices: ["Yes", "No"]
              },
              {
                type: "radiogroup",
                name: "criminalJusticeInvolvement",
                title: "Are you currently involved in the criminal justice system?",
                choices: ["Yes", "No"]
              },
              {
                type: "comment",
                name: "criminalJusticeDetails",
                title: "If you answered yes to #5 or #6, please provide the details here:",
                visibleIf: "{arrestHistory} = 'Yes' or {criminalJusticeInvolvement} = 'Yes'"
              },
              {
                type: "radiogroup",
                name: "alcoholUse",
                title: "Have you consumed alcohol or beer, past or present?",
                choices: ["Yes", "No"]
              },
              {
                type: "radiogroup",
                name: "drugUse",
                title: "Have you used drugs, past or present?",
                choices: ["Yes", "No"]
              },
              { type: "text", name: "drugPreference", title: "If you answered yes, which drug (including alcohol) is your preference and when was the last time you used?", visibleIf: "{drugUse} = 'Yes'" },
              {
                type: "panel",
                name: "healthCare",
                title: "Do you currently have health care?",
                elements: [
                  { type: "checkbox", name: "healthCareOptions", choices: ["Medicaid", "Medicare", "Private Insurance", "Veterans Benefits", "None"] }
                ]
              },
              { type: "comment", name: "medicalConditions", title: "Do you have any terminal illnesses, viruses, or any other medical conditions? If yes, please list." },
              { type: "comment", name: "medications", title: "Do you currently take any medications? If yes, please list." }
            ]
          },
          {
            type: "checkbox",
            name: "reasonForAdmission",
            title: "Reason for seeking admission in the DSM?",
            isRequired: true,
            choices: ["Shelter", "Spiritual Growth", "Restoration", "To Overcome Drug/Alcohol Abuse"]
          },
          { type: "comment", name: "goals", title: "Brief description of what you hope to accomplish while you attend the DSM?" },
          { type: "comment", name: "talentsAndGifts", title: "List your talents and gifts" },
          {
            type: "paneldynamic",
            name: "emergencyContacts",
            title: "Emergency Contacts Information",
            templateElements: [
              { type: "text", name: "name", title: "Name" },
              { type: "text", name: "address", title: "Full Address" },
              { type: "text", name: "phone", title: "Phone" },
              { type: "text", name: "alternatePhone", title: "Alternate Phone" },
              { type: "text", name: "relationship", title: "Relationship" }
            ],
            panelCount: 1,
            minPanelCount: 1,
            panelAddText: "Add Another Emergency Contact"
          }
        ]
      }
    ]
  };

  const survey = new Model(surveyJson);

  survey.onComplete.add(async (sender) => {
    // Convert string values to boolean
    const surveyData = sender.data;
    surveyData.usCitizen = surveyData.usCitizen === "Yes";
    surveyData.isEmployed = surveyData.isEmployed === "Yes";
    surveyData.substanceAbuseTreatment = surveyData.substanceAbuseTreatment === "Yes";
    surveyData.mentalHealthTreatment = surveyData.mentalHealthTreatment === "Yes";
    surveyData.previousHelpFromDSM = surveyData.previousHelpFromDSM === "Yes";
    surveyData.suicidalThoughts = surveyData.suicidalThoughts === "Yes";
    surveyData.arrestHistory = surveyData.arrestHistory === "Yes";
    surveyData.criminalJusticeInvolvement = surveyData.criminalJusticeInvolvement === "Yes";
    surveyData.alcoholUse = surveyData.alcoholUse === "Yes";
    surveyData.drugUse = surveyData.drugUse === "Yes";

    try {
      await axios.put('http://localhost:3000/api/users/personalinfo', surveyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Personal information submitted successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage('Error submitting personal information: ' + (error.response ? error.response.data.message : error.message));
    }
  });

  return (
    <div>
      {message && <div>{message}</div>}
      <Survey model={survey} />
    </div>
  );
};

export default PersonalInfoForm;