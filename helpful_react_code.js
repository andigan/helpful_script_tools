

// append some css

const sheet = document.createElement("style");
document.body.appendChild(sheet);
sheet.innerHTML = `
  .modalThing {
    fontSize: 20px;
  }
`;

// // method to determine why a component is re-rendering
componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) => {
        if (prevProps[key] !== val) {
            console.info(`%cApp Prop '${key}' changed`, 'font-weight: 600;');
            // console.info(' - old: ', prevProps[key]);
            // console.info(' - new: ', val);

        }
    });
    Object.entries(this.state || {}).forEach(([key, val]) => {
        if (prevState[key] !== val) {
            console.info(` - App State '${key}' changed`);
        }
    });
  }