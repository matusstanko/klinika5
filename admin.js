document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector("#time_slots-table tbody");
    const logList = document.querySelector("#log-list"); // Log list container

    function addLog(message) {
        const logItem = document.createElement("li");
        logItem.textContent = message;
        logList.prepend(logItem);
    }

    async function loadLogs() {
        try {
            const response = await fetch("/api/admin/logs");
            const logs = await response.json();

            logList.innerHTML = "";
            logs.forEach(log => addLog(log));
        } catch (error) {
            console.error("❌ Chyba pri načítaní logov:", error);
        }
    }

    async function loadTimeSlots() {
        try {
            const response = await fetch("/api/admin/timeslots");
            const data = await response.json();

            tableBody.innerHTML = "";

            data.forEach(slot => {
                const row = document.createElement("tr");
                row.dataset.timeSlotId = slot.time_slot_id;
                row.innerHTML = `
                    <td>${slot.date}</td>
                    <td>${slot.time}</td>
                    <td>${slot.duration} min</td>
                    <td>${slot.is_taken ? "Obsadené" : "Voľné"}</td>   
                    <td>
                        <button onclick="deleteTimeSlot(${slot.time_slot_id}, this)">Zmazať termín</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

        } catch (error) {
            console.error("❌ Chyba pri načítaní termínov:", error);
            addLog("Chyba pri načítaní termínov!");
        }
    }

    window.deleteTimeSlot = async (timeSlotId, button) => {
        if (!timeSlotId) {
            alert("Chyba: Neplatné ID termínu.");
            return;
        }

        if (confirm("Naozaj chceš zmazať tento termín?")) {
            try {
                const response = await fetch(`/api/admin/delete-slot/${timeSlotId}`, { method: "DELETE" });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert("Chyba: " + errorData.message);
                    return;
                }

                const row = button.closest("tr");
                if (row) row.remove();

                loadLogs(); // Refresh logs after deletion
            } catch (error) {
                console.error("❌ Chyba pri mazaní termínu:", error);
                addLog("Chyba pri mazaní termínu!");
                alert("Chyba pri mazaní termínu.");
            }
        }
    };

    document.querySelector("#add-slot-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;
        const duration = document.querySelector("#duration").value;

        try {
            await fetch("/api/admin/add-slot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date, time, duration })
            });

            loadTimeSlots();
            loadLogs(); // Refresh logs after adding a time slot
        } catch (error) {
            console.error("❌ Chyba pri pridávaní termínu:", error);
        }
    });

    loadLogs();
    loadTimeSlots();
});



