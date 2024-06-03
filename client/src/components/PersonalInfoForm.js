import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.css';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '80%',
  overflow: 'auto',
};

const PersonalInfoForm = () => {
  const [message, setMessage] = useState('');
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [acknowledged, setAcknowledged] = useState(false);
  const signaturePadRef = useRef(null);
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
        ]
      },
      {
        name: "history",
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
        name: "additionalInfo",
        elements: [
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

    console.log('Survey Data:', surveyData);

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

  const handleSignatureClear = () => {
    signaturePadRef.current.clear();
  };

  const handleSignatureSave = () => {
    const signature = signaturePadRef.current.getTrimmedCanvas().toDataURL('image/png');
    console.log('Signature URL:', signature);
    // Here you can save the signature to the server or perform other actions
  };

  return (
    <div>
      {message && <div>{message}</div>}
      <Survey model={survey} />
      <Button variant="contained" color="primary" onClick={() => setShowSignatureModal(true)}>
        Open Admission Agreement and Sign
      </Button>
      <Modal open={showSignatureModal} onClose={() => setShowSignatureModal(false)}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">Admission Agreement</Typography>
          <Box sx={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
            <Typography variant="body1" paragraph>
              I, ___________________________________ understand that, as a condition of acceptance into the 
              Discipleship School of Ministry (DSM), I must abide by all rules and regulations of the school.  I 
              understand that it is my responsibility to know and understand the rules and regulations, as they apply 
              to me, and that if I violate any of these rules I may be terminated from this school and required to leave 
              the DSM.  I understand that any questions regarding rules and regulations can be directed to the school 
              director.  Furthermore, I acknowledge the DSM is a not a licensed treatment facility.
            </Typography>
            <Typography variant="body1" paragraph>
              Additionally, I agree that the DSM is not responsible for administering any medical treatment that I may 
              need or am currently receiving.  I agree that in the event medical treatment is required, I may have to 
              pay for the medical treatment and provide documentation from the treating physician of the nature of 
              the treatment and the dates and times of any appointments.
            </Typography>
            <Typography variant="body1" paragraph>
              The DSM will provide my room and board to help me focus on the school curriculum.  However, any 
              personal items kept by me are done so at my own risk.  I understand that if I leave or am dismissed from 
              the DSM, any and all personal property left at the facility will be held for twenty-four (24) hours, after 
              which they are expressly donated to the school to do with as they see fit.
            </Typography>
            <Typography variant="body1" paragraph>
              I understand that the DSM will not house sex offenders.  Background checks will be given to all new 
              members.  If the background check is refused by an applicant, admission into the DSM will be denied.  I 
              hereby give my consent for the DSM to perform a background check of my criminal history in any and all 
              jurisdictions.  I acknowledge that if anything of that nature described above is found, my enrollment into 
              the school will be denied or terminated as applicable.
            </Typography>
            <Typography variant="body1" paragraph>
              I come to the DISCIPLESHIP SCHOOL OF MINISTRY (DSM) voluntarily and of my own free will.  I come 
              asking for help with my spiritual growth in Christ.  I understand that the DSM is a place of spiritual 
              healing and restoration, and that the possession of any illegal contraband or illegal controlled 
              substances is not permitted in this school.
            </Typography>
            <Typography variant="body1" paragraph>
              I understand that the DSM is not responsible for any personal injuries, sickness, accidents, acts of God, 
              or other similar incidents during or after my being in the school or traveling in their vehicles.  I also 
              understand that the DSM is not responsible for theft, damage, or loss of any personal property in any 
              way.
            </Typography>
            <Typography variant="body1" paragraph>
              I give the DSM permission to search my property upon arrival and at any time during my stay.
            </Typography>
            <Typography variant="body1" paragraph>
              I understand that the DSM is a full-time commitment and that I will not be allowed to seek outside 
              employment without the full consent of the school’s director during the Phase 1 part of the program.
            </Typography>
            <Typography variant="body1" paragraph>
              I understand that any fighting, stealing, or use of obscene language (as determined by the DSM leaders 
              and staff) may be grounds for automatic dismissal from the program.
            </Typography>
            <Typography variant="body1" paragraph>
              I understand that participation in this program is voluntary and that either the DSM or I may terminate 
              my stay in the school at any time without cause.
            </Typography>
            <Typography variant="body1" paragraph>
              I understand that if I choose to leave the school, I will have to wait a minimum of 30 days before I may 
              apply for the program again.  If I am expelled from the school, I will have to wait a minimum of 45 days 
              before I can appeal the decision and apply for re-entry.  This will be a case-by-case scenario.
            </Typography>
            <Typography variant="body1" paragraph>
              I have read and understand the above agreement and hereby agree to comply with the rules and 
              regulations set forth by the DSM. I also understand that any violation of the rules and regulations may 
              result in loss of privileges and/or expulsion from the DISCIPLESHIP SCHOOL OF MINISTRY.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Liability Release and Waiver</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              1. I, the undersigned, am at least 18 years of age and desire to participate in the Discipleship 
              School of Ministry program housed at San Antonio Christian Church.  This program has been 
              explained to me and I fully understand and appreciate the dangers, risks and hazards that 
              may arise from my participation in the activities of this program.  These dangers, risks and 
              hazards can result in injury and impairment to my body, general health, well-being, property 
              damage and could include serious or even fatal injuries.
            </Typography>
            <Typography variant="body1" paragraph>
              2. Knowing the dangers, hazards, and risks of the program’s activities and in consideration 
              of being permitted to participate in the program, on behalf of myself, my family, my spouse, 
              heirs, next of kin and personal representative(s) (the “Releasors”), I agree to assume all the 
              risks and responsibilities surrounding my participation in the Discipleship School of 
              Ministry’s program.  On behalf of myself and the Releasors, I hereby covenant not to sue the 
              San Antonio Christian Church nor the Discipleship School of Ministry, or its trustees, officers, 
              representatives and employees (“Releasees”) and I hereby release, waive, forever discharge 
              the Releasees from and against any and all liability for any harm, injury, damage, claims, 
              demands, actions, causes of action, costs, and expenses of any nature that I may have or 
              that may hereafter accrue to me or a Releasor, arising out of, or related to, or in relation to 
              the DSM and/or associated with San Antonio Christian Church including but not limited to 
              any volunteer activities, or community events or leagues, using the facility and its 
              equipment practicing and or engaging in church functions, philanthropic activities, other 
              nonprofit or for profit engagements or functions and fundraisers or other related activities 
              on and off the premises, provided that this waiver of liability does not apply to any acts of 
              gross negligence or intentional, willful or wanton misconduct of Releasees or otherwise.  I 
              further agree to indemnify and hold harmless and forever discharge the Releasees from any 
              and all claims, demands, debts, contracts, expenses, causes of action, lawsuits, damages and 
              liabilities, of every kind and nature, whether known or unknown in law or equity, that I ever 
              had or may have, arising from or in any way related to my participation in any of the events 
              or activities conducted by, on the premises of, or for the benefit of the Releasees.  It is my 
              expressed intent that this Liability Release and Waiver shall bind me, the members of my 
              family and spouse, if I am alive, and my estate, family, heirs, administrators, personal 
              representatives, or assigns, if I am deceased, and shall be deemed as a legally binding 
              release, waiver, discharge, and covenant not to sue the Releasees.
            </Typography>
            <Typography variant="body1" paragraph>
              3. I agree to conduct myself in accordance with the rules of conduct and standards of 
              behavior that are expected of me as a student of the DSM and to abide by the various 
              instructions and guidance I am given by the DSM or by a Program Director designated by the 
              DSM.
            </Typography>
            <Typography variant="body1" paragraph>
              4. The provision of this Liability Release and Waiver will continue in full force and effect 
              even after the termination of the activities conducted by, on the premises of, or for the 
              benefit of San Antonio Christian Church and the DSM, whether by agreement, by operation 
              of law, or otherwise.
            </Typography>
            <Typography variant="body1" paragraph>
              5. I have read, understand, and fully agree to the terms of this Liability Release and Waiver.  I 
              understand and confirm that by signing this Liability Release and Waiver I have given up 
              considerable future legal rights.  I have signed this Agreement freely, voluntarily, under no 
              duress or threat of duress, without inducement, promise or guarantee being communicated 
              to me.  My signature is proof of my intention to execute a complete and unconditional 
              Liability Release and Waiver of all liability to the full extent of the law.  I am 18 years of age 
              or older and mentally competent to enter into this waiver.
            </Typography>
            <Typography variant="body1" paragraph>
              THIS IS A LEGAL AGREEMENT AND INCLUDES A RELEASE OF LEGAL RIGHTS, READ AND BE CERTAIN 
              YOU UNDERSTAND IT BEFORE SIGNING.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>____________________     ____________________</strong><br />
              Date        Date
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>___________________________________   ________________________________</strong><br />
              Student Printed Name      Printed Name of Witness/Director
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>___________________________________   ________________________________</strong><br />
              Student Signature      Signature of Witness/Director
            </Typography>
          </Box>
          <Box mt={2}>
            <FormControlLabel
              control={<Checkbox checked={acknowledged} onChange={() => setAcknowledged(!acknowledged)} />}
              label="I acknowledge that I have read the entire agreement."
            />
          </Box>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Student Name"
              variant="outlined"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="body1">Signature:</Typography>
            <SignatureCanvas
              penColor="black"
              ref={signaturePadRef}
              canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
            />
            <Box mt={1}>
              <Button variant="outlined" onClick={handleSignatureClear}>Clear</Button>
            </Box>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleSignatureSave} disabled={!acknowledged}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PersonalInfoForm;
