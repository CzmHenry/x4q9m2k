const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    const ua = (req.headers["user-agent"] || "").toLowerCase();

    const isRoblox =
        ua.includes("roblox") ||
        ua.includes("robloxstudio");

    const file = isRoblox ? "pqac.lua" : "idiot_dumpers.txt";
    const filePath = path.join(__dirname, file);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("internal error");
        }

        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(data);
    });
}).listen(PORT, () => {
    console.log("online:", PORT);
});
