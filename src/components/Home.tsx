import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  category: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample products data
  const products: Product[] = [
    {
      id: 1,
      name: 'Personalized North Pole Express Sign',
      price: 19.46,
      originalPrice: 25.95,
      rating: 5.0,
      reviews: 2,
      image: '🎄',
      badge: 'Personalized',
      category: 'Holiday Decor'
    },
    {
      id: 2,
      name: 'Gift Card Holder - Happy Birthday',
      price: 8.99,
      originalPrice: 9.99,
      rating: 5.0,
      reviews: 2,
      image: '🎁',
      category: 'Gift Cards'
    },
    {
      id: 3,
      name: 'Personalized Wooden Ornament',
      price: 15.20,
      originalPrice: 19.00,
      rating: 5.0,
      reviews: 2,
      image: '🎅',
      badge: 'Personalized',
      category: 'Ornaments'
    },
    {
      id: 4,
      name: 'Wooden Christmas Pet Tag',
      price: 7.65,
      originalPrice: 8.50,
      rating: 5.0,
      reviews: 2,
      image: '🐕',
      category: 'Pet Accessories'
    },
    {
      id: 5,
      name: 'Wood Engraved LED Light Box',
      price: 7.65,
      originalPrice: 8.50,
      rating: 5.0,
      reviews: 2,
      image: '💡',
      category: 'Home Decor'
    },
    {
      id: 6,
      name: "Men's Valet Tray - Personalized",
      price: 37.50,
      originalPrice: 50.00,
      rating: 5.0,
      reviews: 3,
      image: '📦',
      badge: 'New',
      category: 'Accessories'
    }
  ];

  const heroSlides = [
    {
      title: 'Shop Small, Big Impact',
      subtitle: 'Welcome to MakerPlace',
      description: 'Shop now and support our community of makers and independent artists.',
      cta1: 'Shop Top Rated',
      cta2: 'Shop Sale',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Jewelry Finds on Sale',
      subtitle: 'Discover Pieces Designed for You',
      description: 'Unique handcrafted jewelry from talented artisans around the world.',
      cta1: 'Browse Jewelry',
      cta2: 'View Sale',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Create a One-Of-A-Kind Holiday',
      subtitle: 'Shop holiday favorites on sale',
      description: 'Personalized gifts and decorations to make this season special.',
      cta1: 'Holiday Shop',
      cta2: 'Gift Guide',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleProductClick = (productId: number) => {
    console.log('Product clicked:', productId);
    // Navigate to product detail or add to cart
  };

  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category);
    navigate('/dashboard');
  };

  return (
    <div className="home-container">
      {/* Top Banner */}
      <div className="top-banner">
        <div className="banner-item">
          <span className="banner-icon">✨</span>
          <span>Jewelry Finds on Sale</span>
        </div>
        <div className="banner-item">
          <span className="banner-icon">🎄</span>
          <span>Holiday Favorites</span>
        </div>
        <div className="banner-item">
          <span className="banner-icon">💝</span>
          <span>Save Big, Shop Small</span>
        </div>
      </div>

      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <div className="hero-carousel">
          <div 
            className="hero-slide active"
            style={{ background: heroSlides[currentSlide].background }}
          >
            <div className="hero-content">
              <div className="hero-text">
                <p className="hero-subtitle">{heroSlides[currentSlide].subtitle}</p>
                <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
                <p className="hero-description">{heroSlides[currentSlide].description}</p>
                <div className="hero-cta">
                  <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                    {heroSlides[currentSlide].cta1}
                  </button>
                  <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                    {heroSlides[currentSlide].cta2}
                  </button>
                </div>
              </div>
              <div className="hero-image">
                <div className="hero-image-placeholder">
                  <span className="placeholder-icon">🎨</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="carousel-controls">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card" onClick={() => handleCategoryClick('thanksgiving')}>
              <div className="category-icon">🦃</div>
              <h3>Thanksgiving</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('holiday')}>
              <div className="category-icon">🎄</div>
              <h3>Holiday Shop</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('gifts')}>
              <div className="category-icon">🎁</div>
              <h3>Gift Guide</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('jewelry')}>
              <div className="category-icon">💎</div>
              <h3>Jewelry Finds</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('wedding')}>
              <div className="category-icon">💒</div>
              <h3>Wedding Shop</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('personalized')}>
              <div className="category-icon">✍️</div>
              <h3>Personalized Gifts</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top Deals from Small Businesses</h2>
            <button className="btn-link" onClick={() => navigate('/dashboard')}>
              Shop Sale <span className="arrow">→</span>
            </button>
          </div>
          
          <div className="products-grid">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
                <button className="favorite-btn" aria-label="Add to favorites">
                  ♡
                </button>
                <div className="product-image">
                  <span className="product-emoji">{product.image}</span>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-text">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="product-pricing">
                    <span className="price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Shipping</h3>
              <p>Get your orders delivered quickly with our expedited shipping options.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>Quality Guaranteed</h3>
              <p>Every product is handcrafted with care by independent makers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Support Small Business</h3>
              <p>Your purchase directly supports independent artists and creators.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Checkout</h3>
              <p>Shop with confidence using our secure payment processing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Become a Seller</h2>
            <p>Join our community of makers and start selling your handcrafted products today.</p>
            <button className="btn btn-primary" onClick={() => navigate('/inform-act-verification')}>
              Start Selling
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
