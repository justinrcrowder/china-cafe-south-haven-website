// Menu data from JSON file
let menuData = null;

// DOM elements
const menuCategoryButtons = document.querySelectorAll('.menu-cat-btn');
const menuCategories = document.querySelectorAll('.menu-category');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadMenuData();
    setupMenuNavigation();
    setupSmoothScrolling();
});

// Load menu data from JSON file
async function loadMenuData() {
    try {
        const response = await fetch('menu-info.json');
        if (!response.ok) {
            throw new Error('Failed to load menu data');
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

// Populate menu items from JSON data
function populateMenuItems() {
    if (!menuData) return;

    // Populate lunch menu
    populateLunchMenu();
    
    // Populate appetizers
    populateAppetizers();
    
    // Populate chicken dishes
    populateChickenDishes();
    
    // Populate beef dishes
    populateBeefDishes();
    
    // Populate seafood dishes
    populateSeafoodDishes();
    
    // Populate vegetable dishes
    populateVegetableDishes();
    
    // Populate noodles
    populateNoodles();
    
    // Populate rice dishes
    populateRiceDishes();
    
    // Populate chef's specialties
    populateSpecialties();
    
    // Populate weight watchers menu
    populateWeightWatchers();
}

function populateSpecialties() {
    const container = document.getElementById('specialtiesItems');
    if (!container || !menuData.chef_s_specialties) return;
    
    container.innerHTML = '';
    
    menuData.chef_s_specialties.forEach(item => {
        const specialtyItem = createSpecialtyItem(item.name, item.description, item.price, isHotDish(item.name));
        container.appendChild(specialtyItem);
    });
}

function populateLunchMenu() {
    const container = document.getElementById('lunchItems');
    if (!container || !menuData.lunch_menu) return;
    
    container.innerHTML = '';
    
    menuData.lunch_menu.items.forEach(item => {
        const menuItem = createMenuItem(item.name, null, item.price, null, isHotDish(item.name));
        container.appendChild(menuItem);
    });
}

function populateAppetizers() {
    const container = document.getElementById('appetizerItems');
    if (!container || !menuData.appetizers) return;
    
    container.innerHTML = '';
    
    menuData.appetizers.forEach(item => {
        const menuItem = createMenuItem(item.name, item.note, item.price, null, false);
        container.appendChild(menuItem);
    });
}

function populateChickenDishes() {
    const container = document.getElementById('chickenItems');
    if (!container || !menuData.chicken) return;
    
    container.innerHTML = '';
    
    menuData.chicken.forEach(item => {
        const prices = item.small_price ? 
            { small: item.small_price, large: item.large_price } : 
            item.price;
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name));
        container.appendChild(menuItem);
    });
}

function populateBeefDishes() {
    const container = document.getElementById('beefItems');
    if (!container || !menuData.beef) return;
    
    container.innerHTML = '';
    
    menuData.beef.forEach(item => {
        const prices = item.small_price ? 
            { small: item.small_price, large: item.large_price } : 
            item.price;
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name));
        container.appendChild(menuItem);
    });
}

function populateSeafoodDishes() {
    const container = document.getElementById('seafoodItems');
    if (!container || !menuData.seafood) return;
    
    container.innerHTML = '';
    
    menuData.seafood.forEach(item => {
        const prices = item.small_price ? 
            { small: item.small_price, large: item.large_price } : 
            item.price;
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name));
        container.appendChild(menuItem);
    });
}

function populateVegetableDishes() {
    const container = document.getElementById('vegetableItems');
    if (!container || !menuData.vegetables) return;
    
    container.innerHTML = '';
    
    menuData.vegetables.forEach(item => {
        const prices = item.small_price ? 
            { small: item.small_price, large: item.large_price } : 
            item.price;
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name));
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
}

function populateAppetizers() {
    const container = document.getElementById('appetizerItems');
    if (!container || !menuData.appetizers) return;
    
    container.innerHTML = '';
    
    menuData.appetizers.forEach(item => {
        const menuItem = createMenuItem(item.name, item.note, item.price, null, false);
        container.appendChild(menuItem);
    });
}

function populateSoups() {
    const container = document.getElementById('soupItems');
    if (!container || !menuData.soups) return;
    
    container.innerHTML = '';
    
    menuData.soups.forEach(item => {
        const menuItem = createMenuItem(item.name, null, item.price, null, isHotDish(item.name));
        container.appendChild(menuItem);
    });
}

function populatePorkDishes() {
    const container = document.getElementById('porkItems');
    if (!container || !menuData.pork) return;
    
    container.innerHTML = '';
    
    menuData.pork.forEach(item => {
        const prices = item.small_price ? 
            { small: item.small_price, large: item.large_price } : 
            item.price;
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name));
        container.appendChild(menuItem);
    });
}

function populateVegetableDishes() {
    const container = document.getElementById('vegetableItems');
    if (!container || !menuData.vegetables) return;
    
    container.innerHTML = '';
    
    menuData.vegetables.forEach(item => {
        const prices = item.small_price ? 
            { small: item.small_price, large: item.large_price } : 
            item.price;
        const menuItem = createMenuItem(item.name, item.description, prices, null, isHotDish(item.name));
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
    if (menuData.lo_mein_noodles && menuData.lo_mein_noodles.items) {
        menuData.lo_mein_noodles.items.forEach(item => {
            const prices = item.small_price ? 
                { small: item.small_price, large: item.large_price } : 
                item.price;
            const menuItem = createMenuItem(item.name, null, prices, menuData.lo_mein_noodles.note, false);
            noodleContainer.appendChild(menuItem);
        });
    }
    
    // Add Chow Mein dishes
    if (menuData.chow_mein && menuData.chow_mein.items) {
        menuData.chow_mein.items.forEach(item => {
            const prices = item.small_price ? 
                { small: item.small_price, large: item.large_price } : 
                item.price;
            const menuItem = createMenuItem(item.name, null, prices, menuData.chow_mein.note, false);
            noodleContainer.appendChild(menuItem);
        });
    }
    
    // Add Eastern Popular Noodles
    if (menuData.eastern_popular_noodles_dishes) {
        menuData.eastern_popular_noodles_dishes.forEach(item => {
            const menuItem = createMenuItem(item.name, item.description, item.price, null, isHotDish(item.name));
            noodleContainer.appendChild(menuItem);
        });
    }
    
    // Add Fried Rice dishes
    if (menuData.fried_rice) {
        menuData.fried_rice.forEach(item => {
            const prices = item.small_price ? 
                { small: item.small_price, large: item.large_price } : 
                item.price;
            const menuItem = createMenuItem(item.name, null, prices, null, false);
            riceContainer.appendChild(menuItem);
        });
    }
    
    // Add Egg Foo Young dishes
    if (menuData.egg_foo_young) {
        menuData.egg_foo_young.forEach(item => {
            const menuItem = createMenuItem(item.name, null, item.price, null, false);
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
        menuData.fried_rice.forEach(item => {
            const prices = item.small_price ? 
                { small: item.small_price, large: item.large_price } : 
                item.price;
            const menuItem = createMenuItem(item.name, null, prices, null, false);
            container.appendChild(menuItem);
        });
    }
    
    // Add Egg Foo Young dishes
    if (menuData.egg_foo_young) {
        menuData.egg_foo_young.forEach(item => {
            const menuItem = createMenuItem(item.name, null, item.price, null, false);
            container.appendChild(menuItem);
        });
    }
}

function populateSpecialties() {
    const container = document.getElementById('specialtiesItems');
    if (!container || !menuData.chef_s_specialties) return;
    
    container.innerHTML = '';
    
    menuData.chef_s_specialties.forEach(item => {
        const specialtyItem = createSpecialtyItem(item.name, item.description, item.price, isHotDish(item.name));
        container.appendChild(specialtyItem);
    });
}

function populateWeightWatchers() {
    const container = document.getElementById('weightWatchersItems');
    if (!container || !menuData.weight_watchers_menu) return;
    
    container.innerHTML = '';
    
    menuData.weight_watchers_menu.items.forEach(item => {
        const menuItem = createMenuItem(item.name, null, item.price, null, false);
        container.appendChild(menuItem);
    });
}

// Helper function to create menu item HTML
function createMenuItem(name, description, price, note, isHot) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    
    const nameClass = isHot ? 'menu-item-name hot' : 'menu-item-name';
    
    let priceHTML = '';
    if (typeof price === 'object' && price.small && price.large) {
        priceHTML = `
            <div class="menu-item-prices">
                <span class="price-option">Small $${price.small.toFixed(2)}</span>
                <span class="price-option">Large $${price.large.toFixed(2)}</span>
            </div>
        `;
    } else {
        priceHTML = `<span class="menu-item-price">$${price.toFixed(2)}</span>`;
    }
    
    div.innerHTML = `
        <div class="menu-item-header">
            <h4 class="${nameClass}">${name}</h4>
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
            container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--primary-red);">Error loading menu. Please refresh the page.</div>';
        }
    });
}
