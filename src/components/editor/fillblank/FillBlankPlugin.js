import './fillblank_style.css';

function createToolbarItemOption() {
    return {
        name: 'fill_blank',
        tooltip: '정답 추가',
        className: 'hmm',
        text: 'ANS',
        style: { background: 'none'},
        command: 'fill_blank'
    };
}

export default function(context, options = {}) {
    const toolbarItem = createToolbarItemOption();
    
    return {
        markdownCommands: {
            fill_blank: ({ selectedColor }, { tr, selection, schema }, dispatch) => {
                
            },
        },
        wysiwygCommands: {
            fill_blank: ({  }, { tr, selection, schema }, dispatch) => {
                const { from, to } = selection;
                const content = selection.content().content.content[0].textContent;
                console.log(content);
                const attrs = { htmlAttrs: { class: 'answer_making' } };
                const mark = schema.marks.span.create(attrs);

                tr.insertText('[', from);
                tr.insertText(']', to+1);
                tr.addMark(from, to+2, mark);
                // const newContent = `<dfn class="answer_making">${content}</dfn>`

                // tr.insertText(newContent, from, to);
                dispatch(tr);
            },
        },
        toolbarItems: [
            {
                groupIndex: 5,
                itemIndex: 1,
                item: toolbarItem,
            },
        ],
        toHTMLRenderers: {
            htmlInline: {
                
            },
        },
  };
}