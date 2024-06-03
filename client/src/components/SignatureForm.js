import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Directly import the pdf.worker.mjs file
GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.mjs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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

const SignatureForm = ({ open, onClose }) => {
  const [studentName, setStudentName] = useState('');
  const signaturePadRef = useRef(null);

  const handleSignatureClear = () => {
    signaturePadRef.current.clear();
  };

  const handleSignatureSave = () => {
    const signature = signaturePadRef.current.getTrimmedCanvas().toDataURL('image/png');
    console.log('Signature URL:', signature);
    // Here you can save the signature to the server or perform other actions
  };

  const loadPdf = async () => {
    const pdfUrl = '/DSM Complete Admission Agreement 24 (1).pdf';
    const loadingTask = getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport: viewport }).promise;
  };

  useEffect(() => {
    if (open) {
      loadPdf();
    }
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">Admission Agreement</Typography>
          <canvas id="pdf-canvas" />
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
            <Button variant="contained" onClick={handleSignatureSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default SignatureForm;

