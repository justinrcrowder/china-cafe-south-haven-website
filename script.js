// Menu data from JSON file
let menuData = null;

// DOM elements
const menuCategoryButtons = document.querySelectorAll('.menu-cat-btn');
const menuCategories = document.querySelectorAll('.menu-category');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - starting initialization');
    loadMenuData();
    setupMenuNavigation();
    setupSmoothScrolling();
});

// Load menu data from JSON file
async function loadMenuData() {
    try {
        const response = await fetch('china_cafe_menu.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        menuData = await response.json();
        populateMenuItems();
    } catch (error) {
        console.error('Error loading menu data:', error);
        showMenuError();
    }
}

// Setup menu category navigation
function setupMenuNavigation() {
    menuCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            menuCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active category
            menuCategories.forEach(cat => cat.classList.remove('active'));
            document.getElementById(category).classList.add('active');
        });
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function populateSpecialties() {
    const container = document.getElementById('specialtiesItems');
    if (!container || !menuData.chef_s_specialties) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.chef_s_specialties.filter(item => item.name);
    menuItems.forEach(item => {
        const price = getPrice(item);
        // For specialties, use the single price value (could be price or large_price)
        const priceValue = typeof price === 'object' ? (price.large || price.small || price) : price;
        const specialtyItem = createSpecialtyItem(item.name, item.description, priceValue, isHotDish(item.name));
        container.appendChild(specialtyItem);
    });
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
    const container = document.getElementById('appetizerItems');
    if (!container || !menuData.appetizers) return;
    
    container.innerHTML = '';
    
    menuData.appetizers.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, item.note, prices, null, false, item.gf);
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
    const container = document.getElementById('vegetableItems');
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

// Populate menu items from JSON data
function populateMenuItems() {
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
    populateNoodlesAndRice();
    populateSides();
}

function populateAppetizers() {
    const container = document.getElementById('appetizerItems');
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
    const container = document.getElementById('soupItems');
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

function populateVegetableDishes() {
    const container = document.getElementById('vegetableItems');
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

function populateNoodlesAndRice() {
    const noodleContainer = document.getElementById('noodleItems');
    const riceContainer = document.getElementById('riceItems');
    
    if (!noodleContainer || !riceContainer) return;
    
    // Clear containers
    noodleContainer.innerHTML = '';
    riceContainer.innerHTML = '';
    
    // Add Lo Mein dishes
    if (menuData.lo_mein_noodles) {
        const menuItems = menuData.lo_mein_noodles.filter(item => item.name);
        const note = menuData.lo_mein_noodles.find(item => item.note)?.note;
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, note, false, item.gf);
            noodleContainer.appendChild(menuItem);
        });
    }
    
    // Add Chow Mein dishes
    if (menuData.chow_mein_chop_suey) {
        const menuItems = menuData.chow_mein_chop_suey.filter(item => item.name);
        const note = menuData.chow_mein_chop_suey.find(item => item.note)?.note;
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, note, false, item.gf);
            noodleContainer.appendChild(menuItem);
        });
    }
    
    // Add Eastern Popular Noodles
    if (menuData.eastern_popular_noodles_dishes) {
        const menuItems = menuData.eastern_popular_noodles_dishes.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name), item.gf);
            noodleContainer.appendChild(menuItem);
        });
    }
    
    // Add Fried Rice dishes
    if (menuData.fried_rice) {
        const menuItems = menuData.fried_rice.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            riceContainer.appendChild(menuItem);
        });
    }
    
    // Add Egg Foo Young dishes
    if (menuData.egg_foo_young) {
        const menuItems = menuData.egg_foo_young.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            riceContainer.appendChild(menuItem);
        });
    }
}

function populateRiceDishes() {
    const container = document.getElementById('riceItems');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Add Fried Rice dishes
    if (menuData.fried_rice) {
        const menuItems = menuData.fried_rice.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            container.appendChild(menuItem);
        });
    }
    
    // Add Egg Foo Young dishes
    if (menuData.egg_foo_young) {
        const menuItems = menuData.egg_foo_young.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            container.appendChild(menuItem);
        });
    }
}

function populateSpecialties() {
    const container = document.getElementById('specialtiesItems');
    if (!container || !menuData.chef_s_specialties) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.chef_s_specialties.filter(item => item.name);
    menuItems.forEach(item => {
        const price = getPrice(item);
        // For specialties, use the single price value (could be price or large_price)
        const priceValue = typeof price === 'object' ? (price.large || price.small || price) : price;
        const specialtyItem = createSpecialtyItem(item.name, item.description, priceValue, isHotDish(item.name));
        container.appendChild(specialtyItem);
    });
}

function populateWeightWatchers() {
    const container = document.getElementById('weightWatchersItems');
    if (!container || !menuData.weight_watchers_menu) return;
    
    container.innerHTML = '';
    
    // Filter out note objects and process only menu items
    const menuItems = menuData.weight_watchers_menu.filter(item => item.name);
    menuItems.forEach(item => {
        const prices = getPrice(item);
        const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
        container.appendChild(menuItem);
    });
}

function populateSides() {
    const container = document.getElementById('sideItems');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Add side orders section
    if (menuData.side_orders) {
        // Add section header
        const sideHeader = document.createElement('div');
        sideHeader.className = 'subsection-header';
        sideHeader.innerHTML = '<h4>Side Orders</h4>';
        container.appendChild(sideHeader);
        
        const menuItems = menuData.side_orders.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            container.appendChild(menuItem);
        });
    }
    
    // Add drinks section
    if (menuData.drinks) {
        // Add section header
        const drinkHeader = document.createElement('div');
        drinkHeader.className = 'subsection-header';
        drinkHeader.innerHTML = '<h4>Beverages</h4>';
        container.appendChild(drinkHeader);
        
        const menuItems = menuData.drinks.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            container.appendChild(menuItem);
        });
    }
    
    // Add extra items section
    if (menuData.extra) {
        // Add section header
        const extraHeader = document.createElement('div');
        extraHeader.className = 'subsection-header';
        extraHeader.innerHTML = '<h4>Extra Portions</h4>';
        container.appendChild(extraHeader);
        
        const menuItems = menuData.extra.filter(item => item.name);
        menuItems.forEach(item => {
            const prices = getPrice(item);
            const menuItem = createMenuItem(item.name, null, prices, null, false, item.gf);
            container.appendChild(menuItem);
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
        priceHTML = `
            <div class="menu-item-prices">
                <span class="price-option">Small $${(price.small || 0).toFixed(2)}</span>
                <span class="price-option">Large $${(price.large || 0).toFixed(2)}</span>
            </div>
        `;
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
    const menuContainers = [
        'lunchItems', 'appetizerItems', 'soupItems', 'specialtiesItems', 
        'chickenItems', 'porkItems', 'beefItems', 'seafoodItems', 
        'vegetableItems', 'noodleItems', 'riceItems'
    ];
    
    menuContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--gray-medium);">Loading menu items...</div>';
        }
    });
}

// Show loading state initially
document.addEventListener('DOMContentLoaded', function() {
    showMenuLoading();
});

// Add error handling for menu loading
function showMenuError() {
    const menuContainers = [
        'lunchItems', 'appetizerItems', 'soupItems', 'specialtiesItems', 
        'chickenItems', 'porkItems', 'beefItems', 'seafoodItems', 
        'vegetableItems', 'noodleItems', 'riceItems'
    ];
    
    menuContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--primary-red);">Error loading menu. Please refresh the page.<br><small>Check browser console for details.</small></div>';
        }
    });
}
