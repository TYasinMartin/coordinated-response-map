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
  
  // Generate Summary
  function generateSummary() {
    const summaryList = document.getElementById("finalSummaryList");
    summaryList.innerHTML = "";

    // Fetch data from Firebase
    database.ref("responses").once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          const listItem = document.createElement("li");

          // Dynamically construct summary content
          let content = `${data.step}: `;

          // Include username and role if available
          if (data.username && data.role) content += `User - ${data.username}, Role - ${data.role} `;

          // Add specific step details
          else if (data.detail) content += data.detail;
          else if (data.team && data.actions) content += `Team - ${data.team}, Actions - ${data.actions}`;
          else if (data.referral && data.resources && data.data) {
            content += `Referral - ${data.referral}, Resources - ${data.resources}, Data - ${data.data}`;
          } else if (data.partners && data.underutilizedResources) {
            content += `Partners - ${data.partners}, Underutilized Resources - ${data.underutilizedResources}`;
          }

          listItem.textContent = content;
          summaryList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error generating summary:", error);
       alert("Failed to generate summary. Please try again.");
      });
  }

  
  // Print Summary
  function printSummary() {
    window.print();
  }
  
