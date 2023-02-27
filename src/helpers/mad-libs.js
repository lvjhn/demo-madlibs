class MadLibs 
{
  constructor(template) 
  {
    this.template = template;
    this.init();
  }

  partsOfSpeech() {
    return this.template.partsOfSpeech;
  }

  init() {
    this.variables = this.identifyVariables();
  }

  identifyVariables() {
    const template = this.template;
    const variables = {};   
    const varPattern = /\[\s*[\w\-]+\s*\:\s*[\w\-]+\s*\]/g;
    const text = template.text;

    do {
      const result = varPattern.exec(text);
      if(!result) break; 

      const item = result[0]; 
      const itemData = item.match(/([\w\-]+)\s*\:\s*([\w\-]+)/);
     
      const key = itemData[1];
      const partOfSpeech = itemData[2]; 
      
      variables[key] = partOfSpeech;
    } while(true);

    return variables;
  }

  fillTemplate(variablesData) {
    let text_ = this.template.text;
    const variables = this.variables;
    for(let variable in variables) {
      const variableStr = `[${variable}:${variables[variable]}]`;
      text_ = text_.replaceAll(variableStr, variablesData[variable]);
    }
    return text_;
  }
}  

export default MadLibs
