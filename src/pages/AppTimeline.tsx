import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Card,
  CardContent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import InputForm from '../components/InputForm';
import GanttChart from '../components/GanttChart';
import { ApplicationData, GanttChartData, INTERFACE_OPTIONS } from '../types';

const AppTimeline: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationData>({
    ownerId: '',
    ownerName: '',
    applicationName: '',
    devStartDate: null,
    devEndDate: null,
    sitStartDate: null,
    sitEndDate: null,
    uatStartDate: null,
    uatEndDate: null,
    prodReleaseDate: null,
    interfaces: [],
  });

  const [selectedInterfaces, setSelectedInterfaces] = useState<string[]>([]);
  const [entries, setEntries] = useState<ApplicationData[]>([]);

  const handleFormChange = (field: keyof ApplicationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInterfaceChange = (interfaceName: string) => {
    setFormData(prev => ({
      ...prev,
      interfaces: prev.interfaces.includes(interfaceName)
        ? prev.interfaces.filter(i => i !== interfaceName)
        : [...prev.interfaces, interfaceName],
    }));
  };

  const handleAddEntry = () => {
    if (
      formData.ownerId &&
      formData.ownerName &&
      formData.applicationName &&
      formData.devStartDate &&
      formData.devEndDate &&
      formData.sitStartDate &&
      formData.sitEndDate &&
      formData.uatStartDate &&
      formData.uatEndDate &&
      formData.prodReleaseDate
    ) {
      setEntries([...entries, { ...formData }]);
      // Reset form
      setFormData({
        ownerId: '',
        ownerName: '',
        applicationName: '',
        devStartDate: null,
        devEndDate: null,
        sitStartDate: null,
        sitEndDate: null,
        uatStartDate: null,
        uatEndDate: null,
        prodReleaseDate: null,
        interfaces: [],
      });
    } else {
      alert('Please fill all required fields');
    }
  };

  const ganttData = useMemo(() => {
    return entries
      .filter(entry => {
        if (selectedInterfaces.length === 0) return true;
        return entry.interfaces.some(i => selectedInterfaces.includes(i));
      })
      .map(entry => ({
        name: `${entry.applicationName} (${entry.ownerName})`,
        dev: entry.devStartDate && entry.devEndDate
          ? dayjs(entry.devEndDate).diff(dayjs(entry.devStartDate), 'day')
          : 0,
        devStart: entry.devStartDate || new Date(),
        sit: entry.sitStartDate && entry.sitEndDate
          ? dayjs(entry.sitEndDate).diff(dayjs(entry.sitStartDate), 'day')
          : 0,
        sitStart: entry.sitStartDate || new Date(),
        uat: entry.uatStartDate && entry.uatEndDate
          ? dayjs(entry.uatEndDate).diff(dayjs(entry.uatStartDate), 'day')
          : 0,
        uatStart: entry.uatStartDate || new Date(),
        interfaces: entry.interfaces,
      }));
  }, [entries, selectedInterfaces]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Application Timeline Gantt Chart
        </Typography>

        <Grid container spacing={3}>
          {/* Form Section */}
          <Grid item xs={12} lg={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Application Details
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Owner ID */}
                <TextField
                  label="Application Owner ID"
                  placeholder="123456789000"
                  value={formData.ownerId}
                  onChange={(e) => handleFormChange('ownerId', e.target.value)}
                  fullWidth
                  variant="outlined"
                />

                {/* Owner Name */}
                <TextField
                  label="Owner Name"
                  value={formData.ownerName}
                  onChange={(e) => handleFormChange('ownerName', e.target.value)}
                  fullWidth
                  variant="outlined"
                />

                {/* Application Name Dropdown */}
                <TextField
                  select
                  label="Application Name"
                  value={formData.applicationName}
                  onChange={(e) => handleFormChange('applicationName', e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="ABC">ABC</MenuItem>
                  <MenuItem value="DEF">DEF</MenuItem>
                  <MenuItem value="XYZ">XYZ</MenuItem>
                </TextField>

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Dev Phase
                </Typography>
                <DatePicker
                  label="Dev Start Date"
                  value={formData.devStartDate ? dayjs(formData.devStartDate) : null}
                  onChange={(date) => handleFormChange('devStartDate', date?.toDate() || null)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="Dev End Date"
                  value={formData.devEndDate ? dayjs(formData.devEndDate) : null}
                  onChange={(date) => handleFormChange('devEndDate', date?.toDate() || null)}
                  slotProps={{ textField: { fullWidth: true } }}
                />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2 }}>
                  SIT Phase
                </Typography>
                <DatePicker
                  label="SIT Start Date"
                  value={formData.sitStartDate ? dayjs(formData.sitStartDate) : null}
                  onChange={(date) => handleFormChange('sitStartDate', date?.toDate() || null)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="SIT End Date"
                  value={formData.sitEndDate ? dayjs(formData.sitEndDate) : null}
                  onChange={(date) => handleFormChange('sitEndDate', date?.toDate() || null)}
                  slotProps={{ textField: { fullWidth: true } }}
                />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2 }}>
                  UAT Phase
                </Typography>
                <DatePicker
                  label="UAT Start Date"
                  value={formData.uatStartDate ? dayjs(formData.uatStartDate) : null}
                  onChange={(date) => handleFormChange('uatStartDate', date?.toDate() || null)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="UAT End Date"
                  value={formData.uatEndDate ? dayjs(formData.uatEndDate) : null}
                  onChange={(date) => handleFormChange('uatEndDate', date?.toDate() || null)}
                  slotProps={{ textField: { fullWidth: true } }}
                />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Production
                </Typography>
                <DatePicker
                  label="Prod Release Date"
                  value={formData.prodReleaseDate ? dayjs(formData.prodReleaseDate) : null}
                  onChange={(date) => handleFormChange('prodReleaseDate', date?.toDate() || null)}
                  slotProps={{ textField: { fullWidth: true } }}
                />

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 3 }}>
                  Interfaces Required
                </Typography>
                <FormGroup>
                  {INTERFACE_OPTIONS.map((interfaceName) => (
                    <FormControlLabel
                      key={interfaceName}
                      control={
                        <Checkbox
                          checked={formData.interfaces.includes(interfaceName)}
                          onChange={() => handleInterfaceChange(interfaceName)}
                        />
                      }
                      label={interfaceName}
                    />
                  ))}
                </FormGroup>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddEntry}
                  sx={{ mt: 3 }}
                >
                  Add Application
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Timeline Visualization
              </Typography>

              {/* Interface Filter */}
              <Card sx={{ mb: 3, backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Filter by Interfaces
                  </Typography>
                  <FormGroup row>
                    {INTERFACE_OPTIONS.map((interfaceName) => (
                      <FormControlLabel
                        key={interfaceName}
                        control={
                          <Checkbox
                            checked={selectedInterfaces.includes(interfaceName)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedInterfaces([...selectedInterfaces, interfaceName]);
                              } else {
                                setSelectedInterfaces(
                                  selectedInterfaces.filter(i => i !== interfaceName)
                                );
                              }
                            }}
                          />
                        }
                        label={interfaceName}
                      />
                    ))}
                  </FormGroup>
                </CardContent>
              </Card>

              {/* Gantt Chart */}
              {entries.length > 0 ? (
                <GanttChart data={ganttData} />
              ) : (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography color="textSecondary">
                    Add an application entry to view the Gantt chart
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Entries List */}
        {entries.length > 0 && (
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Added Entries ({entries.length})
              </Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Owner ID</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Owner Name</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>App Name</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Interfaces</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Dev</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>SIT</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>UAT</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Prod Release</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, idx) => (
                      <tr key={idx}>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.ownerId}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.ownerName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.applicationName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.interfaces.join(', ')}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          {entry.devStartDate && entry.devEndDate
                            ? `${dayjs(entry.devStartDate).format('MMM DD')} - ${dayjs(entry.devEndDate).format('MMM DD')}`
                            : '-'}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          {entry.sitStartDate && entry.sitEndDate
                            ? `${dayjs(entry.sitStartDate).format('MMM DD')} - ${dayjs(entry.sitEndDate).format('MMM DD')}`
                            : '-'}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          {entry.uatStartDate && entry.uatEndDate
                            ? `${dayjs(entry.uatStartDate).format('MMM DD')} - ${dayjs(entry.uatEndDate).format('MMM DD')}`
                            : '-'}
                        </td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          {entry.prodReleaseDate ? dayjs(entry.prodReleaseDate).format('MMM DD, YYYY') : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Paper>
          </Grid>
        )}
      </Container>
    </LocalizationProvider>
  );
};

export default AppTimeline;
