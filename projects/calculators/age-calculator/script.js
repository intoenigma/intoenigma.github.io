document.addEventListener('DOMContentLoaded', () => {
    const dobInput = document.getElementById('dob');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result-section');
    
    // Set max date to today
    dobInput.max = new Date().toISOString().split('T')[0];

    calculateBtn.addEventListener('click', () => {
        if (!dobInput.value) {
            alert('Please enter your birth date first.');
            return;
        }

        const dob = new Date(dobInput.value);
        const today = new Date();

        if (dob > today) {
            alert('Date of birth cannot be in the future.');
            return;
        }

        calculateAge(dob, today);
    });

    function calculateAge(dob, today) {
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        // Adjust for negative months or days
        if (days < 0) {
            months--;
            // Get days in previous month
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate days until next birthday
        const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const oneDay = 24 * 60 * 60 * 1000;
        const daysToNextBirthday = Math.round(Math.abs((nextBirthday - today) / oneDay));

        // Animate Results
        resultSection.classList.remove('hidden');
        animateValue(document.getElementById('years'), 0, years, 1000);
        animateValue(document.getElementById('months'), 0, months, 1000);
        animateValue(document.getElementById('days'), 0, days, 1000);
        
        document.getElementById('next-birthday-days').textContent = daysToNextBirthday;
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
