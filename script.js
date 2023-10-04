// Function to calculate the loan schedule
function calculateLoanSchedule(loanAmount, interestRate, loanTerm, startDate) {
    const monthlyInterestRate = (interestRate / 100) / 12;
    const monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));

    const schedule = [];
    let remainingPrincipal = loanAmount;

    for (let month = 1; month <= loanTerm; month++) {
        const interestPayment = remainingPrincipal * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingPrincipal -= principalPayment;

        // Calculate the date for each month
        const nextMonthDate = new Date(startDate);
        nextMonthDate.setMonth(startDate.getMonth() + month);

        schedule.push({
            month,
            date: nextMonthDate.toLocaleDateString('en-US'),
            interestPayment: interestPayment.toFixed(2),
            principalPayment: principalPayment.toFixed(2),
            remainingPrincipal: remainingPrincipal.toFixed(2),
        });
    }

    return schedule;
}

// Function to generate and display the loan schedule
function generateSchedule() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const startDate = new Date(document.getElementById('startDate').value);

    const schedule = calculateLoanSchedule(loanAmount, interestRate, loanTerm, startDate);

    // Display the schedule in the HTML
    const scheduleResult = document.getElementById('scheduleResult');
    scheduleResult.innerHTML = '<h2>Loan Schedule:</h2>';
    scheduleResult.innerHTML += '<table><tr><th>Month</th><th>Date</th><th>Interest Payment</th><th>Principal Payment</th><th>Remaining Principal</th></tr>';

    schedule.forEach((payment) => {
        scheduleResult.innerHTML += `<tr><td class="left-align">${payment.month}</td><td class="left-align">${payment.date}</td><td>${payment.interestPayment}</td><td>${payment.principalPayment}</td><td>${payment.remainingPrincipal}</td></tr>`;
    });

    scheduleResult.innerHTML += '</table>';
}

