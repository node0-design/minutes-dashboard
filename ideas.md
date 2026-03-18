# Jingle Dashboard Design Brainstorm

## Design Approach Selected: Modern Telecom Analytics

**Design Movement:** Contemporary SaaS dashboard with tech-forward aesthetics inspired by network visualization and real-time data systems.

**Core Principles:**
1. **Real-time Focus** - Emphasize live data with animated metrics and smooth transitions
2. **Information Density** - Present complex telecom metrics in scannable, hierarchical cards
3. **Brand Integration** - Minutes Network's magenta/purple accent with dark professional base
4. **Responsive Grid** - Flexible card-based layout that adapts from mobile to wide desktop

**Color Philosophy:**
- **Primary:** Deep purple/navy background (from Minutes Network branding) - conveys trust and professionalism
- **Accent:** Vibrant magenta (#FF1493 or similar) - Minutes Network brand color for CTAs and highlights
- **Secondary:** Cyan/light blue - complementary accent for secondary metrics
- **Neutrals:** Clean whites and light grays for text and cards
- **Reasoning:** The dark background reduces eye strain for monitoring dashboards while the magenta accent creates visual hierarchy and brand recognition

**Layout Paradigm:**
- **Asymmetric Grid System** - Mix of 1-column, 2-column, and 3-column card layouts
- **Top Section:** KPI cards (Live Calls, Users Online, Daily Minutes, Service Fees) in a 4-column responsive grid
- **Middle Section:** Time series chart (hourly/daily trends) spanning full width
- **Lower Section:** Country breakdown and quality metrics in a 2-column layout
- **Sidebar Alternative:** Optional collapsible sidebar for navigation and filters

**Signature Elements:**
1. **Animated Metric Badges** - Live stats with subtle pulse animations and trend indicators (↑/↓)
2. **Network-inspired Dividers** - Subtle gradient lines and geometric accents between sections
3. **Glowing Accent Borders** - Magenta borders on key cards with soft glow effect

**Interaction Philosophy:**
- **Smooth Polling Updates** - Metrics update seamlessly without jarring jumps
- **Hover States** - Cards lift slightly on hover with shadow depth increase
- **Loading States** - Skeleton screens for initial data load, then smooth transitions
- **Responsive Tooltips** - Hover over metrics to see detailed breakdowns

**Animation:**
- **Entrance:** Cards fade in with subtle slide-up animation on page load
- **Updates:** Number changes use smooth transitions (0.3s ease-out)
- **Hover:** 150ms scale and shadow transform on interactive elements
- **Pulse:** Live metrics have gentle pulse animation to indicate real-time updates
- **Transitions:** All color and position changes use ease-out timing for polish

**Typography System:**
- **Display Font:** "Sora" or "Outfit" - modern, geometric sans-serif for headers (bold weight)
- **Body Font:** "Inter" - clean, highly readable for metrics and descriptions (regular/medium weights)
- **Hierarchy:** 
  - Page title: 2.5rem bold
  - Card titles: 1.25rem medium
  - Metrics: 2rem bold (for large numbers)
  - Labels: 0.875rem regular (muted color)
  - Body text: 1rem regular

**Jingle API Endpoints Used:**
- `/stats/live` - Active calls, connected users (poll every 10s)
- `/stats/daily` - Daily aggregates: minutes, fees, calls (poll every 30s)
- `/stats/quality` - ASR, NER, PDD metrics (poll every 30s)
- `/countries` - Per-country breakdown (poll every 60s)
- `/timeseries` - Hourly trends for charting (poll every 60s)
- `/cdr` - Recent call records (poll every 15s)

---

## Design Rationale

The dashboard prioritizes **clarity and real-time awareness** for telecom operations teams. The dark theme with magenta accents directly reflects Minutes Network's brand identity while maintaining professional aesthetics. The card-based layout allows operators to quickly scan key metrics (live calls, users, fees) while drilling into detailed analytics (country performance, quality metrics) without overwhelming the interface.

The animation strategy is intentionally restrained—only essential updates animate to prevent distraction during monitoring tasks. The responsive grid ensures the dashboard works on mobile for quick status checks while providing full detail on desktop.
