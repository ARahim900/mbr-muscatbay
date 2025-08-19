import React from 'react';
import type { MockData, NavItem, ViewKey, StpData, StpDailyLog, HvacData, HvacMaintenanceItem, HvacFindingPriority, ElectricityData, ElectricityRecord, BarChartData, WaterSystemData, WaterMeterRecord, WaterMeterLevel, MonthlyCalculations, ZoneMonthlyData } from './types';

// --- SVG ICONS --- //
export const Icons = {
    dashboard: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> ),
    water: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c0-3.314-3-6-3-6s-3 2.686-3 6c0 1.657 1.343 3 3 3s3-1.343 3-3zm6 0c0-3.314-3-6-3-6s-3 2.686-3 6c0 1.657 1.343 3 3 3s3-1.343 3-3z" /></svg> ),
    electricity: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> ),
    hvac: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-9-5.197" /></svg> ),
    firefighting: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a8 8 0 11-12.856-12.856 8 8 0 0112.856 12.856zM12 6v6l4 2" /></svg> ),
    contractor: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> ),
    stp: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9m-9 9a9 9 0 009 9m-9-9h18" /><path d="M12 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" fill="currentColor" opacity="0.5" /></svg>),
    menu: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> ),
    close: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> ),
    search: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> ),
    notification: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> ),
    settings: (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> ),
    ai: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188l-1.25-2.188L13.563 11l2.188-1.25L17 7.563l1.25 2.188L20.438 11l-2.188 1.25z"></path></svg>),
    totalConsumption: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" /></svg>),
    totalCost: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414-.336.75-.75.75h-1.5a.75.75 0 01-.75-.75V4.5m0 0h-4.5m5.25 0h.75" /></svg>),
    totalMeters: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V5.25A2.25 2.25 0 0018 3H6A2.25 2.25 0 003.75 5.25v12.75A2.25 2.25 0 006 20.25z" /></svg>),
    highestConsumer: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>),
};


// --- STP DATA PROCESSING --- //

const stpRawSqlData = `
INSERT INTO \`tableName\` VALUES ('1/7/2024', 385, 340, 339, 10, 200, 139);
INSERT INTO \`tableName\` VALUES ('2/7/2024', 519, 458, 526, 14, 280, 246);
INSERT INTO \`tableName\` VALUES ('3/7/2024', 479, 425, 468, 13, 260, 208);
INSERT INTO \`tableName\` VALUES ('4/7/2024', 547, 489, 464, 11, 220, 244);
INSERT INTO \`tableName\` VALUES ('5/7/2024', 653, 574, 565, 15, 300, 265);
INSERT INTO \`tableName\` VALUES ('6/7/2024', 552, 492, 502, 14, 280, 222);
INSERT INTO \`tableName\` VALUES ('7/7/2024', 575, 498, 549, 13, 260, 289);
INSERT INTO \`tableName\` VALUES ('8/7/2024', 587, 515, 532, 16, 320, 212);
INSERT INTO \`tableName\` VALUES ('8/7/2024', 589, 515, 539, 16, 320, 219);
INSERT INTO \`tableName\` VALUES ('9/7/2024', 586, 519, 532, 13, 260, 272);
INSERT INTO \`tableName\` VALUES ('10/7/2024', 542, 462, 493, 12, 240, 253);
INSERT INTO \`tableName\` VALUES ('12/7/2024', 533, 468, 506, 12, 240, 266);
INSERT INTO \`tableName\` VALUES ('12/7/2024', 654, 580, 578, 16, 320, 258);
INSERT INTO \`tableName\` VALUES ('13/07/2024', 464, 402, 479, 10, 200, 279);
INSERT INTO \`tableName\` VALUES ('13/07/2024', 464, 402, 479, 10, 200, 279);
INSERT INTO \`tableName\` VALUES ('14/07/2024', 506, 448, 486, 13, 260, 226);
INSERT INTO \`tableName\` VALUES ('15/07/2024', 482, 418, 391, 6, 120, 271);
INSERT INTO \`tableName\` VALUES ('16/07/2024', 670, 600, 576, 18, 360, 216);
INSERT INTO \`tableName\` VALUES ('17/07/2024', 344, 300, 506, 12, 240, 266);
INSERT INTO \`tableName\` VALUES ('18/07/2024', 585, 517, 369, 8, 160, 209);
INSERT INTO \`tableName\` VALUES ('19/07/2024', 687, 605, 614, 15, 300, 314);
INSERT INTO \`tableName\` VALUES ('20/07/2024', 536, 465, 483, 12, 240, 243);
INSERT INTO \`tableName\` VALUES ('21/07/2024', 504, 455, 501, 13, 260, 241);
INSERT INTO \`tableName\` VALUES ('22/07/2024', 549, 492, 480, 13, 260, 220);
INSERT INTO \`tableName\` VALUES ('23/07/2024', 611, 535, 568, 16, 320, 248);
INSERT INTO \`tableName\` VALUES ('24/07/2024', 599, 528, 563, 18, 360, 203);
INSERT INTO \`tableName\` VALUES ('25/07/2024', 517, 444, 415, 14, 280, 135);
INSERT INTO \`tableName\` VALUES ('26/07/2024', 650, 570, 584, 18, 360, 224);
INSERT INTO \`tableName\` VALUES ('27/07/2024', 475, 414, 537, 10, 200, 337);
INSERT INTO \`tableName\` VALUES ('28/07/2024', 512, 449, 453, 12, 240, 213);
INSERT INTO \`tableName\` VALUES ('29/07/2024', 671, 577, 685, 19, 380, 305);
INSERT INTO \`tableName\` VALUES ('30/07/2024', 668, 582, 527, 13, 260, 267);
INSERT INTO \`tableName\` VALUES ('31/07/2024', 613, 529, 606, 17, 340, 266);
INSERT INTO \`tableName\` VALUES ('1/8/2024', 601, 528, 542, 15, 300, 242);
INSERT INTO \`tableName\` VALUES ('2/8/2024', 676, 590, 660, 15, 300, 360);
INSERT INTO \`tableName\` VALUES ('3/8/2024', 544, 474, 493, 13, 260, 233);
INSERT INTO \`tableName\` VALUES ('4/8/2024', 571, 497, 510, 13, 260, 250);
INSERT INTO \`tableName\` VALUES ('5/8/2024', 574, 500, 515, 13, 260, 255);
INSERT INTO \`tableName\` VALUES ('6/8/2024', 643, 554, 604, 16, 320, 284);
INSERT INTO \`tableName\` VALUES ('7/8/2024', 608, 516, 490, 19, 380, 110);
INSERT INTO \`tableName\` VALUES ('8/8/2024', 610, 524, 642, 17, 340, 302);
INSERT INTO \`tableName\` VALUES ('9/8/2024', 630, 550, 531, 12, 240, 291);
INSERT INTO \`tableName\` VALUES ('10/8/2024', 583, 499, 525, 13, 260, 265);
INSERT INTO \`tableName\` VALUES ('11/8/2024', 554, 483, 559, 11, 220, 339);
INSERT INTO \`tableName\` VALUES ('12/8/2024', 606, 531, 469, 12, 240, 229);
INSERT INTO \`tableName\` VALUES ('13/08/2024', 569, 499, 459, 12, 240, 219);
INSERT INTO \`tableName\` VALUES ('14/08/2024', 525, 492, 509, 11, 220, 289);
INSERT INTO \`tableName\` VALUES ('15/08/2024', 579, 502, 541, 13, 260, 281);
INSERT INTO \`tableName\` VALUES ('16/08/2024', 591, 516, 548, 11, 220, 328);
INSERT INTO \`tableName\` VALUES ('17/08/2024', 466, 414, 512, 14, 280, 232);
INSERT INTO \`tableName\` VALUES ('18/08/2024', 591, 516, 478, 13, 260, 218);
INSERT INTO \`tableName\` VALUES ('19/08/2024', 529, 470, 430, 11, 220, 210);
INSERT INTO \`tableName\` VALUES ('20/08/2024', 579, 495, 521, 13, 260, 261);
INSERT INTO \`tableName\` VALUES ('21/08/2024', 586, 500, 478, 12, 240, 238);
INSERT INTO \`tableName\` VALUES ('22/08/2024', 486, 437, 552, 13, 260, 292);
INSERT INTO \`tableName\` VALUES ('23/08/2024', 564, 478, 449, 12, 240, 209);
INSERT INTO \`tableName\` VALUES ('24/08/2024', 581, 505, 461, 9, 180, 281);
INSERT INTO \`tableName\` VALUES ('25/08/2024', 488, 420, 369, 8, 160, 209);
INSERT INTO \`tableName\` VALUES ('26/08/2024', 371, 291, 409, 8, 160, 249);
INSERT INTO \`tableName\` VALUES ('27/08/2024', 453, 417, 391, 8, 160, 231);
INSERT INTO \`tableName\` VALUES ('28/08/2024', 642, 557, 535, 9, 180, 355);
INSERT INTO \`tableName\` VALUES ('29/08/2024', 413, 360, 368, 9, 180, 188);
INSERT INTO \`tableName\` VALUES ('30/08/2024', 624, 551, 626, 14, 280, 346);
INSERT INTO \`tableName\` VALUES ('31/08/2024', 535, 473, 465, 9, 180, 285);
INSERT INTO \`tableName\` VALUES ('1/9/2024', 504, 441, 477, 11, 220, 257);
INSERT INTO \`tableName\` VALUES ('2/9/2024', 355, 317, 370, 5, 100, 270);
INSERT INTO \`tableName\` VALUES ('3/9/2024', 540, 481, 441, 9, 180, 261);
INSERT INTO \`tableName\` VALUES ('4/9/2024', 358, 300, 332, 4, 80, 252);
INSERT INTO \`tableName\` VALUES ('5/9/2024', 547, 483, 450, 6, 120, 330);
INSERT INTO \`tableName\` VALUES ('6/9/2024', 518, 474, 489, 14, 280, 209);
INSERT INTO \`tableName\` VALUES ('7/9/2024', 568, 504, 559, 12, 240, 319);
INSERT INTO \`tableName\` VALUES ('8/9/2024', 478, 422, 479, 9, 180, 299);
INSERT INTO \`tableName\` VALUES ('9/9/2024', 515, 459, 463, 9, 180, 283);
INSERT INTO \`tableName\` VALUES ('10/9/2024', 453, 396, 422, 7, 140, 282);
INSERT INTO \`tableName\` VALUES ('11/9/2024', 566, 495, 519, 12, 240, 279);
INSERT INTO \`tableName\` VALUES ('12/9/2024', 489, 437, 457, 10, 200, 257);
INSERT INTO \`tableName\` VALUES ('13/09/2024', 671, 611, 564, 14, 280, 284);
INSERT INTO \`tableName\` VALUES ('14/09/2024', 357, 311, 343, 5, 100, 243);
INSERT INTO \`tableName\` VALUES ('15/09/2024', 354, 307, 348, 7, 140, 208);
INSERT INTO \`tableName\` VALUES ('16/09/2024', 412, 366, 443, 8, 160, 283);
INSERT INTO \`tableName\` VALUES ('17/09/2024', 352, 314, 303, 8, 160, 143);
INSERT INTO \`tableName\` VALUES ('18/09/2024', 424, 371, 380, 8, 160, 220);
INSERT INTO \`tableName\` VALUES ('19/09/2024', 441, 401, 378, 9, 180, 198);
INSERT INTO \`tableName\` VALUES ('20/09/2024', 581, 519, 511, 14, 280, 231);
INSERT INTO \`tableName\` VALUES ('20/09/2024', 581, 519, 511, 14, 280, 231);
INSERT INTO \`tableName\` VALUES ('21/09/2024', 452, 391, 434, 9, 180, 254);
INSERT INTO \`tableName\` VALUES ('22/09/2024', 355, 317, 370, 9, 180, 190);
INSERT INTO \`tableName\` VALUES ('23/09/2024', 292, 262, 291, 5, 100, 191);
INSERT INTO \`tableName\` VALUES ('24/09/2024', 555, 498, 462, 8, 160, 302);
INSERT INTO \`tableName\` VALUES ('25/09/2024', 364, 319, 390, 10, 200, 190);
INSERT INTO \`tableName\` VALUES ('26/09/2024', 386, 342, 352, 7, 140, 212);
INSERT INTO \`tableName\` VALUES ('27/09/2024', 519, 467, 489, 11, 220, 269);
INSERT INTO \`tableName\` VALUES ('28/09/2024', 539, 469, 483, 8, 160, 323);
INSERT INTO \`tableName\` VALUES ('29/09/2024', 557, 503, 448, 9, 180, 268);
INSERT INTO \`tableName\` VALUES ('30/09/2024', 388, 350, 424, 6, 120, 304);
INSERT INTO \`tableName\` VALUES ('30/09/2024', 388, 350, 424, 6, 120, 304);
INSERT INTO \`tableName\` VALUES ('1/10/2024', 482, 417, 405, 5, 100, 305);
INSERT INTO \`tableName\` VALUES ('2/10/2024', 419, 361, 433, 8, 160, 273);
INSERT INTO \`tableName\` VALUES ('3/10/2024', 575, 520, 475, 9, 180, 295);
INSERT INTO \`tableName\` VALUES ('4/10/2024', 602, 506, 547, 15, 300, 247);
INSERT INTO \`tableName\` VALUES ('5/10/2024', 555, 515, 522, 8, 160, 362);
INSERT INTO \`tableName\` VALUES ('6/10/2024', 425, 365, 457, 8, 160, 297);
INSERT INTO \`tableName\` VALUES ('7/10/2024', 592, 533, 544, 11, 220, 324);
INSERT INTO \`tableName\` VALUES ('8/10/2024', 524, 462, 489, 11, 220, 269);
INSERT INTO \`tableName\` VALUES ('9/10/2024', 637, 568, 532, 11, 220, 312);
INSERT INTO \`tableName\` VALUES ('10/10/2024', 559, 491, 494, 11, 220, 274);
INSERT INTO \`tableName\` VALUES ('11/10/2024', 541, 438, 549, 12, 240, 309);
INSERT INTO \`tableName\` VALUES ('12/10/2024', 526, 512, 511, 8, 160, 351);
INSERT INTO \`tableName\` VALUES ('13/10/2024', 405, 345, 332, 6, 120, 212);
INSERT INTO \`tableName\` VALUES ('14/10/2024', 601, 548, 509, 7, 140, 369);
INSERT INTO \`tableName\` VALUES ('15/10/2024', 569, 489, 581, 10, 200, 381);
INSERT INTO \`tableName\` VALUES ('16/10/2024', 607, 538, 548, 8, 160, 388);
INSERT INTO \`tableName\` VALUES ('17/10/2024', 659, 575, 636, 11, 220, 416);
INSERT INTO \`tableName\` VALUES ('18/10/2024', 677, 597, 565, 10, 200, 365);
INSERT INTO \`tableName\` VALUES ('19/10/2024', 583, 509, 589, 8, 160, 429);
INSERT INTO \`tableName\` VALUES ('20/10/2024', 614, 542, 537, 10, 200, 337);
INSERT INTO \`tableName\` VALUES ('21/10/2024', 585, 513, 539, 12, 240, 299);
INSERT INTO \`tableName\` VALUES ('22/10/2024', 606, 528, 525, 9, 180, 345);
INSERT INTO \`tableName\` VALUES ('23/10/2024', 614, 532, 592, 11, 220, 372);
INSERT INTO \`tableName\` VALUES ('24/10/2024', 522, 442, 546, 11, 220, 326);
INSERT INTO \`tableName\` VALUES ('25/10/2024', 601, 524, 603, 9, 180, 423);
INSERT INTO \`tableName\` VALUES ('26/10/2024', 636, 557, 588, 12, 240, 348);
INSERT INTO \`tableName\` VALUES ('27/10/2024', 594, 487, 523, 6, 120, 403);
INSERT INTO \`tableName\` VALUES ('28/10/2024', 586, 535, 595, 9, 180, 415);
INSERT INTO \`tableName\` VALUES ('29/10/2024', 613, 535, 511, 7, 140, 371);
INSERT INTO \`tableName\` VALUES ('30/10/2024', 583, 506, 543, 9, 180, 363);
INSERT INTO \`tableName\` VALUES ('31/10/2024', 577, 500, 577, 7, 140, 437);
INSERT INTO \`tableName\` VALUES ('1/11/2024', 553, 476, 476, 5, 100, 376);
INSERT INTO \`tableName\` VALUES ('2/11/2024', 609, 513, 553, 8, 160, 393);
INSERT INTO \`tableName\` VALUES ('3/11/2024', 494, 419, 498, 8, 160, 338);
INSERT INTO \`tableName\` VALUES ('4/11/2024', 542, 480, 430, 6, 120, 310);
INSERT INTO \`tableName\` VALUES ('5/11/2024', 570, 489, 481, 9, 180, 301);
INSERT INTO \`tableName\` VALUES ('6/11/2024', 423, 351, 371, 7, 140, 231);
INSERT INTO \`tableName\` VALUES ('7/11/2024', 516, 449, 609, 12, 240, 369);
INSERT INTO \`tableName\` VALUES ('8/11/2024', 621, 538, 516, 11, 220, 296);
INSERT INTO \`tableName\` VALUES ('9/11/2024', 581, 500, 517, 13, 260, 257);
INSERT INTO \`tableName\` VALUES ('10/11/2024', 573, 495, 464, 6, 120, 344);
INSERT INTO \`tableName\` VALUES ('11/11/2024', 588, 505, 449, 11, 220, 229);
INSERT INTO \`tableName\` VALUES ('12/11/2024', 567, 494, 466, 8, 160, 306);
INSERT INTO \`tableName\` VALUES ('13/11/2024', 578, 495, 546, 8, 160, 386);
INSERT INTO \`tableName\` VALUES ('14/11/2024', 567, 484, 504, 9, 180, 324);
INSERT INTO \`tableName\` VALUES ('15/11/2024', 572, 488, 489, 6, 120, 369);
INSERT INTO \`tableName\` VALUES ('16/11/2024', 559, 474, 520, 9, 180, 340);
INSERT INTO \`tableName\` VALUES ('17/11/2024', 448, 363, 461, 5, 100, 361);
INSERT INTO \`tableName\` VALUES ('18/11/2024', 534, 466, 475, 10, 200, 275);
INSERT INTO \`tableName\` VALUES ('19/11/2024', 567, 484, 479, 8, 160, 319);
INSERT INTO \`tableName\` VALUES ('20/11/2024', 579, 494, 465, 6, 120, 345);
INSERT INTO \`tableName\` VALUES ('21/11/2024', 551, 461, 478, 6, 120, 358);
INSERT INTO \`tableName\` VALUES ('22/11/2024', 574, 488, 494, 7, 140, 354);
INSERT INTO \`tableName\` VALUES ('23/11/2024', 518, 427, 417, 7, 140, 277);
INSERT INTO \`tableName\` VALUES ('24/11/2024', 507, 434, 387, 4, 80, 307);
INSERT INTO \`tableName\` VALUES ('25/11/2024', 569, 474, 560, 8, 160, 400);
INSERT INTO \`tableName\` VALUES ('26/11/2024', 561, 471, 501, 10, 200, 301);
INSERT INTO \`tableName\` VALUES ('27/11/2024', 539, 447, 524, 9, 180, 344);
INSERT INTO \`tableName\` VALUES ('28/11/2024', 548, 456, 487, 7, 140, 347);
INSERT INTO \`tableName\` VALUES ('29/11/2024', 560, 464, 403, 6, 120, 283);
INSERT INTO \`tableName\` VALUES ('30/11/2024', 520, 427, 520, 6, 120, 400);
INSERT INTO \`tableName\` VALUES ('1/12/2024', 542, 447, 481, 5, 100, 381);
INSERT INTO \`tableName\` VALUES ('2/12/2024', 526, 442, 496, 6, 120, 376);
INSERT INTO \`tableName\` VALUES ('3/12/2024', 539, 442, 462, 5, 100, 362);
INSERT INTO \`tableName\` VALUES ('4/12/2024', 537, 449, 357, 5, 100, 257);
INSERT INTO \`tableName\` VALUES ('5/12/2024', 551, 455, 595, 9, 180, 415);
INSERT INTO \`tableName\` VALUES ('6/12/2024', 484, 403, 437, 4, 80, 357);
INSERT INTO \`tableName\` VALUES ('7/12/2024', 550, 462, 456, 4, 80, 376);
INSERT INTO \`tableName\` VALUES ('8/12/2024', 570, 474, 462, 5, 100, 362);
INSERT INTO \`tableName\` VALUES ('9/12/2024', 531, 450, 429, 6, 120, 309);
INSERT INTO \`tableName\` VALUES ('10/12/2024', 493, 412, 453, 8, 160, 293);
INSERT INTO \`tableName\` VALUES ('11/12/2024', 586, 501, 496, 5, 100, 396);
INSERT INTO \`tableName\` VALUES ('12/12/2024', 554, 461, 441, 5, 100, 341);
INSERT INTO \`tableName\` VALUES ('13/12/2024', 507, 439, 441, 8, 160, 281);
INSERT INTO \`tableName\` VALUES ('14/12/2024', 585, 515, 506, 8, 160, 346);
INSERT INTO \`tableName\` VALUES ('15/12/2024', 493, 414, 501, 7, 140, 361);
INSERT INTO \`tableName\` VALUES ('16/12/2024', 541, 468, 438, 6, 120, 318);
INSERT INTO \`tableName\` VALUES ('17/12/2024', 580, 476, 553, 9, 180, 373);
INSERT INTO \`tableName\` VALUES ('18/12/2024', 581, 498, 496, 7, 140, 356);
INSERT INTO \`tableName\` VALUES ('19/12/2024', 560, 471, 542, 8, 160, 382);
INSERT INTO \`tableName\` VALUES ('20/12/2024', 585, 488, 440, 8, 160, 280);
INSERT INTO \`tableName\` VALUES ('21/12/2024', 575, 475, 502, 6, 120, 382);
INSERT INTO \`tableName\` VALUES ('22/12/2024', 606, 513, 536, 7, 140, 396);
INSERT INTO \`tableName\` VALUES ('23/12/2024', 587, 497, 448, 7, 140, 308);
INSERT INTO \`tableName\` VALUES ('24/12/2024', 542, 449, 526, 4, 80, 446);
INSERT INTO \`tableName\` VALUES ('25/12/2024', 614, 513, 517, 6, 120, 397);
INSERT INTO \`tableName\` VALUES ('26/12/2024', 590, 495, 531, 8, 160, 371);
INSERT INTO \`tableName\` VALUES ('27/12/2024', 621, 517, 542, 5, 100, 442);
INSERT INTO \`tableName\` VALUES ('28/12/2024', 611, 524, 541, 7, 140, 401);
INSERT INTO \`tableName\` VALUES ('29/12/2024', 605, 511, 528, 7, 140, 388);
INSERT INTO \`tableName\` VALUES ('30/12/2024', 598, 509, 525, 7, 140, 385);
INSERT INTO \`tableName\` VALUES ('31/12/2024', 600, 506, 535, 4, 80, 455);
INSERT INTO \`tableName\` VALUES ('1/1/2025', 601, 504, 493, 3, 60, 433);
INSERT INTO \`tableName\` VALUES ('2/1/2025', 600, 491, 528, 3, 60, 468);
INSERT INTO \`tableName\` VALUES ('3/1/2025', 577, 494, 450, 4, 80, 370);
INSERT INTO \`tableName\` VALUES ('4/1/2025', 587, 486, 507, 4, 80, 427);
INSERT INTO \`tableName\` VALUES ('5/1/2025', 532, 445, 473, 4, 80, 393);
INSERT INTO \`tableName\` VALUES ('6/1/2025', 572, 472, 445, 4, 80, 365);
INSERT INTO \`tableName\` VALUES ('7/1/2025', 610, 506, 549, 7, 140, 409);
INSERT INTO \`tableName\` VALUES ('8/1/2025', 526, 454, 511, 5, 100, 411);
INSERT INTO \`tableName\` VALUES ('9/1/2025', 589, 494, 514, 6, 120, 394);
INSERT INTO \`tableName\` VALUES ('10/1/2025', 637, 528, 535, 8, 160, 375);
INSERT INTO \`tableName\` VALUES ('11/1/2025', 552, 459, 436, 3, 60, 376);
INSERT INTO \`tableName\` VALUES ('12/1/2025', 508, 419, 473, 6, 120, 353);
INSERT INTO \`tableName\` VALUES ('13/01/2025', 581, 489, 456, 6, 120, 336);
INSERT INTO \`tableName\` VALUES ('14/01/2025', 594, 502, 513, 8, 160, 353);
INSERT INTO \`tableName\` VALUES ('15/01/2025', 593, 504, 494, 8, 160, 334);
INSERT INTO \`tableName\` VALUES ('16/01/2025', 521, 438, 509, 10, 200, 309);
INSERT INTO \`tableName\` VALUES ('17/01/2025', 595, 518, 502, 7, 140, 362);
INSERT INTO \`tableName\` VALUES ('18/01/2025', 608, 526, 537, 8, 160, 377);
INSERT INTO \`tableName\` VALUES ('19/01/2025', 605, 523, 560, 8, 160, 400);
INSERT INTO \`tableName\` VALUES ('20/01/2025', 595, 503, 517, 8, 160, 357);
INSERT INTO \`tableName\` VALUES ('21/01/2025', 602, 517, 552, 8, 160, 392);
INSERT INTO \`tableName\` VALUES ('22/01/2025', 576, 498, 482, 6, 120, 362);
INSERT INTO \`tableName\` VALUES ('23/01/2025', 599, 526, 477, 6, 120, 357);
INSERT INTO \`tableName\` VALUES ('24/01/2025', 606, 499, 504, 7, 140, 364);
INSERT INTO \`tableName\` VALUES ('25/01/2025', 601, 523, 543, 8, 160, 383);
INSERT INTO \`tableName\` VALUES ('26/01/2025', 605, 516, 509, 8, 160, 349);
INSERT INTO \`tableName\` VALUES ('27/01/2025', 601, 515, 519, 8, 160, 359);
INSERT INTO \`tableName\` VALUES ('28/01/2025', 607, 519, 582, 11, 220, 362);
INSERT INTO \`tableName\` VALUES ('29/01/2025', 615, 529, 521, 9, 180, 341);
INSERT INTO \`tableName\` VALUES ('30/01/2025', 598, 510, 519, 9, 180, 339);
INSERT INTO \`tableName\` VALUES ('31/01/2025', 619, 526, 513, 7, 140, 373);
INSERT INTO \`tableName\` VALUES ('1/2/2025', 527, 456, 511, 8, 160, 351);
INSERT INTO \`tableName\` VALUES ('2/2/2025', 505, 423, 511, 9, 180, 331);
INSERT INTO \`tableName\` VALUES ('3/2/2025', 584, 489, 496, 8, 160, 336);
INSERT INTO \`tableName\` VALUES ('4/2/2025', 578, 484, 545, 9, 180, 365);
INSERT INTO \`tableName\` VALUES ('5/2/2025', 582, 482, 527, 6, 120, 407);
INSERT INTO \`tableName\` VALUES ('6/2/2025', 588, 493, 482, 8, 160, 322);
INSERT INTO \`tableName\` VALUES ('7/2/2025', 576, 482, 485, 6, 120, 365);
INSERT INTO \`tableName\` VALUES ('8/2/2025', 582, 478, 531, 4, 80, 451);
INSERT INTO \`tableName\` VALUES ('9/2/2025', 586, 489, 521, 9, 180, 341);
INSERT INTO \`tableName\` VALUES ('10/2/2025', 594, 495, 514, 6, 120, 394);
INSERT INTO \`tableName\` VALUES ('11/2/2025', 589, 501, 546, 7, 140, 406);
INSERT INTO \`tableName\` VALUES ('12/2/2025', 614, 527, 528, 5, 100, 428);
INSERT INTO \`tableName\` VALUES ('13/02/2025', 620, 525, 503, 4, 80, 423);
INSERT INTO \`tableName\` VALUES ('14/02/2025', 614, 527, 554, 4, 80, 474);
INSERT INTO \`tableName\` VALUES ('15/02/2025', 627, 533, 538, 4, 80, 458);
INSERT INTO \`tableName\` VALUES ('16/02/2025', 630, 539, 561, 5, 100, 461);
INSERT INTO \`tableName\` VALUES ('17/02/2025', 628, 539, 544, 5, 100, 444);
INSERT INTO \`tableName\` VALUES ('18/02/2025', 609, 520, 517, 5, 100, 417);
INSERT INTO \`tableName\` VALUES ('19/02/2025', 582, 489, 539, 4, 80, 459);
INSERT INTO \`tableName\` VALUES ('20/02/2025', 553, 459, 482, 2, 40, 442);
INSERT INTO \`tableName\` VALUES ('21/02/2025', 518, 419, 478, 1, 20, 458);
INSERT INTO \`tableName\` VALUES ('24/02/2025', 437, 361, 491, 0, 0, 491);
INSERT INTO \`tableName\` VALUES ('25/02/2025', 247, 159, 334, 0, 0, 334);
INSERT INTO \`tableName\` VALUES ('26/02/2025', 272, 226, 342, 0, 0, 342);
INSERT INTO \`tableName\` VALUES ('27/02/2025', 595, 512, 502, 0, 0, 502);
INSERT INTO \`tableName\` VALUES ('28/02/2025', 571, 468, 498, 2, 40, 458);
INSERT INTO \`tableName\` VALUES ('1/3/2025', 583, 476, 487, 0, 0, 487);
INSERT INTO \`tableName\` VALUES ('2/3/2025', 592, 514, 493, 1, 20, 473);
INSERT INTO \`tableName\` VALUES ('3/3/2025', 598, 517, 497, 1, 20, 477);
INSERT INTO \`tableName\` VALUES ('4/3/2025', 600, 516, 561, 5, 100, 461);
INSERT INTO \`tableName\` VALUES ('5/3/2025', 608, 521, 503, 3, 60, 443);
INSERT INTO \`tableName\` VALUES ('6/3/2025', 607, 530, 544, 6, 120, 424);
INSERT INTO \`tableName\` VALUES ('7/3/2025', 621, 532, 552, 5, 100, 452);
INSERT INTO \`tableName\` VALUES ('8/3/2025', 617, 531, 570, 6, 120, 450);
INSERT INTO \`tableName\` VALUES ('9/3/2025', 607, 521, 468, 4, 80, 388);
INSERT INTO \`tableName\` VALUES ('10/3/2025', 610, 524, 600, 6, 120, 480);
INSERT INTO \`tableName\` VALUES ('11/3/2025', 607, 511, 536, 3, 60, 476);
INSERT INTO \`tableName\` VALUES ('12/3/2025', 601, 509, 511, 6, 120, 391);
INSERT INTO \`tableName\` VALUES ('13/03/2025', 606, 508, 532, 3, 60, 472);
INSERT INTO \`tableName\` VALUES ('14/03/2025', 609, 507, 519, 6, 120, 399);
INSERT INTO \`tableName\` VALUES ('15/03/2025', 602, 504, 534, 2, 40, 494);
INSERT INTO \`tableName\` VALUES ('16/03/2025', 591, 494, 514, 4, 80, 434);
INSERT INTO \`tableName\` VALUES ('17/03/2025', 591, 500, 522, 4, 80, 442);
INSERT INTO \`tableName\` VALUES ('18/03/2025', 578, 480, 469, 5, 100, 369);
INSERT INTO \`tableName\` VALUES ('19/03/2025', 565, 467, 526, 3, 60, 466);
INSERT INTO \`tableName\` VALUES ('20/03/2025', 610, 511, 504, 4, 80, 424);
INSERT INTO \`tableName\` VALUES ('21/03/2025', 619, 519, 505, 4, 80, 425);
INSERT INTO \`tableName\` VALUES ('22/03/2025', 616, 523, 535, 5, 100, 435);
INSERT INTO \`tableName\` VALUES ('23/03/2025', 627, 541, 586, 6, 120, 466);
INSERT INTO \`tableName\` VALUES ('24/03/2025', 630, 540, 542, 6, 120, 422);
INSERT INTO \`tableName\` VALUES ('25/03/2025', 613, 522, 588, 5, 100, 488);
INSERT INTO \`tableName\` VALUES ('26/03/2025', 631, 541, 513, 8, 160, 353);
INSERT INTO \`tableName\` VALUES ('27/03/2025', 627, 538, 653, 7, 140, 513);
INSERT INTO \`tableName\` VALUES ('28/03/2025', 631, 546, 538, 3, 60, 478);
INSERT INTO \`tableName\` VALUES ('29/03/2025', 623, 534, 639, 4, 80, 559);
INSERT INTO \`tableName\` VALUES ('30/03/2025', 640, 558, 531, 3, 60, 471);
INSERT INTO \`tableName\` VALUES ('31/03/2025', 640, 558, 531, 3, 60, 471);
INSERT INTO \`tableName\` VALUES ('1/4/2025', 639, 551, 585, 5, 100, 485);
INSERT INTO \`tableName\` VALUES ('2/4/2025', 650, 560, 595, 6, 120, 475);
INSERT INTO \`tableName\` VALUES ('3/4/2025', 634, 556, 573, 5, 100, 473);
INSERT INTO \`tableName\` VALUES ('4/4/2025', 656, 573, 609, 4, 80, 529);
INSERT INTO \`tableName\` VALUES ('5/4/2025', 648, 569, 595, 5, 100, 495);
INSERT INTO \`tableName\` VALUES ('6/4/2025', 658, 579, 559, 6, 120, 439);
INSERT INTO \`tableName\` VALUES ('7/4/2025', 653, 574, 550, 7, 140, 410);
INSERT INTO \`tableName\` VALUES ('8/4/2025', 648, 562, 641, 8, 160, 481);
INSERT INTO \`tableName\` VALUES ('9/4/2025', 656, 568, 578, 5, 100, 478);
INSERT INTO \`tableName\` VALUES ('10/4/2025', 654, 558, 617, 6, 120, 497);
INSERT INTO \`tableName\` VALUES ('11/4/2025', 671, 582, 576, 6, 120, 456);
INSERT INTO \`tableName\` VALUES ('12/4/2025', 660, 576, 620, 8, 160, 460);
INSERT INTO \`tableName\` VALUES ('13/04/2025', 676, 595, 617, 5, 100, 517);
INSERT INTO \`tableName\` VALUES ('14/04/2025', 673, 592, 601, 8, 160, 441);
INSERT INTO \`tableName\` VALUES ('15/04/2025', 641, 557, 561, 7, 140, 421);
INSERT INTO \`tableName\` VALUES ('16/04/2025', 674, 590, 643, 8, 160, 483);
INSERT INTO \`tableName\` VALUES ('17/04/2025', 665, 581, 564, 6, 120, 444);
INSERT INTO \`tableName\` VALUES ('18/04/2025', 660, 577, 589, 7, 140, 449);
INSERT INTO \`tableName\` VALUES ('19/04/2025', 660, 577, 589, 7, 140, 449);
INSERT INTO \`tableName\` VALUES ('19/04/2025', 647, 563, 606, 8, 160, 446);
INSERT INTO \`tableName\` VALUES ('20/04/2025', 647, 553, 654, 7, 140, 514);
INSERT INTO \`tableName\` VALUES ('21/04/2025', 635, 524, 524, 6, 120, 404);
INSERT INTO \`tableName\` VALUES ('22/04/2025', 647, 565, 585, 3, 60, 525);
INSERT INTO \`tableName\` VALUES ('23/04/2025', 688, 578, 589, 5, 100, 489);
INSERT INTO \`tableName\` VALUES ('24/04/2025', 695, 594, 606, 6, 120, 486);
INSERT INTO \`tableName\` VALUES ('25/04/2025', 712, 609, 598, 6, 120, 478);
INSERT INTO \`tableName\` VALUES ('26/04/2025', 706, 584, 638, 6, 120, 518);
INSERT INTO \`tableName\` VALUES ('27/04/2025', 714, 603, 580, 5, 100, 480);
INSERT INTO \`tableName\` VALUES ('28/04/2025', 716, 607, 573, 5, 100, 473);
INSERT INTO \`tableName\` VALUES ('29/04/2025', 710, 602, 624, 9, 180, 444);
INSERT INTO \`tableName\` VALUES ('30/04/2025', 710, 646, 642, 9, 180, 462);
INSERT INTO \`tableName\` VALUES ('1/5/2025', 717, 631, 631, 9, 180, 451);
INSERT INTO \`tableName\` VALUES ('2/5/2025', 703, 626, 691, 11, 220, 471);
INSERT INTO \`tableName\` VALUES ('3/5/2025', 681, 608, 676, 9, 180, 496);
INSERT INTO \`tableName\` VALUES ('4/5/2025', 709, 635, 632, 8, 160, 472);
INSERT INTO \`tableName\` VALUES ('5/5/2025', 672, 593, 545, 9, 180, 365);
INSERT INTO \`tableName\` VALUES ('6/5/2025', 657, 569, 594, 11, 220, 374);
INSERT INTO \`tableName\` VALUES ('7/5/2025', 700, 627, 645, 10, 200, 445);
INSERT INTO \`tableName\` VALUES ('8/5/2025', 666, 593, 591, 12, 240, 351);
INSERT INTO \`tableName\` VALUES ('9/5/2025', 667, 592, 655, 10, 200, 455);
INSERT INTO \`tableName\` VALUES ('10/5/2025', 705, 630, 663, 10, 200, 463);
INSERT INTO \`tableName\` VALUES ('11/5/2025', 725, 646, 624, 8, 160, 464);
INSERT INTO \`tableName\` VALUES ('12/5/2025', 623, 645, 669, 9, 180, 489);
INSERT INTO \`tableName\` VALUES ('13/05/2025', 674, 592, 646, 9, 180, 466);
INSERT INTO \`tableName\` VALUES ('14/05/2025', 720, 647, 687, 11, 220, 467);
INSERT INTO \`tableName\` VALUES ('15/05/2025', 708, 626, 632, 10, 200, 432);
INSERT INTO \`tableName\` VALUES ('16/05/2025', 725, 646, 659, 9, 180, 479);
INSERT INTO \`tableName\` VALUES ('17/05/2025', 720, 642, 690, 8, 160, 530);
INSERT INTO \`tableName\` VALUES ('18/05/2025', 722, 585, 657, 10, 200, 457);
INSERT INTO \`tableName\` VALUES ('19/05/2025', 722, 579, 603, 10, 200, 403);
INSERT INTO \`tableName\` VALUES ('20/05/2025', 722, 605, 641, 8, 160, 481);
INSERT INTO \`tableName\` VALUES ('21/05/2025', 722, 620, 644, 8, 160, 484);
INSERT INTO \`tableName\` VALUES ('22/05/2025', 728, 589, 606, 7, 140, 466);
INSERT INTO \`tableName\` VALUES ('23/05/2025', 725, 581, 601, 5, 100, 501);
INSERT INTO \`tableName\` VALUES ('24/05/2025', 721, 584, 576, 4, 80, 496);
INSERT INTO \`tableName\` VALUES ('25/05/2025', 749, 653, 640, 4, 80, 560);
INSERT INTO \`tableName\` VALUES ('26/05/2025', 748, 606, 591, 5, 100, 491);
INSERT INTO \`tableName\` VALUES ('27/05/2025', 750, 613, 613, 7, 140, 473);
INSERT INTO \`tableName\` VALUES ('28/05/2025', 745, 602, 602, 8, 160, 442);
INSERT INTO \`tableName\` VALUES ('29/05/2025', 749, 604, 638, 8, 160, 478);
INSERT INTO \`tableName\` VALUES ('30/05/2025', 750, 609, 563, 7, 140, 423);
INSERT INTO \`tableName\` VALUES ('31/05/2025', 746, 607, 567, 8, 160, 407);
INSERT INTO \`tableName\` VALUES ('1/6/2025', 701, 610, 576, 10, 200, 376);
INSERT INTO \`tableName\` VALUES ('2/6/2025', 650, 524, 544, 11, 220, 324);
INSERT INTO \`tableName\` VALUES ('3/6/2025', 646, 560, 598, 11, 220, 378);
INSERT INTO \`tableName\` VALUES ('4/6/2025', 626, 564, 603, 11, 220, 383);
INSERT INTO \`tableName\` VALUES ('5/6/2025', 662, 591, 595, 12, 240, 355);
INSERT INTO \`tableName\` VALUES ('6/6/2025', 626, 603, 648, 10, 200, 448);
INSERT INTO \`tableName\` VALUES ('7/6/2025', 639, 573, 593, 9, 180, 413);
INSERT INTO \`tableName\` VALUES ('8/6/2025', 658, 585, 583, 11, 220, 363);
INSERT INTO \`tableName\` VALUES ('9/6/2025', 628, 564, 596, 11, 220, 376);
INSERT INTO \`tableName\` VALUES ('10/6/2025', 569, 508, 548, 10, 200, 348);
INSERT INTO \`tableName\` VALUES ('11/6/2025', 617, 549, 592, 11, 220, 372);
INSERT INTO \`tableName\` VALUES ('12/6/2025', 588, 520, 590, 11, 220, 370);
INSERT INTO \`tableName\` VALUES ('13/06/2025', 534, 485, 497, 11, 220, 277);
INSERT INTO \`tableName\` VALUES ('14/06/2025', 552, 497, 419, 10, 200, 219);
INSERT INTO \`tableName\` VALUES ('15/06/2025', 519, 454, 430, 11, 220, 210);
INSERT INTO \`tableName\` VALUES ('16/06/2025', 421, 380, 432, 8, 160, 272);
INSERT INTO \`tableName\` VALUES ('17/06/2025', 551, 493, 530, 14, 280, 250);
INSERT INTO \`tableName\` VALUES ('18/06/2025', 577, 514, 559, 14, 280, 279);
INSERT INTO \`tableName\` VALUES ('19/06/2025', 578, 512, 491, 11, 220, 271);
INSERT INTO \`tableName\` VALUES ('20/06/2025', 576, 519, 530, 12, 240, 290);
INSERT INTO \`tableName\` VALUES ('21/06/2025', 563, 492, 541, 12, 240, 301);
INSERT INTO \`tableName\` VALUES ('22/06/2025', 599, 534, 564, 13, 260, 304);
INSERT INTO \`tableName\` VALUES ('23/06/2025', 585, 524, 507, 12, 240, 267);
INSERT INTO \`tableName\` VALUES ('24/06/2025', 532, 469, 493, 12, 240, 253);
INSERT INTO \`tableName\` VALUES ('25/06/2025', 562, 497, 535, 13, 260, 275);
INSERT INTO \`tableName\` VALUES ('26/06/2025', 588, 526, 536, 12, 240, 296);
INSERT INTO \`tableName\` VALUES ('27/06/2025', 578, 513, 530, 12, 240, 290);
INSERT INTO \`tableName\` VALUES ('28/06/2025', 597, 529, 579, 13, 260, 319);
INSERT INTO \`tableName\` VALUES ('29/06/2025', 640, 568, 573, 13, 260, 313);
INSERT INTO \`tableName\` VALUES ('30/06/2025', 612, 546, 578, 13, 260, 318);
INSERT INTO \`tableName\` VALUES ('1/7/2025', 663, 588, 557, 13, 260, 297);
INSERT INTO \`tableName\` VALUES ('2/7/2025', 594, 528, 544, 13, 260, 284);
INSERT INTO \`tableName\` VALUES ('4/7/2025', 646, 576, 621, 12, 240, 381);
INSERT INTO \`tableName\` VALUES ('5/7/2025', 737, 658, 637, 15, 300, 337);
INSERT INTO \`tableName\` VALUES ('6/7/2025', 605, 530, 520, 9, 180, 340);
INSERT INTO \`tableName\` VALUES ('7/7/2025', 566, 520, 590, 13, 260, 330);
INSERT INTO \`tableName\` VALUES ('8/7/2025', 733, 651, 615, 12, 240, 375);
INSERT INTO \`tableName\` VALUES ('9/7/2025', 670, 593, 613, 12, 240, 373);
INSERT INTO \`tableName\` VALUES ('10/7/2025', 661, 586, 611, 13, 260, 351);
INSERT INTO \`tableName\` VALUES ('11/7/2025', 599, 540, 592, 14, 280, 312);
INSERT INTO \`tableName\` VALUES ('12/7/2025', 709, 617, 629, 12, 240, 389);
INSERT INTO \`tableName\` VALUES ('13/07/2025', 657, 584, 617, 13, 260, 357);
INSERT INTO \`tableName\` VALUES ('14/07/2025', 489, 442, 498, 8, 160, 338);
INSERT INTO \`tableName\` VALUES ('15/07/2025', 646, 566, 579, 13, 260, 319);
INSERT INTO \`tableName\` VALUES ('16/07/2025', 639, 570, 578, 11, 220, 358);
INSERT INTO \`tableName\` VALUES ('17/07/2025', 618, 547, 572, 12, 240, 332);
INSERT INTO \`tableName\` VALUES ('18/07/2025', 653, 578, 625, 12, 240, 385);
INSERT INTO \`tableName\` VALUES ('19/07/2025', 641, 570, 576, 11, 220, 356);
INSERT INTO \`tableName\` VALUES ('20/07/2025', 631, 557, 587, 11, 220, 367);
INSERT INTO \`tableName\` VALUES ('21/07/2025', 738, 660, 596, 12, 240, 356);
INSERT INTO \`tableName\` VALUES ('22/07/2025', 611, 545, 593, 11, 220, 373);
INSERT INTO \`tableName\` VALUES ('23/07/2025', 654, 573, 586, 13, 260, 326);
INSERT INTO \`tableName\` VALUES ('24/07/2025', 619, 549, 603, 11, 220, 383);
INSERT INTO \`tableName\` VALUES ('25/07/2025', 693, 625, 637, 13, 260, 377);
INSERT INTO \`tableName\` VALUES ('26/07/2025', 688, 6, 693, 13, 260, 433);
INSERT INTO \`tableName\` VALUES ('27/07/2025', 722, 639, 634, 14, 280, 354);
INSERT INTO \`tableName\` VALUES ('28/07/2025', 739, 656, 657, 11, 220, 437);
INSERT INTO \`tableName\` VALUES ('29/07/2025', 640, 553, 594, 11, 220, 374);
INSERT INTO \`tableName\` VALUES ('30/07/2025', 741, 658, 616, 12, 240, 376);
INSERT INTO \`tableName\` VALUES ('31/07/2025', 620, 547, 569, 13, 260, 309);
INSERT INTO \`tableName\` VALUES ('1/8/2025', 680, 594, 650, 13, 260, 390);
INSERT INTO \`tableName\` VALUES ('2/8/2025', 714, 629, 618, 12, 240, 378);
INSERT INTO \`tableName\` VALUES ('3/8/2025', 627, 544, 582, 13, 260, 322);
INSERT INTO \`tableName\` VALUES ('4/8/2025', 607, 542, 618, 12, 240, 378);
INSERT INTO \`tableName\` VALUES ('5/8/2025', 718, 629, 634, 12, 240, 394);
INSERT INTO \`tableName\` VALUES ('6/8/2025', 729, 646, 655, 12, 240, 415);
INSERT INTO \`tableName\` VALUES ('7/8/2025', 704, 617, 688, 14, 280, 408);
INSERT INTO \`tableName\` VALUES ('8/8/2025', 693, 591, 631, 17, 340, 291);
INSERT INTO \`tableName\` VALUES ('9/8/2025', 719, 651, 640, 14, 280, 360);
INSERT INTO \`tableName\` VALUES ('10/8/2025', 722, 629, 650, 17, 340, 310);
INSERT INTO \`tableName\` VALUES ('11/8/2025', 700, 618, 700, 16, 320, 380);
INSERT INTO \`tableName\` VALUES ('12/8/2025', 687, 536, 653, 15, 300, 353);
`;

const TANKER_INCOME_RATE = 4.5; // OMR per tanker
const TSE_SAVINGS_RATE = 1.32; // OMR per m³

const parseAndProcessStpData = (): StpData => {
    const dailyLog: StpDailyLog[] = [];
    const monthlyAggregates: Record<string, { inlet: number; tse: number; tankers: number; income: number; savings: number }> = {};

    const lines = stpRawSqlData.trim().split('\n');
    const seenDates = new Set();

    for (const line of lines) {
        const match = line.match(/VALUES \('([^']*)', \d+, (\d+), (\d+), (\d+)/);
        if (match) {
            const [, dateStr, tse, inlet, tankers] = match.map(m => m.trim());
            
            // Handle inconsistent date formats and remove duplicates
            const normalizedDateStr = dateStr.replace(/\//g, '-');
            if (seenDates.has(normalizedDateStr)) continue;
            seenDates.add(normalizedDateStr);

            const parts = normalizedDateStr.split('-');
            const dateObj = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            const formattedDate = `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`;

            const inletNum = parseInt(inlet, 10);
            const tseNum = parseInt(tse, 10);
            const tankersNum = parseInt(tankers, 10);

            const income = tankersNum * TANKER_INCOME_RATE;
            const savings = tseNum * TSE_SAVINGS_RATE;
            const total = income + savings;
            
            dailyLog.push({
                date: formattedDate,
                inlet: inletNum,
                tse: tseNum,
                tankers: tankersNum,
                income: income.toFixed(2),
                savings: savings.toFixed(2),
                total: total.toFixed(2),
            });
            
             // Aggregate monthly data
            const monthKey = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
            if (!monthlyAggregates[monthKey]) {
                monthlyAggregates[monthKey] = { inlet: 0, tse: 0, tankers: 0, income: 0, savings: 0 };
            }
            monthlyAggregates[monthKey].inlet += inletNum;
            monthlyAggregates[monthKey].tse += tseNum;
            monthlyAggregates[monthKey].tankers += tankersNum;
            monthlyAggregates[monthKey].income += income;
            monthlyAggregates[monthKey].savings += savings;
        }
    }
    
    // Sort daily log by date
    dailyLog.sort((a,b) => {
        const partsA = a.date.split('/');
        const dateA = new Date(parseInt(partsA[2]), parseInt(partsA[1]) - 1, parseInt(partsA[0]));
        const partsB = b.date.split('/');
        const dateB = new Date(parseInt(partsB[2]), parseInt(partsB[1]) - 1, parseInt(partsB[0]));
        return dateA.getTime() - dateB.getTime();
    });

    const sortedMonthKeys = Object.keys(monthlyAggregates).sort();
    
    const monthLabels = sortedMonthKeys.map(key => {
        const [year, month] = key.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('en-US', { month: 'short', year: '2-digit' }).replace(' ', ' ');
    });

    const totals = {
        inlet: dailyLog.reduce((sum, log) => sum + log.inlet, 0),
        tse: dailyLog.reduce((sum, log) => sum + log.tse, 0),
        tankers: dailyLog.reduce((sum, log) => sum + log.tankers, 0),
        income: dailyLog.reduce((sum, log) => sum + parseFloat(log.income), 0),
        savings: dailyLog.reduce((sum, log) => sum + parseFloat(log.savings), 0),
    };

    return {
        stats: [
            { id: 1, title: 'INLET SEWAGE', value: `${totals.inlet.toLocaleString()} m³`, subtitle: 'Total for period' },
            { id: 2, title: 'TSE FOR IRRIGATION', value: `${totals.tse.toLocaleString()} m³`, subtitle: 'Recycled water' },
            { id: 3, title: 'TANKER TRIPS', value: `${totals.tankers.toLocaleString()} trips`, subtitle: 'Total discharges' },
            { id: 4, title: 'GENERATED INCOME', value: `${totals.income.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} OMR`, subtitle: 'From tanker fees' },
            { id: 5, title: 'WATER SAVINGS', value: `${totals.savings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} OMR`, subtitle: 'By using TSE water' },
            { id: 6, title: 'TOTAL IMPACT', value: `${(totals.income + totals.savings).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} OMR`, subtitle: 'Savings + Income' },
        ],
        monthlyWaterVolumes: {
            labels: monthLabels,
            datasets: [
                { label: 'Sewage Input', data: sortedMonthKeys.map(key => Math.round(monthlyAggregates[key].inlet / 1000)), borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.2)', fill: true, tension: 0.3 },
                { label: 'TSE Output', data: sortedMonthKeys.map(key => Math.round(monthlyAggregates[key].tse / 1000)), borderColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.2)', fill: true, tension: 0.3 },
            ]
        },
        monthlyFinancials: {
            labels: monthLabels,
            datasets: [
                { label: 'Income', data: sortedMonthKeys.map(key => Math.round(monthlyAggregates[key].income / 1000)), backgroundColor: '#10b981', stack: 'a' },
                { label: 'Savings', data: sortedMonthKeys.map(key => Math.round(monthlyAggregates[key].savings / 1000)), backgroundColor: '#3b82f6', stack: 'a' },
            ]
        },
        monthlyOperations: {
            labels: monthLabels,
            datasets: [{ label: 'Tanker Trips', data: sortedMonthKeys.map(key => monthlyAggregates[key].tankers), borderColor: '#6b7280', tension: 0.4 }]
        },
        dailyLog: dailyLog.slice(-50).reverse(), // Show last 50 entries in descending order
    };
};

const stpData = parseAndProcessStpData();

// --- HVAC DATA PROCESSING --- //
const hvacRawSqlData = `
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F075\tPressurisations\tB4\tPressurization Unit #4\tN/A\tNo issues reported\tN/A\tN/A\tClosed - Verified\tN/A\tNo findings reported in any PPM.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F001\tYork Chiller\tCIF\tChiller #1 (Sys #1 & #2)\tPPM 1\tWater sensor inlet defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F002\tYork Chiller\tCIF\tChiller #1 (Sys #1 & #2)\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tPPM1 (Qty 1)' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F003\tYork Chiller\tCIF\tChiller #1 (Sys #1 & #2)\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tPPM1 (Qty 1)' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F005\tYork Chiller\tFM\tChiller #1\tPPM 1\tFuse 3A defective\t3\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F006\tYork Chiller\tFM\tChiller #1\tPPM 1\tFuse 20A defective\t6\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F007\tYork Chiller\tFM\tChiller #1\tPPM 1\tWater sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F008\tYork Chiller\tFM\tChiller #1\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F009\tYork Chiller\tFM\tChiller #1\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F010\tYork Chiller\tFM\tChiller #1\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F011\tYork Chiller\tFM\tChiller #1\tPPM 1\tLeak test required\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for test & repair\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F012\tYork Chiller\tFM\tChiller #1\tPPM 1\tSolenoid valve defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F013\tYork Chiller\tFM\tChiller #1\tPPM 1\tPipe insulation required\t1\tLow\tQuote Submitted / Awaiting LPO\tApprove LPO for installation\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F028\tYork Chiller\tB1\tPressurization Unit #3\tPPM 1\tHigh-pressure cut-out defective\t1\tHigh\tClosed - Verified\tN/A\tIdentified in PPM1. Contractor reported ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F030\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tTransformer 24V defective\t1\tCritical\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F031\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tFuse 12A defective\t1\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F032\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tFuse 20A defective\t6\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F033\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F034\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F035\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F036\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tWater sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F037\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tPipe insulation required\t1\tLow\tQuote Submitted / Awaiting LPO\tApprove LPO for installation\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F038\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 1\tLeak test required\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for test & repair\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F040\tYork Chiller\tB1\tChiller #2\tPPM 1\tFuse defective\t1\tMedium\tClosed - Verified\tN/A\tIdentified in PPM1. Not mentioned in subsequent reports implies rectification.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F041\tYork Chiller\tB1\tChiller #2\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tPPM1 (Qty 1)' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F042\tYork Chiller\tB1\tChiller #2\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F046\tPressurisations\tB2\tPressurization Unit #3\tPPM 1\tHigh-pressure cut-out defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F047\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 1\tFuse 12A defective\t1\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F048\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 1\tFuse 20A defective\t6\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F049\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 1\tLeak test required\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for test & repair\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F050\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 1\tCooler insulation required\t1\tLow\tQuote Submitted / Awaiting LPO\tApprove LPO for installation\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F051\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F052\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F053\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F054\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 1\tWater sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F060\tPressurisations\tB2\tPressurization Unit #4\tPPM 1\tHigh-pressure cut-out defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F061\tYork Chiller\tB3\tChiller #1\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F062\tYork Chiller\tB3\tChiller #1\tPPM 1\tOn/off switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F067\tYork Chiller\tB4\tChiller #1\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tPPM1 (Qty 1)' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F068\tYork Chiller\tB4\tChiller #1\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tPPM1 (Qty 1)' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F069\tYork Chiller\tB4\tChiller #1\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F070\tYork Chiller\tB4\tChiller #2\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tPPM1 (Qty 1)' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F071\tYork Chiller\tB4\tChiller #2\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tPPM1 (Qty 1)' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F072\tYork Chiller\tB4\tChiller #2\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F076\tYork Chiller\tB5\tChiller #1\tPPM 1\tFuse 12A defective\t1\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F077\tYork Chiller\tB5\tChiller #1\tPPM 1\tFuse 20A defective\t6\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F078\tYork Chiller\tB5\tChiller #1\tPPM 1\tWater sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F079\tYork Chiller\tB5\tChiller #1\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F080\tYork Chiller\tB5\tChiller #1\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F081\tYork Chiller\tB5\tChiller #1\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F082\tYork Chiller\tB5\tChiller #1\tPPM 1\tLeak test required\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for test & repair\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F083\tYork Chiller\tB5\tChiller #1\tPPM 1\tNew cooler required\t1\tCritical\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F084\tYork Chiller\tB5\tChiller #2\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F085\tYork Chiller\tB5\tChiller #2\tPPM 1\tOn/off switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F088\tPressurisations\tB5\tPressurization Unit #7\tPPM 1\tHigh-pressure cut-out defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F089\tYork Chiller\tB6\tChiller #1\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F090\tYork Chiller\tB6\tChiller #1\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F091\tYork Chiller\tB6\tChiller #1\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F093\tYork Chiller\tB6\tChiller #2\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F094\tYork Chiller\tB6\tChiller #2\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F095\tYork Chiller\tB6\tChiller #2\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F096\tPressurisations\tB6\tPressurization Unit #8\tPPM 1\tSwitch pressure cut-out defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F097\tYork Chiller\tB7\tChiller #1 (Sys #1)\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F098\tYork Chiller\tB7\tChiller #1 (Sys #1)\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F099\tYork Chiller\tB7\tChiller #1 (Sys #1)\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F101\tYork Chiller\tB7\tChiller #2 (Sys #1 & #2)\tPPM 1\tFuse 3A defective\t3\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F102\tYork Chiller\tB7\tChiller #2 (Sys #1 & #2)\tPPM 1\tWater pump bearing replacement\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F103\tYork Chiller\tB7\tChiller #2 (Sys #1 & #2)\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F104\tYork Chiller\tB7\tChiller #2 (Sys #1 & #2)\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F105\tYork Chiller\tB7\tChiller #2 (Sys #1 & #2)\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F106\tYork Chiller\tB7\tChiller #2 (Sys #1 & #2)\tPPM 1\tLeak test required\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for test & repair\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F112\tPressurisations\tB7\tPressurization Unit #2\tPPM 1\tSwitch pressure cut-out defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F113\tPressurisations\tB7\tPressurization Unit #2\tPPM 1\tValve 1' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F114\tPressurisations\tB7\tPressurization Unit #2\tPPM 1\tBearing replacement needed\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F118\t(All)\tB8\t(Misc. Water Chemical Treatment)\tPPM 1\tChemical treatment for water systems\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for service\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F120\tYork Chiller\tB8\tChiller #1 (Sys #1 & #2)\tPPM 1\tFuse defective\t1\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F121\tYork Chiller\tB8\tChiller #1 (Sys #1 & #2)\tPPM 1\tSuction transducer defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F122\tYork Chiller\tB8\tChiller #1 (Sys #1 & #2)\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F123\tYork Chiller\tB8\tChiller #1 (Sys #1 & #2)\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F124\tYork Chiller\tB8\tChiller #1 (Sys #1 & #2)\tPPM 1\tFlow switch defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F125\tYork Chiller\tB8\tChiller #1 (Sys #1 & #2)\tPPM 1\tPump No.1 requires overhauling\t1\tCritical\tQuote Submitted / Awaiting LPO\tApprove LPO for overhaul\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F127\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tSuction transducer defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F128\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tDischarge transducer defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F129\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tFilter drier holder replacement\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F130\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tPlug sensor defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F131\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F132\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tCondenser fan bearing replacement\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1 (Qty 1). ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F133\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tPump No.2 requires overhauling\t1\tCritical\tQuote Submitted / Awaiting LPO\tApprove LPO for overhaul\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F134\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tWater sensor inlet defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F135\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 1\tFuse defective\t2\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1 (Qty 1). ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F137\tPressurisations\tB8\tPressurization Unit #10\tPPM 1\tHigh-pressure cut-out defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F138\tPressurisations\tB8\tPressurization Unit #10\tPPM 1\tPipe connector for pump needed\t1\tMedium\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM1. ' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F014\tYork Chiller\tFM\tChiller #1\tPPM 2\tPump bearing requires replacement\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM2. PPM3 confirms noise.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F015\tYork Chiller\tFM\tChiller #1\tPPM 2\tCheck valve requires replacement\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tIdentified in PPM2. PPM3 confirms pump noise.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F029\tYork Chiller\tB1\tPressurization Unit #3\tPPM 2\tValve 1' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F039\tYork Chiller\tB1\tChiller #1 (Sys #1 & #2)\tPPM 2\tSolenoid valve defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tNewly identified in PPM2.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F043\tYork Chiller\tB1\tChiller #2\tPPM 2\tPlug transducer defective\t2\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tNewly identified in PPM2. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F044\tYork Chiller\tB1\tChiller #2\tPPM 2\tWater temperature sensor inlet defective\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tNewly identified in PPM2. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F045\tYork Chiller\tB1\tChiller #2\tPPM 2\tLeak test required\t1\tHigh\tQuote Submitted / Awaiting LPO\tApprove LPO for test & repair\tNewly identified in PPM2. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F055\tYork Chiller\tB2\tChiller #1 (Sys #1 & #2)\tPPM 2\tNew Cooler required\t1\tCritical\tQuote Submitted / Awaiting LPO\tApprove LPO for replacement\tNewly identified in PPM2.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F016\tYork Chiller\tFM\tChiller #1\tPPM 3\tPower main switch defective\t1\tCritical\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F017\tYork Chiller\tFM\tChiller #1\tPPM 3\tWater pressure gauge defective\t1\tMedium\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F018\tYork Chiller\tFM\tChiller #1\tPPM 3\tCondenser fan motor requires bearing\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F019\tYork Chiller\tFM\tChiller #1\tPPM 3\tPump requires overhauling\t1\tCritical\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F020\tYork Chiller\tFM\tChiller #2\tPPM 3\tPump No.1 requires overhauling\t1\tCritical\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F021\tYork Chiller\tFM\tChiller #2\tPPM 3\tPump No.2 requires overhauling\t1\tCritical\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F022\tYork Chiller\tFM\tChiller #2\tPPM 3\tWater Sensor Inlet Defective\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F023\tYork Chiller\tFM\tChiller #2\tPPM 3\tEXV (Expansion Valve) defective\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F024\tYork Chiller\tFM\tChiller #2\tPPM 3\tCondenser fan motor bearing replacement\t2\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F025\tPressurisations\tFM\tPressurization Unit No.2\tPPM 3\tHigh pressure cut-out replacement\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F026\tPressurisations\tFM\tPressurization Unit No.2\tPPM 3\tSwitch pressure cut-out replacement\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F027\tPressurisations\tFM\tPressurization Unit No.2\tPPM 3\tBearing replacement needed\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F056\tYork Chiller\tB2\tChiller #1 Sys#2\tPPM 3\tPlug Sensor Defective\t2\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F057\tYork Chiller\tB2\tChiller #1 Sys#2\tPPM 3\tPlug Transducer Defective\t2\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F058\tYork Chiller\tB2\tChiller #1 Sys#2\tPPM 3\tFlow Switch Defective\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Not mentioned in PPM4.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F063\tYork Chiller\tB3\tChiller #2\tPPM 3\tFlow Switch Defective\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F064\tYork Chiller\tB3\tChiller #2\tPPM 3\tPlug Sensor Defective\t2\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F065\tYork Chiller\tB3\tChiller #2\tPPM 3\tPlug Transducer Defective\t2\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F066\tYork Chiller\tB3\tChiller #2\tPPM 3\tOn/Off Switch Defective\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F086\tYork Chiller\tB5\tChiller#1 Sys#2\tPPM 3\tLeak test required\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F087\tYork Chiller\tB5\tChiller#2 Sys#2\tPPM 3\tLeak test required\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F092\tYork Chiller\tB6\tChiller #1\tPPM 3\tCondenser fan motor bearing replacement\t4\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F100\tYork Chiller\tB7\tChiller #1 (Sys #1)\tPPM 3\tCondenser fan motor bearing replacement\t2\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F107\tYork Chiller\tB7\tChiller#1 Sys #2\tPPM 3\tCondenser fan contactor defective\t2\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F108\tYork Chiller\tB7\tChiller#1 Sys #2\tPPM 3\tFan motor requires rewinding\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F109\tYork Chiller\tB7\tChiller#1 Sys #2\tPPM 3\tLeak test required\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F110\tYork Chiller\tB7\tChiller#1 Sys #2\tPPM 3\tFuse defective\t3\tMedium\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F111\tYork Chiller\tB7\tChiller#1 Sys #2\tPPM 3\tWater pump bearing change\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F115\tPressurisations\tB7\tPressurization Unit No.9\tPPM 3\tStart control handle set needed\t1\tMedium\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F116\tPressurisations\tB7\tPressurization Unit No.9\tPPM 3\tSwitch pressure cut-out replacement\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3. Persists.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F117\tPressurisations\tB7\tPressurization Unit No.9\tPPM 3\tValve 1' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F119\tYork Chiller\tB8\tChiller #1 (Sys #1 & #2)\tPPM 3\tNo refrigerant gas\t1\tCritical\tOpen - Action Required\tContractor to leak test and quote\tIdentified in PPM3. Root cause of other issues.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F126\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 3\tNo refrigerant gas\t1\tCritical\tOpen - Action Required\tContractor to leak test and quote\tIdentified in PPM3. Root cause of other issues.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F136\tYork Chiller\tB8\tChiller #2 (Sys #1 & #2)\tPPM 3\tFlow switch defective\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM3.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F004\tYork Chiller\tCIF\tChiller #1 (Sys #1 & #2)\tPPM 4\tEducator sensor defective\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified during PPM4 visit.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F059\tYork Chiller\tB2\tChiller #1 Sys#2\tPPM 4\tLeak test required\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM4.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F073\tPressurisations\tB4\tPressurization Unit No.6\tPPM 4\tSwitch pressure cut-out replacement\t1\tHigh\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM4.' );
INSERT INTO TABLE_NAME( ID, MainSystem, Building, Equipment/AssetID, PPMVisitIdentified, Finding/IssueDescription, Qty, Priority, Status, ActionRequired, LatestUpdate/Notes ) VALUES ( 'F074\tPressurisations\tB4\tPressurization Unit No.6\tPPM 4\tPump requires painting\t1\tLow\tOpen - Action Required\tContractor to provide quotation\tNewly identified in PPM4. ' );
`;

const parseAndProcessHvacData = (): HvacData => {
    const log: HvacMaintenanceItem[] = [];
    const records = hvacRawSqlData.matchAll(/VALUES\s*\(([\s\S]*?)\);/g);
    
    for (const match of records) {
        const stringLiterals = [...match[1].matchAll(/'([\s\S]*?)'/g)];
        const combinedString = stringLiterals.map(m => m[1].trim().replace(/\r?\n|\r/g, ' ')).join(' ');

        const parts = combinedString.split('\t').map(p => p.trim());
        
        if (parts.length > 5) {
            log.push({
                id: parts[0] || 'N/A',
                mainSystem: parts[1] || 'N/A',
                building: parts[2] || 'N/A',
                equipment: parts[3] || 'N/A',
                ppmVisit: parts[4] || 'N/A',
                finding: parts[5] || 'N/A',
                qty: parts[6] || 'N/A',
                priority: (parts[7] as HvacFindingPriority) || 'N/A',
                status: (parts[8]) || 'N/A',
                actionRequired: parts[9] || 'N/A',
                notes: parts.slice(10).join(' ') || 'N/A',
            });
        }
    }
    return { log };
};

const hvacData = parseAndProcessHvacData();

// --- ELECTRICITY DATA PROCESSING --- //
const electricityRawSqlData = `
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Beachwell\tD_Building\tR51903\t16908\t46\t19332\t23170\t42241\t15223\t25370\t24383\t37236\t38168\t18422\t40\t27749\t23674\t46800\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'ROP Building\tD_Building\tR53648\t2047\t4442\t3057\t4321\t4185\t3554\t3692\t3581\t2352\t2090\t2246\t1939\t3537\t4503\t4868\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Security Building\tD_Building\tR53649\t3529\t3898\t4255\t4359\t3728\t3676\t3140\t5702\t5131\t5559\t5417\t4504\t5978\t4964\t8519\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Guard House\tD_Building\tR53651\t823\t1489\t1574\t1586\t1325\t1391\t1205\t1225\t814\t798\t936\t879\t1467\t1764\t2249\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 51\tD_Building\tR53657\t735\t3030\t1677\t2046\t2472\t2285\t2165\t1855\t710\t661\t682\t642\t904\t2170\t2235\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 45\tD_Building\tR53665\t709\t2944\t1267\t262\t3212\t1330\t1570\t1252\t841\t670\t556\t608\t1069\t1974\t2840\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 48\tD_Building\tR53666\t725\t1970\t1415\t1895\t1853\t1084\t1127\t1046\t785\t826\t676\t683\t1092\t1851\t1927\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 75\tD_Building\tR53668\t795\t6744\t983\t1438\t1268\t1225\t1125\t1169\t702\t475\t508\t554\t912\t1510\t2005\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 50\tD_Building\tR53672\t577\t1253\t849\t1097\t1059\t1091\t1107\t1102\t789\t765\t785\t707\t1331\t2376\t3556\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 74\tD_Building\tR53675\t718\t2495\t1291\t1895\t1339\t840\t1147\t1303\t766\t639\t566\t463\t1079\t2338\t3153\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 47\tD_Building\tR53690\t918\t2678\t1446\t2173\t2068\t2073\t1651\t1774\t1055\t887\t738\t792\t1545\t1395\t2864\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 52\tD_Building\tR53699\t727\t2882\t2087\t2897\t2786\t2990\t2501\t1986\t1208\t979\t896\t952\t1651\t2676\t3662\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 46\tD_Building\tR53700\t818\t2392\t1620\t2216\t1671\t1718\t1734\t1577\t890\t724\t690\t752\t1292\t1969\t2517\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 44\tD_Building\tR53705\t463\t2416\t2036\t2120\t1645\t1717\t1643\t1377\t764\t647\t657\t650\t1306\t2499\t3598\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 49\tD_Building\tR53715\t947\t2912\t780\t1911\t1714\t1839\t1785\t1608\t1068\t860\t837\t818\t984\t1346\t2986\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 62\tD_Building\tR53717\t858\t2297\t1744\t2425\t2018\t1950\t1768\t1630\t957\t715\t677\t595\t800\t1788\t2886\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Central Park\tD_Building\tR54672\t12208\t21845\t29438\t28186\t21995\t20202\t14900\t9604\t19032\t22819\t19974\t14190\t13846\t18783\t32135\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 53\tD_Building\tR54782\t714\t2699\t1405\t1845\t1494\t1709\t1525\t1764\t968\t693\t732\t760\t1281\t1674\t1411\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 54\tD_Building\tR54793\t717\t2904\t1961\t2449\t3031\t1453\t1261\t1777\t834\t681\t559\t531\t1042\t1616\t2652\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 55\tD_Building\tR54804\t693\t2550\t1735\t2430\t2250\t2100\t1947\t1828\t1035\t677\t616\t719\t1417\t2087\t2703\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 56\tD_Building\tR54815\t938\t3099\t1617\t2384\t2185\t2190\t2055\t1805\t937\t683\t731\t765\t1536\t2052\t2938\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 57\tD_Building\tR54826\t574\t2704\t1816\t2477\t2429\t1935\t2260\t2262\t1332\t990\t846\t795\t1732\t2996\t3064\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 58\tD_Building\tR54836\t568\t2430\t1555\t2233\t1860\t1688\t1469\t1534\t778\t593\t535\t594\t1415\t1613\t2307\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 59\tD_Building\tR54847\t546\t1847\t1514\t2112\t1691\t1792\t1790\t1634\t998\t628\t582\t697\t1138\t1871\t2511\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 60\tD_Building\tR54858\t628\t1935\t1327\t1762\t1269\t1360\t1260\t1275\t705\t674\t612\t679\t1069\t1554\t2330\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'D Building 61\tD_Building\tR54869\t532\t2022\t1662\t2255\t1929\t1958\t1704\t1734\t977\t767\t800\t719\t1394\t2168\t2606\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Village Square\tD_Building\tR56628\t2550\t2550\t2550\t2550\t8117\t9087\t4038\t6229\t3695\t3304\t3335\t3383\t4415\t5963\t9112\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Actuator DB 02\tDB\tR51900\t285\t335\t275\t220\t210\t219\t165\t232\t161\t33\t134\t139\t211\t234.5\t363\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Actuator DB 04\tDB\tR51901\t159\t275\t258\t210\t184\t201\t144\t172\t173\t186\t161\t227\t253\t163\t255\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Actuator DB 03\tDB\tR51904\t188\t226\t197\t203\t212\t203\t196\t220\t199\t56\t203\t196\t211.6\t188.4\t217\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Actuator DB 05\tDB\tR51907\t15\t18\t15\t16\t16\t16\t15\t18\t16\t4\t18\t14\t17.7\t15.3\t21\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Actuator DB 06\tDB\tR51909\t39\t50\t42\t48\t46\t129\t43\t49\t44\t47\t45\t38\t46.9\t44.1\t56\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Actuator DB 01 (Z8)\tDB\tR53196\t39\t49\t43\t43\t45\t43\t36\t34\t29\t7\t28\t24\t27.1\t22.5\t31\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Zone-3 landscape light 21\tFP-Landscape Lights Z3\tR54873\t42\t67\t37\t42\t40\t33\t28\t40\t48\t13\t57\t47\t55\t41\t74\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Irrigation Tank 03\tIRR\tR52323\t894\t866\t1869\t1543\t1793\t524\t266\t269\t417\t840\t1009\t845\t1205\t1305\t2266\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Irrigation Tank 01\tIRR\tR52324 (R52326)\t1543\t2673\t2763\t2623\t1467\t1290\t1244\t1432\t1268\t1689\t2214\t1718\t1663\t1980\t2380\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Irrigation Tank 02\tIRR\tR52331\t1272\t2839\t3118\t2330\t2458\t1875\t893\t974\t1026\t983\t1124\t1110\t1830\t2282\t3260\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Irrigation Tank 04\tIRR\tR53195\t880\t827\t555\t443\t336\t195\t183\t212\t213\t40\t233\t235\t447.2\t1648\t1394\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Lifting Station 04\tLS\tR52324\t644\t865\t791\t768\t747\t723\t628\t686\t631\t701\t638\t572\t750.22\t659.78\t698\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Lifting Station 02\tLS\tR52328\t44\t0\t0\t0\t153\t125\t0\t0\t0\t0\t0\t0\t0\t0\t0\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Lifting Station 05\tLS\tR52332\t2056\t2577\t2361\t3016\t3684\t5866\t1715\t2413\t2643\t2873\t3665\t3069\t4201.4\t5868.6\t8461\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Lifting Station 03\tLS\tR52333\t198\t269\t122\t203\t208\t257\t196\t91\t185\t28\t40\t58\t83\t70\t85\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Pumping Station 05\tPS\tR52325\t1774\t2216\t2011\t2059\t2229\t5217\t2483\t2599\t1952\t2069\t2521\t2601\t3317\t3582\t3254\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Pumping Station 04\tPS\tR52327\t830\t818\t720\t731\t857\t1176\t445\t919\t921\t245\t870\t646\t984.9\t880.6\t1049.7\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Pumping Station 03\tPS\tR52329\t31\t47\t25\t3\t0\t0\t33\t0\t179\t33\t137\t131\t276.6\t397\t278\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Pumping Station 01\tPS\tR52330\t1608\t1940\t1783\t1874\t1662\t3822\t6876\t1629\t1640\t1903\t2095\t3032\t3940\t2982\t3420\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Bank muscat\tRetail\t\t0\t0\t0\t3\t71\t-2\t1407\t148\t72\t59\t98\t88\t163\t175\t222\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'CIF kitchen\tRetail\t\t0\t0\t0\t17895\t16532\t18955\t15071\t16742\t15554\t16788\t16154\t14971\t18446\t17185\t23503\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Street Light FP 05\tStreet Light\tR51902\t532\t587\t575\t770\t1341\t1895\t1844\t1477\t1121\t449\t2070\t1870\t3233\t4796\t5406\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Street Light FP 03\tStreet Light\tR51905\t1399\t1608\t1365\t1380\t1457\t1499\t1561\t2060\t1966\t1868\t1974\t1562\t1847\t1637\t1984\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Street Light FP 02\tStreet Light\tR51906\t1705\t2076\t1758\t1738\t1940\t2006\t1944\t2361\t2258\t633\t2298\t1812\t2153\t1900\t2435\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Street Light FP 04\tStreet Light\tR51908\t861\t1045\t1051\t2268\t2478\t2513\t2341\t2299\t1389\t325\t1406\t1401\t2412.9\t3047.1\t4099\t' );
INSERT INTO TABLE_NAME( Name, Type, MeterAccountNo., Apr-24, May-24, Jun-24, Jul-24, Aug-24, Sep-24, Oct-24, Nov-24, Dec-24, Jan-25, Feb-25, Mar-25, Apr-25, May-25, Jun-25, Jul-25 ) VALUES ( 'Street Light FP 01 (Z8)\tStreet Light\tR53197\t2773\t3276\t3268\t3040\t3203\t3225\t3064\t3593\t3147\t787\t3228\t2663\t3230\t3089\t3804\t' );
`;

const parseAndProcessElectricityData = (): ElectricityData => {
    const records: ElectricityRecord[] = [];
    const months = [ 'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25', 'Jul-25'];

    const lines = electricityRawSqlData.trim().split('\n');
    for (const line of lines) {
        const match = line.match(/'(.*)'/);
        if (!match || !match[1]) continue;
        
        const parts = match[1].split('\t').map(p => p.trim());
        if (parts.length < 3) continue;

        const monthlyConsumption: Record<string, number> = {};
        let totalConsumption = 0;
        
        months.forEach((month, index) => {
            const consumptionVal = parseFloat(parts[index + 3]) || 0;
            const consumption = Math.max(0, consumptionVal); 
            monthlyConsumption[month] = consumption;
            totalConsumption += consumption;
        });

        records.push({
            name: parts[0],
            type: parts[1],
            meterAccountNo: parts[2],
            monthlyConsumption,
            totalConsumption,
        });
    }
    
    const totalConsumptionAllTime = records.reduce((sum, r) => sum + r.totalConsumption, 0);
    const ELECTRICITY_COST_RATE = 0.025;
    const totalCost = totalConsumptionAllTime * ELECTRICITY_COST_RATE;
    const highestConsumer = [...records].sort((a, b) => b.totalConsumption - a.totalConsumption)[0] || { name: 'N/A', totalConsumption: 0};

    const stats = [
        { id: 1, title: 'TOTAL CONSUMPTION', value: `${(totalConsumptionAllTime / 1000).toFixed(1)} MWh`, subtitle: `Over ${months.length} months`, icon: <Icons.totalConsumption className="w-6 h-6 text-green-900" />, iconBgColor: 'bg-green-100' },
        { id: 2, title: 'TOTAL COST', value: `OMR ${totalCost.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`, subtitle: 'Based on total consumption', icon: <Icons.totalCost className="w-6 h-6 text-yellow-900" />, iconBgColor: 'bg-yellow-100' },
        { id: 3, title: 'TOTAL METERS', value: `${records.length} meters`, subtitle: 'All meter types', icon: <Icons.totalMeters className="w-6 h-6 text-blue-900" />, iconBgColor: 'bg-blue-100' },
        { id: 4, title: 'HIGHEST CONSUMER', value: highestConsumer.name, subtitle: `${(highestConsumer.totalConsumption).toLocaleString()} kWh`, icon: <Icons.highestConsumer className="w-6 h-6 text-red-900" />, iconBgColor: 'bg-red-100' },
    ];
    
    const monthlyTotals = months.map(month => {
        return records.reduce((sum, record) => sum + (record.monthlyConsumption[month] || 0), 0);
    });
    const consumptionTrend = {
        labels: months.map(m => m.replace('-', ' ')),
        datasets: [{ label: 'Total Consumption (k kWh)', data: monthlyTotals.map(t => Math.round(t/1000)), borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.1)', fill: true, tension: 0.4 }]
    };

    const consumptionByTypeData: Record<string, number> = {};
    records.forEach(record => {
        const type = record.type || 'Unknown';
        if (!consumptionByTypeData[type]) consumptionByTypeData[type] = 0;
        consumptionByTypeData[type] += record.totalConsumption;
    });

    const sortedTypes = Object.entries(consumptionByTypeData).sort((a,b) => b[1] - a[1]);
    const typeLabels = sortedTypes.map(entry => entry[0]);
    const typeData = sortedTypes.map(entry => Math.round(entry[1]));
    
    const consumptionByType: BarChartData = {
        labels: typeLabels,
        datasets: [{ label: 'Total Consumption (kWh)', data: typeData, backgroundColor: '#4E4456' }]
    };
    
    return { stats, consumptionTrend, consumptionByType, records, months };
};

const electricityData = parseAndProcessElectricityData();

// --- WATER DATA PROCESSING --- //
const waterData = {
    months: [],
    monthlyCalculations: {},
    zoneMonthlyCalculations: {},
    consumptionByType: {},
    allMetersFlat: [],
};


// --- MOCK DATA --- //
export const mockData: MockData = {
    dashboard: {
        stats: [
            { id: 1, title: "Total Water Consumption", value: "7,520 m³", change: "+5.2%", changeType: "increase" },
            { id: 2, title: "Total Electricity Usage", value: "12,840 kWh", change: "-1.8%", changeType: "decrease" },
            { id: 3, title: "Total HVAC Energy", value: "8,990 kWh", change: "+3.1%", changeType: "increase" },
            { id: 4, title: "Active Fire Alarms", value: "0", change: "Normal", changeType: "neutral" },
        ],
        lineChart: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], datasets: [{ label: 'Overall Utility Cost (OMR)', data: [12000, 15000, 13500, 16000, 18500, 17000, 19000], borderColor: '#4E4456', backgroundColor: 'rgba(78, 68, 86, 0.1)', fill: true, tension: 0.4, }] },
        doughnutChart: { labels: ['Water', 'Electricity', 'HVAC'], datasets: [{ data: [30, 45, 25], backgroundColor: ['#3b82f6', '#f97316', '#10b981'], hoverBackgroundColor: ['#2563eb', '#ea580c', '#059669'], borderColor: '#ffffff', borderWidth: 2, }] },
    },
    water: waterData,
    electricity: electricityData,
    firefighting: {
        stats: [
            { id: 1, title: 'TOTAL EQUIPMENT', value: '8 systems', subtitle: 'Kidde Fire Systems' },
            { id: 2, title: 'OPERATIONAL', value: '62.5%', subtitle: '5 of 8 systems' },
            { id: 3, title: 'CRITICAL PRIORITY', value: '4 systems', subtitle: 'Require immediate attention' },
            { id: 4, title: 'MAINTENANCE DUE', value: '1 systems', subtitle: 'Scheduled maintenance needed' },
        ],
        systemStatus: { labels: ['Operational', 'Needs Attention', 'Expired'], datasets: [{ data: [62.5, 25, 12.5], backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'], hoverBackgroundColor: ['#16a34a', '#d97706', '#dc2626'], borderColor: '#ffffff', borderWidth: 4, }] },
        equipmentByType: { labels: ["Panel", "Detector", "Sprinkler", "Extinguisher", "Exit Sign", "Pump"], datasets: [{ label: 'Count', data: [2, 5, 8, 12, 10, 3], backgroundColor: '#ef4444' }] },
        equipmentList: [
            { id: '1', equipment: 'Main Fire Alarm Control Panel', subtext: 'Notifier NFS2-3030', location: 'FM Building', locationSubtext: 'Zone FM', status: 'Operational', priority: 'Critical', battery: 95, signal: 'Strong', nextMaintenance: '01/03/2025', inspector: 'Bahwan Engineering' },
            { id: '2', equipment: 'Optical Smoke Detector', subtext: 'Edwards SIGA-PS', location: 'B1 Building', locationSubtext: 'Zone 01', status: 'Needs Attention', priority: 'High', battery: 78, signal: 'Weak', nextMaintenance: '15/02/2025', inspector: 'Bahwan Engineering' },
            { id: '3', equipment: 'Sprinkler System Zone 1', subtext: 'Tyco TY-FRB', location: 'B2 Building', locationSubtext: 'Zone 02', status: 'Operational', priority: 'Critical', battery: 100, signal: 'Strong', nextMaintenance: '10/06/2025', inspector: 'Jalal Engineering' },
            { id: '4', equipment: 'CO2 Fire Extinguisher', subtext: 'Kidde ProLine 5BC', location: 'D44 Building', locationSubtext: 'Zone 03A', status: 'Expired', priority: 'Medium', battery: 100, signal: 'Strong', nextMaintenance: '01/03/2025', inspector: 'N/A' },
            { id: '5', equipment: 'LED Emergency Exit Sign', subtext: 'Cooper APL', location: 'D45 Building', locationSubtext: 'Zone 03B', status: 'Operational', priority: 'Medium', battery: 88, signal: 'Strong', nextMaintenance: '20/01/2025', inspector: 'Muscat Engineering' },
            { id: '6', equipment: 'Addressable Fire Panel', subtext: 'Honeywell FACP-HC', location: 'Sales Center', locationSubtext: 'Sales Center', status: 'Operational', priority: 'Critical', battery: 92, signal: 'Strong', nextMaintenance: '28/02/2025', inspector: 'Bahwan Engineering' },
            { id: '7', equipment: 'Diesel Fire Pump', subtext: 'Grundfos NK 200-400', location: 'Pump Room', locationSubtext: 'Zone FM', status: 'Operational', priority: 'Critical', battery: 100, signal: 'Strong', nextMaintenance: '05/03/2025', inspector: 'COMO' },
            { id: '8', equipment: 'Rate of Rise Heat Detector', subtext: 'Hochiki DCD-1E', location: 'B5 Building', locationSubtext: 'Zone 05', status: 'Maintenance Due', priority: 'High', battery: 65, signal: 'Moderate', nextMaintenance: '15/02/2025', inspector: 'Muscat Engineering' },
        ]
    },
    hvac: hvacData,
    contractor: {
        stats: [
            { id: 1, title: 'TOTAL CONTRACTS', value: '20', subtitle: 'All registered contracts' },
            { id: 2, title: 'ACTIVE CONTRACTS', value: '11', subtitle: 'Currently ongoing' },
            { id: 3, title: 'EXPIRED CONTRACTS', value: '9', subtitle: 'Past due date' },
            { id: 4, title: 'TOTAL ANNUAL VALUE', value: '467,548.918', subtitle: 'Sum of yearly values' },
        ],
        contracts: [
            { id: '1', contractor: 'Advanced Technology and Projects Company', service: 'BMS Non-Comprehensive Annual Maintenance', status: 'Expired', type: 'PO', startDate: 'Mar 26, 2023', endDate: 'Mar 25, 2024', annualValue: 'N/A', note: 'N/A' },
            { id: '2', contractor: 'Al Naba Services LLC', service: 'Garbage Removal Services', status: 'Expired', type: 'Contract', startDate: 'Apr 2, 2023', endDate: 'Apr 1, 2024', annualValue: 'N/A', note: 'N/A' },
            { id: '3', contractor: 'Muscat Electronics LLC', service: 'Daikin AC Chillers O&M and Comprehensive Services', status: 'Expired', type: 'Contract', startDate: 'Mar 26, 2023', endDate: 'Mar 25, 2024', annualValue: 'N/A', note: 'Nearing expiration, review for r...' },
            { id: '4', contractor: 'Cedar Water', service: 'Comprehensive STP Operation and Maintenance', status: 'Active', type: 'Contract', startDate: 'Jan 16, 2024', endDate: 'Jan 15, 2025', annualValue: 'N/A', note: 'Transitioned to OWATCO befor...' },
            { id: '5', contractor: 'COMO', service: 'Facility Management (FM)', status: 'Expired', type: 'Contract', startDate: 'Mar 1, 2021', endDate: 'Feb 28, 2022', annualValue: 'N/A', note: 'Transitioned to Kahat before c...' },
            { id: '6', contractor: 'Oman Pumps Manufacturing Co.', service: 'Supply, Installation, and Commissioning of Pumps', status: 'Expired', type: 'Contract', startDate: 'Jun 21, 2020', endDate: 'Jun 20, 2025', annualValue: 'N/A', note: 'N/A' },
            { id: '7', contractor: 'Bahwan Engineering Company LLC', service: 'Maintenance of Fire Alarm & Fire Fighting Equipment', status: 'Active', type: 'Contract', startDate: 'Nov 1, 2024', endDate: 'Oct 31, 2025', annualValue: '8,925.00', note: 'N/A' },
            { id: '8', contractor: 'KONE Assarain LLC', service: 'Lift Maintenance Services', status: 'Active', type: 'Contract', startDate: 'Jan 1, 2024', endDate: 'Dec 31, 2025', annualValue: '11,550.00', note: 'N/A' },
        ]
    },
    stp: stpData,
};

export const NAV_ITEMS: NavItem[] = [
    { id: 'water', label: 'Water System', shortLabel: 'Water', icon: Icons.water },
    { id: 'electricity', label: 'Electricity System', shortLabel: 'Power', icon: Icons.electricity },
    { id: 'hvac', label: 'HVAC System', shortLabel: 'HVAC', icon: Icons.hvac },
    { id: 'firefighting', label: 'Firefighting & Alarm', shortLabel: 'Fire', icon: Icons.firefighting },
    { id: 'contractor', label: 'Contractor Tracker', shortLabel: 'Work', icon: Icons.contractor },
    { id: 'stp', label: 'STP Plant', shortLabel: 'STP', icon: Icons.stp },
];

export const VIEW_TITLES: Record<ViewKey, string> = {
    dashboard: 'Overview Dashboard',
    water: 'Water Resource Management',
    electricity: 'Electricity System Analysis',
    hvac: 'HVAC System Maintenance Tracker',
    firefighting: 'Firefighting & Alarm System',
    contractor: 'Contractor Tracker',
    stp: 'STP Plant Operations'
};
