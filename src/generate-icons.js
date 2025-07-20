import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as Icons from '@mui/icons-material';

(async () => {
    const outDir = path.resolve(process.cwd(), 'svg');
    if (fs.existsSync(outDir)) {
        fs.rmSync(outDir, { recursive: true, force: true });
    }
    fs.mkdirSync(outDir);

    const iconEntries = Object.entries(Icons);
    let num = 0;
    for (const [iconName, IconComponent] of iconEntries) {
        let rawSvg;
        try {
            rawSvg = renderToStaticMarkup(
                React.createElement(IconComponent, {
                    xmlns: "http://www.w3.org/2000/svg",
                    xmlnsXlink: "http://www.w3.org/1999/xlink"
                })
            ).replace(/<style.*?<\/style>/, '');
        } catch (e) {
            console.log("Skipping:", iconName);
            continue;
        }
        fs.writeFileSync(path.join(outDir, `${iconName}.svg`), rawSvg);
        num++;
    }

    console.log(`✔ ${num} svg files were created`);
})();
