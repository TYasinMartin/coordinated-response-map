// Global Data Storage
const responses = [];
const workflows = [];
const agencies = [];

// Feedback Display
function displayFeedback(step, input) {
  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.innerHTML = `<p>${step}: "${input}" recorded successfully.</p>`;
  feedbackDiv.style.display = "block";
  setTimeout(() => {
    feedbackDiv.style.display = "none";
  }, 3000);
}

// Navigation Functions
function goToStep2() {
  const agencyName = document.getElementById('agencyName').value.trim();
  const agencyRole = document.getElementById('agencyRole').value.trim();
  if (!agencyName || !agencyRole) {
    alert('Please enter both your agency name and role!');
    return;
  }
  agencies.push({ agencyName, agencyRole });
  displayFeedback("Agency Info", `${agencyName} (${agencyRole})`);
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
}

function goToStep3() {
  const activation = document.getElementById('activationMethods').value.trim();
  if (!activation) {
    alert('Please enter activation details!');
    return;
  }
  responses.push({ step: "Activation", detail: activation });
  displayFeedback("Activation", activation);
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'block';
}

function goToStep4() {
  const actions = document.getElementById('keyActions').value.trim();
  if (!actions) {
    alert('Please describe your actions!');
    return;
  }
  responses.push({ step: "Actions", detail: actions });
  displayFeedback("Actions", actions);
  document.getElementById('step3').style.display = 'none';
  document.getElementById('step4').style.display = 'block';
}

function goToSummary() {
  const referrals = document.getElementById('referralProcess').value.trim();
  const followUps = document.getElementById('followUpActions').value.trim();
  if (!referrals || !followUps) {
    alert('Please complete the referral and follow-up sections!');
    return;
  }
  responses.push({ step: "Referrals", detail: referrals });
  responses.push({ step: "Follow-Ups", detail: followUps });
  displayFeedback("Summary", "All inputs recorded successfully!");

  document.getElementById('step4').style.display = 'none';
  document.getElementById('summary').style.display = 'block';
  generateSummary();
}

// Generate Summary with Agency Details
function generateSummary() {
  const summaryContent = document.getElementById('summaryContent');
  summaryContent.innerHTML = ''; // Clear previous content

  responses.forEach((response) => {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'agency-summary';
    responseDiv.innerHTML = `
      <p><strong>${response.step || "Agency"}:</strong> ${response.detail || `${response.agencyName} (${response.agencyRole})`}</p>
    `;
    summaryContent.appendChild(responseDiv);
  });

  renderFlowChart(responses);
  renderReferralNetwork(agencies);
}

// Render Interactive Map Markers
function addMapMarkers() {
  const iframe = document.getElementById('mapIframe');
  agencies.forEach((agency, index) => {
    const marker = document.createElement('div');
    marker.className = 'map-marker';
    marker.style.position = 'absolute';
    marker.style.left = `${50 + index * 50}px`; // Adjust positions dynamically
    marker.style.top = `${200 + index * 30}px`;
    marker.innerHTML = `<span>${agency.agencyName}</span>`;
    iframe.appendChild(marker);
  });
}

// Render Flowchart with Agencies and Connections
function renderFlowChart(agencies) {
  const svg = d3.select("#flowChart");
  svg.selectAll("*").remove(); // Clear previous chart

  const nodeWidth = 150;
  const nodeHeight = 50;
  const spacing = 200;

  agencies.forEach((agency, index) => {
    const x = 100 + index * spacing;
    const y = 200;

    // Node
    svg.append("rect")
      .attr("x", x)
      .attr("y", y)
      .attr("width", nodeWidth)
      .attr("height", nodeHeight)
      .attr("fill", "lightblue")
      .attr("stroke", "black");

    // Text
    svg.append("text")
      .attr("x", x + nodeWidth / 2)
      .attr("y", y + nodeHeight / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(agency.agencyName || agency.step);

    // Arrows (connections)
    if (index < agencies.length - 1) {
      svg.append("line")
        .attr("x1", x + nodeWidth)
        .attr("y1", y + nodeHeight / 2)
        .attr("x2", x + spacing)
        .attr("y2", y + nodeHeight / 2)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)");
    }
  });

  // Add Arrow Marker
  svg.append("defs")
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 10)
    .attr("refY", 5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 Z")
    .attr("fill", "black");
}

// Render Referral Network
function renderReferralNetwork(agencies) {
  const svg = d3.select("#referralChart");
  svg.selectAll("*").remove(); // Clear previous chart

  const centerX = 400;
  const centerY = 300;
  const radius = 200;

  agencies.forEach((agency, index) => {
    const angle = (2 * Math.PI * index) / agencies.length;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Node
    svg.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 30)
      .attr("fill", "lightgreen");

    // Text
    svg.append("text")
      .attr("x", x)
      .attr("y", y + 5)
      .attr("text-anchor", "middle")
      .text(agency.agencyName);

    // Connection Lines
    if (index > 0) {
      const prevAngle = (2 * Math.PI * (index - 1)) / agencies.length;
      const prevX = centerX + radius * Math.cos(prevAngle);
      const prevY = centerY + radius * Math.sin(prevAngle);

      svg.append("line")
        .attr("x1", prevX)
        .attr("y1", prevY)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    }
  });
}

// Print Summary
function printSummary() {
  window.print();
}
