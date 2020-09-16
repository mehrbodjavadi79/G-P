function newElement(tag, className) {
  var e = document.createElement(tag);
  e.className = className;
  return e;
}

const map = {
  w: 8,
  h: 6,
};

const mapTileType = ["water", "lava", "sand", "dirt", { type: "void", num: 5 }];

function getMapType() {
  var s = 0;
  mapTileType.forEach((e) => {
    if (e.num) s += e.num;
    else s++;
  });
  var ind = Math.floor(Math.random() * s);
  var res = mapTileType[0].type || mapTileType[0];
  mapTileType.forEach((e) => {
    if (ind < 0) return;
    if (e.num) ind -= e.num;
    else ind--;
    if (ind < 0) res = e.type || e;
  });
  return res;
}

function createTable(className, width, height) {
  var t = document.createElement("table");
  t.className = className;
  for (var i = 0; i < height; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < width; j++) {
      var td = document.createElement("td");
      td.id = className + "-" + i + "," + j;
      td.classList.add(getMapType());
      td.append("");
      tr.appendChild(td);
    }
    t.appendChild(tr);
  }
  return t;
}

function resize(c) {
  c.style.height = window.innerHeight + "px";
  c.style.width = window.innerWidth + "px";
}

var container = document.querySelector("div.tableContainer");
container.appendChild(createTable("tables", map.w, map.h));
resize(container);
window.addEventListener("resize", () => resize(container));
