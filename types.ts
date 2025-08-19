import { ReactNode } from 'react';

export type ChangeType = 'increase' | 'decrease' | 'neutral';

export interface Stat {
    id: number;
    title: string;
    value: string;
    change?: string;
    changeType?: ChangeType;
    icon?: React.ReactNode;
    iconBgColor?: string;
    subtitle?: string;
}

export interface ChartDataset {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
    fill?: boolean;
    tension?: number;
    stackId?: string;
}

export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

export interface DoughnutChartDataset {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
    borderColor: string;
    borderWidth: number;
}

export interface DoughnutChartData {
    labels: string[];
    datasets: DoughnutChartDataset[];
}

export interface BarChartDataset {
    label: string;
    data: number[];
    backgroundColor: string;
    stack?: string;
}

export interface BarChartData {
    labels: string[];
    datasets: BarChartDataset[];
}

export interface DashboardData {
    stats: Stat[];
    lineChart: ChartData;
    doughnutChart: DoughnutChartData;
}


// --- NEW WATER SYSTEM TYPES --- //

export type WaterMeterLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'DC' | 'N/A';

export interface WaterMeterRecord {
    meterLabel: string;
    accountNumber: string;
    level: WaterMeterLevel;
    zone: string;
    parentMeterLabel: string;
    type: string;
    monthlyConsumption: Record<string, number>;
    totalConsumption: number;
    children: WaterMeterRecord[];
    parent?: WaterMeterRecord;
}

export interface MonthlyCalculations {
    month: string;
    A1: number;
    A2: number;
    A3_Individual: number;
    stage1Loss: number;
    stage2Loss: number;
    stage3Loss: number;
    totalLoss: number;
    systemEfficiency: number;
}

export interface ZoneMonthlyData {
    consumption: number;
    loss: number;
    meters: WaterMeterRecord[];
}

export interface WaterSystemData {
    months: string[];
    monthlyCalculations: Record<string, MonthlyCalculations>;
    zoneMonthlyCalculations: Record<string, Record<string, ZoneMonthlyData>>;
    consumptionByType: Record<string, Record<string, number>>;
    allMetersFlat: WaterMeterRecord[];
}


// --- Other System Types --- //

export interface ElectricityRecord {
    name: string;
    type: string;
    meterAccountNo: string;
    monthlyConsumption: Record<string, number>;
    totalConsumption: number;
}

export interface ElectricityData {
    stats: Stat[];
    consumptionTrend: ChartData;
    consumptionByType: BarChartData;
    records: ElectricityRecord[];
    months: string[];
}

export type FirefightingStatus = 'Operational' | 'Needs Attention' | 'Expired' | 'Maintenance Due';
export type FirefightingPriority = 'Critical' | 'High' | 'Medium' | 'N/A';
export type SignalStrength = 'Strong' | 'Weak' | 'Moderate';

export interface FirefightingEquipment {
    id: string;
    equipment: string;
    subtext: string;
    location: string;
    locationSubtext: string;
    status: FirefightingStatus;
    priority: FirefightingPriority;
    battery: number;
    signal: SignalStrength;
    nextMaintenance: string;
    inspector: string;
}

export interface FirefightingData {
    stats: Stat[];
    systemStatus: DoughnutChartData;
    equipmentByType: BarChartData;
    equipmentList: FirefightingEquipment[];
}

export type HvacFindingStatus = 'Closed - Verified' | 'Quote Submitted / Awaiting LPO' | 'Open - Action Required';
export type HvacFindingPriority = 'High' | 'Medium' | 'Low' | 'Critical' | 'N/A';

export interface HvacMaintenanceItem {
    id: string;
    mainSystem: string;
    building: string;
    equipment: string;
    ppmVisit: string;
    finding: string;
    qty: string;
    priority: HvacFindingPriority | string;
    status: HvacFindingStatus | string;
    actionRequired: string;
    notes: string;
}

export interface HvacData {
    log: HvacMaintenanceItem[];
}

export type ContractStatus = 'Expired' | 'Active';
export type ContractType = 'Contract' | 'PO';

export interface Contract {
    id: string;
    contractor: string;
    service: string;
    status: ContractStatus;
    type: ContractType;
    startDate: string;
    endDate: string;
    annualValue: string;
    note: string;
}

export interface ContractorData {
    stats: Stat[];
    contracts: Contract[];
}

export interface StpDailyLog {
    date: string;
    inlet: number;
    tse: number;
    tankers: number;
    income: string;
    savings: string;
    total: string;
}

export interface StpData {
    stats: Stat[];
    monthlyWaterVolumes: ChartData;
    monthlyFinancials: BarChartData;
    monthlyOperations: ChartData;
    dailyLog: StpDailyLog[];
}

export interface MockData {
    dashboard: DashboardData;
    water: WaterSystemData;
    electricity: ElectricityData;
    hvac: HvacData;
    firefighting: FirefightingData;
    contractor: ContractorData;
    stp: StpData;
}

export type ViewKey = 'dashboard' | 'water' | 'electricity' | 'hvac' | 'firefighting' | 'contractor' | 'stp';

export interface NavItem {
    id: ViewKey;
    label: string;
    shortLabel?: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => ReactNode;
}
