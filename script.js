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
                id: 'soil-plant-testing',
                name: 'Soil & Plant Testing',
                description: 'Comprehensive soil and plant analysis for agricultural optimization.',
                icon: 'fas fa-seedling',
                tests: [
                    {
                        id: 'soil-analysis',
                        name: 'Soil Analysis',
                        description: 'Complete soil testing for nutrient content, pH, and soil health assessment.',
                        icon: 'fas fa-mountain',
                        tests: 3,
                        turnaround: '5-7 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Basic Soil Package',
                                description: 'Essential soil nutrients and pH testing.',
                                features: ['pH Level', 'Organic Matter', 'Phosphorus', 'Potassium', 'Recommendations'],
                                turnaround: '3-5 days'
                            },
                            {
                                name: 'Complete Soil Analysis',
                                description: 'Comprehensive soil analysis with micronutrients.',
                                features: ['All Basic Package items', 'Micronutrients', 'Heavy Metals', 'Salinity', 'CEC (Cation Exchange Capacity)', 'Detailed Report'],
                                turnaround: '5-7 days'
                            },
                            {
                                name: 'Heavy Metals Screening',
                                description: 'Specialized testing for heavy metal contamination.',
                                features: ['Lead', 'Cadmium', 'Mercury', 'Arsenic', 'Chromium', 'Compliance Report'],
                                turnaround: '7-10 days'
                            }
                        ]
                    },
                    {
                        id: 'plant-tissue-analysis',
                        name: 'Plant/Tissue Analysis',
                        description: 'Plant tissue and petiole analysis for nutrient deficiency diagnosis.',
                        icon: 'fas fa-leaf',
                        tests: 2,
                        turnaround: '3-5 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Basic Plant Analysis',
                                description: 'Essential plant nutrient analysis.',
                                features: ['Nitrogen', 'Phosphorus', 'Potassium', 'Basic Recommendations'],
                                turnaround: '3-5 days'
                            },
                            {
                                name: 'Complete Plant Analysis',
                                description: 'Comprehensive plant tissue analysis.',
                                features: ['All Basic items', 'Micronutrients', 'Heavy Metals', 'Detailed Report'],
                                turnaround: '5-7 days'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'water-irrigation',
                name: 'Water & Irrigation',
                description: 'Water quality testing for agricultural irrigation and water management.',
                icon: 'fas fa-tint',
                tests: [
                    {
                        id: 'water-quality',
                        name: 'Water Quality',
                        description: 'Irrigation water quality testing for agricultural use.',
                        icon: 'fas fa-tint',
                        tests: 2,
                        turnaround: '4-6 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Basic Water Analysis',
                                description: 'Essential water quality parameters.',
                                features: ['pH', 'EC', 'Total Dissolved Solids', 'Basic Recommendations'],
                                turnaround: '4-6 days'
                            },
                            {
                                name: 'Complete Water Analysis',
                                description: 'Comprehensive water quality testing.',
                                features: ['All Basic items', 'Nutrients', 'Heavy Metals', 'Bacteria', 'Detailed Report'],
                                turnaround: '6-8 days'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'materials-amendments',
                name: 'Materials & Amendments',
                description: 'Testing for compost, mulch, and fertilizer products used in agriculture.',
                icon: 'fas fa-recycle',
                tests: [
                    {
                        id: 'compost-mulch',
                        name: 'Compost/Mulch',
                        description: 'Compost and mulch quality testing for soil amendment.',
                        icon: 'fas fa-recycle',
                        tests: 2,
                        turnaround: '6-8 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Basic Compost Analysis',
                                description: 'Essential compost quality parameters.',
                                features: ['Organic Matter', 'pH', 'Nutrients', 'Basic Recommendations'],
                                turnaround: '6-8 days'
                            },
                            {
                                name: 'Complete Compost Analysis',
                                description: 'Comprehensive compost and mulch testing.',
                                features: ['All Basic items', 'Heavy Metals', 'Pathogens', 'Stability', 'Detailed Report'],
                                turnaround: '8-10 days'
                            }
                        ]
                    },
                    {
                        id: 'fertilizer-analysis',
                        name: 'Fertilizer Analysis',
                        description: 'Liquid and solid fertilizer testing for quality assurance.',
                        icon: 'fas fa-flask',
                        tests: 2,
                        turnaround: '4-6 days',
                        category: 'agriculture',
                        packages: [
                            {
                                name: 'Basic Fertilizer Analysis',
                                description: 'Essential fertilizer nutrient analysis.',
                                features: ['NPK Analysis', 'pH', 'Basic Quality Check'],
                                turnaround: '4-6 days'
                            },
                            {
                                name: 'Complete Fertilizer Analysis',
                                description: 'Comprehensive fertilizer testing.',
                                features: ['All Basic items', 'Micronutrients', 'Heavy Metals', 'Contaminants', 'Detailed Report'],
                                turnaround: '6-8 days'
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
    microbiology: {
        name: 'Microbiology',
        description: 'Microbiology testing for water and fertilizer products.',
        icon: 'fas fa-microscope',
        subcategories: [
            {
                id: 'microbiological-testing',
                name: 'Microbiological Testing',
                description: 'Comprehensive microbiological testing for water and fertilizer products.',
                icon: 'fas fa-microscope',
                tests: [
                    {
                        id: 'water-microbiology',
                        name: 'Water Microbiology',
                        description: 'Microbiological testing for water quality and safety.',
                        icon: 'fas fa-tint',
                        tests: 2,
                        turnaround: '3-5 days',
                        category: 'microbiology',
                        packages: [
                            {
                                name: 'Basic Water Microbiology',
                                description: 'Essential water microbiology testing.',
                                features: ['Total Coliforms', 'E. coli', 'Basic Bacteria'],
                                turnaround: '3-5 days'
                            },
                            {
                                name: 'Complete Water Microbiology',
                                description: 'Comprehensive water microbiology testing.',
                                features: ['All Basic items', 'Pathogens', 'Detailed Report'],
                                turnaround: '5-7 days'
                            }
                        ]
                    },
                    {
                        id: 'fertilizer-microbiology',
                        name: 'Fertilizer Microbiology',
                        description: 'Microbiological testing for fertilizer products.',
                        icon: 'fas fa-flask',
                        tests: 2,
                        turnaround: '4-6 days',
                        category: 'microbiology',
                        packages: [
                            {
                                name: 'Basic Fertilizer Microbiology',
                                description: 'Essential fertilizer microbiology testing.',
                                features: ['Total Bacteria', 'Pathogens', 'Basic Analysis'],
                                turnaround: '4-6 days'
                            },
                            {
                                name: 'Complete Fertilizer Microbiology',
                                description: 'Comprehensive fertilizer microbiology testing.',
                                features: ['All Basic items', 'Detailed Pathogen Analysis', 'Detailed Report'],
                                turnaround: '6-8 days'
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
}

// Initialize EmailJS
function initializeEmailJS() {
    // Initialize EmailJS with your public key
    // You'll need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
}

function initializeWebsite() {
    loadServices();
    setupEventListeners();
    setupSearch();
    setupFilters();
    setupAccessibility();
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

function generateTestPackagesHTML(packages, testId, categoryKey) {
    return packages.map(pkg => `
        <div class="package-item">
            <h4 class="package-title">${pkg.name}</h4>
            <p class="package-description">${pkg.description}</p>
            <ul class="package-features">
                ${pkg.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
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
    
    return results.slice(0, 10); // Limit to 10 results
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
    nav.classList.toggle('mobile-active');
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
            }
        });
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
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
