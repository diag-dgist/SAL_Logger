
// Solar System 1
document.getElementById('pdf1').addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://fergame.diag.kr/www/book1.html' });
});

// Solar System 2
document.getElementById('pdf2').addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://fergame.diag.kr/www/book2.html' });
});

// DBMS
document.getElementById('pdf3').addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://fergame.diag.kr/www/book3.html' });
});

// Sampling
document.getElementById('pdf5').addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://fergame.diag.kr/www/book4.html' });
});
