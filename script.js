document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const productsContainer = document.getElementById('products-container');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCountSpan = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const cartItemsList = document.querySelector('.cart-items-list');

    const productsData = [
        {
            id: 1,
            name: 'iPhone 16 Pro',
            category: 'smartphone',
            price: 999,
            image: 'https://mac-center.com.pr/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-US_ec9d057b-372a-4efa-9c3a-4eadae091765.jpg?v=1726226235&width=1680',
            specs: {
                display: '6.7-inch OLED',
                processor: 'Octa-core',
                ram: '8GB',
                storage: '256GB'
            }
        },
        {
            id: 2,
            name: 'iPhone 16',
            category: 'smartphone',
            price: 799,
            image: 'https://mac-center.com.pr/cdn/shop/files/iPhone_16_Ultramarine_PDP_Image_Position_1__en-US.jpg?v=1726224402&width=1680',
            specs: {
                display: '6.1-inch OLED',
                processor: 'Hexa-core',
                ram: '6GB',
                storage: '128GB'
            }
        },
        {
            id: 3,
            name: 'AirPods Pro (3rd generation) with USB-C',
            category: 'headphone',
            price: 249,
            image: 'https://www.apple.com/autopush/ww/search/modules/airpodspro2/image__d28ykuoxnouq_large_2x.jpg?',
            specs: {
                type: 'Over-ear',
                connectivity: 'Bluetooth 5.0',
                batteryLife: '30 hours'
            }
        },
        {
            id: 4,
            name: 'AirPods (4th generation) with USB-C Charging Case',
            category: 'headphone',
            price: 169,
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-hero-select-202409?wid=976&hei=916&fmt=jpeg&qlt=90&.v=1725502960502',
            specs: {
                type: 'In-ear',
                connectivity: 'Bluetooth 5.3',
                batteryLife: '24 hours'
            }
        },
        {
            id: 5,
            name: 'MacBook Pro 16-inch (M4)',
            category: 'laptop',
            price: 2499,
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1728916305295',
            specs: {
                display: '16.2-inch Liquid Retina XDR',
                processor: 'Apple M4',
                ram: '16GB',
                storage: '512GB SSD'
            }
        },
        {
            id: 6,
            name: 'MacBook Air 15-inch with M4 chip',
            category: 'laptop',
            price: 1299,
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034',
            specs: {
                display: '15.3-inch Liquid Retina',
                processor: 'Apple M4',
                ram: '8GB',
                storage: '256GB SSD'
            }
        },
        {
            id: 7,
            name: 'Studio Display Pro',
            category: 'monitor',
            price: 1999,
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/studio-display-gallery-1-202203?wid=640&hei=528&fmt=p-jpg&qlt=95&.v=1675709041796',
            specs: {
                display: '27-inch 5K Retina',
                resolution: '5120 x 2880',
                ports: 'Thunderbolt 3'
            }
        },
        {
            id: 9,
            name: 'Magic Mouse 2',
            category: 'accessory',
            price: 79,
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MXK53?wid=890&hei=890&fmt=jpeg&qlt=90&.v=1730508286345',
            specs: {
                connectivity: 'Bluetooth',
                batteryLife: 'Month-long battery life',
                features: 'Multi-Touch surface'
            }
        },
        {
            id: 10,
            name: 'Magic Keyboard Pro',
            category: 'accessory',
            price: 149,
            image: 'https://www.apple.com/autopush/ww/search/modules/keyboardsforipad/image__ejdp1bege1me_large_2x.jpg?',
            specs: {
                compatibility: 'iPad Pro and iPad Air',
                features: 'Backlit keys, Scissor mechanism',
                connectivity: 'Smart Connector'
            }
        },
        {
            id: 11,
            name: 'iPad Pro 13-inch (M4)',
            category: 'tablet',
            price: 1299,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFvofALdpcQh_2VzGcME9TFiE02U4G9Q22oGVLPZNgmM4MaqH6ronUApCJBLNdj7ZFvvo&usqp=CAU',
            specs: {
                display: '13-inch Liquid Retina XDR',
                processor: 'Apple M4',
                storage: '256GB'
            }
        },
        {
            id: 12,
            name: 'iPad Air (M3)',
            category: 'tablet',
            price: 699,
            image: 'https://www.shopaztecs.com/images/product/medium/18899.jpg',
            specs: {
                display: '10.9-inch Liquid Retina',
                processor: 'Apple M3',
                storage: '64GB'
            }
        },
        {
            id: 13,
            name: 'Apple Watch Series 10',
            category: 'smartwatch',
            price: 499,
            image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MY7N3ref_VW_34FR+watch-case-42-aluminum-silver-nc-s10_VW_34FR+watch-face-42-aluminum-silver-s10_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=K2t1bnExRnFNdEtwODg0U2VzTVNiWjNqbENGcEFFTlJVaXJwL2VzdGxEMUljRjVjb3RBRUI2RzdxR2VyMW04MktiMHlsanRialdTdDcyc1VBUDljMWJTdjdWZDZNTDA2YVdIMWltQk5rSVFzcXlqRnhOVXRDb09ITlB0dmMxa3IxRWcxcFNUbllKRGY4Szh6MTVJZ1N3RURuRVoxZjBkWlAvNkMrbU5jNUFLT0lodkdNeWd3SHAzZlUzNms5S2kxYTV3aHB6VUg0cXhiSFFkSkkrM2ZpOFE4WFRnaDN2Z0ZCTmd2bjl6SlZhbw',
            specs: {
                display: 'Always-On Retina LTPO display',
                features: 'Blood Oxygen app, ECG app',
                waterResistance: 'Water resistant to 50 meters'
            }
        },
        {
            id: 14,
            name: 'Apple Watch SE (3rd generation)',
            category: 'smartwatch',
            price: 299,
            image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYJ53ref_VW_34FR+watch-case-40-aluminum-midnight-cell-se_VW_34FR+watch-face-40-aluminum-midnight-se_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=d0ExZHIvWW8vSDlQRklSZ3RQQTBOMCtGZUJWLzNFUFVydllxZFp0d1M4NTlEbzMrd1Z5SUpEd0hiT0ZLRlZGNHVDTzRRaC84T1VMbXJRN05SRldIekl3ZVlaMG9GekEwc3V1SXQ4RHBUY045RG8zK3dWeUlKRHdIYk9GS0ZWRjR4cVNUNDJadDNVSmRncE9SalAvZ24zZmdHMUt6VFlqa3BpV2VBOUNycGdrcDIxSk5peW5HTWQ0c004MmJwMkNtdGl6SHg4ZE5NYmlWSVQ5akRTdGpCYXdFcFI4ZnVKTUUyODRESjZvdEp1NA',
            specs: {
                display: 'Retina display',
                features: 'Fall Detection, Emergency SOS',
                waterResistance: 'Water resistant to 50 meters'
            }
        },
    ];

    let cart = []; // Array to store cart items

    function updateCartCount() {
        cartCountSpan.textContent = cart.length;
        cartIcon.classList.toggle('has-items', cart.length > 0);
    }

    function renderCartItems() {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
            return;
        }
        cart.forEach(item => {
            const cartItemEl = document.createElement('li');
            cartItemEl.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <button class="cart-item-remove" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsList.appendChild(cartItemEl);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productIdToRemove = parseInt(this.dataset.productId);
                cart = cart.filter(item => item.id !== productIdToRemove);
                renderCartItems();
                updateCartCount();
            });
        });
    }

    // Function to render product cards
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        if (products.length === 0) {
            productsContainer.innerHTML = '<p>No products found matching your criteria.</p>';
            return;
        }
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.id = product.id; // Add product ID to the card
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <span class="category">${product.category}</span>
                <span class="price">$${product.price}</span>
                <div class="actions">
                    <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                    <button class="more-options" data-product-id="${product.id}" aria-label="View more options for ${product.name}">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <div class="specs">
                    <h4>Specifications</h4>
                    <ul>
                        ${Object.entries(product.specs).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
                    </ul>
                    <button class="close-specs">Close</button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
       addEventListenersToProducts(); // Call the function after rendering
    }

    function addEventListenersToProducts() {
        const addToCartButtons = document.querySelectorAll('.product-card .add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.dataset.productId);
                const productToAdd = productsData.find(product => product.id === productId);
                if (productToAdd) {
                    cart.push(productToAdd);
                    updateCartCount();
                    renderCartItems();
                    // Visual feedback
                    cartIcon.classList.add('animate');
                    setTimeout(() => {
                        cartIcon.classList.remove('animate');
                    }, 300);
                }
            });
        });

       const moreInfoButtons = document.querySelectorAll('.product-card .more-options');
        moreInfoButtons.forEach(button => {
            button.addEventListener('click', function() {
                 const productCard = this.closest('.product-card');
                productCard.classList.add('show-specs');
            });
        });

         const closeButtons = document.querySelectorAll('.product-card .close-specs');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                  const productCard = this.closest('.product-card');
                productCard.classList.remove('show-specs');
            });
        });
    }

    // Function to filter products
    function filterProducts() {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        let filteredProducts = productsData;

        if (category) {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        if (priceRange) {
            filteredProducts = filteredProducts.filter(product => {
                const price = product.price;
                if (priceRange === '0-199') return price < 200;
                if (priceRange === '200-499') return price >= 200 && price <= 499;
                if (priceRange === '500-999') return price >= 500 && price <= 999;
                if (priceRange === '1000+') return price >= 1000;
                return true; // Should not reach here, but for safety
            });
        }

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }

        renderProducts(filteredProducts);
    }

    // --- Smooth Scrolling for Hero Button ---
    const exploreButton = document.querySelector('.hero .btn');
    exploreButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });

    // Animate Cart Icon
    cartIcon.addEventListener('transitionend', () => {
        cartIcon.classList.remove('animate');
    });

    // Toggle cart visibility
    cartIcon.addEventListener('click', () => {
        cartItemsContainer.classList.toggle('show');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (event) => {
        if (!cartIcon.contains(event.target) && !cartItemsContainer.contains(event.target)) {
            cartItemsContainer.classList.remove('show');
        }
    });

    // Event listeners for filtering
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('input', filterProducts); // Consider debouncing for performance

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        themeToggle.classList.toggle('dark');
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Initial rendering of products and cart
    renderProducts(productsData);
    updateCartCount();
    renderCartItems();
});