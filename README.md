# Wildfire Tracker

Client-Side Wildfire Detection Map Powered by NASA Satellite Data

---

## Overview

Wildfire Tracker is a client-side React application that retrieves current active fire detections from NASA's FIRMS satellite feed and displays them on a live map of Canada. The application has no backend nor database. All requests are made from the browser directly to NASA's API and nothing is saved other than the current browsing session.

### Key Features

**Satellite Fire Information**: Uses data about or active fires detected by NASA FIRMS with the help of the VIIRS sensor

**Interactive Map**: Includes the ability to pan, zoom, and click to get details about various fire detections

**Filter by Confidence Level**: Users can filter fire detections based on confident levels (low, medium, high) as well as date range of fire events

**Country-Wide Coverage**: Uses bounding box that covers Canada entirely including regions not covered by conventional fire trackers

**Frontend**: React (Vite), react-leaflet, Leaflet.js, CSS Modules
**Data Source**: NASA FIRMS Area API (VIIRS_SNPP_NRT, CSV format)
**Map Tiles**: OpenStreetMap

---

## Architecture

Data Layer: The custom hook useWildfires - The raw CSV from FIRMS is obtained, parsed, and converted into a uniform form so that other functionality can work based on this data.

**Filter Layer**: The function filterEvents - is a pure function receiving the list of detections along with the current filters of confidence, start date, and end date. It returns the filtered list whenever it is executed.

**Map Layer**: The Map and EventMarker - render the Leaflet map and draw one pin for each event that shows its confidence, fire power, day/night information etc.

**UI Layer**: The Sidebar, FilterPanel, and LoadingSpinner - is a floating control panel that functions above the Leaflet map without occupying a column on a sidebar.

---

## Workflow

### Loading Fire Data

1. The filter state is used in App.jsx which is higher than both the filter panel and map.

2. The filterEvents function provides a new filtered list of wildfireEvents based on the current events and properly applied filter with no need for DOM updates and avoiding state issues caused by previous renders.

3. The app is set up to show confidence: "high" by default on the first loading and not "All." It avoids displaying all detections with low confidence at the same time which leads to slower response time from the map.

### Filtering Detections

1. The filter state confidence along with startDate and endDate is present in the App.jsx file and is shared by filter panel and map components.
2. Every render, filterEvents creates a newly filtered array based on the current wildfireEvents and active filters, which does not involve any manual changes in the DOM.
3. The application is loaded in confidence: "high" by default rather than "all," because rendering every low-confidence event would be unnecessary.

### Handling Errors

1. Should there be no success with the FIRMS request, the `errorMessage` variable is assigned a value and printed in the sidebar.
2. The map will always contain information, whatever data is available will still appear next to the error banner.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A free NASA FIRMS `MAP_KEY` — register at [firms.modaps.eosdis.nasa.gov/api/map_key](https://firms.modaps.eosdis.nasa.gov/api/map_key/)

### Setup

1. Clone the repository and open it in your terminal or IDE:

   ```
   git clone <your-repo-url>
   cd wildfire-tracker
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the project root (same level as `package.json`) and add your FIRMS API key:

   ```
   VITE_FIRMS_MAP_KEY=your_map_key_here
   ```

   This file is git-ignored on purpose — never commit your real key to a public repository.

4. Start the development server:

   ```
   npm run dev
   ```

5. Open the local URL shown in your terminal in your browser.

---

## Data Source & Attribution

NASA's Fire Information for Resource Management System (FIRMS) supplies the data on fire detection; it is a part of NASA's Land, Atmosphere near real-time capability for EOS (LANCE). Map tiles are imported from contributors of OpenStreetMap. The project is not associated with or recognized by NASA in any form.

---

## Limitations

**Functional**: No grouping of markers for crowded areas, no capability to see position of the user by tapping one button, and practically no history of fires

**Technical**: Only one-device-based method of retrieving fire data and lack of cache makes process flounder

**Data**: The user has only three days to see history of a fire; since VIIRS is orbiting the Earth from pole to pole, it brings clouds and displays data only in certain areas in a day

**UX**: No complete or sophisticated view either on desktop or a mobile.
