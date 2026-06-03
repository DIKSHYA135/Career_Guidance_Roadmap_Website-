const fs = require('fs');
let content = fs.readFileSync('roadmap.js', 'utf8');

// 1. Update renderGroup to include Quiz button
const renderGroupRegex = /(const renderGroup = \(title, modulesToRender\) => \{[\s\S]*?if \(accordionContainer\) accordionContainer\.appendChild\(groupDiv\);\n    \};)/m;
const renderGroupMatch = content.match(renderGroupRegex);

if (renderGroupMatch) {
    let renderGroupCode = renderGroupMatch[1];
    
    // Replace the last line of renderGroupCode to insert the quiz button before appendChild(groupDiv)
    const injectionPoint = 'if (accordionContainer) accordionContainer.appendChild(groupDiv);';
    
    const injectedCode = `
        // --- ADD QUIZ BUTTON TO GROUP ---
        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '{}');
        const pathLevels = completedLevels[matchedPathKey] || [];
        const isPassed = pathLevels.includes(title);
        
        const quizContainer = document.createElement("div");
        quizContainer.style.padding = "20px";
        quizContainer.style.marginTop = "10px";
        quizContainer.style.background = isPassed ? "rgba(16, 185, 129, 0.1)" : "rgba(99, 102, 241, 0.05)";
        quizContainer.style.borderRadius = "12px";
        quizContainer.style.display = "flex";
        quizContainer.style.justifyContent = "space-between";
        quizContainer.style.alignItems = "center";
        quizContainer.style.border = isPassed ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(99, 102, 241, 0.3)";
        
        const quizText = document.createElement("div");
        quizText.innerHTML = \`<h4 style="margin:0; font-size:1.05rem; color: \${isPassed ? 'var(--success)' : 'var(--text-dark)'};">\${title} Assessment</h4>
            <p style="margin:5px 0 0; font-size:0.85rem; color:var(--text-muted);">Pass to unlock the next stage (>= 70%).</p>\`;
        
        const quizBtn = document.createElement("button");
        quizBtn.className = isPassed ? "btn btn-outline" : "btn btn-primary";
        quizBtn.innerHTML = isPassed ? '<i class="fas fa-check"></i> Passed' : 'Take Assessment <i class="fas fa-arrow-right"></i>';
        if (isPassed) {
            quizBtn.style.borderColor = "var(--success)";
            quizBtn.style.color = "var(--success)";
        }
        
        quizBtn.onclick = () => {
            window.location.href = \`quiz.html?category=\${encodeURIComponent(matchedPathKey)}&level=\${encodeURIComponent(title)}\`;
        };
        
        quizContainer.appendChild(quizText);
        quizContainer.appendChild(quizBtn);
        groupDiv.appendChild(quizContainer);
        // --------------------------------
        
        ${injectionPoint}`;
        
    let newRenderGroupCode = renderGroupCode.replace(injectionPoint, injectedCode);
    
    content = content.replace(renderGroupMatch[0], newRenderGroupCode);
    console.log("Replaced renderGroup");
} else {
    console.log("Could not find renderGroup");
}

fs.writeFileSync('roadmap.js', content);
console.log('roadmap.js updated successfully.');
