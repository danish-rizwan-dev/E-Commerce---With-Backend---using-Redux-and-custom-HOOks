CREATE DATABASE E_COMMERRCE;
USE E_COMMERRCE;

drop table products;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE table CartList (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500),
    description TEXT,
    price VARCHAR(25),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE womensProducts (
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(500),
    description TEXT,
    price VARCHAR(25),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)AUTO_INCREMENT = 5001;

select * from CartList where user_id = 1 And product_id = 2;

select * from Products ; 

INSERT INTO products (name, description, price, image) VALUES
("Nike Air Max 270", "Comfortable and stylish running shoes with excellent cushioning.", 150, "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=60"),
("Sony WH-1000XM4 Headphones", "High-quality wireless headphones with noise cancellation.", 400, "https://imgs.search.brave.com/KpWuWOwdzZ23g5PWpKkw4FVDq48HqB9p0XuQKifzK9g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzFlQXBMUEFTVUwu/anBn"),
("Dell XPS 13 Laptop", "Powerful and sleek laptop with 11th Gen Intel processors.", 1200, "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/B/9/B90KQPA-1_T1741316146.png"),
("Sony WH-1000XM4 Headphones", "Industry-leading noise cancellation headphones.", 350, "https://imgs.search.brave.com/77iW4S3W-_vIIDDtMsykaS9JEgep7wcde6pzUdj2v1g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDEyVEt3U0xiS0wu/anBn"),
("Men's Black Hoodie", "Soft and warm hoodie, perfect for casual wear.", 60, "https://imgs.search.brave.com/q4xzjfgh0h3vPobhtj84SPEhWHHpTdT2t9XvYXTGJBs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFmaUZXdExOUEwu/anBn"),
("Apple Watch Series 7", "Latest smartwatch with fitness tracking and health features.", 399, "https://imgs.search.brave.com/6LrZwvIo2oYqFgmN0Pmflwg02ODo9poFg1E38v-PSUM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXBwbGUuY29tL3Yv/YXBwbGUtd2F0Y2gt/c2VyaWVzLTExL2Ev/aW1hZ2VzL292ZXJ2/aWV3L2NvbnRyYXN0/L2NvbnRyYXN0X3Mx/MV9fZGt1aTFkZ2Z1/d2N5X2xhcmdlLnBu/Zw"),
("Canon DSLR Camera", "High resolution DSLR camera with excellent low-light performance.", 850, "https://imgs.search.brave.com/4wfIUemYKdo84B7MBvzvdpXJZVWBdSTHbjTRLycyFTs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXNj/ZXMuYmJ5c3RhdGlj/LmNvbS9pbWFnZTIv/QmVzdEJ1eV9VUy9p/bWFnZXMvcHJvZHVj/dHMvNjMyMy82MzIz/NzU5X3NkLmpwZztt/YXhIZWlnaHQ9NDI3/O21heFdpZHRoPTY0/MD9mb3JtYXQ9d2Vi/cA"),
("Graphic T-Shirt - White", "Casual cotton T-shirt with trendy graphic print.", 25, "https://imgs.search.brave.com/0MDKi6Jt-SNPS31QOEPkUqChcG1aAxGela3JBy-xK7c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/amFja2pvbmVzLmlu/L2Nkbi9zaG9wL2Zp/bGVzLzIzNTI4NjEw/Ml9nNC5qcGc_dj0x/NzQ1MzMxNjU5Jndp/ZHRoPTEwODA"),
("Gaming Mouse RGB", "Ergonomic gaming mouse with customizable RGB lighting.", 45, "https://imgs.search.brave.com/1m7hK0c6pkdWsnevXdGbcWlmdX7CmGUT86Wq1JIUhck/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzF2bTMyajJJbkwu/anBn"),
("Chicken", "Fresh organic chicken, great for healthy meals.", 15, "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=60"),
("Apple iPhone 16", "Latest iPhone with powerful chip and improved camera.", 1200, "https://imgs.search.brave.com/KpWuWOwdzZ23g5PWpKkw4FVDq48HqB9p0XuQKifzK9g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzFlQXBMUEFTVUwu/anBn"),
("Dell XPS 13 Laptop", "Compact and powerful laptop with stunning display.", 1150, "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/B/9/B90KQPA-1_T1741316146.png"),
("Sony WH-1000XM4 Headphones", "Wireless headphones with top-tier sound quality.", 320, "https://imgs.search.brave.com/77iW4S3W-_vIIDDtMsykaS9JEgep7wcde6pzUdj2v1g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDEyVEt3U0xiS0wu/anBn"),
("Men's Black Hoodie", "Comfortable hoodie made from soft cotton blend.", 55, "https://imgs.search.brave.com/q4xzjfgh0h3vPobhtj84SPEhWHHpTdT2t9XvYXTGJBs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFmaUZXdExOUEwu/anBn"),
("Apple Watch Series 7", "Smartwatch with health and fitness tracking features.", 410, "https://imgs.search.brave.com/6LrZwvIo2oYqFgmN0Pmflwg02ODo9poFg1E38v-PSUM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXBwbGUuY29tL3Yv/YXBwbGUtd2F0Y2gt/c2VyaWVzLTExL2Ev/aW1hZ2VzL292ZXJ2/aWV3L2NvbnRyYXN0/L2NvbnRyYXN0X3Mx/MV9fZGt1aTFkZ2Z1/d2N5X2xhcmdlLnBu/Zw"),
("Canon DSLR Camera", "Professional DSLR camera with high resolution and fast autofocus.", 900, "https://imgs.search.brave.com/4wfIUemYKdo84B7MBvzvdpXJZVWBdSTHbjTRLycyFTs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXNj/ZXMuYmJ5c3RhdGlj/LmNvbS9pbWFnZTIv/QmVzdEJ1eV9VUy9p/bWFnZXMvcHJvZHVj/dHMvNjMyMy82MzIz/NzU5X3NkLmpwZztt/YXhIZWlnaHQ9NDI3/O21heFdpZHRoPTY0/MD9mb3JtYXQ9d2Vi/cA"),
("Graphic T-Shirt - White", "Soft cotton T-shirt with stylish graphic print.", 28, "https://imgs.search.brave.com/0MDKi6Jt-SNPS31QOEPkUqChcG1aAxGela3JBy-xK7c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/amFja2pvbmVzLmlu/L2Nkbi9zaG9wL2Zp/bGVzLzIzNTI4NjEw/Ml9nNC5qcGc_dj0x/NzQ1MzMxNjU5Jndp/ZHRoPTEwODA"),
("Gaming Mouse RGB", "High precision gaming mouse with customizable buttons.", 50, "https://imgs.search.brave.com/1m7hK0c6pkdWsnevXdGbcWlmdX7CmGUT86Wq1JIUhck/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzF2bTMyajJJbkwu/anBn");

INSERT INTO womensProducts (name, description, price, image) VALUES
("womens Black Hoodie", "Soft fleece hoodie suitable for Indian winters.", 1599, "https://example.com/images/mens-black-hoodie.jpg"),
("womens Leather Jacket", "Stylish faux leather biker jacket for men.", 3499, "https://example.com/images/mens-leather-jacket.jpg"),
("womens Running Shoes - Puma", "Lightweight running shoes for daily wear and gym.", 2999, "https://example.com/images/puma-running-shoes.jpg"),
("Graphic T-Shirt - White", "100% cotton T-shirt with modern graphic print.", 699, "https://example.com/images/graphic-tshirt-white.jpg"),
("womens Analog Watch - Titan", "Titan wristwatch with stainless steel strap and analog dial.", 2499, "https://example.com/images/titan-analog-watch.jpg"),
("womens Formal Shirt - Van Heusen", "Slim fit formal shirt ideal for office and meetings.", 1899, "https://example.com/images/formal-shirt-vanheusen.jpg"),
("womens Slim Fit Jeans - Levi's", "Dark blue slim fit jeans with stretch fabric.", 3199, "https://example.com/images/levis-jeans.jpg"),
("womens Casual Sneakers - Adidas", "Trendy white sneakers with cushioned sole.", 3499, "https://example.com/images/adidas-sneakers.jpg"),
("womens Leather Belt", "Brown genuine leather belt with brass buckle.", 899, "https://example.com/images/leather-belt.jpg"),
("womens Sports Cap - Nike", "Breathable sports cap with adjustable strap.", 1095, "https://example.com/images/nike-sports-cap.jpg");
