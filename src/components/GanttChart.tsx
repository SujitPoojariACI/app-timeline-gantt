import React from 'react';
import { Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { GanttChartData } from '../types';

interface GanttChartProps {
  data: GanttChartData[];
}

const GanttChart: React.FC<GanttChartProps> = ({ data }) => {
  if (data.length === 0) {
    return null;
  }

  // Find min and max dates
  let minDate = new Date('2099-12-31');
  let maxDate = new Date('1900-01-01');

  data.forEach(item => {
    if (item.devStart < minDate) minDate = item.devStart;
    if (item.uatStart > maxDate) maxDate = item.uatStart;
  });

  // Generate date array for x-axis
  const dateArray: Date[] = [];
  const chartData: any[] = [];
  let currentDate = new Date(minDate);

  while (currentDate <= maxDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7); // Weekly intervals
  }

  // Transform data for stacked bar chart
  const transformedData = data.map(item => {
    const row: any = {
      name: item.name,
      dev: 0,
      sit: 0,
      uat: 0,
    };

    // Calculate duration in days
    if (item.devStart && item.dev > 0) {
      row.dev = item.dev;
    }
    if (item.sitStart && item.sit > 0) {
      row.sit = item.sit;
    }
    if (item.uatStart && item.uat > 0) {
      row.uat = item.uat;
    }

    return row;
  });

  const colors = {
    dev: '#3f51b5',
    sit: '#2196f3',
    uat: '#4caf50',
  };

  return (
    <Box sx={{ width: '100%', height: 400, mt: 2 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={transformedData}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 250,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: 'Duration (Days)', position: 'insideBottomRight', offset: -5 }} />
          <YAxis dataKey="name" type="category" width={240} />
          <Tooltip
            formatter={(value: number) => [`${value} days`, '']}
            labelFormatter={(label) => `Application: ${label}`}
          />
          <Legend />
          <Bar dataKey="dev" stackId="a" fill={colors.dev} name="Dev" />
          <Bar dataKey="sit" stackId="a" fill={colors.sit} name="SIT" />
          <Bar dataKey="uat" stackId="a" fill={colors.uat} name="UAT" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default GanttChart;
