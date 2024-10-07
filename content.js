// 현재 시간 YYYY-MM-DD HH:MM:SS 계산
const nowtime = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;

    var today = new Date();
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var timeString = hours + ':' + minutes + ':' + seconds;

    return dateString + ' ' + timeString;
}

// images
const endUrl = chrome.runtime.getURL('end_image.png');

// Load Google Fonts
const fontlink = document.createElement('link');
fontlink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
fontlink.rel = 'stylesheet';
document.head.appendChild(fontlink);

/* INFORMATION TO SERVER(GLOBAR) */

var sendData = (type, content) => {
    chrome.storage.local.get('info_submits', (r) => { 
        if (r.info_submits) {
            chrome.storage.local.get(['info_id', 'info_session', 'info_modal', 'info_subject'], (result) => {
                chrome.runtime.sendMessage({
                    data: {
                        PID: result.info_id,
                        Session_num: result.info_session,
                        Modality: result.info_modal,
                        Subject: result.info_subject,
                        Timestamp: nowtime(),
                        EventType: type,
                        Content: content
                    }
                });
            });
        } else {
            chrome.runtime.sendMessage({
                data: {
                    PID: "N/A",
                    Session_num: "N/A",
                    Modality: "N/A",
                    Subject: "N/A",
                    Timestamp: nowtime(),
                    EventType: type,
                    Content: content
                }
            });
        }
    });
}

/* Original Page */
const pageContent = document.createElement('div');
pageContent.id = 'data-area-content';
while (document.body.firstChild) {
    pageContent.appendChild(document.body.firstChild);
}
document.body.appendChild(pageContent);


// Cursor setting
const mycursor = document.createElement('div');
mycursor.id = 'my-cursor';
pageContent.appendChild(mycursor);

var page_y;
let mouseCursor = document.getElementById('my-cursor');
const cursor_func = (e) => {
    mouseCursor.style.left = e.pageX + "px";
    if (!isNaN(e.pageY)) {
        page_y = e.pageY;
        mouseCursor.style.top = e.pageY + "px";
    }
    else
        mouseCursor.style.top = page_y + window.scrollY + "px";
}

document.addEventListener("mousemove", cursor_func);
document.addEventListener("scroll", cursor_func);
document.addEventListener("mouseup", () => mouseCursor.style.backgroundColor = '#f7fa5b8f');
document.addEventListener("mousedown", () => mouseCursor.style.backgroundColor = '#faa25b8f');
document.querySelectorAll('a').forEach(item => {
    item.addEventListener("mouseover", () => mouseCursor.style.backgroundColor = '#fadd5b8f');
    item.addEventListener("mouseout", () => mouseCursor.style.backgroundColor = '#f7fa5b8f');
});
document.querySelectorAll('input').forEach(item => {
    item.addEventListener("mouseover", () => mouseCursor.style.backgroundColor = '#fadd5b8f');
    item.addEventListener("mouseout", () => mouseCursor.style.backgroundColor = '#f7fa5b8f');
});
document.querySelectorAll('button').forEach(item => {
    item.addEventListener("mouseover", () => mouseCursor.style.backgroundColor = '#fadd5b8f');
    item.addEventListener("mouseout", () => mouseCursor.style.backgroundColor = '#f7fa5b8f');
});

/* |END| Original Page */

/* Note VIEW */
const noteContainer = document.createElement('div');
noteContainer.id = 'note-container';
document.body.appendChild(noteContainer);

const startdiv = document.createElement('div');
startdiv.id = 'start-div';
const enddiv = document.createElement('div');
enddiv.id = 'end-div';

const info_group = document.createElement('div');
info_group.id = 'info_group';
const notediv = document.createElement('div');
notediv.id = 'note_div';

const footer = document.createElement('div');
footer.id = 'footer';

noteContainer.appendChild(startdiv);
noteContainer.insertBefore(startdiv, noteContainer.firstChild);
noteContainer.appendChild(enddiv);
noteContainer.appendChild(info_group);
noteContainer.appendChild(notediv);
noteContainer.appendChild(footer);


/* |END| Note VIEW */

/* 1. Starting Part */
// START BUTTON
const startButton = document.createElement('button');
startButton.id = 'start_btn';
startButton.textContent = 'Start';
const starttext = document.createElement('p');
starttext.className = 'note-alert';
starttext.textContent = '※ Do not press the button until instructed.';

startdiv.appendChild(startButton);
startdiv.appendChild(starttext);

// END BUTTON
const endButton = document.createElement('button');
endButton.id = 'end_btn';

const endImg = document.createElement('img');
endImg.id = 'end-image';
endImg.src = endUrl;
endButton.appendChild(endImg);
const endtext = document.createElement('p');
endtext.id = 'end_text';
endtext.className = 'note-alert';
endtext.textContent = '※ Do not press the button until instructed.';

enddiv.appendChild(endButton);
enddiv.appendChild(endtext);

// If Session start
chrome.storage.local.get('session_start', (result) => {
    if (!result.session_start) {    // session didn't start
        console.log("waiting for start session.");
    } else {
        document.getElementById('start-div').style.display = 'none';
        enddiv.style.display = 'block';
        info_group.style.display = 'block';
        info();
    }
});

startButton.addEventListener('click', () => {
    console.log("Start button has been clicked.");
    document.getElementById('start-div').style.display = 'none';
    chrome.storage.local.set({ session_start: true });
    enddiv.style.display = 'block';
    info_group.style.display = 'block';

    info();

    sendData('START', 'N/A');
});

// [SEND] END send
endButton.addEventListener('click', () => {
    sendData('END', 'N/A');
    enddiv.style.display = 'none';
    info_group.style.display = 'none';
    notediv.style.display = 'none';
    footer.textContent = 'Thank you for your hard work.';
    setTimeout(() => {
        chrome.storage.local.clear(() => { console.log("Session END 1") });
        chrome.storage.sync.clear(() => { console.log("Session END 2") });
    }, 2000);
})

/* 2. Info Part */
function info() {
    // ID
    const iddiv = document.createElement('div');
    const idLabel = document.createElement('label');
    idLabel.textContent = 'ID  ';
    iddiv.appendChild(idLabel);

    const idInput = document.createElement('input');
    idInput.type = 'text';
    idInput.id = 'id-input';
    iddiv.appendChild(idInput);

    info_group.appendChild(iddiv);

    // 회차
    const rounddiv = document.createElement('div');
    const roundLabel = document.createElement('label');
    roundLabel.textContent = 'Round  ';
    rounddiv.appendChild(roundLabel);

    const roundInput = document.createElement('select');
    roundInput.id = 'round-select';
    const rounds = ['', '1', '2', '3']; // Subject list
    rounds.forEach(round => {
        const round_option = document.createElement('option');
        round_option.value = round;
        round_option.textContent = round;
        roundInput.appendChild(round_option);
    });
    rounddiv.appendChild(roundInput);

    info_group.appendChild(rounddiv);

    // Modality
    const modaldiv = document.createElement('div');
    const modalLabel = document.createElement('label');
    modalLabel.textContent = 'Modality';
    modaldiv.appendChild(modalLabel);

    const modalInput = document.createElement('select');
    modalInput.id = 'subject-select';
    const modals = ['', 'BOOK', 'WEB', 'GPT'];
    modals.forEach(modal => {
        const modal_option = document.createElement('option');
        modal_option.value = modal;
        modal_option.textContent = modal;
        modalInput.appendChild(modal_option);
    });
    modaldiv.appendChild(modalInput);

    info_group.appendChild(modaldiv);

    // 과목
    const subjectdiv = document.createElement('div');
    const subjectLabel = document.createElement('label');
    subjectLabel.textContent = 'Subject';
    subjectdiv.appendChild(subjectLabel);

    const subjectInput = document.createElement('select');
    subjectInput.id = 'subject-select';
    const subjects = ['', 'DBMS', 'Solar System', 'Sampling'];
    subjects.forEach(subject => {
        const subject_option = document.createElement('option');
        subject_option.value = subject;
        subject_option.textContent = subject;
        subjectInput.appendChild(subject_option);
    });
    subjectdiv.appendChild(subjectInput);

    info_group.appendChild(subjectdiv);

    // Submit button
    const infosubmitButton = document.createElement('button');
    infosubmitButton.id = 'info_submit';
    infosubmitButton.textContent = 'Submit';
    info_group.appendChild(infosubmitButton);

    // When the session start
    chrome.storage.local.get(['info_submits', 'info_id', 'info_session', 'info_modal', 'info_subject', 'info_btn'], (result) => {
        if (!result.info_submits) {
            console.log("waiting for submit information.");
        } else {
            idInput.value = result.info_id;
            roundInput.value = result.info_session;
            modalInput.value = result.info_modal;
            subjectInput.value = result.info_subject;
            infosubmitButton.value = result.info_btn;
            idInput.disabled = true;
            roundInput.disabled = true;
            modalInput.disabled = true;
            subjectInput.disabled = true;
            infosubmitButton.disabled = true;
            infosubmitButton.style.backgroundColor = 'rgba(77, 76, 76, 0.3)';
            note();
        }
        
    });

    // [SEND] INFO. 
    infosubmitButton.addEventListener('click', () => {
        idInput.disabled = true;
        roundInput.disabled = true;
        modalInput.disabled = true;
        subjectInput.disabled = true;
        infosubmitButton.disabled = true;
        infosubmitButton.style.backgroundColor = 'rgba(77, 76, 76, 0.3)';

        PID = idInput.value;
        Session_num = roundInput.value;
        Modality = modalInput.value;
        Subject = subjectInput.value;

        chrome.storage.local.set({
            info_submits: true,
            info_id: PID,
            info_session: Session_num,
            info_modal: Modality,
            info_subject: Subject,
            info_btn: infosubmitButton.value,
            note_num: 0
        });

        note();
        chrome.storage.local.set({'note1': {
            num: 1,
            fold: true,
            Q: '',
            A: '',
            M: '',
            btn: 'Write'
        }});

        sendData('INFO', 'N/A');
    })
}

/* 3. Note Taking Part */
function noteContentAction(noteId) {
    var note = document.getElementById(noteId);
    var content = note.querySelector('.note-content');

    if (content.style.display === 'none') {
        content.style.display = 'block'; // reveal the content
        note.querySelector('.fold-btn').firstChild.textContent = '∧';
        return false;
    } else {
        content.style.display = 'none'; // fold the content
        note.querySelector('.fold-btn').firstChild.textContent = '∨';
        return true;
    }
}

function note() {
    chrome.storage.local.get('note_num', (result) => {
        if (result.note_num == 0) {
            note_block(1, true, "", "", "", "Write");
            chrome.storage.local.set({note_num: 1});
        } else {    // note already existed > need to load!
            for (let i = 1; i <= result.note_num; i++) {
                (function(i) {
                    var note_id = 'note' + i;
                    chrome.storage.local.get([note_id], (res) => {
                        if (res[note_id]) {
                            var nt = res[note_id];
                            note_block(i, nt.fold, nt.Q, nt.A, nt.M, nt.btn);
                            if (i < result.note_num) 
                                document.getElementById('add_btn' + i).remove();
                        }
                    });
                })(i);
            }
        }
        chrome.storage.local.get('info_modal', (r) => {
            // [SEND] GOOGLE Search
            if (r.info_modal == "WEB") {
                sendData('WEB_URL', document.URL);
                var searchInput = document.querySelector('input[name="q"]'); // google search input field
                if (searchInput) {
                    var searchQuery = searchInput.value.trim();
                    if (searchQuery !== '') {
                        sendData('searchContent', searchQuery);
                    }
                }
            }
            // [SEND] BOOK
            else if (r.info_modal == "BOOK") {
                document.getElementById("page-container").style.width = '73.6%';
            }
        });
    });
}

const note_block = (num, fold, Q, A, M, btn) => {
    var noteId = 'note' + (num);
    var newNote = document.createElement('div');
    newNote.className = 'note';
    newNote.id = noteId;

    var noteHead = document.createElement('div');
    noteHead.className = 'note-head';
    noteHead.textContent = 'Session ' + (num);

    var noteContent = document.createElement('div');
    noteContent.className = 'note-content';
    noteContent.style.display = 'none'; // hide content at first

    
    // Question, Answer, Memo part
    var Question = document.createElement('h4');
    Question.textContent = 'Question';
    noteContent.appendChild(Question);
    var noteQuestion = document.createElement('textarea');
    noteQuestion.className = 'note-question';
    noteQuestion.placeholder = 'Please write in a descriptive form. \n(e.g., What is merge sort?)';
    noteQuestion.textContent = Q;
    noteContent.appendChild(noteQuestion);
    
    var Answer = document.createElement('h4');
    Answer.textContent = 'Answer';
    noteContent.appendChild(Answer);
    var noteAnswer = document.createElement('textarea');
    noteAnswer.className = 'note-answer';
    noteAnswer.textContent = A;
    noteContent.appendChild(noteAnswer);
    
    var Memo = document.createElement('h4');
    Memo.textContent = 'Memo';
    noteContent.appendChild(Memo);
    var noteMemo = document.createElement('textarea');
    noteMemo.className = 'note-memo';
    noteMemo.placeholder = 'Please feel free to take notes on important content. \n\t- Copy and Paste\n\t- Summarize on your own\n\t- Organize the content\n\t- Others';
    noteMemo.textContent = M;
    noteContent.appendChild(noteMemo);
    
    // FOLD
    var is_fold = fold;     // fold default
    var foldButton = document.createElement('span');
    foldButton.className = 'fold-btn'
    foldButton.textContent = '∨';
    if (!is_fold) {   // Expanded state persistence after reload
        noteContent.style.display = 'block';
        foldButton.textContent = '∧';
    }
        
    foldButton.onclick = () => {
        is_fold = noteContentAction(noteId);
        chrome.storage.local.set({[noteId]: {
            num: num,
            fold: is_fold,
            Q: noteQuestion.value || '',
            A: noteAnswer.value || '',
            M: noteMemo.value || '',
            btn: 'Write'
        }});
    }
    noteHead.appendChild(foldButton);

    // Wrtie Button
    var noteWrite = document.createElement('button');
    noteWrite.className = 'note-write-btn';
    noteWrite.textContent = btn;
    noteContent.appendChild(noteWrite);

    noteContent.addEventListener('input', () => {
        chrome.storage.local.set({[noteId]: {
            num: num,
            fold: is_fold,
            Q: noteQuestion.value,
            A: noteAnswer.value,
            M: noteMemo.value,
            btn: noteWrite.textContent
        }});
    })

    noteWrite.addEventListener('click', () => {
        chrome.storage.local.set({[noteId]: {
            num: num,
            fold: is_fold,
            Q: noteQuestion.value || '',
            A: noteAnswer.value || '',
            M: noteMemo.value || '',
            btn: 'Revise'
        }});

        var note_content = { noteID: noteId, Question: noteQuestion.value, Answer: noteAnswer.value, Memo: noteMemo.value };
        if (noteWrite.textContent == 'Write' || noteWrite.textContent == '') {
            sendData('Write', note_content);
        }
        else if (noteWrite.textContent == 'Revise') {
            sendData('Revise', note_content);
        }
        noteWrite.textContent = 'Revise';
    })

    newNote.appendChild(noteHead);
    newNote.appendChild(noteContent);
    notediv.appendChild(newNote);

    // + Button
    var addNote = document.createElement('div');
    addNote.id = 'add_btn' + (num);
    addNote.className = 'add-note-btn';
    addNote.textContent = '+';

    addNote.addEventListener("click", () => {
        // Update note_num every time a note is created
        chrome.storage.local.set({note_num: num+1});
        document.getElementById('add_btn' + (num)).remove();
        note_block(num+1, true, "", "", "", "Write");
        var new_noteId = 'note' + (num + 1);
        chrome.storage.local.set({[new_noteId]: {
            num: num+1,
            fold: true,
            Q: '',
            A: '',
            M: '',
            btn: 'Write'
        }});
    })
    notediv.appendChild(addNote);
}


/* |END| Note VIEW */


// [SEND] Drag
document.addEventListener('mouseup', function () {
    var selectedText = "";
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    var drag_content = selectedText;
    if (drag_content != '' && drag_content != '\n') sendData('Drag', drag_content);
});
