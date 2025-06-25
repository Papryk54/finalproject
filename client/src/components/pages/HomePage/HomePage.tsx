import HeroSection from "../../layout/HeroSection/HeroSection";
import OtherDeals from "../../layout/OtherDeals/OtherDeals";
import NewsletterCTA from "../../layout/NewsletterCTA/NewsletterCTA";
import FeaturedProducts from "../../layout/FeaturedProducts/FeaturedProducts";
import CallToContact from "../../layout/CallToContact/CallToContact";

const HomePage = () => {
	return (
		<div className="container">
			<HeroSection />
			<OtherDeals />
			<NewsletterCTA />
			<FeaturedProducts />
			<CallToContact />
		</div>
	);
};

export default HomePage;
