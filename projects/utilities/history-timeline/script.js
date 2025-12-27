const timeline = document.getElementById('timeline');

const events = [
    { year: '1969', title: 'ARPANET', desc: 'The first packet-switching network and precursor to the Internet is established.' },
    { year: '1983', title: 'TCP/IP', desc: 'ARPANET adopts TCP/IP, marking the birth of the modern Internet.' },
    { year: '1989', title: 'World Wide Web', desc: 'Tim Berners-Lee invents the World Wide Web at CERN.' },
    { year: '1993', title: 'Mosaic Browser', desc: 'Mosaic, the first popular graphical web browser, is released.' },
    { year: '1995', title: 'JavaScript', desc: 'Brendan Eich creates JavaScript in 10 days at Netscape.' },
    { year: '1998', title: 'Google', desc: 'Google is founded by Larry Page and Sergey Brin.' },
    { year: '2004', title: 'Web 2.0', desc: 'The term Web 2.0 becomes popular, signifying user-generated content (Facebook, etc).' },
    { year: '2008', title: 'HTML5', desc: 'Draft of HTML5 published, changing web capabilities forever.' },
    { year: '2009', title: 'Node.js', desc: 'Ryan Dahl releases Node.js, allowing JS to run server-side.' },
    { year: '2015', title: 'ES6', desc: 'ECMAScript 2015 brings major features (classes, modules) to JavaScript.' }
];

events.forEach(evt => {
    const el = document.createElement('div');
    el.className = 'event-card';
    el.innerHTML = `
        <div class="year">${evt.year}</div>
        <h3 class="event-title">${evt.title}</h3>
        <p class="event-desc">${evt.desc}</p>
    `;
    timeline.appendChild(el);
});
