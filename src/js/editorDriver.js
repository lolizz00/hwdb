

/*
    <textarea id='editor'></textarea>
*/


function createEditor(widget, label, config)
{
  $('#' + widget).append("<b>" + label + "</b>");
  $('#' + widget).append("<textarea id='editor'></textarea>");

  CKEDITOR.replace('editor',  config);
}

function getEditor()
{
  return CKEDITOR.instances.editor.getData();
}

function setEditor(html)
{
  CKEDITOR.instances.editor.setData(html);
}
