// Store responses locally
const responses = [];

// Start Session
function startSession() {
  const username = document.getElementById("username").value.trim();
  const role = document.getElementById("role").value.trim();

  if (!username || !role) {
    alert("Please enter your name and role to continue.");
    return;
  }

  // Save user details
  database.ref("users").push({ username, role, timestamp: Date.now() });

  document.getElementById("login").style.display = "none";
  document.getElementById("activation").style.display = "block";
}

// Save Activation Input
function saveActivation() {
  const activation = document.getElementById("activationInput").value.trim();

  if (!activation) {
    alert("Please describe activation details.");
    return;
  }

  database.ref("responses").push({ step: "Activation", detail: activation, timestamp: Date.now() });
  responses.push({ step: "Activation", detail: activation });

  document.getElementById("activation").style.display = "none";
  document.getElementById("responseSteps").style.display = "block";
}

// Save Response Steps
function saveResponseSteps() {
  const team = document.getElementById("teamInput").value.trim();
  const actions = document.getElementById("actionsInput").value.trim();

  if (!team || !actions) {
    alert("Please complete both fields.");
    return;
  }

  database.ref("responses").push({ step: "Response Steps", team, actions, timestamp: Date.now() });
  responses.push({ step: "Response Steps", team, actions });

  document.getElementById("responseSteps").style.display = "none";
  document.getElementById("referrals").style.display = "block";
}

// Save Referrals and Resources
function saveReferrals() {
  const referral = document.getElementById("referralInput").value.trim();
  const resources = document.getElementById("resourcesInput").value.trim();
  const data = document.getElementById("dataInput").value.trim();

  if (!referral || !resources || !data) {
    alert("Please complete all fields.");
    return;
  }

  database.ref("responses").push({
    step: "Referrals",
    referral,
    resources,
    data,
    timestamp: Date.now()
  });
  responses.push({ step: "Referrals", referral, resources, data });

  document.getElementById("referrals").style.display = "none";
  document.getElementById("partners").style.display = "block";
}

// Save Partners
function savePartners() {
  const partners = document.getElementById("partnersInput").value.trim();
  const underutilizedResources = document.getElementById("underutilizedResourcesInput").value.trim();

  if (!partners || !underutilizedResources) {
    alert("Please complete all fields.");
    return;
  }

  database.ref("responses").push({
    step: "Partners",
    partners,
    underutilizedResources,
    timestamp: Date.now()
  });
  responses.push({ step: "Partners", partners, underutilizedResources });

  document.getElementById("partners").style.display = "none";
  document.getElementById("painPoints").style.display = "block";
}

// Save Pain Points
function savePainPoints() {
  const painPoints = document.getElementById("painPointsInput").value.trim();

  if (!painPoints) {
    alert("Please describe your pain points.");
    return;
  }

  database.ref("responses").push({ step: "Pain Points", detail: painPoints, timestamp: Date.now() });
  responses.push({ step: "Pain Points", detail: painPoints });

  document.getElementById("painPoints").style.display = "none";
  document.getElementById("summary").style.display = "block";

  generateSummary();
}

// Generate Summary
function generateSummary() {
  const summaryList = document.getElementById("finalSummaryList");
  summaryList.innerHTML = "";

  responses.forEach((response) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${response.step}: ${response.detail}`;
    summaryList.appendChild(listItem);
  });
}

// Print Summary
function printSummary() {
  window.print();
}
