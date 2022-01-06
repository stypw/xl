
const fs = require("fs");
const xml = require("xml2js");
const svgDir = "./projects/xl/src/lib/svg/iconfonts";

function readSvg(fileName) {
    return new Promise((s, f) => {
        const file = fs.readFileSync(svgDir + "/" + fileName, "utf8");
        if (!file) {
            f("file error");
            return;
        }
        xml.parseString(file, (err, ret) => {
            if (err || !ret) {
                f("svg format error");
                return;
            };
            let pathes = ret?.svg?.path;
         
            var arr = [];
            for (const p of pathes) {
                arr.push(`{"f":"${p.$.fill}","d":"${p.$.d}"}`);
            }
            let varName = "xl_svg_" + fileName.replace(/\-/g, "_").replace(".svg","");
            s(`export const ${varName}:PathData[] = [${arr.join(",")}]`);
        });
    });
}

async function makeSvgs() {

    const dir = fs.opendirSync(svgDir);
    const arr = [`import { PathData } from "./define";`];
    while (true) {
        const d = dir.readSync();
        if (!d) break;
        if (!d.isFile) continue;
        if (!/\.svg$/.test(d.name)) continue;
        try {
            const v = await readSvg(d.name);
            if (v) arr.push(v);
        } catch (e) {
            console.log(e);
        }
    }
    let str = arr.join(";\n");
    str+=";";
    fs.writeFileSync("./projects/xl/src/lib/svg/iconfonts.ts", str);
}

makeSvgs();




