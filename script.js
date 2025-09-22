document.addEventListener('DOMContentLoaded', () => {
    const codeInput = document.getElementById('codeInput');
    const continueButton = document.getElementById('continueButton');
    const errorMessage = document.getElementById('errorMessage');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const invitationScreen = document.getElementById('invitationScreen');
    const video = document.getElementById('weddingVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const staticInvitationBanner = document.getElementById('staticInvitationBanner'); 
    const mainContentText = document.getElementById('mainContentText'); 
    const stickers = document.querySelectorAll('.sticker');
    const bottomButtonContainer = document.getElementById('bottomButtonContainer');

    // ✅ Multiple valid codes
    const secretCodes = ["HAPPY2025", "RERATUL_BSL", "JOBAYER_BSL", "LHK2025", "MOTI_DHK","ORITRO_DHK","CAKE_MASTER_SIAM","RAYHAN_BSL","HEMEL_DHK","SIFAT_BSL","TEST"];

    let playCount = 1;
    const maxPlays = 2;

    // Allow pressing Enter in input
    codeInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            continueButton.click();
        }
    });

    // Handle Continue button click
    continueButton.addEventListener('click', () => {
        const enteredCode = codeInput.value.trim().toUpperCase();

        if (secretCodes.includes(enteredCode)) {
            // ✅ Correct code
            welcomeScreen.classList.add('hidden');
            invitationScreen.classList.remove('hidden');
            errorMessage.textContent = "";
            errorMessage.classList.remove('visible');
        } else {
            // ❌ Incorrect code
            errorMessage.textContent = "Incorrect code. Please try again.";
            errorMessage.classList.add('visible');
        }
    });

    // Video overlay click
    videoOverlay.addEventListener('click', () => {
        if (video.paused && playCount < maxPlays) {
            video.play();
            videoOverlay.classList.add('hidden-overlay');
        } else if (playCount >= maxPlays) {
            staticInvitationBanner.classList.remove('hidden');
            bottomButtonContainer.classList.remove('hidden');
            videoOverlay.classList.add('hidden-overlay');
        }
    });

    // Handle video ending
    video.addEventListener('ended', () => {
        playCount++;
        if (playCount < maxPlays) {
            video.play();
        } else {
            video.pause();
            video.classList.add('hidden');
            staticInvitationBanner.classList.remove('hidden');
            bottomButtonContainer.classList.remove('hidden');
            videoOverlay.classList.add('hidden-overlay');
            
            // ✅ Trigger stickers animation
            stickers.forEach(sticker => {
                sticker.classList.add('animated');
            });
        }
    });

    // Enter key press inside input (extra check)
    codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            continueButton.click();
        }
    });
});

