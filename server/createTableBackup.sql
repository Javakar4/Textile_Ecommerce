-- createTableBackup.sql

-- ============================
-- Users table
-- ============================
CREATE TABLE users (
    id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email            VARCHAR(255) NOT NULL UNIQUE,
    username         VARCHAR(50) UNIQUE,
    password_hash    TEXT NOT NULL,
    is_email_verified BOOLEAN NOT NULL DEFAULT false,
    role             ENUM('user', 'admin', 'support') NOT NULL DEFAULT 'user',
    status           ENUM('active', 'inactive', 'deleted') NOT NULL DEFAULT 'active',
    metadata         JSON NOT NULL DEFAULT (JSON_OBJECT()),
    last_login_at    DATETIME(3),
    created_at       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at       DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                         ON UPDATE CURRENT_TIMESTAMP(3)
);

-- ============================
-- Email OTPs table
-- ============================
        CREATE TABLE email_otps (
            id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id       INT UNSIGNED,   -- FK MUST match users.id (and allow NULL if using ON DELETE SET NULL)
            email         VARCHAR(255) NOT NULL,
            purpose       VARCHAR(50) NOT NULL DEFAULT 'register',
            otp_hash      TEXT NOT NULL,
            attempts      SMALLINT NOT NULL DEFAULT 0,
            created_at    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
            expires_at    DATETIME(3) NOT NULL,
            ip_address    VARBINARY(16),
            
            UNIQUE KEY unique_email (email),
            CONSTRAINT fk_email_otps_user
                FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE SET NULL
        );

-- Indexes
CREATE INDEX idx_email_otps_email ON email_otps (email);
CREATE INDEX idx_email_otps_user_id ON email_otps (user_id);
CREATE INDEX idx_email_otps_expires_at ON email_otps (expires_at);

-- ============================
-- Addresses table
-- ============================
CREATE TABLE addresses (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         INT UNSIGNED NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    pincode         VARCHAR(10) NOT NULL,
    address_line_1  VARCHAR(255) NOT NULL,
    address_line_2  VARCHAR(255),
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100) NOT NULL,
    country         VARCHAR(100) NOT NULL DEFAULT 'India',
    created_at      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                        ON UPDATE CURRENT_TIMESTAMP(3),

    CONSTRAINT fk_user_address
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- products and categories tables

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
);


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    old_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    category_id INT NOT NULL,
    thumbnail_url1 VARCHAR(500) NOT NULL DEFAULT '',
    thumbnail_url2 VARCHAR(500) NOT NULL DEFAULT '',
    thumbnail_url3 VARCHAR(500) NOT NULL DEFAULT '',

    stock INT NOT NULL DEFAULT 0,

    status ENUM('active', 'inactive', 'discontinued') NOT NULL DEFAULT 'active',

    key_features JSON,
    
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES categories(id),
        
    CHECK (JSON_VALID(key_features))  -- ensures valid JSON
);

CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_products_title ON products (title);


ALTER TABLE products
ADD subcategory ENUM('M_MARS_POLO',       
    'FULL_SLEEVE',      
    'HALF_SLEEVE',      
    'TRACK_PANT',       
    '2WAY_LYCRA',       
    '4WAY_LYCRA',       
    'KIDS_FULL_SLEEVE', 
    'ROUND_NECK'        
    ) NULL AFTER category_id;



-- mens mars polo tshirt,
-- full sleve half sleeve,
-- track pant,
-- 2 way lycra pant, 
-- 4 way lycra pant 
-- kids full slevve
-- round neck t shirt

-- dummy data for products table

INSERT INTO `products` (
    `title`, `description`, `price`, `old_price`, `category_id`, 
    `subcategory`, `thumbnail_url1`, `stock`, `status`, `key_features`
) VALUES
('Mars Polo Classic Tee', 'Premium cotton blend polo shirt for everyday comfort.', 35.99, 49.99, 1, 'M_MARS_POLO', 'http://example.com/polo-1.jpg', 50, 'active', '{"material": "Pique Cotton", "fit": "Regular", "color_options": 5}'),
('Full Sleeve Lycra T-shirt', 'Stretchable athletic tee, perfect for workouts.', 45.00, 55.00, 1, 'FULL_SLEEVE', 'http://example.com/fsleeve-2.jpg', 120, 'active', '{"material": "2WAY_LYCRA", "uv_protection": true, "moisture_wicking": true}'),
('Summer Half Sleeve Round Neck', 'Lightweight and breathable round neck shirt.', 19.99, 25.00, 1, 'ROUND_NECK', 'http://example.com/hsleeve-3.jpg', 80, 'active', '{"neck_type": "Crew", "fabric_weight": "Light", "sustainability": "Recycled Material"}'),
('Kids Adventure Trousers', 'Durable track pants for rough play and outdoor activities.', 29.50, 39.99, 2, 'TRACK_PANT', 'http://example.com/kids-pant-4.jpg', 65, 'active', '{"material": "Ripstop Nylon", "pockets": 4, "adjustable_waist": true}'),
('Men''s Ultimate 4-Way Stretch Pant', 'Maximum flexibility and comfort in a sleek design.', 79.99, 99.99, 1, '4WAY_LYCRA', 'http://example.com/4way-pant-5.jpg', 30, 'active', '{"stretch": "4-Way", "water_resistant": true, "zipper_type": "YKK"}'),
('Kids Full Sleeve Graphic Tee', 'Fun graphic print on a soft, long-sleeve cotton shirt.', 22.00, 29.00, 2, 'KIDS_FULL_SLEEVE', 'http://example.com/kids-fsleeve-6.jpg', 0, 'inactive', '{"age_range": "5-10 years", "print_type": "Screen Print", "wash_care": "Machine Wash Cold"}'),
('Classic Black Track Pant', 'Essential comfort track pant with elastic cuff.', 38.00, 45.00, 1, 'TRACK_PANT', 'http://example.com/track-7.jpg', 15, 'active', '{"closure": "Drawstring", "lining": "Fleece", "cuff": "Elastic"}'),
('Basic Half Sleeve V-Neck', 'Everyday basic tee in multiple colors.', 14.99, 18.00, 1, 'HALF_SLEEVE', 'http://example.com/vneck-8.jpg', 200, 'active', '{"neck_type": "V-Neck", "material": "Jersey Knit", "color_options": 10}'),
('Discontinued Kids Hoodie', 'Warm hoodie (clearance item).', 10.00, 40.00, 2, NULL, 'http://example.com/hoodie-9.jpg', 5, 'discontinued', '{"season": "Winter", "hood": true, "pockets": "Kangaroo"}'),
('Round Neck Slim Fit T-shirt', 'Modern cut round neck for a tailored look.', 28.50, 32.00, 1, 'ROUND_NECK', 'http://example.com/slim-10.jpg', 90, 'active', '{"fit": "Slim", "material": "Stretch Cotton", "collar_type": "Ribbed"}'),
('Kids 2-Way Lycra Leggings', 'Flexible and durable leggings for young athletes.', 24.99, 30.00, 2, '2WAY_LYCRA', 'http://example.com/kids-leggings-11.jpg', 75, 'active', '{"stretch": "2-Way", "inseam": "Full Length", "waist": "High Rise"}'),
('Premium Mars Polo Stripe Edition', 'Luxurious feel with a stylish stripe pattern.', 49.99, 65.00, 1, 'M_MARS_POLO', 'http://example.com/polo-stripe-12.jpg', 40, 'active', '{"pattern": "Stripe", "collar": "Tipped", "vent_size": "Side Slit"}'),
('Men''s Full-Zip Track Jacket', 'Matching jacket for track pants.', 55.00, 70.00, 1, 'FULL_SLEEVE', 'http://example.com/jacket-13.jpg', 20, 'active', '{"closure": "Full Zip", "material": "Polyester", "pockets": 2}'),
('Inactivated Trail Half Sleeve Tee', 'Durable shirt temporarily out of stock.', 20.00, 24.00, 1, 'HALF_SLEEVE', 'http://example.com/trail-14.jpg', 0, 'inactive', '{"environment": "Outdoor", "quick_dry": true, "odour_control": true}'),
('Kids High Performance 4-Way Tee', 'Maximum movement for active kids.', 35.00, 45.00, 2, '4WAY_LYCRA', 'http://example.com/kids-4way-15.jpg', 55, 'active', '{"stretch": "4-Way", "breathable": true, "weight": "Ultra Light"}'),
('Budget Round Neck Combo Pack', 'Plain, affordable round neck shirt.', 9.99, 12.99, 1, 'ROUND_NECK', 'http://example.com/budget-16.jpg', 300, 'active', '{"package": "Single Unit", "material": "Polycotton", "warranty": "30 days"}'),
('Kids Fun Track Pant Set', 'Set of track pants and a full sleeve tee.', 49.99, 60.00, 2, 'TRACK_PANT', 'http://example.com/kids-set-17.jpg', 45, 'active', '{"set_items": 2, "material": "Cotton Fleece", "fit": "Loose"}'),
('Premium 2-Way Lycra Running Shorts', 'Shorts with two-way stretch.', 30.00, 40.00, 1, '2WAY_LYCRA', 'http://example.com/shorts-18.jpg', 110, 'active', '{"length": "Above Knee", "inbuilt_liner": true, "zipper_pocket": true}'),
('Discontinued Kids Polo', 'Last chance for this kids polo.', 15.00, 30.00, 2, 'M_MARS_POLO', 'http://example.com/kids-polo-19.jpg', 2, 'discontinued', '{"closure": "2 Button", "material": "Mini Pique", "discount": "70% off"}'),
('Casual Full Sleeve Henley', 'Stylish full sleeve shirt with a button placket.', 40.00, 50.00, 1, 'FULL_SLEEVE', 'http://example.com/henley-20.jpg', 70, 'active', '{"collar": "Henley", "button_count": 3, "sleeve_type": "Cuffed"}');
}







CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Product identity
    product_code VARCHAR(100) NOT NULL,   -- same for all variants of a design
    sku VARCHAR(120) NOT NULL UNIQUE,      -- unique per size/color

    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    -- Classification
    category_id INT NOT NULL,
    department ENUM('MEN', 'KIDS') NOT NULL,

    -- Variant attributes
    size VARCHAR(20) NOT NULL,             -- S, M, L, XL, 2-3Y, etc
    color VARCHAR(50) NOT NULL,

    -- Pricing & inventory
    discount_price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,

    -- Media
    thumbnail_url1 VARCHAR(500) NOT NULL DEFAULT '',
    thumbnail_url2 VARCHAR(500) NOT NULL DEFAULT '',
    thumbnail_url3 VARCHAR(500) NOT NULL DEFAULT '',

    -- Status
    status ENUM('active', 'inactive', 'discontinued')
        NOT NULL DEFAULT 'active',

    key_features JSON,

    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
        ON UPDATE CURRENT_TIMESTAMP(3),

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES categories(id),

    CHECK (JSON_VALID(key_features)),

    -- Prevent duplicate variants
    UNIQUE KEY uq_product_variant (product_code, size, color)
);


| product_code | sku              | size | color | price | stock |
| ------------ | ---------------- | ---- | ----- | ----- | ----- |
| MEN-TS-001   | MEN-TS-001-BLK-M | M    | Black | 499   | 10    |
| MEN-TS-001   | MEN-TS-001-BLK-L | L    | Black | 499   | 5     |
| MEN-TS-001   | MEN-TS-001-WHT-M | M    | White | 479   | 8     |



CREATE TABLE carts (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NULL,
    guest_id VARCHAR(255) NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    CONSTRAINT fk_carts_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    UNIQUE KEY uq_carts_user (user_id),
    UNIQUE KEY uq_carts_guest (guest_id)
);


CREATE TABLE cart_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cart_id INT UNSIGNED NOT NULL,
    product_id INT NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    price_snapshot DECIMAL(10,2) NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    CONSTRAINT fk_cart_items_cart
        FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_product
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,

    UNIQUE KEY uq_cart_items_product (cart_id, product_id),
    CHECK (quantity > 0)
);

CREATE INDEX idx_carts_guest ON carts (guest_id);
