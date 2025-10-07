// Motzz Laboratory Website JavaScript
// Modern, interactive functionality for the laboratory testing website

// Global variables
let currentView = 'grid';
let currentStep = 1;
let selectedTests = [];
let cartItems = [];
let searchCache = new Map();
let debounceTimer = null;

// Test data structure with hierarchical subcategories
const testData = {
    agriculture: {
        name: 'Agriculture',
        description: 'Comprehensive testing services for soil, plant, water, compost/mulch and fertilizer. We provide services to most of the farms, golf courses, and nurseries in Arizona and some parts of Nevada and California.',
        icon: 'fas fa-seedling',
        subcategories: [
            {
                id: 'soil-testing',
                name: 'Soil',
                description: 'Comprehensive soil analysis for agricultural optimization and soil health assessment.',
                icon: 'fas fa-mountain',
                tests: [
                    {
                        id: 'soil-complete-test',
                        name: 'Soil Complete Test',
                        description: 'Complete soil testing for nutrient content, pH, and soil health assessment.',
                        icon: 'fas fa-mountain',
                        tests: 18,
                        turnaround: '5-7 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Soil Complete Test',
                                description: 'Comprehensive soil analysis with all essential nutrients and properties.',
                                features: [
                                    'pH (1:1)',
                                    'Electrical Conductivity, EC (1:1)',
                                    'Calcium, Ca (NH4OAc (pH 8.5))',
                                    'Magnesium, Mg (NH4OAc (pH 8.5))',
                                    'Sodium, Na (NH4OAc (pH 8.5))',
                                    'Potassium, K (NH4OAc (pH 8.5))',
                                    'Zinc, Zn (DTPA)',
                                    'Iron, Fe (DTPA)',
                                    'Manganese, Mn (DTPA)',
                                    'Copper, Cu (DTPA)',
                                    'Nickel, Ni (DTPA)',
                                    'Nitrate-N, NO3-N (Cd-Reduction)',
                                    'Phosphate-P, PO4-P (Olsen)',
                                    'Sulfate-S, SO4-S (Hot Water)',
                                    'Boron, B (Hot Water)',
                                    'Free Lime, FL (Acid Test)',
                                    'ESP (Calculated)',
                                    'CEC (Calculated)'
                                ],
                                turnaround: '5-7 days'
                            }
                        ]
                    },
                    {
                        id: 'compost-available',
                        name: 'Compost Available',
                        description: 'Compost available nutrients testing for soil amendment assessment.',
                        icon: 'fas fa-recycle',
                        tests: 17,
                        turnaround: '6-8 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Compost Available Nutrients',
                                description: 'Testing for available nutrients in compost materials.',
                                features: [
                                    'pH (1:1)',
                                    'Electrical Conductivity, EC (1:1)',
                                    'Calcium, Ca (NH4OAc (pH 8.5))',
                                    'Magnesium, Mg (NH4OAc (pH 8.5))',
                                    'Sodium, Na (NH4OAc (pH 8.5))',
                                    'Potassium, K (NH4OAc (pH 8.5))',
                                    'Zinc, Zn (DTPA)',
                                    'Iron, Fe (DTPA)',
                                    'Manganese, Mn (DTPA)',
                                    'Copper, Cu (DTPA)',
                                    'Nickel, Ni (DTPA)',
                                    'Nitrate-N, NO3-N (Cd-Reduction)',
                                    'Phosphate-P, PO4-P (Olsen)',
                                    'Sulfate-S, SO4-S (Hot Water)',
                                    'Boron, B (Hot Water)',
                                    'Free Lime, FL (Acid Test)',
                                    'ESP (Calculated)'
                                ],
                                turnaround: '6-8 days'
                            }
                        ]
                    },
                    {
                        id: 'compost-total',
                        name: 'Compost Total',
                        description: 'Compost total nutrients testing for complete nutrient analysis.',
                        icon: 'fas fa-recycle',
                        tests: 18,
                        turnaround: '6-8 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Compost Total Nutrients',
                                description: 'Complete nutrient analysis of compost materials.',
                                features: [
                                    'pH (1:1)',
                                    'Electrical Conductivity, EC (1:1)',
                                    'Calcium, Ca (NH4OAc (pH 8.5))',
                                    'Magnesium, Mg (NH4OAc (pH 8.5))',
                                    'Sodium, Na (NH4OAc (pH 8.5))',
                                    'Potassium, K (NH4OAc (pH 8.5))',
                                    'Zinc, Zn (DTPA)',
                                    'Iron, Fe (DTPA)',
                                    'Manganese, Mn (DTPA)',
                                    'Copper, Cu (DTPA)',
                                    'Nickel, Ni (DTPA)',
                                    'Nitrate-N, NO3-N (Cd-Reduction)',
                                    'Phosphate-P, PO4-P (Olsen)',
                                    'Sulfate-S, SO4-S (Hot Water)',
                                    'Boron, B (Hot Water)',
                                    'Free Lime, FL (Acid Test)',
                                    'ESP (Calculated)',
                                    'CEC (Calculated)'
                                ],
                                turnaround: '6-8 days'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'plant-testing',
                name: 'Plants',
                description: 'Plant tissue and petiole analysis for nutrient deficiency diagnosis and plant health assessment.',
                icon: 'fas fa-leaf',
                tests: [
                    {
                        id: 'plant-complete-test',
                        name: 'Plant Complete Test',
                        description: 'Complete plant tissue analysis for comprehensive nutrient assessment.',
                        icon: 'fas fa-leaf',
                        tests: 12,
                        turnaround: '3-5 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Plant Complete Test',
                                description: 'Comprehensive plant tissue analysis for all essential nutrients.',
                                features: [
                                    'Total Nitrogen, N (Combustion)',
                                    'Total Calcium, Ca (Acid Digestion)',
                                    'Total Magnesium, Mg (Acid Digestion)',
                                    'Total Sodium, Na (Acid Digestion)',
                                    'Total Potassium, K (Acid Digestion)',
                                    'Total Phosphorus, P (Acid Digestion)',
                                    'Total Sulfur, S (Acid Digestion)',
                                    'Total Zinc, Zn (Acid Digestion)',
                                    'Total Iron, Fe (Acid Digestion)',
                                    'Total Manganese, Mn (Acid Digestion)',
                                    'Total Copper, Cu (Acid Digestion)',
                                    'Total Boron, B (Acid Digestion)'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'petiole-complete-test',
                        name: 'Petiole Complete Test',
                        description: 'Complete petiole analysis for detailed nutrient assessment.',
                        icon: 'fas fa-leaf',
                        tests: 12,
                        turnaround: '3-5 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Petiole Complete Test',
                                description: 'Comprehensive petiole analysis for all essential nutrients.',
                                features: [
                                    'Total Nitrogen, N (Combustion)',
                                    'Total Calcium, Ca (Acid Digestion)',
                                    'Total Magnesium, Mg (Acid Digestion)',
                                    'Total Sodium, Na (Acid Digestion)',
                                    'Total Potassium, K (Acid Digestion)',
                                    'Total Phosphorus, P (Acid Digestion)',
                                    'Total Sulfur, S (Acid Digestion)',
                                    'Total Zinc, Zn (Acid Digestion)',
                                    'Total Iron, Fe (Acid Digestion)',
                                    'Total Manganese, Mn (Acid Digestion)',
                                    'Total Copper, Cu (Acid Digestion)',
                                    'Total Boron, B (Acid Digestion)'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'petiole-npk',
                        name: 'Petiole NPK',
                        description: 'Petiole NPK analysis for primary nutrient assessment.',
                        icon: 'fas fa-leaf',
                        tests: 3,
                        turnaround: '3-5 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Petiole NPK Analysis',
                                description: 'Nitrogen, Phosphorus, and Potassium analysis in petiole samples.',
                                features: [
                                    'Total Nitrogen, N (Combustion)',
                                    'Total Phosphorus, P (Acid Digestion)',
                                    'Total Potassium, K (Acid Digestion)'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'petiole-np',
                        name: 'Petiole NP',
                        description: 'Petiole NP analysis for nitrogen and phosphorus assessment.',
                        icon: 'fas fa-leaf',
                        tests: 2,
                        turnaround: '3-5 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Petiole NP Analysis',
                                description: 'Nitrogen and Phosphorus analysis in petiole samples.',
                                features: [
                                    'Total Nitrogen, N (Combustion)',
                                    'Total Phosphorus, P (Acid Digestion)'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'water-testing',
                name: 'Water',
                description: 'Water quality testing for agricultural irrigation and water management.',
                icon: 'fas fa-tint',
                tests: [
                    {
                        id: 'water-complete-irrigation',
                        name: 'Water Complete Irrigation',
                        description: 'Complete irrigation water quality testing for agricultural use.',
                        icon: 'fas fa-tint',
                        tests: 13,
                        turnaround: '4-6 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Water Complete Irrigation',
                                description: 'Comprehensive irrigation water quality testing.',
                                features: [
                                    'pH (1:1)',
                                    'Electrical Conductivity, EC (1:1)',
                                    'Calcium, Ca (NH4OAc (pH 8.5))',
                                    'Magnesium, Mg (NH4OAc (pH 8.5))',
                                    'Sodium, Na (NH4OAc (pH 8.5))',
                                    'Potassium, K (NH4OAc (pH 8.5))',
                                    'Zinc, Zn (DTPA)',
                                    'Iron, Fe (DTPA)',
                                    'Manganese, Mn (DTPA)',
                                    'Copper, Cu (DTPA)',
                                    'Nickel, Ni (DTPA)',
                                    'Nitrate-N, NO3-N (Cd-Reduction)',
                                    'Phosphate-P, PO4-P (Olsen)'
                                ],
                                turnaround: '4-6 days'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'fertilizer-testing',
                name: 'Fertilizer',
                description: 'Fertilizer analysis and heavy metals testing for quality assurance and regulatory compliance.',
                icon: 'fas fa-flask',
                tests: [
                    {
                        id: 'fertilizer-complete-analysis',
                        name: 'Fertilizer Complete Analysis',
                        description: 'Complete fertilizer analysis for quality assurance.',
                        icon: 'fas fa-flask',
                        tests: 12,
                        turnaround: '4-6 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Fertilizer Complete Analysis',
                                description: 'Comprehensive fertilizer nutrient analysis.',
                                features: [
                                    'Total Nitrogen, N (Combustion)',
                                    'Total Calcium, Ca (Acid Digestion)',
                                    'Total Magnesium, Mg (Acid Digestion)',
                                    'Total Sodium, Na (Acid Digestion)',
                                    'Total Potassium, K (Acid Digestion)',
                                    'Total Phosphorus, P (Acid Digestion)',
                                    'Total Sulfur, S (Acid Digestion)',
                                    'Total Zinc, Zn (Acid Digestion)',
                                    'Total Iron, Fe (Acid Digestion)',
                                    'Total Manganese, Mn (Acid Digestion)',
                                    'Total Copper, Cu (Acid Digestion)',
                                    'Total Boron, B (Acid Digestion)'
                                ],
                                turnaround: '4-6 days'
                            }
                        ]
                    },
                    {
                        id: 'heavy-metals-state-registrations',
                        name: 'Heavy Metals (State Registrations)',
                        description: 'Heavy metals testing for state registration compliance.',
                        icon: 'fas fa-shield-alt',
                        tests: 10,
                        turnaround: '7-10 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Heavy Metals (State Registrations)',
                                description: 'Heavy metals testing for regulatory compliance.',
                                features: [
                                    'Lead, Pb (ICP-MS)',
                                    'Cadmium, Cd (ICP-MS)',
                                    'Mercury, Hg (ICP-MS)',
                                    'Arsenic, As (ICP-MS)',
                                    'Chromium, Cr (ICP-MS)',
                                    'Nickel, Ni (ICP-MS)',
                                    'Copper, Cu (ICP-MS)',
                                    'Zinc, Zn (ICP-MS)',
                                    'Manganese, Mn (ICP-MS)',
                                    'Iron, Fe (ICP-MS)'
                                ],
                                turnaround: '7-10 days'
                            }
                        ]
                    },
                    {
                        id: 'humic-fulvic-acids',
                        name: 'Humic and Fulvic Acids',
                        description: 'Humic and fulvic acids testing using various methods (AOAC, ISO, CDFA, V&B, Colorimetric).',
                        icon: 'fas fa-flask',
                        tests: 5,
                        turnaround: '5-7 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Humic Acid (BaCl2)',
                                description: 'Humic acid testing using BaCl2 method.',
                                features: [
                                    'Humic Acid (BaCl2)'
                                ],
                                turnaround: '5-7 days'
                            },
                            {
                                name: 'Humic Acid (CDFA)',
                                description: 'Humic acid testing using CDFA method.',
                                features: [
                                    'Humic Acid (CDFA)'
                                ],
                                turnaround: '5-7 days'
                            },
                            {
                                name: 'Humic Acid (Colorimetric)',
                                description: 'Humic acid testing using colorimetric method.',
                                features: [
                                    'Humic Acid (Colorimetric)'
                                ],
                                turnaround: '5-7 days'
                            },
                            {
                                name: 'Humic Acid (ISO 19822)',
                                description: 'Humic acid testing using ISO 19822 method.',
                                features: [
                                    'Humic Acid (ISO 19822)'
                                ],
                                turnaround: '5-7 days'
                            },
                            {
                                name: 'Humic Acid (V&B)',
                                description: 'Humic acid testing using V&B method.',
                                features: [
                                    'Humic Acid (V&B)'
                                ],
                                turnaround: '5-7 days'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    environmental: {
        name: 'Environmental',
        description: 'Environmental testing services for water quality, waste management, and environmental compliance.',
        icon: 'fas fa-globe-americas',
        subcategories: [
            {
                id: 'water-quality',
                name: 'Water Quality',
                description: 'Comprehensive water testing for drinking water, well water, and wastewater.',
                icon: 'fas fa-tint',
                tests: [
                    {
                        id: 'drinking-water',
                        name: 'Drinking Water',
                        description: 'Safe drinking water testing for residential and commercial use.',
                        icon: 'fas fa-glass-whiskey',
                        tests: 3,
                        turnaround: '3-5 days',
                        category: 'environmental',
                        packages: [
                            {
                                name: 'Basic Water Quality',
                                description: 'Essential drinking water parameters.',
                                features: ['pH', 'Chlorine', 'Bacteria', 'Basic Contaminants'],
                                turnaround: '3-5 days'
                            },
                            {
                                name: 'Complete Water Analysis',
                                description: 'Comprehensive drinking water testing.',
                                features: ['All Basic items', 'Heavy Metals', 'Pesticides', 'Detailed Report'],
                                turnaround: '5-7 days'
                            }
                        ]
                    },
                    {
                        id: 'well-water',
                        name: 'Well Water',
                        description: 'Private well water testing for safety and quality.',
                        icon: 'fas fa-water',
                        tests: 2,
                        turnaround: '4-6 days',
                        category: 'environmental',
                        packages: [
                            {
                                name: 'Basic Well Water',
                                description: 'Essential well water parameters.',
                                features: ['Bacteria', 'Nitrates', 'pH', 'Basic Contaminants'],
                                turnaround: '4-6 days'
                            },
                            {
                                name: 'Complete Well Water',
                                description: 'Comprehensive well water testing.',
                                features: ['All Basic items', 'Heavy Metals', 'Pesticides', 'Detailed Report'],
                                turnaround: '6-8 days'
                            }
                        ]
                    },
                    {
                        id: 'wastewater',
                        name: 'Wastewater',
                        description: 'Wastewater treatment and discharge testing.',
                        icon: 'fas fa-recycle',
                        tests: 2,
                        turnaround: '5-7 days',
                        category: 'environmental',
                        packages: [
                            {
                                name: 'Basic Wastewater',
                                description: 'Essential wastewater parameters.',
                                features: ['BOD', 'COD', 'pH', 'Suspended Solids'],
                                turnaround: '5-7 days'
                            },
                            {
                                name: 'Complete Wastewater',
                                description: 'Comprehensive wastewater testing.',
                                features: ['All Basic items', 'Nutrients', 'Heavy Metals', 'Detailed Report'],
                                turnaround: '7-10 days'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    construction: {
        name: 'Construction',
        description: 'Construction materials testing for soil and aggregates analysis.',
        icon: 'fas fa-hard-hat',
        subcategories: [
            {
                id: 'materials-testing',
                name: 'Materials Testing',
                description: 'Comprehensive testing for construction materials including soil and aggregates.',
                icon: 'fas fa-cubes',
                tests: [
                    {
                        id: 'soil-testing',
                        name: 'Soil Testing',
                        description: 'Construction soil testing for foundation and structural support.',
                        icon: 'fas fa-mountain',
                        tests: 2,
                        turnaround: '4-6 days',
                        category: 'construction',
                        packages: [
                            {
                                name: 'Basic Soil Testing',
                                description: 'Essential construction soil parameters.',
                                features: ['Compaction', 'Moisture Content', 'Density', 'Basic Analysis'],
                                turnaround: '4-6 days'
                            },
                            {
                                name: 'Complete Soil Testing',
                                description: 'Comprehensive construction soil analysis.',
                                features: ['All Basic items', 'Bearing Capacity', 'Settlement', 'Detailed Report'],
                                turnaround: '6-8 days'
                            }
                        ]
                    },
                    {
                        id: 'aggregate-testing',
                        name: 'Aggregate Testing',
                        description: 'Aggregate materials testing for construction projects.',
                        icon: 'fas fa-cubes',
                        tests: 2,
                        turnaround: '3-5 days',
                        category: 'construction',
                        packages: [
                            {
                                name: 'Basic Aggregate',
                                description: 'Essential aggregate parameters.',
                                features: ['Gradation', 'Density', 'Moisture', 'Basic Quality'],
                                turnaround: '3-5 days'
                            },
                            {
                                name: 'Complete Aggregate',
                                description: 'Comprehensive aggregate testing.',
                                features: ['All Basic items', 'Strength', 'Durability', 'Detailed Report'],
                                turnaround: '5-7 days'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    dietary: {
        name: 'Dietary Supplements',
        description: 'Dietary supplement testing for minerals, contaminants, and heavy metals.',
        icon: 'fas fa-pills',
        subcategories: [
            {
                id: 'supplement-analysis',
                name: 'Supplement Analysis',
                description: 'Comprehensive analysis of dietary supplements including minerals and contaminants.',
                icon: 'fas fa-pills',
                tests: [
                    {
                        id: 'mineral-analysis',
                        name: 'Mineral Analysis',
                        description: 'Mineral content analysis for dietary supplements.',
                        icon: 'fas fa-gem',
                        tests: 2,
                        turnaround: '4-6 days',
                        category: 'dietary',
                        packages: [
                            {
                                name: 'Basic Mineral Analysis',
                                description: 'Essential mineral content testing.',
                                features: ['Calcium', 'Iron', 'Zinc', 'Basic Minerals'],
                                turnaround: '4-6 days'
                            },
                            {
                                name: 'Complete Mineral Analysis',
                                description: 'Comprehensive mineral testing.',
                                features: ['All Basic items', 'Trace Minerals', 'Heavy Metals', 'Detailed Report'],
                                turnaround: '6-8 days'
                            }
                        ]
                    },
                    {
                        id: 'contaminant-testing',
                        name: 'Contaminant Testing',
                        description: 'Contaminant and heavy metal testing for dietary supplements.',
                        icon: 'fas fa-shield-alt',
                        tests: 2,
                        turnaround: '5-7 days',
                        category: 'dietary',
                        packages: [
                            {
                                name: 'Basic Contaminant',
                                description: 'Essential contaminant testing.',
                                features: ['Lead', 'Cadmium', 'Mercury', 'Basic Contaminants'],
                                turnaround: '5-7 days'
                            },
                            {
                                name: 'Complete Contaminant',
                                description: 'Comprehensive contaminant testing.',
                                features: ['All Basic items', 'Pesticides', 'Microbes', 'Detailed Report'],
                                turnaround: '7-10 days'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    water: {
        name: 'Water',
        description: 'Comprehensive water testing services for irrigation, drinking water, and wastewater analysis.',
        icon: 'fas fa-tint',
        subcategories: [
            {
                id: 'water-testing',
                name: 'Water Testing',
                description: 'Comprehensive water testing for various applications and quality standards.',
                icon: 'fas fa-tint',
                tests: [
                    {
                        id: 'water-complete-irrigation',
                        name: 'Water Complete Irrigation',
                        description: 'Complete irrigation water quality testing for agricultural use.',
                        icon: 'fas fa-seedling',
                        tests: 12,
                        turnaround: '4-6 days',
                        category: 'water',
                        packages: [
                            {
                                name: 'Water Complete Irrigation',
                                description: 'Comprehensive irrigation water quality testing.',
                                features: [
                                    'Sodium, Na',
                                    'Calcium, Ca',
                                    'Magnesium, Mg',
                                    'Potassium, K',
                                    'Carbonate, CO3',
                                    'Bicarbonate, HCO3',
                                    'Chloride, Cl',
                                    'Sulfate-S, SO4-S',
                                    'Nitrate-N, NO3-N',
                                    'Phosphate-P, PO4-P',
                                    'Boron, B',
                                    'Electrical Conductivity, EC'
                                ],
                                turnaround: '4-6 days'
                            }
                        ]
                    },
                    {
                        id: 'water-quality-a',
                        name: 'Water Quality A',
                        description: 'Comprehensive water quality testing for builders and construction.',
                        icon: 'fas fa-hammer',
                        tests: 14,
                        turnaround: '3-5 days',
                        category: 'water',
                        packages: [
                            {
                                name: 'Water Quality A',
                                description: 'Essential water quality parameters for builders.',
                                features: [
                                    'Calcium, Ca',
                                    'Magnesium, Mg',
                                    'Hardness',
                                    'Water Classification',
                                    'Total Dissolved Solids',
                                    'Fluoride, F',
                                    'Nitrate-N, NO3-N',
                                    'Nitrite-N, NO2-N',
                                    'Arsenic, As',
                                    'Iron, Fe',
                                    'Lead, Pb',
                                    'Uranium, U',
                                    'Total Coliform',
                                    'E. coli'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'water-quality-b',
                        name: 'Water Quality B',
                        description: 'Water quality testing for bank loan requirements.',
                        icon: 'fas fa-university',
                        tests: 5,
                        turnaround: '3-5 days',
                        category: 'water',
                        packages: [
                            {
                                name: 'Water Quality B',
                                description: 'Essential water quality tests for bank loans.',
                                features: [
                                    'Lead, Pb',
                                    'Nitrate-N, NO3-N',
                                    'Nitrite-N, NO2-N',
                                    'Total Coliform',
                                    'E. coli'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'water-quality-c',
                        name: 'Water Quality C',
                        description: 'ADHS recommended water quality testing for wells.',
                        icon: 'fas fa-well',
                        tests: 9,
                        turnaround: '3-5 days',
                        category: 'water',
                        packages: [
                            {
                                name: 'Water Quality C',
                                description: 'ADHS recommended well water testing.',
                                features: [
                                    'Arsenic, As',
                                    'Lead, Pb',
                                    'Uranium, U',
                                    'Fluoride, F',
                                    'Nitrate-N, NO3-N',
                                    'Nitrite-N, NO2-N',
                                    'Total Dissolved Solids',
                                    'Total Coliform',
                                    'E. coli'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'wastewater',
                        name: 'Wastewater',
                        description: 'Comprehensive wastewater treatment and discharge testing.',
                        icon: 'fas fa-recycle',
                        tests: 41,
                        turnaround: '5-7 days',
                        category: 'water',
                        packages: [
                            {
                                name: 'Wastewater Analysis',
                                description: 'Comprehensive wastewater testing and analysis.',
                                features: [
                                    'Aluminum, Al',
                                    'Ammonia-Nitrogen, NH4-N',
                                    'Ash, %',
                                    'Biochemical Oxygen Demand, BOD',
                                    'Boron, B',
                                    'Calcium, Ca',
                                    'Chemical Oxygen Demand, COD',
                                    'Chloride, Cl',
                                    'Chromium, Cr',
                                    'Copper, Cu',
                                    'Dry Matter',
                                    'Hydroxide, OH',
                                    'Iron, Fe',
                                    'Magnesium, Mg',
                                    'Manganese, Mn',
                                    'Moisture',
                                    'Nickel, Ni',
                                    'Nitrate-N, NO3-N',
                                    'Nitrogen',
                                    'Normality, N',
                                    'Organic Nitrogen',
                                    'Phosphorus, P',
                                    'Potassium, K',
                                    'Sodium Dicromate, Na2Cr2O7',
                                    'Sodium, Na',
                                    'Soluble Salts',
                                    'Sulfate, SO4',
                                    'Sulfur, S',
                                    'Total Dissolved Solids, TDS',
                                    'Total Nitrogen, N',
                                    'Total Phosphorus, P',
                                    'Total Phosphorus, P2O5',
                                    'Total Potassium, K',
                                    'Total Potassium, K2O',
                                    'Total Solubility',
                                    'Total Suspended Solids, TSS',
                                    'Zinc, Zn',
                                    'Hydrochloric Acid, HCl',
                                    'Nitric Acid Content',
                                    'Phosphoric Acid, H3PO4',
                                    'Sulfuric Acid Content'
                                ],
                                turnaround: '5-7 days'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    microbiology: {
        name: 'Microbiology',
        description: 'Comprehensive microbiology testing services for pathogens and microbial contaminants.',
        icon: 'fas fa-microscope',
        subcategories: [
            {
                id: 'microbiological-testing',
                name: 'Microbiological Testing',
                description: 'Comprehensive microbiological testing for pathogens and microbial contaminants.',
                icon: 'fas fa-microscope',
                tests: [
                    {
                        id: 'microbiology-lgma',
                        name: 'Microbiology (LGMA)',
                        description: 'LGMA compliant microbiological testing for food safety.',
                        icon: 'fas fa-certificate',
                        tests: 4,
                        turnaround: '3-5 days',
                        category: 'microbiology',
                        packages: [
                            {
                                name: 'Microbiology (LGMA)',
                                description: 'LGMA compliant pathogen testing.',
                                features: [
                                    'STEC',
                                    'Listeria monocytogenes',
                                    'Salmonella',
                                    'Fecal Coliform'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'microbiology-pcr',
                        name: 'Microbiology (PCR)',
                        description: 'PCR-based microbiological testing for rapid pathogen detection.',
                        icon: 'fas fa-dna',
                        tests: 6,
                        turnaround: '2-4 days',
                        category: 'microbiology',
                        packages: [
                            {
                                name: 'Microbiology (PCR)',
                                description: 'Rapid PCR-based pathogen detection.',
                                features: [
                                    'Listeria monocytogenes',
                                    'Listeria spp.',
                                    'Salmonella spp.',
                                    'STEC (E. coli O157:H7)',
                                    'STEC (E. coli Top 6)',
                                    'STEC (EHEC)'
                                ],
                                turnaround: '2-4 days'
                            }
                        ]
                    },
                    {
                        id: 'microbiology-petrifilm',
                        name: 'Microbiology (Petrifilm)',
                        description: 'Petrifilm-based microbiological testing for rapid enumeration.',
                        icon: 'fas fa-film',
                        tests: 5,
                        turnaround: '3-5 days',
                        category: 'microbiology',
                        packages: [
                            {
                                name: 'Microbiology (Petrifilm)',
                                description: 'Rapid Petrifilm-based microbial enumeration.',
                                features: [
                                    'Aerobic Plate Count (APC)',
                                    'Staphylococcus aureus',
                                    'Total Coliform and E. coli',
                                    'Yeast and Mold',
                                    'L. acidophilus'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'microbiology-plate',
                        name: 'Microbiology (Plate)',
                        description: 'Traditional plate-based microbiological testing methods.',
                        icon: 'fas fa-microscope',
                        tests: 2,
                        turnaround: '3-5 days',
                        category: 'microbiology',
                        packages: [
                            {
                                name: 'Microbiology (Plate)',
                                description: 'Traditional plate-based microbial testing.',
                                features: [
                                    'Heterotrophic Plate Count (HPC)',
                                    'Pseudomonas aeruginosa'
                                ],
                                turnaround: '3-5 days'
                            }
                        ]
                    },
                    {
                        id: 'microbial-contaminants-other',
                        name: 'Microbial Contaminants (Other Methods)',
                        description: 'Specialized microbiological testing using alternative methods.',
                        icon: 'fas fa-flask',
                        tests: 6,
                        turnaround: '4-6 days',
                        category: 'microbiology',
                        packages: [
                            {
                                name: 'Microbial Contaminants (Other Methods)',
                                description: 'Specialized microbial contaminant testing.',
                                features: [
                                    'Fecal Coliform',
                                    'Pseudomonas aeruginosa',
                                    'Enterococci',
                                    'Endotoxins',
                                    'Iron-Reducing Bacteria',
                                    'Sulfur-Reducing Bacteria'
                                ],
                                turnaround: '4-6 days'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

// Initialize the website
function initializeWebsite() {
    loadServices();
    setupEventListeners();
    setupSearch();
    setupFilters();
    setupAccessibility();
    
    // Set initial active navigation state
    updateActiveNavLink();
}

// Initialize EmailJS
function initializeEmailJS() {
    // Initialize EmailJS with your public key
    // You'll need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
}


// Load and display services
function loadServices() {
    const container = document.getElementById('servicesContainer');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('noResults');
    
    // Show loading state
    loading.style.display = 'block';
    container.innerHTML = '';
    noResults.style.display = 'none';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        displayServices(testData);
        loading.style.display = 'none';
    }, 500);
}

function displayServices(data, filteredData = null) {
    const container = document.getElementById('servicesContainer');
    const noResults = document.getElementById('noResults');
    
    const servicesToShow = filteredData || data;
    
    if (Object.keys(servicesToShow).length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    let html = '';
    
    Object.entries(servicesToShow).forEach(([categoryKey, category]) => {
        // Calculate total subcategories and tests
        const totalSubcategories = category.subcategories ? category.subcategories.length : 0;
        const totalTests = category.subcategories ? 
            category.subcategories.reduce((sum, sub) => sum + (sub.tests ? sub.tests.length : 0), 0) : 0;
        
        html += `
            <div class="service-card" data-category="${categoryKey}">
                <div class="service-icon">
                    <i class="${category.icon}"></i>
                </div>
                <div class="service-content">
                    <h3 class="service-title">${category.name}</h3>
                    <p class="service-description">${category.description}</p>
                    <div class="service-meta">
                        <div class="meta-item">
                            <i class="fas fa-layer-group"></i>
                            <span>${totalSubcategories} Subcategories</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-vial"></i>
                            <span>${totalTests} Tests</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>3-10 days</span>
                        </div>
                        ${category.id === 'microbiology' ? '<div class="meta-item"><i class="fas fa-certificate"></i><span>ISO Certified</span></div>' : ''}
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-secondary" onclick="viewCategoryDetails('${categoryKey}')">
                            View Subcategories
                        </button>
                        <button class="btn btn-primary" onclick="requestQuoteForCategory('${categoryKey}')">
                            Request Quote
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.className = `services-container ${currentView}-view`;
    
    // Add hover effects
    addHoverEffects();
}

function viewCategoryDetails(categoryKey) {
    const category = testData[categoryKey];
    if (!category) return;
    
    // Update breadcrumb
    updateBreadcrumb([{ name: 'Services', onclick: 'loadServices()' }, { name: category.name }]);
    
    // Display category subcategories
    displayCategorySubcategories(categoryKey, category);
}

function displayCategorySubcategories(categoryKey, category) {
    const container = document.getElementById('servicesContainer');
    const noResults = document.getElementById('noResults');
    
    noResults.style.display = 'none';
    
    let html = '';
    
    // Add back button
    html = `
        <div class="service-card back-button" onclick="loadServices()">
            <div class="service-icon">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div class="service-content">
                <h3 class="service-title">Back to All Services</h3>
                <p class="service-description">Return to the main services overview</p>
            </div>
        </div>
    `;
    
    // Display subcategories
    category.subcategories.forEach(subcategory => {
        const totalTests = subcategory.tests ? subcategory.tests.length : 0;
        
        html += `
            <div class="service-card" data-subcategory-id="${subcategory.id}">
                <div class="service-icon">
                    <i class="${subcategory.icon}"></i>
                </div>
                <div class="service-content">
                    <h3 class="service-title">${subcategory.name}</h3>
                    <p class="service-description">${subcategory.description}</p>
                    <div class="service-meta">
                        <div class="meta-item">
                            <i class="fas fa-vial"></i>
                            <span>${totalTests} Tests</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>3-10 days</span>
                        </div>
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-secondary" onclick="viewSubcategoryTests('${categoryKey}', '${subcategory.id}')">
                            View Tests
                        </button>
                        <button class="btn btn-primary" onclick="requestQuoteForSubcategory('${categoryKey}', '${subcategory.id}')">
                            Request Quote
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.className = `services-container ${currentView}-view`;
    
    // Add hover effects
    addHoverEffects();
}

function viewSubcategoryTests(categoryKey, subcategoryId) {
    const category = testData[categoryKey];
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
    
    if (!subcategory) return;
    
    // Update breadcrumb
    updateBreadcrumb([
        { name: 'Services', onclick: 'loadServices()' }, 
        { name: category.name, onclick: `viewCategoryDetails('${categoryKey}')` },
        { name: subcategory.name }
    ]);
    
    // Display subcategory tests
    displaySubcategoryTests(categoryKey, subcategoryId, subcategory);
}

function displaySubcategoryTests(categoryKey, subcategoryId, subcategory) {
    const container = document.getElementById('servicesContainer');
    const noResults = document.getElementById('noResults');
    
    noResults.style.display = 'none';
    
    let html = '';
    
    // Add back button
    html = `
        <div class="service-card back-button" onclick="viewCategoryDetails('${categoryKey}')">
            <div class="service-icon">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div class="service-content">
                <h3 class="service-title">Back to ${testData[categoryKey].name}</h3>
                <p class="service-description">Return to ${testData[categoryKey].name} subcategories</p>
            </div>
        </div>
    `;
    
    // Display tests
    subcategory.tests.forEach(test => {
        html += `
            <div class="service-card" data-test-id="${test.id}">
                <div class="service-icon">
                    <i class="${test.icon}"></i>
                </div>
                <div class="service-content">
                    <h3 class="service-title">${test.name}</h3>
                    <p class="service-description">${test.description}</p>
                    <div class="service-meta">
                        <div class="meta-item">
                            <i class="fas fa-vial"></i>
                            <span>${test.tests} Tests</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${test.turnaround}</span>
                        </div>
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-secondary" onclick="toggleTestPackages('${test.id}')">
                            View Packages
                        </button>
                        <button class="btn btn-primary" onclick="requestQuoteForTest('${test.id}', '${categoryKey}')">
                            Request Quote
                        </button>
                    </div>
                    <div class="test-packages" id="packages-${test.id}">
                        ${generateTestPackagesHTML(test.packages, test.id, categoryKey)}
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.className = `services-container ${currentView}-view`;
    
    // Add hover effects
    addHoverEffects();
}

// Function to check if a specific test feature is ISO certified
function isISOcertifiedTest(feature) {
    // List of ISO certified test names from the scope (Biological + Chemical)
    const isoCertifiedTests = [
        // Biological tests
        'aerobic plate count',
        'staphylococcus aureus',
        'total coliform',
        'e. coli',
        'yeast and mold',
        'listeria monocytogenes',
        'listeria spp',
        'salmonella',
        'stec',
        'heterotrophic plate count',
        'hpc',
        'pseudomonas aeruginosa',
        'fecal coliform',
        'enterococci',
        'endotoxins',
        // Chemical tests
        'total nitrogen',
        'metals by icp',
        'phosphorous',
        'potassium',
        'arsenic',
        'barium',
        'cadmium',
        'chromium',
        'cobalt',
        'copper',
        'mercury',
        'molybdenum',
        'lead',
        'selenium',
        'zinc',
        'humic',
        'fulvic acid',
        'moisture content',
        'ash content',
        'organic matter',
        'cannabinoids',
        'thc'
    ];
    
    const lowerFeature = feature.toLowerCase();
    return isoCertifiedTests.some(isoTest => 
        lowerFeature.includes(isoTest) ||
        lowerFeature.includes('microbial') ||
        lowerFeature.includes('bacteria') ||
        lowerFeature.includes('pathogen') ||
        lowerFeature.includes('microbiology') ||
        lowerFeature.includes('coliform') ||
        lowerFeature.includes('e. coli') ||
        lowerFeature.includes('nitrogen') ||
        lowerFeature.includes('phosphorus') ||
        lowerFeature.includes('potassium') ||
        lowerFeature.includes('heavy metals') ||
        lowerFeature.includes('metals')
    );
}

// Function to check if a package contains ISO certified tests (kept for package-level highlighting if needed)
function isISOcertifiedPackage(package, test) {
    // List of ISO certified test names from the scope (Biological + Chemical)
    const isoCertifiedTests = [
        // Biological tests
        'aerobic plate count',
        'staphylococcus aureus',
        'total coliform',
        'e. coli',
        'yeast and mold',
        'listeria monocytogenes',
        'listeria spp',
        'salmonella',
        'stec',
        'heterotrophic plate count',
        'hpc',
        'pseudomonas aeruginosa',
        'fecal coliform',
        'enterococci',
        'endotoxins',
        // Chemical tests
        'total nitrogen',
        'metals by icp',
        'phosphorous',
        'potassium',
        'arsenic',
        'barium',
        'cadmium',
        'chromium',
        'cobalt',
        'copper',
        'mercury',
        'molybdenum',
        'lead',
        'selenium',
        'zinc',
        'humic',
        'fulvic acid',
        'moisture content',
        'ash content',
        'organic matter',
        'cannabinoids',
        'thc'
    ];
    
    // Check if any feature in the package matches ISO certified tests
    return package.features.some(feature => {
        const lowerFeature = feature.toLowerCase();
        return isoCertifiedTests.some(isoTest => 
            lowerFeature.includes(isoTest) ||
            lowerFeature.includes('microbial') ||
            lowerFeature.includes('bacteria') ||
            lowerFeature.includes('pathogen') ||
            lowerFeature.includes('microbiology') ||
            lowerFeature.includes('coliform') ||
            lowerFeature.includes('e. coli') ||
            lowerFeature.includes('nitrogen') ||
            lowerFeature.includes('phosphorus') ||
            lowerFeature.includes('potassium') ||
            lowerFeature.includes('heavy metals') ||
            lowerFeature.includes('metals')
        );
    });
}

function generateTestPackagesHTML(packages, testId, categoryKey) {
    return packages.map(pkg => `
        <div class="package-item">
            <h4 class="package-title">${pkg.name}</h4>
            <p class="package-description">${pkg.description}</p>
            <ul class="package-features">
                ${pkg.features.map(feature => {
                    const isISO = isISOcertifiedTest(feature);
                    return `<li><i class="fas fa-check"></i> ${feature} ${isISO ? '<span class="iso-test-badge">ISO</span>' : ''}</li>`;
                }).join('')}
            </ul>
            <div class="package-meta">
                <span><i class="fas fa-clock"></i> ${pkg.turnaround}</span>
                <button class="btn btn-primary btn-sm" onclick="requestQuoteForPackage('${pkg.name}', '${testId}', '${categoryKey}')">
                    <i class="fas fa-envelope"></i> Request Quote
                </button>
            </div>
        </div>
    `).join('');
}

function toggleTestPackages(testId) {
    const packages = document.getElementById(`packages-${testId}`);
    if (packages) {
        packages.classList.toggle('expanded');
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('searchSuggestions');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length < 2) {
            suggestions.style.display = 'none';
            return;
        }
        
        // Debounce search
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });
}

function performSearch(query) {
    const suggestions = document.getElementById('searchSuggestions');
    const results = searchTests(query);
    
    if (results.length === 0) {
        suggestions.style.display = 'none';
        return;
    }
    
    const html = results.map(result => `
        <div class="suggestion-item" onclick="selectSearchResult('${result.type}', '${result.id}')">
            <strong>${result.name}</strong>
            <span class="suggestion-category">${result.category}</span>
        </div>
    `).join('');
    
    suggestions.innerHTML = html;
    suggestions.style.display = 'block';
}

function searchTests(query) {
    // Check cache first
    if (searchCache.has(query)) {
        return searchCache.get(query);
    }
    
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    Object.entries(testData).forEach(([categoryKey, category]) => {
        // Search category names
        if (category.name.toLowerCase().includes(lowerQuery)) {
            results.push({
                type: 'category',
                id: categoryKey,
                name: category.name,
                category: 'Category'
            });
        }
        
        // Search subcategories
        if (category.subcategories) {
            category.subcategories.forEach(subcategory => {
                if (subcategory.name.toLowerCase().includes(lowerQuery) || 
                    subcategory.description.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        type: 'subcategory',
                        id: subcategory.id,
                        name: subcategory.name,
                        category: `${category.name} - Subcategory`
                    });
                }
                
                // Search tests within subcategories
                if (subcategory.tests) {
                    subcategory.tests.forEach(test => {
                        if (test.name.toLowerCase().includes(lowerQuery) || 
                            test.description.toLowerCase().includes(lowerQuery)) {
                            results.push({
                                type: 'test',
                                id: test.id,
                                name: test.name,
                                category: `${category.name} - ${subcategory.name}`
                            });
                        }
                    });
                }
            });
        }
    });
    
    const limitedResults = results.slice(0, 10); // Limit to 10 results
    
    // Cache the results
    searchCache.set(query, limitedResults);
    
    // Limit cache size to prevent memory issues
    if (searchCache.size > 100) {
        const firstKey = searchCache.keys().next().value;
        searchCache.delete(firstKey);
    }
    
    return limitedResults;
}

function selectSearchResult(type, id) {
    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('searchSuggestions');
    
    searchInput.value = '';
    suggestions.style.display = 'none';
    
    if (type === 'category') {
        viewCategoryDetails(id);
    } else if (type === 'subcategory') {
        // Find and display the subcategory
        Object.entries(testData).forEach(([categoryKey, category]) => {
            const subcategory = category.subcategories?.find(sub => sub.id === id);
            if (subcategory) {
                viewSubcategoryTests(categoryKey, id);
            }
        });
    } else if (type === 'test') {
        // Find and display the test
        Object.entries(testData).forEach(([categoryKey, category]) => {
            if (category.subcategories) {
                category.subcategories.forEach(subcategory => {
                    const test = subcategory.tests?.find(t => t.id === id);
                    if (test) {
                        viewSubcategoryTests(categoryKey, subcategory.id);
                        // Scroll to the specific test
                        setTimeout(() => {
                            const testElement = document.querySelector(`[data-test-id="${id}"]`);
                            if (testElement) {
                                testElement.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 100);
                    }
                });
            }
        });
    }
}

// Filter functionality
function setupFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const turnaroundFilter = document.getElementById('turnaroundFilter');
    
    categoryFilter.addEventListener('change', applyFilters);
    turnaroundFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const turnaroundFilter = document.getElementById('turnaroundFilter').value;
    
    let filteredData = { ...testData };
    
    // Apply category filter
    if (categoryFilter) {
        filteredData = { [categoryFilter]: testData[categoryFilter] };
    }
    
    // Apply turnaround filter
    if (turnaroundFilter) {
        Object.keys(filteredData).forEach(categoryKey => {
            const category = filteredData[categoryKey];
            if (category.subcategories) {
                const filteredSubcategories = category.subcategories.map(subcategory => {
                    if (subcategory.tests) {
                        const filteredTests = subcategory.tests.filter(test => {
                            const turnaround = test.turnaround.toLowerCase();
                            switch (turnaroundFilter) {
                                case 'quick':
                                    return turnaround.includes('3-5') || turnaround.includes('1-3');
                                case 'standard':
                                    return turnaround.includes('4-7') || turnaround.includes('5-7');
                                case 'extended':
                                    return turnaround.includes('8+') || turnaround.includes('7-10');
                                default:
                                    return true;
                            }
                        });
                        return { ...subcategory, tests: filteredTests };
                    }
                    return subcategory;
                }).filter(subcategory => !subcategory.tests || subcategory.tests.length > 0);
                
                if (filteredSubcategories.length === 0) {
                    delete filteredData[categoryKey];
                } else {
                    filteredData[categoryKey] = { ...category, subcategories: filteredSubcategories };
                }
            }
        });
    }
    
    // Update active filters display
    updateActiveFilters(categoryFilter, turnaroundFilter);
    
    // Display filtered results
    displayServices(testData, filteredData);
}

function updateActiveFilters(categoryFilter, turnaroundFilter) {
    const activeFilters = document.getElementById('activeFilters');
    let html = '';
    
    if (categoryFilter) {
        const categoryName = testData[categoryFilter]?.name || categoryFilter;
        html += `
            <div class="filter-tag">
                Category: ${categoryName}
                <button onclick="clearFilter('category')">×</button>
            </div>
        `;
    }
    
    if (turnaroundFilter) {
        const turnaroundName = {
            'quick': 'Quick (1-3 days)',
            'standard': 'Standard (4-7 days)',
            'extended': 'Extended (8+ days)'
        }[turnaroundFilter];
        
        html += `
            <div class="filter-tag">
                Turnaround: ${turnaroundName}
                <button onclick="clearFilter('turnaround')">×</button>
            </div>
        `;
    }
    
    activeFilters.innerHTML = html;
}

function clearFilter(filterType) {
    if (filterType === 'category') {
        document.getElementById('categoryFilter').value = '';
    } else if (filterType === 'turnaround') {
        document.getElementById('turnaroundFilter').value = '';
    }
    
    applyFilters();
}

// View toggle functionality
function toggleView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    // Update container class
    const container = document.getElementById('servicesContainer');
    if (container) {
        container.className = `services-container ${view}-view`;
    }
}

// Quote form functionality
function openQuoteForm(testId = null, categoryKey = null) {
    const modal = document.getElementById('quoteModal');
    const selectedTestsContainer = document.getElementById('selectedTests');
    
    // Reset form
    currentStep = 1;
    selectedTests = [];
    
    // Add initial test if provided
    if (testId && categoryKey) {
        const test = testData[categoryKey]?.tests.find(t => t.id === testId);
        if (test) {
            selectedTests.push({
                id: test.id,
                name: test.name,
                category: testData[categoryKey].name,
                description: test.description
            });
        }
    }
    
    updateSelectedTestsDisplay();
    updateFormStep();
    modal.classList.add('active');
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeQuoteForm() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    
    // Reset form
    document.getElementById('quoteForm').reset();
    currentStep = 1;
    selectedTests = [];
}

// Old cart functions removed - now using direct email quote requests

function updateSelectedTestsDisplay() {
    const container = document.getElementById('selectedTests');
    
    if (selectedTests.length === 0) {
        container.innerHTML = '<p>No tests selected</p>';
        return;
    }
    
    const html = selectedTests.map(test => `
        <div class="selected-test">
            <div class="selected-test-info">
                <h4>${test.name}</h4>
                <p>${test.category} - ${test.description}</p>
            </div>
            <button class="remove-test" onclick="removeSelectedTest('${test.id}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function removeSelectedTest(testId) {
    selectedTests = selectedTests.filter(test => test.id !== testId);
    updateSelectedTestsDisplay();
}

function addMoreTests() {
    const modal = document.getElementById('testSelectionModal');
    const container = document.getElementById('testSelectionContainer');
    
    // Generate test selection interface
    let html = '';
    
    Object.entries(testData).forEach(([categoryKey, category]) => {
        html += `
            <div class="test-category">
                <h3>${category.name}</h3>
                <div class="test-list">
                    ${category.subcategories.map(subcategory => `
                        <div class="subcategory-section">
                            <h4>${subcategory.name}</h4>
                            ${subcategory.tests.map(test => `
                                <div class="test-item" onclick="addTestToQuote('${test.id}', '${categoryKey}')">
                                    <div class="test-info">
                                        <h5>${test.name}</h5>
                                        <p>${test.description}</p>
                                    </div>
                                    <button class="btn btn-primary btn-sm">Add</button>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    modal.classList.add('active');
}

function addTestToQuote(testId, categoryKey) {
    const category = testData[categoryKey];
    let test = null;
    let subcategoryName = '';
    
    // Find the test in subcategories
    if (category.subcategories) {
        for (const subcategory of category.subcategories) {
            if (subcategory.tests) {
                test = subcategory.tests.find(t => t.id === testId);
                if (test) {
                    subcategoryName = subcategory.name;
                    break;
                }
            }
        }
    }
    
    if (test) {
        selectedTests.push({
            id: test.id,
            name: test.name,
            category: `${category.name} - ${subcategoryName}`,
            description: test.description
        });
        updateSelectedTestsDisplay();
        closeTestSelection();
    }
}

function closeTestSelection() {
    const modal = document.getElementById('testSelectionModal');
    modal.classList.remove('active');
}

function changeStep(direction) {
    const steps = document.querySelectorAll('.form-step');
    const totalSteps = steps.length;
    
    if (direction === 1 && currentStep < totalSteps) {
        currentStep++;
    } else if (direction === -1 && currentStep > 1) {
        currentStep--;
    }
    
    updateFormStep();
}

function updateFormStep() {
    const steps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Update step visibility
    steps.forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });
    
    // Update button visibility
    prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    nextBtn.style.display = currentStep < steps.length ? 'block' : 'none';
    submitBtn.style.display = currentStep === steps.length ? 'block' : 'none';
    
    // Update progress
    const progress = (currentStep / steps.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Step ${currentStep} of ${steps.length}`;
}

// Form submission
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Add selected tests to data
    data.selectedTests = selectedTests;
    
    // Simulate form submission
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Create email content
    const emailContent = `
        New Quote Request from Motzz Laboratory Website
        
        Contact Information:
        Name: ${data.firstName} ${data.lastName}
        Email: ${data.email}
        Phone: ${data.phone}
        Company: ${data.company || 'Not provided'}
        
        Test Details:
        Urgency: ${data.urgency}
        Number of Samples: ${data.quantity}
        Sample Collection: ${data.sampleCollection}
        
        Selected Tests:
        ${selectedTests.map(test => `- ${test.name} (${test.category})`).join('\n')}
        
        Additional Comments:
        ${data.comments || 'None'}
        
        ---
        This email was sent from the Motzz Laboratory website contact form.
    `;
    
    // Send email using EmailJS
    sendQuoteEmail(data, emailContent, submitBtn, originalText);
});

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Navigation functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150; // Offset for better UX
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Throttled scroll handler for better performance
let scrollTimeout;
function throttledScrollHandler() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavLink, 10);
}

function updateBreadcrumb(items) {
    const breadcrumb = document.getElementById('breadcrumb');
    const html = items.map((item, index) => {
        if (index === items.length - 1) {
            return `<span>${item.name}</span>`;
        }
        if (item.onclick) {
            return `<a href="#" onclick="${item.onclick}; return false;">${item.name}</a>`;
        }
        if (item.href) {
            return `<a href="${item.href}">${item.name}</a>`;
        }
        return `<span>${item.name}</span>`;
    }).join(' > ');
    
    breadcrumb.innerHTML = html;
}

// Mobile menu functionality
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    nav.classList.toggle('mobile-active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('mobile-active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const body = document.body;

    nav.classList.remove('mobile-active');
    body.style.overflow = '';
}


// Event listeners setup
function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Update active navigation link on scroll (throttled for performance)
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (nav.classList.contains('mobile-active') && 
            !nav.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
}

// Accessibility features
function setupAccessibility() {
    // Add ARIA labels and roles
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
    });
    
    // Add keyboard navigation for service cards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            if (focused.classList.contains('service-card')) {
                e.preventDefault();
                focused.click();
            }
        }
    });
}

// Hover effects
function addHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Email Sending Function
function sendQuoteEmail(data, emailContent, submitBtn, originalText) {
    // Check if EmailJS is properly configured
    if (typeof emailjs === 'undefined' || 
        emailjs.init.toString().includes('YOUR_PUBLIC_KEY') ||
        !emailjs.init.toString().includes('user_')) {
        // Fallback: Use mailto link if EmailJS is not configured
        sendEmailFallback(data, emailContent, submitBtn, originalText);
        return;
    }

    // EmailJS template parameters
    const templateParams = {
        to_email: 'yacinadl@gmail.com',
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone,
        company: data.company || 'Not provided',
        urgency: data.urgency,
        quantity: data.quantity,
        sample_collection: data.sampleCollection,
        selected_tests: selectedTests.map(test => `${test.name} (${test.category})`).join('\n'),
        comments: data.comments || 'None',
        message: emailContent
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            closeQuoteForm();
            showSuccessModal();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showNotification('Quote request sent successfully!', 'success');
        }, function(error) {
            console.error('Failed to send email:', error);
            // If EmailJS fails, try fallback
            sendEmailFallback(data, emailContent, submitBtn, originalText);
        });
}

// Fallback email function using mailto
function sendEmailFallback(data, emailContent, submitBtn, originalText) {
    const subject = 'New Quote Request from Motzz Laboratory Website';
    const body = emailContent.replace(/\n/g, '%0D%0A'); // Convert newlines to URL encoding
    
    const mailtoLink = `mailto:yacinadl@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
    
    // Try to open mailto link
    try {
        window.open(mailtoLink, '_blank');
        closeQuoteForm();
        showSuccessModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification('Email client opened. Please send the email to complete your quote request.', 'success');
    } catch (error) {
        console.error('Failed to open email client:', error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification('Please email us directly at yacinadl@gmail.com with your quote request.', 'warning');
    }
}

// Success Modal Functions
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Notification System
function showNotification(message, type = 'success') {
    const toast = document.getElementById('notificationToast');
    const icon = toast.querySelector('.notification-icon');
    const messageEl = toast.querySelector('.notification-message');
    
    // Set message
    messageEl.textContent = message;
    
    // Set icon based on type
    switch (type) {
        case 'success':
            icon.className = 'notification-icon fas fa-check-circle';
            break;
        case 'error':
            icon.className = 'notification-icon fas fa-exclamation-circle';
            break;
        case 'warning':
            icon.className = 'notification-icon fas fa-exclamation-triangle';
            break;
        default:
            icon.className = 'notification-icon fas fa-info-circle';
    }
    
    // Remove existing type classes
    toast.classList.remove('success', 'error', 'warning');
    // Add new type class
    toast.classList.add(type);
    
    // Show notification
    toast.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeNotification();
    }, 5000);
}

function closeNotification() {
    const toast = document.getElementById('notificationToast');
    toast.classList.remove('show');
}

// Email Quote Request Functions
function requestQuoteForCategory(categoryKey) {
    const category = testData[categoryKey];
    if (!category) return;
    
    const subject = `Quote Request: ${category.name} Testing Services`;
    const body = `Hello Motzz Laboratory Team,

I am interested in getting a quote for ${category.name} testing services.

${category.description}

Please contact me to discuss my specific testing needs and provide a detailed quote.

Thank you,
[Your Name]
[Your Company]
[Your Phone Number]
[Your Email]`;

    openEmailClient(subject, body);
}

function requestQuoteForSubcategory(categoryKey, subcategoryId) {
    const category = testData[categoryKey];
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
    
    if (!subcategory) return;
    
    const subject = `Quote Request: ${subcategory.name} - ${category.name}`;
    const body = `Hello Motzz Laboratory Team,

I am interested in getting a quote for ${subcategory.name} testing services.

Category: ${category.name}
Service: ${subcategory.name}
Description: ${subcategory.description}

Please contact me to discuss my specific testing needs and provide a detailed quote.

Thank you,
[Your Name]
[Your Company]
[Your Phone Number]
[Your Email]`;

    openEmailClient(subject, body);
}

function requestQuoteForTest(testId, categoryKey) {
    const category = testData[categoryKey];
    let test = null;
    let subcategoryName = '';
    
    // Find the test in subcategories
    if (category.subcategories) {
        for (const subcategory of category.subcategories) {
            if (subcategory.tests) {
                test = subcategory.tests.find(t => t.id === testId);
                if (test) {
                    subcategoryName = subcategory.name;
                    break;
                }
            }
        }
    }
    
    if (!test) return;
    
    const subject = `Quote Request: ${test.name} Testing`;
    const body = `Hello Motzz Laboratory Team,

I am interested in getting a quote for ${test.name} testing.

Category: ${category.name}
Subcategory: ${subcategoryName}
Test: ${test.name}
Description: ${test.description}
Turnaround Time: ${test.turnaround}

Please contact me to discuss my specific testing needs and provide a detailed quote.

Thank you,
[Your Name]
[Your Company]
[Your Phone Number]
[Your Email]`;

    openEmailClient(subject, body);
}

function requestQuoteForPackage(packageName, testId, categoryKey) {
    const category = testData[categoryKey];
    let test = null;
    let subcategoryName = '';
    let packageDetails = null;
    
    // Find the test and package details
    if (category.subcategories) {
        for (const subcategory of category.subcategories) {
            if (subcategory.tests) {
                test = subcategory.tests.find(t => t.id === testId);
                if (test && test.packages) {
                    packageDetails = test.packages.find(pkg => pkg.name === packageName);
                    if (packageDetails) {
                        subcategoryName = subcategory.name;
                        break;
                    }
                }
            }
        }
    }
    
    if (!packageDetails) return;
    
    const subject = `Quote Request: ${packageName} Package`;
    const body = `Hello Motzz Laboratory Team,

I am interested in getting a quote for the ${packageName} package.

Category: ${category.name}
Subcategory: ${subcategoryName}
Test: ${test.name}
Package: ${packageName}
Description: ${packageDetails.description}
Turnaround Time: ${packageDetails.turnaround}

Package Features:
${packageDetails.features.map(feature => `• ${feature}`).join('\n')}

Please contact me to discuss my specific testing needs and provide a detailed quote.

Thank you,
[Your Name]
[Your Company]
[Your Phone Number]
[Your Email]`;

    openEmailClient(subject, body);
}

function openEmailClient(subject, body) {
    const email = 'yacinadl@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
        window.open(mailtoLink, '_blank');
        showNotification('Email client opened with quote request details', 'success');
    } catch (error) {
        console.error('Failed to open email client:', error);
        showNotification('Please email us directly at yacinadl@gmail.com', 'warning');
    }
}

function openGeneralQuoteForm() {
    const subject = 'General Quote Request - Laboratory Testing Services';
    const body = `Hello Motzz Laboratory Team,

I am interested in getting a quote for laboratory testing services.

Please contact me to discuss my specific testing needs and provide a detailed quote.

Thank you,
[Your Name]
[Your Company]
[Your Phone Number]
[Your Email]`;

    openEmailClient(subject, body);
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.subject || !contactData.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Create email content
    const subject = `Contact Form: ${contactData.subject} - ${contactData.firstName} ${contactData.lastName}`;
    const body = `New contact form submission:

Name: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Company: ${contactData.company || 'Not provided'}
Subject: ${contactData.subject}

Message:
${contactData.message}

---
This message was sent from the Motzz Laboratory website contact form.`;
    
    // Open email client
    openEmailClient(subject, body);
    
    // Show success message
    showNotification('Contact form opened in your email client', 'success');
    
    // Reset form
    event.target.reset();
}

// Cart functionality removed - now using direct email quote requests

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    initializeEmailJS();
    initializeContactForm();
});
