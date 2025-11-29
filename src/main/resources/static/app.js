let currentParticipants = [];

async function scrapeComments() {
    const urlInput = document.getElementById('postUrl');
    const btnScrape = document.getElementById('btnScrape');
    const spinner = document.getElementById('spinnerScrape');
    const status = document.getElementById('statusScrape');
    const tableBody = document.getElementById('commentsTableBody');
    const countBadge = document.getElementById('participantCount');
    const btnDraw = document.getElementById('btnDraw');

    const url = urlInput.value.trim();
    if (!url) {
        alert("Please enter a valid URL");
        return;
    }

    // UI State: Loading
    btnScrape.disabled = true;
    spinner.classList.remove('d-none');
    status.textContent = "Scraping... this may take a minute (launching browser)...";
    tableBody.innerHTML = '<tr><td colspan="3" class="text-center py-3">Scraping in progress...</td></tr>';

    try {
        const response = await fetch(`/fb/comments?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        currentParticipants = data; // Store for lottery

        // Render Table
        renderTable(data);
        countBadge.textContent = data.length;
        status.textContent = `Done! Found ${data.length} comments.`;
        btnDraw.disabled = false;

    } catch (error) {
        console.error(error);
        status.textContent = "Failed to scrape.";
        tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-danger py-3">${error.message}</td></tr>`;
    } finally {
        btnScrape.disabled = false;
        spinner.classList.add('d-none');
    }
}

function renderTable(comments) {
    const tableBody = document.getElementById('commentsTableBody');
    if (comments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-3">No comments found.</td></tr>';
        return;
    }

    let html = '';
    comments.forEach((c, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${escapeHtml(c.author)}</td>
                <td>${escapeHtml(c.content)}</td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

async function drawWinner() {
    const count = document.getElementById('winnerCount').value;
    const allowDuplicate = document.getElementById('allowDuplicate').checked;
    const filterKeyword = document.getElementById('filterKeyword').value;
    const winnersList = document.getElementById('winnersList');

    if (currentParticipants.length === 0) {
        alert("No participants to draw from!");
        return;
    }

    const requestBody = {
        count: parseInt(count),
        allowDuplicate: allowDuplicate,
        filterKeyword: filterKeyword,
        participants: currentParticipants
    };

    try {
        const response = await fetch('/fb/lottery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) throw new Error("Lottery failed");

        const data = await response.json();
        renderWinners(data.winners);

    } catch (error) {
        console.error(error);
        alert("Failed to draw winner.");
    }
}

function renderWinners(winners) {
    const list = document.getElementById('winnersList');
    if (!winners || winners.length === 0) {
        list.innerHTML = '<li class="list-group-item text-muted text-center">No winners found matching criteria.</li>';
        return;
    }

    let html = '';
    winners.forEach(w => {
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <div class="fw-bold">🎉 ${escapeHtml(w.author)}</div>
                    <small class="text-muted text-truncate d-block" style="max-width: 200px;">${escapeHtml(w.content)}</small>
                </div>
            </li>
        `;
    });
    list.innerHTML = html;
}

function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
