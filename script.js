// Menu data from JSON file
let menuData = null;

// Menu categories configuration
const menuCategories = [
    {
        key: 'lunch_menu',
        id: 'lunch',
        title: 'Lunch Specials',
        description: 'Available 11:00 AM to 2:30 PM Tuesday-Saturday (Except Holidays) • Entrees Include: Crab Rangoon (2), Fried Rice, Fortune Cookie'
    },
    {
        key: 'appetizers',
        id: 'appetizers',
        title: 'Appetizers'
    },
    {
        key: 'soups',
        id: 'soups',
        title: 'Soups'
    },
    {
        key: 'chef_s_specialties',
        id: 'specialties',
        title: 'Chef\'s Specialties'
    },
    {
        key: 'chicken',
        id: 'chicken',
        title: 'Chicken'
    },
    {
        key: 'pork',
        id: 'pork',
        title: 'Pork'
    },
    {
        key: 'beef',
        id: 'beef',
        title: 'Beef'
    },
    {
        key: 'seafood',
        id: 'seafood',
        title: 'Seafood'
    },
    {
        key: 'vegetables',
        id: 'vegetables',
        title: 'Vegetables'
    },
    {
        key: 'lo_mein_noodles',
        id: 'lo_mein',
        title: 'Lo Mein Noodles'
    },
    {
        key: 'chow_mein_chop_suey',
        id: 'chow_mein',
        title: 'Chow Mein & Chop Suey'
    },
    {
        key: 'eastern_popular_noodles_dishes',
        id: 'eastern_noodles',
        title: 'Eastern Popular Noodles'
    },
    {
        key: 'fried_rice',
        id: 'fried_rice',
        title: 'Fried Rice'
    },
    {
        key: 'egg_foo_young',
        id: 'egg_foo_young',
        title: 'Egg Foo Young'
    },
    {
        key: 'drinks',
        id: 'drinks',
        title: 'Beverages'
    },
    {
        key: 'sides_extras',
        id: 'sides_extras',
        title: 'Sides & Extras',
        isComposite: true // Special handling for multiple subcategories
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - starting initialization');
    showMenuLoading();
    loadMenuData();
    setupSmoothScrolling();
    setupBackToTopButton();
});

// Load menu data from JSON file
async function loadMenuData() {
    try {
        const response = await fetch('china_cafe_menu.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        menuData = await response.json();
        generateMenuNavigation();
        generateMenuCategories();
        populateAllMenuItems();
            // After populating items, add size legends where appropriate
            addSizeLegends();
        setupMenuNavigation();
    } catch (error) {
        console.error('Error loading menu data:', error);
        showMenuError();
    }
}

    // Add size legends (e.g., Pint / Quart) to categories that have items with two prices
    function addSizeLegends() {
        if (!menuData) return;

        menuCategories.forEach(category => {
            if (category.isComposite && category.id === 'sides_extras') {
                // side_orders
                const sideItems = menuData.side_orders ? menuData.side_orders.filter(i => i.name) : [];
                const extraItems = menuData.extra ? menuData.extra.filter(i => i.name) : [];
                setLegendForContainer('side_orders', sideItems);
                setLegendForContainer('extra', extraItems);
            } else {
                const items = menuData[category.key] ? menuData[category.key].filter(i => i.name) : [];
                setLegendForContainer(category.id, items);
            }
        });
    }

    function setLegendForContainer(containerIdPrefix, items) {
        // Determine if any item has both small_price and large_price
        const hasTwoSizes = items.some(it => it.small_price !== undefined && it.large_price !== undefined);
        const legendEl = document.getElementById(`${containerIdPrefix}SizesLegend`);
        if (!legendEl) return;
        if (hasTwoSizes) {
            // Allow category-specific labels
            let label = 'Pint / Quart';
            if (containerIdPrefix === 'egg_foo_young') {
                label = '2 Patties / 4 Patties';
            } else if (containerIdPrefix === 'soups') {
                // If you update the JSON to use different meaning for soups, change here.
                label = 'Pint / Quart';
            }
            legendEl.innerHTML = `<span class="menu-item-price size-legend-text">${label}</span>`;
        } else {
            // If no two-size items, clear legend (assume quart)
            legendEl.innerHTML = '';
        }
    }

// Generate navigation buttons dynamically
function generateMenuNavigation() {
    const navContainer = document.getElementById('menuNavigation');
    const mobileNavSelect = document.getElementById('mobileNavSelect');
    const mobileNavButtons = document.getElementById('mobileNavButtons');
    if (!navContainer && !mobileNavSelect && !mobileNavButtons) return;
    
    // Clear existing content
    if (navContainer) navContainer.innerHTML = '';
    if (mobileNavSelect) {
        // Keep the first option and clear the rest
        const firstOption = mobileNavSelect.querySelector('option[value=""]');
        mobileNavSelect.innerHTML = '';
        if (firstOption) mobileNavSelect.appendChild(firstOption);
    }
    if (mobileNavButtons) mobileNavButtons.innerHTML = '';
    
    menuCategories.forEach((category, index) => {
        // Generate desktop navigation buttons
        if (navContainer) {
            const button = document.createElement('button');
            button.className = `menu-cat-btn ${index === 0 ? 'active' : ''}`;
            button.setAttribute('data-category', category.id);
            button.textContent = category.title;
            navContainer.appendChild(button);
        }
        
        // Generate mobile navigation options (keeping for backward compatibility)
        if (mobileNavSelect) {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.title;
            mobileNavSelect.appendChild(option);
        }
        
        // Generate mobile scroll navigation buttons
        if (mobileNavButtons) {
            const button = document.createElement('button');
            button.className = 'mobile-nav-btn';
            button.setAttribute('data-category', category.id);
            button.textContent = category.title;
            mobileNavButtons.appendChild(button);
        }
    });
}

// Generate menu category sections dynamically
function generateMenuCategories() {
    const container = document.getElementById('menuCategoriesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    menuCategories.forEach((category, index) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = `menu-category ${index === 0 ? 'active' : ''}`;
        categoryDiv.id = category.id;
        
        let categoryHTML = `<h3>${category.title}</h3>`;
        
        if (category.description) {
            categoryHTML += `<p class="menu-description">${category.description}</p>`;
        }
        
        // Handle composite categories differently
        if (category.isComposite && category.id === 'sides_extras') {
            categoryHTML += `
                <div class="subsection-header">
                    <h4>Side Orders</h4>
                </div>
                    <div class="size-legend" id="side_ordersSizesLegend"></div>
                <div class="menu-grid" id="side_ordersItems"></div>
                <div class="subsection-header">
                    <h4>Extra Portions</h4>
                </div>
                    <div class="size-legend" id="extraSizesLegend"></div>
                <div class="menu-grid" id="extraItems"></div>
            `;
        } else {
            // All other categories use regular grid
                const gridClass = 'menu-grid';
                categoryHTML += `<div class="size-legend" id="${category.id}SizesLegend"></div><div class="${gridClass}" id="${category.id}Items"></div>`;
        }
        
        categoryDiv.innerHTML = categoryHTML;
        container.appendChild(categoryDiv);
    });
}

// Setup menu category navigation with smooth scrolling
function setupMenuNavigation() {
    const menuCategoryButtons = document.querySelectorAll('.menu-cat-btn');
    const menuCategoryDivs = document.querySelectorAll('.menu-category');
    const mobileNavSelect = document.getElementById('mobileNavSelect');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
    const mobileScrollNav = document.getElementById('mobileScrollNav');
    const scrollHint = document.querySelector('.scroll-hint');
    
    // Hide scroll hint after user interacts with mobile navigation
    let hintHidden = false;
    function hideScrollHint() {
        if (!hintHidden && scrollHint) {
            hintHidden = true;
            scrollHint.style.transition = 'all 0.3s ease-out';
            scrollHint.style.opacity = '0';
            scrollHint.style.height = '0';
            scrollHint.style.marginBottom = '0';
            scrollHint.style.paddingTop = '0';
            scrollHint.style.paddingBottom = '0';
            setTimeout(() => {
                if (scrollHint && scrollHint.parentNode) {
                    scrollHint.parentNode.removeChild(scrollHint);
                }
            }, 300);
        }
    }
    
    // Hide hint on scroll
    if (mobileScrollNav) {
        mobileScrollNav.addEventListener('scroll', hideScrollHint, { once: true });
    }
    
    // Desktop navigation
    menuCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            const targetSection = document.getElementById(category);
            
            // Update active button
            menuCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active category visually (for CSS styling)
            menuCategoryDivs.forEach(cat => cat.classList.remove('active'));
            if (targetSection) targetSection.classList.add('active');
            
            // Smooth scroll to the category with header offset
            if (targetSection) {
                scrollToSection(targetSection);
            }
        });
    });
    
    // Mobile scroll navigation
    mobileNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            const targetSection = document.getElementById(category);
            
            // Hide hint on first button click
            hideScrollHint();
            
            if (targetSection) {
                scrollToSection(targetSection);
            }
        });
    });
    
    // Mobile dropdown navigation (keeping for backward compatibility)
    if (mobileNavSelect) {
        mobileNavSelect.addEventListener('change', function() {
            const category = this.value;
            if (!category) return;
            
            const targetSection = document.getElementById(category);
            if (!targetSection) return;
            
            scrollToSection(targetSection);
            
            // Reset select to default option after scrolling
            setTimeout(() => {
                this.value = '';
            }, 500);
        });
    }
}

// Helper function for consistent scrolling behavior
function scrollToSection(targetSection) {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80; // fallback to 80px
    const offset = headerHeight + 20; // extra 20px padding
    
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Account for sticky header height
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80; // fallback to 80px
                const offset = headerHeight + 20; // extra 20px padding
                
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Populate all menu items from JSON data
function populateAllMenuItems() {
    if (!menuData) return;

    // Populate all menu categories
    populateLunchMenu();
    populateAppetizers();
    populateSoups();
    populateSpecialties();
    populateChickenDishes();
    populatePorkDishes();
    populateBeefDishes();
    populateSeafoodDishes();
    populateVegetableDishes();
    populateLoMeinNoodles();
    populateChowMeinChopSuey();
    populateEasternNoodles();
    populateFriedRice();
    populateEggFooYoung();
    populateDrinks();
    populateSidesExtras();
}

function populateLunchMenu() {
    const container = document.getElementById('lunchItems');
    if (!container || !menuData.lunch_menu) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.lunch_menu.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, null, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}

function populateAppetizers() {
    const container = document.getElementById('appetizersItems');
    if (!container || !menuData.appetizers) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.appetizers.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, false, item.gf);
        container.appendChild(menuItem);
    });
}

function populateSoups() {
    const container = document.getElementById('soupsItems');
    if (!container || !menuData.soups) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.soups.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}
function populateSpecialties() {
    const container = document.getElementById('specialtiesItems');
    if (!container || !menuData.chef_s_specialties) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.chef_s_specialties.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}

function populateChickenDishes() {
    const container = document.getElementById('chickenItems');
    if (!container || !menuData.chicken) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.chicken.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}

function populatePorkDishes() {
    const container = document.getElementById('porkItems');
    if (!container || !menuData.pork) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.pork.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}

function populateBeefDishes() {
    const container = document.getElementById('beefItems');
    if (!container || !menuData.beef) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.beef.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}

function populateSeafoodDishes() {
    const container = document.getElementById('seafoodItems');
    if (!container || !menuData.seafood) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.seafood.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}

function populateVegetableDishes() {
    const container = document.getElementById('vegetablesItems');
    if (!container || !menuData.vegetables) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.vegetables.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}

// Populate menu items from JSON data (legacy function - now handled by populateAllMenuItems)
function populateMenuItems() {
    populateAllMenuItems();
}


function populateLoMeinNoodles() {
    const container = document.getElementById('lo_meinItems');
    if (!container || !menuData.lo_mein_noodles) return;
    
    container.innerHTML = '';
    
    const menuItems = menuData.lo_mein_noodles.filter(item => item.name);
    const note = menuData.lo_mein_noodles.find(item => item.note)?.note;
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, null, prices, note, false, item.gf);
        container.appendChild(menuItem);
    });
}

function populateChowMeinChopSuey() {
    const container = document.getElementById('chow_meinItems');
    if (!container || !menuData.chow_mein_chop_suey) return;
    
    container.innerHTML = '';
    
    const menuItems = menuData.chow_mein_chop_suey.filter(item => item.name);
    const note = menuData.chow_mein_chop_suey.find(item => item.note)?.note;
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, null, prices, note, false, item.gf);
        container.appendChild(menuItem);
    });
}

function populateEasternNoodles() {
    const container = document.getElementById('eastern_noodlesItems');
    if (!container || !menuData.eastern_popular_noodles_dishes) return;
    
    container.innerHTML = '';
    
    const menuItems = menuData.eastern_popular_noodles_dishes.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
        container.appendChild(menuItem);
    });
}

function populateFriedRice() {
    const container = document.getElementById('fried_riceItems');
    if (!container || !menuData.fried_rice) return;
    
    container.innerHTML = '';
    
    const menuItems = menuData.fried_rice.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
        container.appendChild(menuItem);
    });
}

function populateEggFooYoung() {
    const container = document.getElementById('egg_foo_youngItems');
    if (!container || !menuData.egg_foo_young) return;
    
    container.innerHTML = '';
    
    const menuItems = menuData.egg_foo_young.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
        container.appendChild(menuItem);
    });
}

function populateDrinks() {
    const container = document.getElementById('drinksItems');
    if (!container || !menuData.drinks) return;
    
    container.innerHTML = '';
    
    const menuItems = menuData.drinks.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
        container.appendChild(menuItem);
    });
}

function populateSidesExtras() {
    // This function populates the combined Sides & Extras section
    // The HTML structure is created by generateMenuCategories with subsection headers
    
    // Populate Side Orders subsection
    const sideOrdersContainer = document.getElementById('side_ordersItems');
    if (sideOrdersContainer && menuData.side_orders) {
        sideOrdersContainer.innerHTML = '';
        const menuItems = menuData.side_orders.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            sideOrdersContainer.appendChild(menuItem);
        });
    }
    
    // Populate Extra Portions subsection
    const extraContainer = document.getElementById('extraItems');
    if (extraContainer && menuData.extra) {
        extraContainer.innerHTML = '';
        const menuItems = menuData.extra.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            extraContainer.appendChild(menuItem);
        });
    }
}



// Helper function to get properly formatted price from menu item
function getPrice(item) {
    if (item.small_price && item.large_price) {
        return { small: item.small_price, large: item.large_price };
    } else if (item.large_price) {
        return item.large_price;
    } else if (item.price) {
        return item.price;
    } else {
        return 0; // fallback
    }
}

// Helper function to create menu item HTML
function createMenuItem(name, description, price, note, isHot, isGlutenFree = false) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    
    const nameClass = isHot ? 'menu-item-name hot' : 'menu-item-name';
    const gfIcon = isGlutenFree ? ' <span class="gf-indicator">GF</span>' : '';
    
    let priceHTML = '';
    if (typeof price === 'object' && price && price.small && price.large) {
        priceHTML = `<span class="menu-item-price">$${(price.small || 0).toFixed(2)} / $${(price.large || 0).toFixed(2)}</span>`;
    } else if (price !== undefined && price !== null) {
        priceHTML = `<span class="menu-item-price">$${(price || 0).toFixed(2)}</span>`;
    } else {
        priceHTML = `<span class="menu-item-price">Price not available</span>`;
    }
    
    div.innerHTML = `
        <div class="menu-item-header">
            <h4 class="${nameClass}">${name}${gfIcon}</h4>
            ${priceHTML}
        </div>
        ${description ? `<p class="menu-item-description">${description}</p>` : ''}
        ${note ? `<p class="menu-item-note">${note}</p>` : ''}
    `;
    
    return div;
}

// Helper function to create specialty item HTML
function createSpecialtyItem(name, description, price, isHot) {
    const div = document.createElement('div');
    div.className = 'specialty-item';
    
    const nameClass = isHot ? 'hot' : '';
    const hotIcon = isHot ? ' 🌶️' : '';
    
    div.innerHTML = `
        <h4 class="${nameClass}">${name}${hotIcon}</h4>
        <p>${description}</p>
        <div class="specialty-price">$${price.toFixed(2)}</div>
    `;
    
    return div;
}

// Helper function to check if a dish is hot/spicy
function isHotDish(name) {
    return name.toLowerCase().includes('(hot)') || 
           name.toLowerCase().includes('hot') || 
           name.toLowerCase().includes('spicy') ||
           name.toLowerCase().includes('szechuan') ||
           name.toLowerCase().includes('kung pao') ||
           name.toLowerCase().includes('hunan') ||
           name.toLowerCase().includes('curry');
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(47, 79, 47, 0.95) 0%, rgba(27, 59, 27, 0.95) 100%)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--dark-green) 0%, var(--forest-green) 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items for animation
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for menu items to be populated
    setTimeout(() => {
        document.querySelectorAll('.menu-item, .specialty-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(item);
        });
    }, 1000);
});

// Add click-to-call functionality for phone numbers
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For desktop users, show an alert
            if (window.innerWidth > 768 && !('ontouchstart' in window)) {
                e.preventDefault();
                alert('Call (269) 637-8591 to place your order!');
            }
        });
    });
});

// Add loading state for menu
function showMenuLoading() {
    const container = document.getElementById('menuCategoriesContainer');
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--gray-medium);">Loading menu items...</div>';
    }
    
    const navContainer = document.getElementById('menuNavigation');
    if (navContainer) {
        navContainer.innerHTML = '<div style="text-align: center; padding: 1rem; color: var(--gray-medium);">Loading navigation...</div>';
    }
}



// Add error handling for menu loading
function showMenuError() {
    const container = document.getElementById('menuCategoriesContainer');
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--primary-red);">Error loading menu. Please refresh the page.<br><small>Check browser console for details.</small></div>';
    }
    
    const navContainer = document.getElementById('menuNavigation');
    if (navContainer) {
        navContainer.innerHTML = '<div style="text-align: center; padding: 1rem; color: var(--primary-red);">Error loading navigation.</div>';
    }
}

// Back to Top Button Functionality
function setupBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    // Smooth scroll to top of menu section
    function scrollToTop() {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            // Get header height to offset scroll position
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80; // fallback to 80px
            const offset = headerHeight + 20; // extra 20px padding
            
            const elementPosition = menuSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback to page top if menu section not found
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Event listeners
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleBackToTopButton();
}
