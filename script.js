document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const totalProblems = document.getElementById("total-problems");
    const ranking = document.getElementById("ranking");

    function validUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        if (!regex.test(username)) {
            alert("Username should be 1-15 characters long and only contain letters, numbers, or underscores.");
            return false;
        }
        return true;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }

            const data = await response.json();
            if (data.status === "error") {
                throw new Error("User not found");
            }

            updateUI(data);
        } catch (error) {
            alert("User not found or API error.");
            console.error(error);
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateUI(data) {
        easyLabel.textContent = data.easySolved;
        mediumLabel.textContent = data.mediumSolved;
        hardLabel.textContent = data.hardSolved;

        totalProblems.textContent = data.totalSolved;
        ranking.textContent = data.ranking;
    }

    searchButton.addEventListener("click", function() {
        const username = usernameInput.value.trim();
        if (validUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
