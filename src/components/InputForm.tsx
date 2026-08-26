import React from 'react';
import { Box } from '@mui/material';
import { ApplicationData } from '../types';

interface InputFormProps {
  onSubmit: (data: ApplicationData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  return (
    <Box>
      {/* Form will be handled by parent component */}
    </Box>
  );
};

export default InputForm;
