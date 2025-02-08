// NACITANIE 
document.addEventListener("DOMContentLoaded", loadTimeslots);





// Utility function to format "YYYY-MM-DD" into "DD/MM/YYYY"
function formatDate(dateString) {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(1, "0"); // Odstránime vedúcu nulu
    const month = String(d.getMonth() + 1).padStart(1, "0"); // Odstránime vedúcu nulu
    const year = d.getFullYear();
    
    const daysOfWeek = ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
    const dayName = daysOfWeek[d.getDay()]; // Získa deň v týždni
    return `${dayName} ${day}.${month}.${year}`;
  }

async function loadTimeslots() {
  try {
      const response = await fetch("https://klinika10-backend-cfgbfma3h5g4cbcb.germanywestcentral-01.azurewebsites.net/api/get_all_timeslots");
      let timeslots = await response.json();

      // 1️⃣ Sort slots by date (ascending)
      timeslots.sort((a, b) => new Date(a.date) - new Date(b.date));

      const timeslotsDiv = document.getElementById("timeslots");
      timeslotsDiv.innerHTML = ""; // Clear previous

      // 2️⃣ Group them by date
      const groupedByDay = {};
      timeslots.forEach(slot => {
          if (!groupedByDay[slot.date]) {
              groupedByDay[slot.date] = [];
          }
          groupedByDay[slot.date].push(slot);
      });

      // 3️⃣ Get a sorted list of dates
      const sortedDates = Object.keys(groupedByDay).sort(
          (a, b) => new Date(a) - new Date(b)
      );

      // 4️⃣ Build HTML for each date
      sortedDates.forEach(date => {
          // Day header
          const dayRow = document.createElement("div");
          dayRow.classList.add("day-row");
          dayRow.textContent = formatDate(date); // Convert "YYYY-MM-DD" to "DD/MM/YYYY"

          // Toggle show/hide timeslots (accordion style)
          dayRow.addEventListener("click", function () {
              toggleTimeslotVisibility(date);
          });

          // Container for timeslots of that day
          const timeslotContainer = document.createElement("div");
          timeslotContainer.classList.add("timeslot-container");
          timeslotContainer.id = `timeslot-${date}`;

          // Create each slot
          groupedByDay[date].forEach(slot => {
              const slotElement = document.createElement("div");
              slotElement.classList.add("timeslot");
              slotElement.textContent = slot.time.slice(0, 5);
              slotElement.setAttribute("data-id", slot.id);

              // If occupied, color it red, but don't move it
              if (slot.is_taken) {
                  slotElement.classList.add("occupied");
                  slotElement.textContent += " (Obsadené)";
              } else {
                  // If free, allow click to select
                  slotElement.addEventListener("click", function (event) {
                      selectTimeslot(event);
                  });
              }

              timeslotContainer.appendChild(slotElement);
          });

          // Append day + slots to page
          timeslotsDiv.appendChild(dayRow);
          timeslotsDiv.appendChild(timeslotContainer);
      });

  } catch (error) {
      console.error("Chyba pri načítaní termínov:", error);
  }
}

//SCROLL NA FORM
let hasScrolled = false; // Prevent multiple forced scrolls

function isMobile() {
    return window.innerWidth <= 768; // Only scroll if screen is small
}

function scrollToForm() {
    if (hasScrolled || !isMobile()) return; // Don't scroll on large screens

    const form = document.getElementById("reservationForm");
    if (!form) return;

    // ✅ Scroll to the form smoothly
    form.scrollIntoView({ behavior: "smooth", block: "start" });

    // ✅ Allow user to scroll freely after first scroll
    hasScrolled = true;

    // ✅ Reset scrolling permission when user scrolls manually
    window.addEventListener("scroll", resetScroll);
}

function resetScroll() {
    hasScrolled = false; // Enable scrolling again if the user interacts
    window.removeEventListener("scroll", resetScroll); // Stop listening until next auto-scroll
}




// Funkcia na otvorenie/zatvorenie harmoniky
function toggleTimeslotVisibility(date) {
  const container = document.getElementById(`timeslot-${date}`);

  if (container.style.display === "none" || container.style.display === "") {
      // Show the container
      container.style.display = "block";
  } else {
      // Hide the container
      container.style.display = "none";

      // Remove .active from all timeslots in this container
      container.querySelectorAll(".timeslot").forEach(slot => {
          slot.classList.remove("active");
      });

      // Also hide the reservation form
      document.getElementById("reservationForm").style.display = "none";
  }
}

// Timeslot click: Toggle active. If we *deactivate*, hide the form
function selectTimeslot(event) {
    const clickedSlot = event.target;
    
    // If the clicked slot is already active, deactivate it and hide the form
    if (clickedSlot.classList.contains("active")) {
        clickedSlot.classList.remove("active");
        document.getElementById("reservationForm").style.display = "none";
        return;
    }

    // Remove active class from all timeslots
    document.querySelectorAll(".timeslot").forEach(slot => {
        slot.classList.remove("active");
    });

    // Set the clicked slot as active
    clickedSlot.classList.add("active");

    // Get the form element
    const form = document.getElementById("reservationForm");
    
    // ✅ First, make sure the form is displayed
    form.style.display = "block";

    // ✅ Second, wait for the browser to render it, then scroll
    setTimeout(() => {
        console.log("🔹 Scrolling to form..."); // Debugging log
        form.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50); // A small delay to ensure the browser renders it first
}







// Odoslat rezervaciu 
async function submitReservation() {
    const countryCode = document.getElementById("countryCode").value; 
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const selectedSlot = document.querySelector(".timeslot.active"); 
    const fullPhoneNumber = `${countryCode}${phone}`;
    
    console.log("📌 Debug: Phone:", fullPhoneNumber, "Email:", email, "Selected slot:", selectedSlot);

        // Validate phone number (only digits allowed)
        if (!phone.match(/^\d+$/)) {
            alert("Zadajte platné telefónne číslo bez medzier a znakov.");
            return;
        }

    if (!selectedSlot) {
        alert("Prosím, vyberte termín.");
        return;
    }


    // Kontrola emailu
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        alert("Zadajte platný e-mail.");
        return;
    }

    // Získame ID termínu z data-id
    const timeslotId = selectedSlot.getAttribute("data-id");
    if (!timeslotId) {
        alert("Chyba: Nemôžem získať ID termínu.");
        return;
    }

    // Pripravíme dáta pre rezerváciu
    const reservationData = {
        phone: fullPhoneNumber,
        email: email,
        timeslot_id: parseInt(timeslotId) // Zreťazíme na číslo
    };

    console.log("📤 Sending reservation data:", reservationData);

    try {
        const response = await fetch("https://klinika10-backend-cfgbfma3h5g4cbcb.germanywestcentral-01.azurewebsites.net/api/create_reservation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservationData)
        });

        const result = await response.json();
        console.log("📥 API response:", result);

        if (response.ok) {
            alert("Rezervácia úspešná!");
            location.reload(); // Refresh the page to update available slots
        } else {
            alert(result.error || "Chyba pri rezervácii.");
        }
    } catch (error) {
        console.error("❌ Chyba pri rezervácii:", error);
        alert("Chyba na strane servera.");
    }
}

// 4️⃣ Spustíme funkciu hneď po načítaní stránky
document.addEventListener("DOMContentLoaded", loadTimeslots);