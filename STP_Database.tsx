/*
 CREATE TABLE IF NOT EXISTS TABLE_NAME(
ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes VARCHAR( 100 )
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F075	Pressurisations	B4	Pressurization Unit #4	N/A	No issues reported	N/A	N/A	Closed - Verified	N/A	No findings reported in any PPM.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F001	York Chiller	CIF	Chiller #1 (Sys #1 & #2)	PPM 1	Water sensor inlet defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F002	York Chiller	CIF	Chiller #1 (Sys #1 & #2)	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	PPM1 (Qty 1)', 
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F003	York Chiller	CIF	Chiller #1 (Sys #1 & #2)	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	PPM1 (Qty 1)', 
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F005	York Chiller	FM	Chiller #1	PPM 1	Fuse 3A defective	3	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F006	York Chiller	FM	Chiller #1	PPM 1	Fuse 20A defective	6	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F007	York Chiller	FM	Chiller #1	PPM 1	Water sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F008	York Chiller	FM	Chiller #1	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F009	York Chiller	FM	Chiller #1	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F010	York Chiller	FM	Chiller #1	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F011	York Chiller	FM	Chiller #1	PPM 1	Leak test required	1	High	Quote Submitted / Awaiting LPO	Approve LPO for test & repair	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F012	York Chiller	FM	Chiller #1	PPM 1	Solenoid valve defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F013	York Chiller	FM	Chiller #1	PPM 1	Pipe insulation required	1	Low	Quote Submitted / Awaiting LPO	Approve LPO for installation	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F028	York Chiller	B1	Pressurization Unit #3	PPM 1	High-pressure cut-out defective	1	High	Closed - Verified	N/A	Identified in PPM1. Contractor reported '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F030	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Transformer 24V defective	1	Critical	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F031	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Fuse 12A defective	1	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F032	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Fuse 20A defective	6	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F033	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F034	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F035	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F036	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Water sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F037	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Pipe insulation required	1	Low	Quote Submitted / Awaiting LPO	Approve LPO for installation	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F038	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 1	Leak test required	1	High	Quote Submitted / Awaiting LPO	Approve LPO for test & repair	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F040	York Chiller	B1	Chiller #2	PPM 1	Fuse defective	1	Medium	Closed - Verified	N/A	Identified in PPM1. Not mentioned in subsequent reports implies rectification.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F041	York Chiller	B1	Chiller #2	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	PPM1 (Qty 1)', 
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F042	York Chiller	B1	Chiller #2	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F046	Pressurisations	B2	Pressurization Unit #3	PPM 1	High-pressure cut-out defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F047	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 1	Fuse 12A defective	1	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F048	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 1	Fuse 20A defective	6	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F049	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 1	Leak test required	1	High	Quote Submitted / Awaiting LPO	Approve LPO for test & repair	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F050	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 1	Cooler insulation required	1	Low	Quote Submitted / Awaiting LPO	Approve LPO for installation	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F051	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F052	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F053	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F054	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 1	Water sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F060	Pressurisations	B2	Pressurization Unit #4	PPM 1	High-pressure cut-out defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F061	York Chiller	B3	Chiller #1	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F062	York Chiller	B3	Chiller #1	PPM 1	On/off switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F067	York Chiller	B4	Chiller #1	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	PPM1 (Qty 1)', 
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F068	York Chiller	B4	Chiller #1	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	PPM1 (Qty 1)', 
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F069	York Chiller	B4	Chiller #1	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F070	York Chiller	B4	Chiller #2	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	PPM1 (Qty 1)', 
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F071	York Chiller	B4	Chiller #2	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	PPM1 (Qty 1)', 
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F072	York Chiller	B4	Chiller #2	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F076	York Chiller	B5	Chiller #1	PPM 1	Fuse 12A defective	1	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F077	York Chiller	B5	Chiller #1	PPM 1	Fuse 20A defective	6	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F078	York Chiller	B5	Chiller #1	PPM 1	Water sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F079	York Chiller	B5	Chiller #1	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F080	York Chiller	B5	Chiller #1	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F081	York Chiller	B5	Chiller #1	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F082	York Chiller	B5	Chiller #1	PPM 1	Leak test required	1	High	Quote Submitted / Awaiting LPO	Approve LPO for test & repair	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F083	York Chiller	B5	Chiller #1	PPM 1	New cooler required	1	Critical	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F084	York Chiller	B5	Chiller #2	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F085	York Chiller	B5	Chiller #2	PPM 1	On/off switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F088	Pressurisations	B5	Pressurization Unit #7	PPM 1	High-pressure cut-out defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F089	York Chiller	B6	Chiller #1	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F090	York Chiller	B6	Chiller #1	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F091	York Chiller	B6	Chiller #1	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F093	York Chiller	B6	Chiller #2	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F094	York Chiller	B6	Chiller #2	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F095	York Chiller	B6	Chiller #2	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F096	Pressurisations	B6	Pressurization Unit #8	PPM 1	Switch pressure cut-out defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F097	York Chiller	B7	Chiller #1 (Sys #1)	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F098	York Chiller	B7	Chiller #1 (Sys #1)	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F099	York Chiller	B7	Chiller #1 (Sys #1)	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F101	York Chiller	B7	Chiller #2 (Sys #1 & #2)	PPM 1	Fuse 3A defective	3	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F102	York Chiller	B7	Chiller #2 (Sys #1 & #2)	PPM 1	Water pump bearing replacement	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F103	York Chiller	B7	Chiller #2 (Sys #1 & #2)	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F104	York Chiller	B7	Chiller #2 (Sys #1 & #2)	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F105	York Chiller	B7	Chiller #2 (Sys #1 & #2)	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F106	York Chiller	B7	Chiller #2 (Sys #1 & #2)	PPM 1	Leak test required	1	High	Quote Submitted / Awaiting LPO	Approve LPO for test & repair	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F112	Pressurisations	B7	Pressurization Unit #2	PPM 1	Switch pressure cut-out defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F113	Pressurisations	B7	Pressurization Unit #2	PPM 1	Valve 1'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F114	Pressurisations	B7	Pressurization Unit #2	PPM 1	Bearing replacement needed	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F118	(All)	B8	(Misc. Water Chemical Treatment)	PPM 1	Chemical treatment for water systems	1	High	Quote Submitted / Awaiting LPO	Approve LPO for service	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F120	York Chiller	B8	Chiller #1 (Sys #1 & #2)	PPM 1	Fuse defective	1	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F121	York Chiller	B8	Chiller #1 (Sys #1 & #2)	PPM 1	Suction transducer defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F122	York Chiller	B8	Chiller #1 (Sys #1 & #2)	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F123	York Chiller	B8	Chiller #1 (Sys #1 & #2)	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F124	York Chiller	B8	Chiller #1 (Sys #1 & #2)	PPM 1	Flow switch defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F125	York Chiller	B8	Chiller #1 (Sys #1 & #2)	PPM 1	Pump No.1 requires overhauling	1	Critical	Quote Submitted / Awaiting LPO	Approve LPO for overhaul	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F127	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Suction transducer defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F128	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Discharge transducer defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F129	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Filter drier holder replacement	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F130	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Plug sensor defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F131	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F132	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Condenser fan bearing replacement	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1 (Qty 1). '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F133	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Pump No.2 requires overhauling	1	Critical	Quote Submitted / Awaiting LPO	Approve LPO for overhaul	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F134	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Water sensor inlet defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F135	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 1	Fuse defective	2	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1 (Qty 1). '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F137	Pressurisations	B8	Pressurization Unit #10	PPM 1	High-pressure cut-out defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F138	Pressurisations	B8	Pressurization Unit #10	PPM 1	Pipe connector for pump needed	1	Medium	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM1. '
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F014	York Chiller	FM	Chiller #1	PPM 2	Pump bearing requires replacement	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM2. PPM3 confirms noise.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F015	York Chiller	FM	Chiller #1	PPM 2	Check valve requires replacement	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Identified in PPM2. PPM3 confirms pump noise.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F029	York Chiller	B1	Pressurization Unit #3	PPM 2	Valve 1'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F039	York Chiller	B1	Chiller #1 (Sys #1 & #2)	PPM 2	Solenoid valve defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Newly identified in PPM2.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F043	York Chiller	B1	Chiller #2	PPM 2	Plug transducer defective	2	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Newly identified in PPM2. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F044	York Chiller	B1	Chiller #2	PPM 2	Water temperature sensor inlet defective	1	High	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Newly identified in PPM2. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F045	York Chiller	B1	Chiller #2	PPM 2	Leak test required	1	High	Quote Submitted / Awaiting LPO	Approve LPO for test & repair	Newly identified in PPM2. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F055	York Chiller	B2	Chiller #1 (Sys #1 & #2)	PPM 2	New Cooler required	1	Critical	Quote Submitted / Awaiting LPO	Approve LPO for replacement	Newly identified in PPM2.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F016	York Chiller	FM	Chiller #1	PPM 3	Power main switch defective	1	Critical	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F017	York Chiller	FM	Chiller #1	PPM 3	Water pressure gauge defective	1	Medium	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F018	York Chiller	FM	Chiller #1	PPM 3	Condenser fan motor requires bearing	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F019	York Chiller	FM	Chiller #1	PPM 3	Pump requires overhauling	1	Critical	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F020	York Chiller	FM	Chiller #2	PPM 3	Pump No.1 requires overhauling	1	Critical	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F021	York Chiller	FM	Chiller #2	PPM 3	Pump No.2 requires overhauling	1	Critical	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F022	York Chiller	FM	Chiller #2	PPM 3	Water Sensor Inlet Defective	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F023	York Chiller	FM	Chiller #2	PPM 3	EXV (Expansion Valve) defective	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F024	York Chiller	FM	Chiller #2	PPM 3	Condenser fan motor bearing replacement	2	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F025	Pressurisations	FM	Pressurization Unit No.2	PPM 3	High pressure cut-out replacement	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F026	Pressurisations	FM	Pressurization Unit No.2	PPM 3	Switch pressure cut-out replacement	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F027	Pressurisations	FM	Pressurization Unit No.2	PPM 3	Bearing replacement needed	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F056	York Chiller	B2	Chiller #1 Sys#2	PPM 3	Plug Sensor Defective	2	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F057	York Chiller	B2	Chiller #1 Sys#2	PPM 3	Plug Transducer Defective	2	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F058	York Chiller	B2	Chiller #1 Sys#2	PPM 3	Flow Switch Defective	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Not mentioned in PPM4.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F063	York Chiller	B3	Chiller #2	PPM 3	Flow Switch Defective	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F064	York Chiller	B3	Chiller #2	PPM 3	Plug Sensor Defective	2	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F065	York Chiller	B3	Chiller #2	PPM 3	Plug Transducer Defective	2	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F066	York Chiller	B3	Chiller #2	PPM 3	On/Off Switch Defective	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F086	York Chiller	B5	Chiller#1 Sys#2	PPM 3	Leak test required	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F087	York Chiller	B5	Chiller#2 Sys#2	PPM 3	Leak test required	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F092	York Chiller	B6	Chiller #1	PPM 3	Condenser fan motor bearing replacement	4	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F100	York Chiller	B7	Chiller #1 (Sys #1)	PPM 3	Condenser fan motor bearing replacement	2	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F107	York Chiller	B7	Chiller#1 Sys #2	PPM 3	Condenser fan contactor defective	2	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F108	York Chiller	B7	Chiller#1 Sys #2	PPM 3	Fan motor requires rewinding	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F109	York Chiller	B7	Chiller#1 Sys #2	PPM 3	Leak test required	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F110	York Chiller	B7	Chiller#1 Sys #2	PPM 3	Fuse defective	3	Medium	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F111	York Chiller	B7	Chiller#1 Sys #2	PPM 3	Water pump bearing change	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F115	Pressurisations	B7	Pressurization Unit No.9	PPM 3	Start control handle set needed	1	Medium	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F116	Pressurisations	B7	Pressurization Unit No.9	PPM 3	Switch pressure cut-out replacement	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3. Persists.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F117	Pressurisations	B7	Pressurization Unit No.9	PPM 3	Valve 1'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F119	York Chiller	B8	Chiller #1 (Sys #1 & #2)	PPM 3	No refrigerant gas	1	Critical	Open - Action Required	Contractor to leak test and quote	Identified in PPM3. Root cause of other issues.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F126	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 3	No refrigerant gas	1	Critical	Open - Action Required	Contractor to leak test and quote	Identified in PPM3. Root cause of other issues.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F136	York Chiller	B8	Chiller #2 (Sys #1 & #2)	PPM 3	Flow switch defective	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM3.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F004	York Chiller	CIF	Chiller #1 (Sys #1 & #2)	PPM 4	Educator sensor defective	1	High	Open - Action Required	Contractor to provide quotation	Newly identified during PPM4 visit.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F059	York Chiller	B2	Chiller #1 Sys#2	PPM 4	Leak test required	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM4.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F073	Pressurisations	B4	Pressurization Unit No.6	PPM 4	Switch pressure cut-out replacement	1	High	Open - Action Required	Contractor to provide quotation	Newly identified in PPM4.'
);

INSERT INTO TABLE_NAME( ID	MainSystem	Building	Equipment/AssetID	PPMVisitIdentified	Finding/IssueDescription	Qty	Priority	Status	ActionRequired	LatestUpdate/Notes )
VALUES
(
    'F074	Pressurisations	B4	Pressurization Unit No.6	PPM 4	Pump requires painting	1	Low	Open - Action Required	Contractor to provide quotation	Newly identified in PPM4. '
);
*/
export {};
