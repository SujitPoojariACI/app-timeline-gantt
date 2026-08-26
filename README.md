# App Timeline Gantt Chart

A comprehensive React application for visualizing application development timelines using an interactive Gantt chart.

## Features

- **Application Details Form**
  - Owner ID and Name input
  - Application name selection (ABC, DEF, XYZ)
  - Date pickers for Dev, SIT, UAT, and Production phases
  - Interface selection (QWE, RTY, UIO, ASD)

- **Interactive Gantt Chart**
  - Stacked bar visualization showing Dev, SIT, and UAT phases
  - Applications listed on the left side
  - Duration in days on the bottom axis
  - Dynamic filtering by selected interfaces

- **Data Management**
  - Add multiple application entries
  - View all entries in a summary table
  - Filter chart by selected interfaces

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## Technologies Used

- React 18
- TypeScript
- Material-UI (MUI)
- Recharts
- Day.js

## Project Structure

```
src/
├── components/
│   ├── GanttChart.tsx      # Gantt chart visualization
│   └── InputForm.tsx       # Form component
├── pages/
│   └── AppTimeline.tsx     # Main page
├── types/
│   └── index.ts           # TypeScript types and interfaces
├── App.tsx                # Root component
├── index.tsx              # Entry point
└── index.css              # Global styles
```

## Usage

1. Fill in the Application Details form on the left
2. Select start and end dates for each phase (Dev, SIT, UAT)
3. Select required interfaces
4. Click "Add Application" to add to the chart
5. Use the Interface Filter to dynamically filter the chart display
6. View all entries in the summary table below

## License

MIT
