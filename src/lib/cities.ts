export interface City {
  name: string; lat: number; lng: number; country: string;
  pulse?: boolean; flag?: string;
}

export const ukCities: City[] = [
  { name: 'London', lat: 51.5074, lng: -0.1278, country: 'UK', pulse: true, flag: '🇬🇧' },
  { name: 'Manchester', lat: 53.4808, lng: -2.2426, country: 'UK', pulse: true, flag: '🇬🇧' },
  { name: 'Birmingham', lat: 52.4862, lng: -1.8904, country: 'UK', pulse: true, flag: '🇬🇧' },
];

export const globalCities: City[] = [
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, country: 'UAE', flag: '🇦🇪' },
  { name: 'New York', lat: 40.7128, lng: -74.006, country: 'USA', flag: '🇺🇸' },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832, country: 'Canada', flag: '🇨🇦' },
  { name: 'Berlin', lat: 52.52, lng: 13.405, country: 'Germany', flag: '🇩🇪' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, country: 'Singapore', flag: '🇸🇬' },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, country: 'India', flag: '🇮🇳' },
  { name: 'Karachi', lat: 24.8607, lng: 67.0011, country: 'Pakistan', flag: '🇵🇰' },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia', flag: '🇦🇺' },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, country: 'Nigeria', flag: '🇳🇬' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan', flag: '🇯🇵' },
  { name: 'Sao Paulo', lat: -23.5505, lng: -46.6333, country: 'Brazil', flag: '🇧🇷' },
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241, country: 'South Africa', flag: '🇿🇦' },
];

export const taskFeedItems = [
  'YouTube engagement completed in London',
  'Website visit from Berlin',
  'App install completed in Dubai',
  'Business review approved in Toronto',
  'Social media follow from Mumbai',
  'Google review submitted in Manchester',
  'Video watch completed in Singapore',
  'Survey completed in New York',
  'Ecommerce visit from Sydney',
  'Content share from Karachi',
];

export const cities = [...ukCities, ...globalCities];
