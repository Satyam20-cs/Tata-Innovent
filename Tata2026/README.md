<main>
  <h1>AI/ML-Based Vehicle Health Diagnostics Roadmap</h1>
  <section>
    <h2>Overview</h2>
    <p>A modern AI-driven system for real-time vehicle health diagnostics, predictive maintenance, and driving simulations. Built with scalable architecture and responsive design for seamless performance on all devices.</p>
  </section>

  <section>
    <h2>System Architecture</h2>
    <pre>
Frontend (Next.js + TypeScript)
   ↓
Backend (Server Actions + Firebase)
   ↓
AI Logic (Genkit)
   ↓
Database (Firestore)
    </pre>
  </section>

  <section>
    <h2>Database Schema</h2>
    <table>
      <tr><th>Collection</th><th>Fields</th></tr>
      <tr><td>users</td><td>userId, email, vehicleIds[], createdAt</td></tr>
      <tr><td>vehicles</td><td>vehicleId, userId, make, model, specs</td></tr>
      <tr><td>diagnosticData</td><td>vehicleId, timestamp, sensorData{}</td></tr>
      <tr><td>simulationSessions</td><td>sessionId, userId, events[], finalState{}</td></tr>
    </table>
  </section>

  <section>
    <h2>Core Server Actions</h2>
    <ul>
      <li><b>predictMaintenanceAction</b> — Analyzes live data for potential failures</li>
      <li><b>runSimulationAction</b> — Simulates vehicle stress and wear</li>
      <li><b>getDiagnosticAdviceAction</b> — Conversational AI for maintenance help</li>
    </ul>
  </section>

  <section>
    <h2>AI / ML & Simulation Logic</h2>
    <ul>
      <li>Predictive maintenance via Genkit</li>
      <li>Component health scoring (engine, brakes, sensors)</li>
      <li>Driving pattern classification</li>
      <li>Virtual simulation for wear & tear prediction</li>
    </ul>
    <pre>
High RPM > 4500 → +0.2% engine wear/min  
Hard braking → +0.5% brake wear  
Overheating > 105°C → exponential damage
    </pre>
  </section>

  <section>
    <h2>Frontend Highlights</h2>
    <ul>
      <li>Next.js + TypeScript responsive UI</li>
      <li>Dark theme dashboard with analytics</li>
      <li>Vehicle management & diagnostics visualization</li>
      <li>Integrated AI assistant chat</li>
    </ul>
  </section>

  <section>
    <h2>Testing & Security</h2>
    <ul>
      <li>Unit & E2E Testing — Jest, Cypress</li>
      <li>Authentication — Firebase Auth + JWT</li>
      <li>Data protection — encryption in transit & at rest</li>
      <li>Rate limiting & API security</li>
    </ul>
  </section>

  <section>
    <h2>Deployment & Monitoring</h2>
    <ul>
      <li>Frontend: Vercel</li>
      <li>Backend: Firebase Functions</li>
      <li>Monitoring: Sentry + Firebase Analytics</li>
      <li>CI/CD: GitHub Actions</li>
    </ul>
  </section>

  <section>
    <h2>Tech Stack</h2>
    <table>
      <tr><th>Layer</th><th>Tech</th></tr>
      <tr><td>Frontend</td><td>Next.js, TypeScript</td></tr>
      <tr><td>Backend</td><td>Firebase, Server Actions</td></tr>
      <tr><td>AI</td><td>Genkit</td></tr>
      <tr><td>UI</td><td>Tailwind (ShadCN UI)</td></tr>
      <tr><td>Testing</td><td>Jest, Cypress</td></tr>
    </table>
  </section>

  <section>
    <h2>Future Enhancements</h2>
    <ul>
      <li>Mobile App (React Native)</li>
      <li>OBD-II hardware data sync</li>
      <li>Blockchain maintenance tracking</li>
      <li>AR-based damage visualization</li>
    </ul>
  </section>

  <section style="text-align:center; color:var(--muted); font-size:0.85rem;">
    <p>© 2025 AI/ML Vehicle Health Diagnostics | All Rights Reserved</p>
  </section>
</main>
</body>
</html>
