import { useState } from "react";
// ============================================================
// APP.JSX — The Root Component (Day 2)
// ============================================================
// This is the MAIN file of your React application.
// It acts as the "layout manager" — it imports all section
// components and arranges them on the page.
//
// WHAT YOU WILL LEARN:
// - How to import components from other files
// - How to use export default to share a component
// - How to compose a page from smaller components
// - How JSX lets you use custom components like HTML tags
//
// ============================================================

// STEP 1: Import your section components
// Each component lives in its own file inside ./components/
// Use this syntax:  import ComponentName from "./components/ComponentName";
//
// Import the following components (in this order):
// - RibbonTicker
// - NavBar
// - HeroSection
// - CtaSection
// - FeaturesSection
// - ProductShowcase
// - FooterSection
// - AboutSection
// - ContactSection

/* --- YOUR IMPORTS GO HERE --- */
import HeroSection from "./components/HeroSection";
import FooterSection from "./components/FooterSection";
import NavBar from "./components/NavBar";
import RibbonTicker from "./components/RibbonTicker";
import FeaturesSection from "./components/FeaturesSection";
import ProductShowcase from "./components/ProductShowcase";
import AboutSection from "./components/AboutSection";
import CtaSection from "./components/CtaSection";
import ContactSection from "./components/ContactSection";
import CartDrawer from "./components/CartDrawer";
// STEP 2: Create and export the App component
// Use: export default function App() { ... }
//
// STEP 3: Inside the return(), build the page layout
// Wrap everything in a <div className="app">
//
// Place your components in this order:
//   1. <NavBar />
//   2. Hero section wrapped in: <section className="hero bg-hero">
//        Inside that, wrap <HeroSection /> in: <div className="hero-grid">
//   3. <RibbonTicker />
//   4. Features section wrapped in: <section className="features bg-features" id="shop">
//   5. Product Showcase wrapped in: <section className="bg-cta">
//   6. <RibbonTicker /> (used again — components are reusable!)
//   7. CTA section wrapped in: <section className="bg-cta">
//   8. About section wrapped in: <section className="bg-cta" id="about">
//   9. Contact section wrapped in: <section className="bg-cta" id="contact">
//  10. Footer section wrapped in: <section className="bg-footer">
//
// HINT: The id attributes (like id="shop") are anchor targets
// for the navigation links in the NavBar.

/* --- YOUR COMPONENT CODE GOES HERE --- */

//
export default function App(){
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    const addToCart = (product) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.name === product.name);

            if (existingItem) {
                return currentItems.map((item) =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentItems, { ...product, quantity: 1 }];
        });
    };

    const updateCartQuantity = (productName, quantity) => {
        setCartItems((currentItems) =>
            quantity > 0
                ? currentItems.map((item) =>
                    item.name === productName ? { ...item, quantity } : item
                )
                : currentItems.filter((item) => item.name !== productName)
        );
    };

    const removeFromCart = (productName) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.name !== productName)
        );
    };

    //
    return (
        //flskdfsdfsfdsdkfs dfsdlfjsf
        <div className="app">
            <NavBar
                cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)}
                onOpenCart={() => setCartOpen(true)}
            />
            <CartDrawer
                isOpen={cartOpen}
                items={cartItems}
                onClose={() => setCartOpen(false)}
                onRemove={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
            />
            
           <section className="hero bg-hero">
                <div className="hero-grid">
                    <HeroSection />
                </div>
           </section>

            <RibbonTicker />

           {/* Features / Carousel */}
           <section className="features bg-features" id="shop">
            <FeaturesSection />d
           </section>

           {/* Product showcase */}
           <section className="bg-cta">
            <ProductShowcase onAddToCart={addToCart} />

           </section>



           {/* CTA */}
           <section className="bg-cta">
            <CtaSection/>

           </section>

           {/* About */}
        
           <section className="bg-cta" id="about">
                <AboutSection/>
           </section>


           {/* contact */}

           <section className="bg-cta" id="contact">
            <ContactSection />
           </section>

           {/* footer */}
           <section className="bg-footer">
            <FooterSection/>
           </section>
           
           
        </div>

    )
}