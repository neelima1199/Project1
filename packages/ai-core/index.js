import { GoogleGenerativeAI } from "@google/generative-ai";

const PRODUCT_DB = [
  { id: 1, name: "Aether Prism Watch", category: "Luxury", price: 1200, demand: 0.8, sentiment: 4.8 },
  { id: 2, name: "Neon Cyber Sneakers", category: "Fashion", price: 350, demand: 0.6, sentiment: 4.2 },
  { id: 3, name: "Quantum Sound Sculptor", category: "Tech", price: 899, demand: 0.9, sentiment: 4.9 },
  { id: 4, name: "Lumina Smart Glass", category: "Tech", price: 599, demand: 0.5, sentiment: 3.8 },
  { id: 5, name: "Velvet Void Backpack", category: "Fashion", price: 210, demand: 0.4, sentiment: 4.5 },
  { id: 6, name: "Neural Link Headband", category: "Tech", price: 1500, demand: 0.95, sentiment: 4.7 },
  { id: 7, name: "Orbital Gravity Speaker", category: "Living", price: 420, demand: 0.7, sentiment: 4.6 },
  { id: 8, name: "Holo-Display Module", category: "Tech", price: 750, demand: 0.3, sentiment: 4.1 },
  { id: 9, name: "Titanium Bio-Ring", category: "Luxury", price: 280, demand: 0.65, sentiment: 4.3 },
  { id: 10, name: "Aetherial Rain Cloak", category: "Fashion", price: 550, demand: 0.2, sentiment: 3.9 },
];

export class AIEngine {
  constructor(apiKey) {
    this.genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
    this.model = this.genAI ? this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;
  }

  async getPersonalizedRecommendations(userProfile) {
    if (!this.model) {
      // Mocked Recommendation Logic if no API key
      return PRODUCT_DB.filter(p => p.sentiment > 4.5).slice(0, 3);
    }
    const prompt = `Based on user interests: ${userProfile}, recommend 3 products from this catalog: ${JSON.stringify(PRODUCT_DB)}. Return as JSON array.`;
    const result = await this.model.generateContent(prompt);
    return JSON.parse(result.response.text());
  }

  async analyzeSentiment(reviews) {
    if (!this.model) {
      return { score: 4.5, summary: "Consistently positive feedback with high praise for design aesthetics." };
    }
    const prompt = `Analyze these reviews and provide a summary and score (1-5): ${reviews.join(". ")}`;
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  calculateDynamicPrice(basePrice, demand) {
    // Advanced Pricing Algorithm: Adjusts base price by up to 15% based on demand signals
    const surge = 1 + (demand * 0.15);
    return (basePrice * surge).toFixed(2);
  }

  async processChat(message, context = []) {
    if (!this.model) {
      return "I'm the AI Assistant. I can help you find products! (API Key needed for full intelligence)";
    }
    const chat = this.model.startChat({ history: context });
    const result = await chat.sendMessage(message);
    return result.response.text();
  }
}
