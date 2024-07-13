export default class Formatter {
    type: string;
    text: string;
    content: Element | null;
  
    constructor(type: string, text: string) {
      this.type = type;
      this.text = text;
      this.content = document.querySelector(".content");
  
      this.content?.addEventListener("mouseup", this.handleSelection);
    }
  
    public handleSelection = () => {
      const selection = window.getSelection();
  
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
  
        switch (this.type) {
          case 'bold':
            this.applyBold(range);
            break;
          case 'italic':
            this.applyItalic(range);
            break;
          case 'underline':
            this.applyUnderline(range);
            break;
          case 'strikethrough':
            this.applyStrikethrough(range);
            break;
          case 'link':
            this.applyLink(range);
            break;
          default:
            console.warn(`Unsupported format type: ${this.type}`);
        }
  
        selection.removeAllRanges();
        console.log(this.content?.innerHTML);
      }
    }
  
    private applyFormat(range: Range, tag: string) {
      const element = document.createElement(tag);
      range.surroundContents(element);
    }
  
    public applyBold(range: Range) {
      this.applyFormat(range, 'strong');
    }
  
    public applyItalic(range: Range) {
      this.applyFormat(range, 'em');
    }
  
    public applyUnderline(range: Range) {
      this.applyFormat(range, 'u');
    }
  
    public applyStrikethrough(range: Range) {
      this.applyFormat(range, 's');
    }
  
    public applyLink(range: Range) {
      const url = prompt('Enter the URL:');
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        range.surroundContents(link);
      }
    }
  
    public isFormatActive(format: string): boolean {
      return document.queryCommandState(format);
    }
  
    public getActiveFormats(): string[] {
      const formats = ['bold', 'italic', 'underline', 'strikethrough'];
      return formats.filter(format => this.isFormatActive(format));
    }
  }