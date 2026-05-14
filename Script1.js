const songs = [];
const table = document.getElementById("song_table");
const search_bar = document.getElementById("search_bar");

const add_song_button = document.getElementById("add_song_button");
const add_song_window = document.getElementById("add_song_window");
const song_input = document.getElementById("song_input");
const add_song_submit = document.getElementById("add_song_submit");

const attribute_window = document.getElementById("attribute_window");
const add_attribute_button = document.getElementById("add_attribute_button");
const attribute_window_close = document.getElementById("attribute_window_close");
const delete_song_button = document.getElementById("delete_song_button");

const add_attribute_window = document.getElementById("add_attribute_window");
const add_attribute_input = document.getElementById("add_attribute_input");
const add_attribute_submit = document.getElementById("add_attribute_submit");

const attribute_window_content_table = document.getElementById("attribute_window_content_table");

const song_delete_window = document.getElementById("song_delete_window");
const song_delete_delete = document.getElementById("song_delete_delete");
const song_delete_cancel = document.getElementById("song_delete_cancel");

const attribute_delete_window = document.getElementById("attribute_delete_window");
const attribute_delete_delete = document.getElementById("attribute_delete_delete");
const attribute_delete_cancel = document.getElementById("attribute_delete_cancel");

const save_load_window = document.getElementById("save_load_window");
const save_load_window_button = document.getElementById("save_load_window_button");
const save_button = document.getElementById("save_button");
const load_button = document.getElementById("load_button");
const save_load_cancel_button = document.getElementById("save_load_cancel_button");

function write_file(songs) {
    return JSON.stringify(songs);
}

function read_file(json) {
    return JSON.parse(json);
}

function save() {
    localStorage.setItem("songs_array_save_file", write_file(songs));
}

function load() {
    let json = localStorage.getItem("songs_array_save_file");

    if (json !== null) {
        songs.length = 0;
        songs.push(...read_file(json));
    }

    load_song_list(songs);
}

function open_save_load_window() {
    save_load_window.classList.remove("hidden");
}

function save_button_event() {
    save();
    alert("File saved! :3");
    save_load_window.classList.add("hidden");
}

function load_button_event() {
    load();
    alert("Fild loaded! Enjoy :3");
    save_load_window.classList.add("hidden");
}

function save_load_cancel_button_event() {
    save_load_window.classList.add("hidden");
}

save_load_window_button.addEventListener("click", open_save_load_window);
save_button.addEventListener("click", save_button_event);
load_button.addEventListener("click", load_button_event);
save_load_cancel_button.addEventListener("click", save_load_cancel_button_event);

function new_song(title) {
    this.title = title;
    this.attributes = [];
}

function add_song(song) {
    songs.push(song);
}

function add_attribute(song, attribute) {
    song.attributes.push(attribute);
}

function delete_song(song) {

    const index = songs.indexOf(song);

    if (index !== -1) {
        songs.splice(index, 1);
    }
}

function delete_attribute(song, attribute) {
    
    const index = song.attributes.indexOf(attribute);

    if (index !== -1) {
        song.attributes.splice(index, 1);
    }
}


function open_add_attribute_window(song) {

    attribute_window.classList.add("hidden");
    add_attribute_window.classList.remove("hidden");

    function add_attribute_submit_click() {
        add_attribute(song, add_attribute_input.value);
        add_attribute_input.value = "";
        add_attribute_window.classList.add("hidden");
        load_attribute_list(song);
        attribute_window.classList.remove("hidden");
    }

    add_attribute_submit.onclick = add_attribute_submit_click;

}

function open_song_delete_window(song) {

    attribute_window.classList.add("hidden");
    song_delete_window.classList.remove("hidden");

    function song_delete_delete_click() {
        delete_song(song);
        song_delete_window.classList.add("hidden");
        load_song_list(songs);
    }

    function song_delete_cancel_click() {
        song_delete_window.classList.add("hidden");
        load_song_list(songs);
        attribute_window.classList.remove("hidden");
    }

    song_delete_delete.onclick = song_delete_delete_click;
    song_delete_cancel.onclick = song_delete_cancel_click;

}

function open_attribute_window(song) {

    attribute_window.classList.remove("hidden");
    load_attribute_list(song);

    function add_attribute_button_click() {

        open_add_attribute_window(song);

    }

    function delete_song_button_click() {

        open_song_delete_window(song);

    }

    add_attribute_button.onclick = add_attribute_button_click;
    delete_song_button.onclick = delete_song_button_click;

}

function attribute_window_close_event() {
    attribute_window.classList.add("hidden");
}

attribute_window_close.addEventListener("click", attribute_window_close_event);

function load_song_list(songs) {

    table.innerHTML = "";

    for (const song of songs) {

        const row = document.createElement("tr");
        row.innerHTML = "<td><button class='song_button'>" + song.title + "</button></td>";

        const song_button = row.querySelector(".song_button");

        function song_button_event() {
            open_attribute_window(song);
        }

        song_button.addEventListener("click", song_button_event);

        table.appendChild(row);

    }
}

function open_attribute_delete_window(song, attribute) {

    attribute_window.classList.add("hidden");
    attribute_delete_window.classList.remove("hidden");

    function attribute_delete_delete_click() {
        delete_attribute(song, attribute);
        attribute_delete_window.classList.add("hidden");
        load_attribute_list(song);
        attribute_window.classList.remove("hidden");
    }

    function attribute_delete_cancel_click() {
        attribute_delete_window.classList.add("hidden");
        load_attribute_list(song);
        attribute_window.classList.remove("hidden");
    }

    attribute_delete_delete.onclick = attribute_delete_delete_click;
    attribute_delete_cancel.onclick = attribute_delete_cancel_click;

}

function load_attribute_list(song) {

    attribute_window_content_table.innerHTML = "";

    for (const attribute of song.attributes) {

        const row = document.createElement("tr");
        row.innerHTML = "<td><button class='attribute_button'>" + attribute + "</button></td>";

        const attribute_button = row.querySelector(".attribute_button");

        function attribute_button_event() {
            open_attribute_delete_window(song, attribute);
        }

        attribute_button.addEventListener("click", attribute_button_event);

        attribute_window_content_table.appendChild(row);

    }

}

function check_query_in_song(song) {

    const query = search_bar.value.toLowerCase();

    if (song.title.toLowerCase().includes(query)) {
        return true;
    }

    for (const attribute of song.attributes) {
        if (attribute.toLowerCase().includes(query)) {
            return true;
        }
    }

    return false;

}

function search_bar_event() {

    const filtered = songs.filter(check_query_in_song);

    load_song_list(filtered);
}

function add_song_button_event() {
    add_song_window.classList.remove("hidden");
}

function add_song_submit_event() {
    add_song(new new_song(song_input.value));
    load_song_list(songs);
    song_input.value = "";
    add_song_window.classList.add("hidden");
}

search_bar.addEventListener("input", search_bar_event);

add_song_button.addEventListener("click", add_song_button_event);

add_song_submit.addEventListener("click", add_song_submit_event);


/*

DEV NOTES:

Features to add:
    - Multiple search terms
    - Input safety
        - Empty input, duplicate input, etc (?)
    - Styling
    - Ask for attributes immediately (minor)
    - Multiple save file functionality
        - With overwrite safety checking
    - Window safety
        - Only one window open/accessible at once

*/