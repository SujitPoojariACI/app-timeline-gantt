export interface ApplicationData {
  ownerId: string;
  ownerName: string;
  applicationName: string;
  devStartDate: Date | null;
  devEndDate: Date | null;
  sitStartDate: Date | null;
  sitEndDate: Date | null;
  uatStartDate: Date | null;
  uatEndDate: Date | null;
  prodReleaseDate: Date | null;
  interfaces: string[];
}

export interface GanttChartData {
  name: string;
  dev: number;
  devStart: Date;
  sit: number;
  sitStart: Date;
  uat: number;
  uatStart: Date;
  interfaces: string[];
}

export const INTERFACE_OPTIONS = ['QWE', 'RTY', 'UIO', 'ASD'];
export const APPLICATION_OPTIONS = ['ABC', 'DEF', 'XYZ'];
