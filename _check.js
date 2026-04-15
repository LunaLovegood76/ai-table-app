var fs = require('fs');
var base = '/Users/zhujiahui/Desktop/AI/AI表格学习系统/demo/js/';
var allCode = '';
allCode += fs.readFileSync(base + 'courses-l2.js', 'utf8') + '\n';
allCode += fs.readFileSync(base + 'courses-l3.js', 'utf8') + '\n';
allCode += fs.readFileSync(base + 'courses-l4.js', 'utf8') + '\n';
allCode += fs.readFileSync(base + 'courses-l5.js', 'utf8') + '\n';
allCode += fs.readFileSync(base + 'courses.js', 'utf8').replace(/^const /gm, 'var ') + '\n';
eval(allCode);

console.log('=== L3 ===');
L3_LESSONS.forEach(function(l) { console.log(l.id + ': ' + l.title + ' | Q:' + l.questions.length + (l.isChallenge ? ' [C]' : '')); });
console.log('\n=== L4 ===');
L4_LESSONS.forEach(function(l) { console.log(l.id + ': ' + l.title + ' | Q:' + l.questions.length + (l.isChallenge ? ' [C]' : '')); });
console.log('\n=== L5 ===');
L5_LESSONS.forEach(function(l) { console.log(l.id + ': ' + l.title + ' | Q:' + l.questions.length + (l.isChallenge ? ' [C]' : '')); });
