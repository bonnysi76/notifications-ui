document.addEventListener("DOMContentLoaded", () => {
  const notificationList = document.getElementById("notification-list");
  const tabs = document.querySelectorAll(".tab");

  // Load notifications from the mock JSON file
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      displayNotifications(data, "all");

      // Tab filtering
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelector(".tab.active").classList.remove("active");
          tab.classList.add("active");
          const filter = tab.getAttribute("data-filter");
          displayNotifications(data, filter);
        });
      });
    });

  // Display notifications based on the filter
  function displayNotifications(notifications, filter) {
    notificationList.innerHTML = "";

    notifications
      .filter((notification) => {
        if (filter === "unread") return !notification.read;
        return true;
      })
      .forEach((notification) => {
        const notificationElement = document.createElement("div");
        notificationElement.classList.add("notification");
        if (!notification.read) notificationElement.classList.add("unread");

        notificationElement.innerHTML = `
          <div class="content">
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
          </div>
          <div class="actions">
            <button class="review-btn">Review</button>
            <button class="mark-btn">${notification.read ? "Mark Unread" : "Mark Read"}</button>
          </div>
        `;

        notificationList.appendChild(notificationElement);

        // Mark as read/unread button functionality
        notificationElement.querySelector(".mark-btn").addEventListener("click", () => {
          notification.read = !notification.read;
          displayNotifications(notifications, filter);
        });
      });
  }
});
