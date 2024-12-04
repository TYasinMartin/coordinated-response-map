// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXZ50WGW8kXZ1sRxT6sCzDMtrmHu__lS0",
    authDomain: "mappingexercise-b2641.firebaseapp.com",
    databaseURL: "https://mappingexercise-b2641-default-rtdb.firebaseio.com",
    projectId: "mappingexercise-b2641",
    storageBucket: "mappingexercise-b2641.firebasestorage.app",
    messagingSenderId: "182824622721",
    appId: "1:182824622721:web:d77132f33aad0df2590b80",
    measurementId: "G-5G221YGZL7"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Store Responses
  const responses = [];
  
  // Start Session
  function startSession() {
    const username = document.getElementById("username").value.trim();
    const role = document.getElementById("role").value.trim();

    if (!username || !role) {
      alert("Please enter your name and role to continue.");
      return;
    }

    // Clear previous responses from Firebase
    database.ref("responses").remove()
      .then(() => {
        console.log("Previous responses cleared.");
      })
      .catch((error) => {
        console.error("Error clearing responses:", error);
      });

    // Save user details
    database.ref("users").push({
      username: username,
      role: role,
      timestamp: Date.now()
    });

    // Update UI
    document.getElementById("login").style.display = "none";
    document.getElementById("activation").style.display = "block";
  }
  
  // Save Activation Step
  function saveActivation() {
    const activation = document.getElementById("activationInput").value.trim();
  
    if (!activation) {
      alert("Please describe how your agency gets activated.");
      return;
    }
  
    // Save to Firebase
    database.ref("responses").push({
      step: "Activation",
      detail: activation,
      timestamp: Date.now()
    });
  
    responses.push({ step: "Activation", detail: activation });
  
    // Update UI
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
  
    // Save to Firebase
    database.ref("responses").push({
      step: "Response Steps",
      team: team,
      actions: actions,
      timestamp: Date.now()
    });
  
    responses.push({ step: "Response Steps", team, actions });
  
    // Update UI
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
  
    // Save to Firebase
    database.ref("responses").push({
      step: "Referrals",
      referral: referral,
      resources: resources,
      data: data,
      timestamp: Date.now()
    });
  
    responses.push({ step: "Referrals", referral, resources, data });
  
    // Update UI
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
  
    // Save to Firebase
    database.ref("responses").push({
      step: "Partners",
      partners: partners,
      underutilizedResources: underutilizedResources,
      timestamp: Date.now()
    });
  
    responses.push({ step: "Partners", partners, underutilizedResources });
  
    // Update UI
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
  
    // Save to Firebase
    database.ref("responses").push({
      step: "Pain Points",
      detail: painPoints,
      timestamp: Date.now()
    });
  
    responses.push({ step: "Pain Points", detail: painPoints });
  
    // Update UI
    document.getElementById("painPoints").style.display = "none";
    document.getElementById("summary").style.display = "block";
  
    generateSummary();
  }

  // Generate Summarys   
  function generateSummary() {
    const summaryList = document.getElementById("finalSummaryList");
    summaryList.innerHTML = "";

    // Use local responses array to populate the summary
    responses.forEach((response) => {
      const listItem = document.createElement("li");
      let content = `${response.step}: `;

      if (response.detail) content += response.detail;
      else if (response.team && response.actions) content += `Team - ${response.team}, Actions - ${response.actions}`;
      else if (response.referral && response.resources && response.data) content += `Referral - ${response.referral}, Resources - ${response.resources}, Data - ${response.data}`;
      else if (response.partners && response.underutilizedResources) content += `Partners - ${response.partners}, Underutilized Resources - ${response.underutilizedResources}`;

      listItem.textContent = content;
      summaryList.appendChild(listItem);
    });
  }

  
  // Print Summary
  function printSummary() {
    window.print();
  }
  
