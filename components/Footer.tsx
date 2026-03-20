export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-400 mb-4">
                        Beverage Co.
                    </h3>
                    <p className="text-sm text-gray-500">
                        The future of refreshment. We believe in quality, energy, and absolute deliciousness.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-orange-400 transition">All Products</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition">Subscriptions</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition">Gift Cards</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition">Our Process</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-orange-400 transition">FAQ</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition">Wholesale</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Newsletter</h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Get 10% off your first order when you sign up.
                    </p>
                    <div className="flex bg-gray-800 rounded-full overflow-hidden p-1">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent px-4 py-2 w-full focus:outline-none text-sm"
                        />
                        <button className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
                &copy; {new Date().getFullYear()} Beverage Co. All rights reserved.
            </div>
        </footer>
    );
}
