var editor = ace.edit("editor");

editor.commands.addCommand({
    name: 'saveCommand',
    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: function(editor) {
      $('#saveButton').click();
    },
    readOnly: true // false if this command should not apply in readOnly mode
});


editor.commands.addCommand({
    name: 'submitCommand',
    bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
    exec: function(editor) {
      $('#submitButton').click();
    },
    readOnly: true // false if this command should not apply in readOnly mode
});

editor.commands.addCommand({
    name: 'runCommand',
    bindKey: {win: 'Ctrl-R',  mac: 'Command-R'},
    exec: function(editor) {
      $('#runButton').click();
    },
    readOnly: true // false if this command should not apply in readOnly mode
});
