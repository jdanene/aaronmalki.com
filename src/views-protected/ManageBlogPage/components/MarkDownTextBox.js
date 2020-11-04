import Prism from 'prismjs'
import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {Slate, Editable, withReact} from 'slate-react'
import {Text, createEditor,Node} from 'slate'
import {withHistory} from 'slate-history'
import {css} from 'emotion'
import Paper from '@material-ui/core/Paper';
// Define a serializing function that takes a value and returns a string.
const serialize = value => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map(n => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  )
}

// Define a deserializing function that takes a string and returns a value.
const deserialize = string => {
  // Return a value array of children derived by splitting the string.
  return string.split('\n').map(line => {
    return {
      children: [{ text: line }],
    }
  })
}


// eslint-disable-next-line
;Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", {
    blockquote: {pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation"},
    code: [{pattern: /^(?: {4}|\t).+/m, alias: "keyword"}, {pattern: /``.+?``|`[^`\n]+`/, alias: "keyword"}],
    title: [{
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: "important",
        inside: {punctuation: /==+$|--+$/}
    }, {pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: "important", inside: {punctuation: /^#+|#+$/}}],
    hr: {pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation"},
    list: {pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation"},
    "url-reference": {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
            variable: {pattern: /^(!?\[)[^\]]+/, lookbehind: !0},
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
        },
        alias: "url"
    },
    bold: {
        pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: {punctuation: /^\*\*|^__|\*\*$|__$/}
    },
    italic: {
        pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: {punctuation: /^[*_]|[*_]$/}
    },
    url: {
        pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
        inside: {
            variable: {pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0},
            string: {pattern: /"(?:\\.|[^"\\])*"(?=\)$)/}
        }
    }
}), Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic), Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

const MarkDownTextBox = ({className, onTextChange}) => {
    const [value, setValue] = useState(initialValue);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);


    useEffect(() => {
        onTextChange(serialize(value))
      console.log(serialize(value))

    }, [value]);

    const decorate = useCallback(([node, path]) => {
        const ranges = [];

        if (!Text.isText(node)) {
            return ranges
        }

        const getLength = token => {
            if (typeof token === 'string') {
                return token.length
            } else if (typeof token.content === 'string') {
                return token.content.length
            } else {
                return token.content.reduce((l, t) => l + getLength(t), 0)
            }
        };

        const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
        let start = 0;

        for (const token of tokens) {
            const length = getLength(token);
            const end = start + length;

            if (typeof token !== 'string') {
                ranges.push({
                    [token.type]: true,
                    anchor: {path, offset: start},
                    focus: {path, offset: end},
                })
            }

            start = end
        }

        return ranges
    }, []);

    return (
        <Paper className={className}>
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <Editable
                    decorate={decorate}
                    renderLeaf={renderLeaf}
                    placeholder="Write some markdown..."
                />
            </Slate>
        </Paper>
    )
}

const Leaf = ({attributes, children, leaf}) => {
    return (
        <span
            {...attributes}
            className={css`
        text-align: left;
        font-weight: ${leaf.bold && 'bold'};
        font-style: ${leaf.italic && 'italic'};
        text-decoration: ${leaf.underlined && 'underline'};
        ${leaf.title &&
            css`
            display: inline-block;
            font-weight: bold;
            font-size: 20px;
            margin: 20px 0 10px 0;
          `}
        ${leaf.list &&
            css`
            padding-left: 10px;
            font-size: 20px;
            line-height: 10px;
          `}
        ${leaf.hr &&
            css`
            display: block;
            text-align: center;
            border-bottom: 2px solid #ddd;
          `}
        ${leaf.blockquote &&
            css`
            display: inline-block;
            border-left: 2px solid #ddd;
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
          `}
        ${leaf.code &&
            css`
            font-family: monospace;
            background-color: #eee;
            padding: 3px;
          `}
      `}
        >
      {children}
    </span>
    )
};

const initialValue = [
    {
        children: [
            {
                text:
                    `This markdown editor is flexible enough to add **decorations** that can format text based on its content. To see a preview of your blog look to the right. Let's walk through a few markdown commands:

## Heading
### Sub-heading
### Sub-heading

You can specify **Bold Font** and _italic font_ (can also specify *italics this way*).
You can have bulleted list:
- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
- Donec id elit non mi porta gravida at eget metus.
- Nulla vitae elit libero, a pharetra augue. 
    - You can nest bullet list with 4 spaces
        - Further nest with 4 additional spaces (8 in total)

1.  Vestibulum id ligula porta felis euismod semper.
2.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
3.  Maecenas sed diam eget risus varius blandit sit amet non magna.
    1. Nesting again with 4 spaces

You can look online for how to format Markdown further, it is really flexible. For instance
if you want to make a new line you can use <br/> which is a html tag, so Markdown supports html. 
So we can even add images like so <img src="https://octodex.github.com/images/yaktocat.png" width="200" height="200" />. 

Lastly,  I've added the capabaility to include videos. The following video sources are supported
- Facebook
- Youtube
- Twitch
- SoundCloud
- Vimeo
- Wistia
- Mixcloud

However, I've only tested facebook, youtube, twitch, and soundcloud. You can add a video like so:
<Video url="https://www.youtube.com/watch?v=J3w85C1f81Q&list=FLcz_djlvC9ufzXofNBq9GGQ&index=39" /> 

Super easy! 

                    `,
            },
        ],
    },
        {
        children: [
            {
                text:
                    `Try to start all you blog post with a title and a author`,
            },
        ],
    },
            {
        children: [
            {
                text: `
                # Sample blog post

                #### April 1, 2020 by [Jidé](www.instagram.com)`,
            },
        ],
    }
];

export default MarkDownTextBox