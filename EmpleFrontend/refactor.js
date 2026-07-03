const fs = require('fs');

function refactorPage(file, isDAA) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Add Map to lucide-react imports
    if (!content.includes('Map,')) {
        content = content.replace(/ChevronDown\r?\n} from "lucide-react";/, 'ChevronDown,\n  Map\n} from "lucide-react";');
    }

    // 2. Add roadmap to TABS
    if (!isDAA) {
        if (!content.includes('id: "roadmap"')) {
            content = content.replace(/{ id: "arrange", label: "Arrange", icon: Shuffle },\r?\n\];/, '{ id: "arrange", label: "Arrange", icon: Shuffle },\n  { id: "roadmap", label: "Progress", icon: Map },\n];');
        }
    } else {
        // Rename roadmap label to Progress in DAA
        content = content.replace(/label: "Roadmap"/, 'label: "Progress"');
    }

    // 3. Remove showRoadmap state
    content = content.replace(/const \[showRoadmap, setShowRoadmap\] = useState\(true\);\r?\n?/, '');

    // 4. Extract the chapter map logic
    let mapStart = content.indexOf('{CHAPTERS.map(ch => {');
    
    // Find the end by looking for the end of the map block
    let mapEndStr = "              </div>\r\n            </div>\r\n          ) : (";
    let mapEnd = content.indexOf(mapEndStr);
    if (mapEnd === -1) {
        mapEndStr = "              </div>\n            </div>\n          ) : (";
        mapEnd = content.indexOf(mapEndStr);
    }
    
    if (mapEnd === -1) {
        console.log('Could not find mapEnd for ' + file);
        return;
    }
    
    let mapLogic = content.substring(mapStart, mapEnd).trim();
    
    // 5. Remove the entire Sidebar block
    let sidebarStart = content.indexOf('{/* Collapsible Sidebar: Syllabus Roadmap */}');
    let pageEndRegex = /<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*\);\r?\n}/;
    let pageEndMatch = content.match(pageEndRegex);
    
    if (sidebarStart !== -1 && pageEndMatch) {
        content = content.substring(0, sidebarStart) + '</div>\n      </div>\n    </div>\n  );\n}';
        
        // Remove the flex container wrapper
        content = content.replace(/<div className="flex flex-col lg:flex-row gap-6 items-start">\r?\n\s*{\/\* Main workspace area \*\/}\r?\n\s*<div className="flex-1 w-full space-y-6">/, '<div className="flex-1 w-full space-y-6">');
    }

    // 6. Inject the tab content
    let tabInsertionPoint = content.indexOf('{activeTab === "arrange"');
    let tabInsertionEndRegex = /\/>}\r?\n/;
    let tabInsertionMatch = content.substring(tabInsertionPoint).match(tabInsertionEndRegex);
    
    if (tabInsertionMatch) {
        let tabInsertionEnd = tabInsertionPoint + tabInsertionMatch.index + tabInsertionMatch[0].length;
        if (content.substring(tabInsertionPoint, tabInsertionEnd).includes('ArrangeTab')) {
            let newTabContent = '              {activeTab === "roadmap"  && (\n                <div className="space-y-6 animate-fadeIn">\n                  <div className="pb-4 border-b" style={{ borderColor: "var(--border)" }}>\n                    <h3 className="text-xl font-bold mb-2">Syllabus Progress</h3>\n                    <p className="text-sm text-[var(--muted2)]">Track your progress across all {CHAPTERS.length} chapters.</p>\n                  </div>\n                  <div className="space-y-2.5">\n                    ' + mapLogic + '\n                  </div>\n                </div>\n              )}\n';
            content = content.substring(0, tabInsertionEnd) + newTabContent + content.substring(tabInsertionEnd);
        }
    }
    
    fs.writeFileSync(file, content);
    console.log(file + ' updated!');
}

refactorPage('src/features/user/tutorials/c/pages/CTutorialPage.tsx', false);
refactorPage('src/features/user/tutorials/java/pages/JavaTutorialPage.tsx', false);
refactorPage('src/features/user/tutorials/daa/pages/DAATutorialPage.tsx', true);
