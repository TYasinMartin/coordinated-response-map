// Firebase Database Reference
const database = firebase.database();

// Start Session
function startSession() {
  const username = document.getElementById("username").value.trim();
  const role = document.getElementById("role").value.trim();

  if (!username || !role) {
    alert("Please enter both your name and role to continue.");
    return;
  }

  console.log(`User Logged In: ${username}, Role: ${role}`);

  // Save user details to Firebase
  database.ref("users").push({
    name: username,
    role: role,
    timestamp: Date.now()
  });

  document.getElementById("login").style.display = "none";
  document.getElementById("activation").style.display = "block";
}

// Save Activation Input
function saveActivation() {
  const activation = document.getElementById("activationInput").value.trim();

  if (!activation) {
    alert("Please describe how your agency gets activated.");
    return;
  }

  console.log(`Activation Input: ${activation}`);

  // Save to Firebase
  database.ref("responses").push({
    step: "Activation",
    detail: activation,
    timestamp: Date.now()
  });

  document.getElementById("activation").style.display = "none";
  document.getElementById("responseSteps").style.display = "block";
}

// Save Response Steps
function saveResponseSteps() {
  const team = document.getElementById("teamInput").value.trim();
  const actions = document.getElementById("actionsInput").value.trim();

  if (!team || !actions) {
    alert("Please complete all fields about your response.");
    return;
  }

  console.log(`Team: ${team}, Actions: ${actions}`);

  // Save to Firebase
  database.ref("responses").push({
    step: "Response Steps",
    team: team,
    actions: actions,
    timestamp: Date.now()
  });

  document.getElementById("responseSteps").style.display = "none";
  document.getElementById("referrals").style.display = "block";
}

// Save Referrals and Resources
function saveReferrals() {
  const referral = document.getElementById("referralInput").value.trim();
  const resources = document.getElementById("resourcesInput").value.trim();
  const data = document.getElementById("dataInput").value.trim();

  if (!referral || !resources || !data) {
    alert("Please complete all fields about referrals, resources, and data.");
    return;
  }

  console.log(`Referral: ${referral}, Resources: ${resources}, Data: ${data}`);

  // Save to Firebase
  database.ref("responses").push({
    step: "Referrals",
    referral: referral,
    resources: resources,
    data: data,
    timestamp: Date.now()
  });

  document.getElementById("referrals").style.display = "none";
  document.getElementById("partners").style.display = "block";
}

// Save Partners and Resources
function savePartners() {
  const partners = document.getElementById("partnersInput").value.trim();
  const underutilizedResources = document.getElementById("underutilizedResourcesInput").value.trim();

  if (!partners || !underutilizedResources) {
    alert("Please complete all fields about partners and underutilized resources.");
    return;
  }

  console.log(`Partners: ${partners}, Underutilized Resources: ${underutilizedResources}`);

  // Save to Firebase
  database.ref("responses").push({
    step: "Partners",
    partners: partners,
    underutilizedResources: underutilizedResources,
    timestamp: Date.now()
  });

  document.getElementById("partners").style.display = "none";
  document.getElementById("painPoints").style.display = "block";
}

// Save Pain Points
function savePainPoints() {
  const painPoints = document
// Save Pain Points
function savePainPoints() {
    const painPoints = document.getElementById("painPointsInput").value.trim();
  
    if (!painPoints) {
      alert("Please describe your pain points.");
      return;
    }
  
    console.log(`Pain Points: ${painPoints}`);
  
    // Save to Firebase
    database.ref("responses").push({
      step: "Pain Points",
      detail: painPoints,
      timestamp: Date.now()
    });
  
    document.getElementById("painPoints").style.display = "none";
    document.getElementById("summary").style.display = "block";
  
    generateSummary();
  }
  
  // Generate Summary
  function generateSummary() {
    const summaryList = document.getElementById("finalSummaryList");
    summaryList.innerHTML = ""; // Clear previous content
  
    database.ref("responses").once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const listItem = document.createElement("li");
        listItem.textContent = `${data.step}: ${data.detail || ""}`;
        summaryList.appendChild(listItem);
      });
    });
  }
  
  // Print Summary
  function printSummary() {
    window.print();
  }
  