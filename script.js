let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

let sectionJobsCount = document.getElementById("sectionJobsCount");
let emptyState = document.getElementById("emptyState");

let tabs = document.querySelectorAll("[data-tab]");
let activeTab = "all";



function updateCounts() {

  let cards = document.querySelectorAll(".job-card");

  let total = 0;
  let interview = 0;
  let rejected = 0;

  for (let i = 0; i < cards.length; i++) {

    total = total + 1;

    let status = cards[i].getAttribute("data-status");

    if (status === "interview") {
      interview = interview + 1;
    }

    if (status === "rejected") {
      rejected = rejected + 1;
    }
  }

  totalCount.innerText = total;
  interviewCount.innerText = interview;
  rejectedCount.innerText = rejected;
}



function updateBadge(card) {

  let badge = card.querySelector(".badge");
  let status = card.getAttribute("data-status");

  if (status === "not_applied") {
    badge.innerText = "NOT APPLIED";
    badge.className = "badge badge-info badge-outline";
  }

  if (status === "interview") {
    badge.innerText = "INTERVIEW";
    badge.className = "badge badge-success";
  }

  if (status === "rejected") {
    badge.innerText = "REJECTED";
    badge.className = "badge badge-error";
  }
}



function showJobs(type) {

  let cards = document.querySelectorAll(".job-card");
  let visible = 0;

  for (let i = 0; i < cards.length; i++) {

    let status = cards[i].getAttribute("data-status");
    let show = false;

    if (type === "all") {
      show = true;
    }

    if (type === "interview" && status === "interview") {
      show = true;
    }

    if (type === "rejected" && status === "rejected") {
      show = true;
    }

    if (show === true) {
      cards[i].style.display = "block";
      visible = visible + 1;
    } else {
      cards[i].style.display = "none";
    }
  }

  sectionJobsCount.innerText = visible + " jobs";

  if (visible === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }
}



for (let i = 0; i < tabs.length; i++) {

  tabs[i].onclick = function () {

    for (let j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove("tab-active");
    }

    this.classList.add("tab-active");

    activeTab = this.getAttribute("data-tab");
    showJobs(activeTab);
  };
}



let cards = document.querySelectorAll(".job-card");

for (let i = 0; i < cards.length; i++) {

  let card = cards[i];

  let interviewBtn = card.querySelector('[data-action="interview"]');
  let rejectedBtn = card.querySelector('[data-action="rejected"]');
  let deleteBtn = card.querySelector('[data-action="delete"]');

  interviewBtn.onclick = function () {

    let parentCard = this.closest(".job-card");

    parentCard.setAttribute("data-status", "interview");
    updateBadge(parentCard);
    updateCounts();
    showJobs(activeTab);
  };

  rejectedBtn.onclick = function () {

    let parentCard = this.closest(".job-card");

    parentCard.setAttribute("data-status", "rejected");
    updateBadge(parentCard);
    updateCounts();
    showJobs(activeTab);
  };

  deleteBtn.onclick = function () {

    let parentCard = this.closest(".job-card");

    parentCard.remove();
    updateCounts();
    showJobs(activeTab);
  };
}



for (let i = 0; i < cards.length; i++) {
  updateBadge(cards[i]);
}

updateCounts();
showJobs(activeTab);