class WeatherService {
    constructor() {
        // Prefer an explicit global override if provided, otherwise use current origin
        // This makes the frontend work both locally and on deployed domains over HTTPS
        const configuredUrl = (typeof window !== 'undefined' && window.__BACKEND_URL__) ? window.__BACKEND_URL__ : `${window.location.origin}`;
        this.backendUrl = `${configuredUrl.replace(/\/$/, '')}/api`;
    }

    async getComprehensiveWeather(lat, lon) {
        try {
            const response = await fetch(`${this.backendUrl}/weather?lat=${lat}&lon=${lon}`);

            if (!response.ok) {
                throw new Error(`Backend error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Hava durumu alınamadı:', error);
            throw new Error('Hava durumu servisine ulaşılamıyor. Backend çalışıyor mu?');
        }
    }

    async getCurrentWeather(lat, lon) {
        return this.getComprehensiveWeather(lat, lon);
    }
}